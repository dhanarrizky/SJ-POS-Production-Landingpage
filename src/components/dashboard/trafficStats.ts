import type { PageView } from "../../types/cms"

export interface DailyPoint {
  key: string // YYYY-MM-DD (waktu lokal)
  label: string // mis. "25 Sep"
  views: number
  visitors: number
}

export interface CountStat {
  name: string
  count: number
  pct: number
}

export interface TrafficStats {
  totalViews: number
  uniqueVisitors: number
  sessions: number
  pagesPerSession: number
  daily: DailyPoint[]
  hourly: { hour: string; views: number }[]
  topPages: CountStat[]
  topReferrers: CountStat[]
  devices: CountStat[]
}

/** PocketBase menyimpan "YYYY-MM-DD HH:MM:SS.sssZ" (UTC); Safari tidak parse spasi. */
export function parsePbDate(created: string): Date {
  return new Date(created.replace(" ", "T"))
}

/** Format tanggal UTC untuk filter PocketBase: created >= "..." */
export function pbDateFilter(daysAgo: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - (daysAgo - 1))
  return d.toISOString().replace("T", " ").substring(0, 19)
}

const localKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

export function countBy(
  views: PageView[],
  pick: (pv: PageView) => string,
  limit?: number,
): CountStat[] {
  const map = new Map<string, number>()
  views.forEach((pv) => {
    const name = pick(pv)
    map.set(name, (map.get(name) || 0) + 1)
  })
  const total = views.length || 1
  const list = [...map.entries()]
    .map(([name, count]) => ({
      name,
      count,
      pct: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
  return limit ? list.slice(0, limit) : list
}

/** Identitas pengunjung: visitor_id bila ada, jika tidak ip + user agent. */
const visitorKey = (pv: PageView) =>
  pv.visitor_id || `${pv.ip || "?"}|${pv.user_agent || pv.browser || ""}`

export function buildTrafficStats(
  views: PageView[],
  days: number,
): TrafficStats {
  // Rangka hari kosong agar grafik tidak bolong
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - (days - 1))

  const dayMap = new Map<
    string,
    { views: number; visitors: Set<string>; date: Date }
  >()
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    dayMap.set(localKey(d), { views: 0, visitors: new Set(), date: d })
  }

  const hours = new Array<number>(24).fill(0)
  const visitors = new Set<string>()
  const sessions = new Set<string>()

  views.forEach((pv) => {
    const date = parsePbDate(pv.created)
    if (Number.isNaN(date.getTime())) return
    const vk = visitorKey(pv)
    visitors.add(vk)
    sessions.add(pv.session_id || `${vk}|${localKey(date)}`)
    hours[date.getHours()]++

    const bucket = dayMap.get(localKey(date))
    if (bucket) {
      bucket.views++
      bucket.visitors.add(vk)
    }
  })

  const daily: DailyPoint[] = [...dayMap.entries()].map(([key, v]) => ({
    key,
    label: v.date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
    views: v.views,
    visitors: v.visitors.size,
  }))

  return {
    totalViews: views.length,
    uniqueVisitors: visitors.size,
    sessions: sessions.size,
    pagesPerSession: sessions.size
      ? Math.round((views.length / sessions.size) * 10) / 10
      : 0,
    daily,
    hourly: hours.map((v, h) => ({
      hour: `${String(h).padStart(2, "0")}`,
      views: v,
    })),
    topPages: countBy(views, (pv) => pv.path || "/", 8),
    topReferrers: countBy(views, (pv) => pv.referrer || "Langsung", 8),
    devices: countBy(views, (pv) => pv.device || "desktop"),
  }
}
