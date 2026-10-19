import { useMemo } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Trash2 } from "lucide-react"
import type { PageView } from "../../types/cms"
import { buildTrafficStats, parsePbDate } from "./trafficStats"

export const RANGE_OPTIONS = [7, 30, 90] as const
export type RangeDays = (typeof RANGE_OPTIONS)[number]

interface DashboardTrafficTabProps {
  pageViews: PageView[]
  days: RangeDays
  onChangeDays: (days: RangeDays) => void
  onDeleteAllPageViews: () => void
}

const COLOR_VIEWS = "#0cad31"
const COLOR_VISITORS = "#22d3ee"
const DEVICE_COLORS: Record<string, string> = {
  desktop: "#0cad31",
  mobile: "#22d3ee",
  tablet: "#a78bfa",
}
const AXIS = { fontSize: 10, fill: "rgba(255,255,255,0.45)" }
const GRID = "rgba(255,255,255,0.06)"
const TOOLTIP_STYLE = {
  background: "#0a1628",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  fontSize: 11,
  color: "#fff",
}

const DEVICE_LABEL: Record<string, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
}

function Card({
  title,
  dot,
  children,
  className = "",
}: {
  title: string
  dot: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`glass border border-white/8 rounded-3xl p-6 sm:p-8 ${className}`}
    >
      <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${dot}`} /> {title}
      </h3>
      {children}
    </div>
  )
}

function Empty({ text = "Belum ada data pada rentang ini." }) {
  return (
    <div className="h-full min-h-[120px] flex items-center justify-center text-slate-500 text-xs">
      {text}
    </div>
  )
}

export default function DashboardTrafficTab({
  pageViews,
  days,
  onChangeDays,
  onDeleteAllPageViews,
}: DashboardTrafficTabProps) {
  const stats = useMemo(
    () => buildTrafficStats(pageViews, days),
    [pageViews, days],
  )

  const kpis = [
    { label: "Total Kunjungan", value: stats.totalViews.toLocaleString() },
    { label: "Pengunjung Unik", value: stats.uniqueVisitors.toLocaleString() },
    { label: "Sesi", value: stats.sessions.toLocaleString() },
    { label: "Halaman / Sesi", value: stats.pagesPerSession.toLocaleString() },
  ]

  const hasData = stats.totalViews > 0

  return (
    <div className="space-y-6">
      {/* Range filter + KPI */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          Menampilkan data {days} hari terakhir
        </p>
        <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
          {RANGE_OPTIONS.map((d) => (
            <button
              key={d}
              onClick={() => onChangeDays(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                days === d
                  ? "bg-brand text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {d} Hari
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="glass border border-white/8 rounded-2xl p-5"
          >
            <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
              {k.label}
            </span>
            <h3 className="text-2xl font-black text-white font-mono mt-2">
              {k.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily trend */}
        <Card
          title="Tren Kunjungan Harian"
          dot="bg-brand"
          className="lg:col-span-2"
        >
          <div className="h-[280px]">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.daily}>
                  <defs>
                    <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={COLOR_VIEWS}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor={COLOR_VIEWS}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={COLOR_VISITORS}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={COLOR_VISITORS}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={GRID} strokeDasharray="4 4" />
                  <XAxis
                    dataKey="label"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    interval="preserveStartEnd"
                    minTickGap={24}
                  />
                  <YAxis
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    width={32}
                  />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    name="Kunjungan"
                    stroke={COLOR_VIEWS}
                    strokeWidth={2.5}
                    fill="url(#gViews)"
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    name="Pengunjung unik"
                    stroke={COLOR_VISITORS}
                    strokeWidth={2}
                    fill="url(#gVisitors)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <Empty />
            )}
          </div>
        </Card>

        {/* Device donut */}
        <Card title="Perangkat" dot="bg-violet-400">
          <div className="h-[280px]">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.devices.map((d) => ({
                      ...d,
                      name: DEVICE_LABEL[d.name] || d.name,
                      key: d.name,
                    }))}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {stats.devices.map((d) => (
                      <Cell
                        key={d.name}
                        fill={DEVICE_COLORS[d.name] || "#94a3b8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Empty />
            )}
          </div>
        </Card>

        {/* Top pages */}
        <Card title="Halaman Terpopuler" dot="bg-cyan-400">
          <div className="h-[280px]">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.topPages}
                  layout="vertical"
                  margin={{ left: 8 }}
                >
                  <CartesianGrid stroke={GRID} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar
                    dataKey="count"
                    name="Kunjungan"
                    fill={COLOR_VIEWS}
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty />
            )}
          </div>
        </Card>

        {/* Referrers */}
        <Card title="Sumber Kunjungan" dot="bg-pink-400">
          <div className="h-[280px]">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.topReferrers}
                  layout="vertical"
                  margin={{ left: 8 }}
                >
                  <CartesianGrid stroke={GRID} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar
                    dataKey="count"
                    name="Kunjungan"
                    fill={COLOR_VISITORS}
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty />
            )}
          </div>
        </Card>

        {/* Hourly */}
        <Card title="Jam Tersibuk" dot="bg-amber-400">
          <div className="h-[280px]">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.hourly}>
                  <CartesianGrid stroke={GRID} vertical={false} />
                  <XAxis
                    dataKey="hour"
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={AXIS}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    width={28}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    labelFormatter={(h) => `Pukul ${h}.00`}
                  />
                  <Bar
                    dataKey="views"
                    name="Kunjungan"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty />
            )}
          </div>
        </Card>
      </div>

      {/* Recent log */}
      <div className="glass border border-white/8 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Log
            Kunjungan Terbaru
          </h3>
          <button
            onClick={onDeleteAllPageViews}
            disabled={pageViews.length === 0}
            className="text-slate-500 hover:text-rose-400 transition-colors text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-30"
          >
            <Trash2 size={13} /> Kosongkan
          </button>
        </div>

        <div className="max-h-[360px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
          {pageViews.length === 0 ? (
            <Empty text="Belum ada riwayat kunjungan." />
          ) : (
            pageViews.slice(0, 20).map((pv) => (
              <div
                key={pv.id}
                className="flex justify-between items-center gap-3 text-xs p-3 rounded-xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all"
              >
                <div className="truncate">
                  <span className="text-emerald-400 font-mono font-bold mr-2">
                    {pv.ip || "Unknown"}
                  </span>
                  <span className="text-white font-medium">{pv.path}</span>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {pv.city || "Unknown"}, {pv.country || "Unknown"} ·{" "}
                    {DEVICE_LABEL[pv.device || "desktop"]} ·{" "}
                    {pv.referrer || "Langsung"}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                  {parsePbDate(pv.created).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
