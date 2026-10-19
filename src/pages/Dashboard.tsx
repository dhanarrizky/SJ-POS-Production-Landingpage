import React, { useEffect, useState } from "react"
import { pb } from "../lib/pocketbase"
import {
  Users,
  MessageSquare,
  Globe,
  Compass,
  Monitor,
  Activity,
  Calendar,
} from "lucide-react"
import { pageTitle, useSEO } from "../hooks/useSEO"
import DashboardLogin from "../components/dashboard/DashboardLogin"
import DashboardHeader from "../components/dashboard/DashboardHeader"
import DashboardTrafficTab, {
  type RangeDays,
} from "../components/dashboard/DashboardTrafficTab"
import { pbDateFilter } from "../components/dashboard/trafficStats"
import DashboardFeedbackTab from "../components/dashboard/DashboardFeedbackTab"
import DashboardGeoTab from "../components/dashboard/DashboardGeoTab"
import DashboardSystemsTab from "../components/dashboard/DashboardSystemsTab"
import DashboardContentTab from "../components/dashboard/DashboardContentTab"
import CollectionManager from "../components/dashboard/CollectionManager"
import SiteSettingsTab from "../components/dashboard/SiteSettingsTab"
import {
  blogConfig,
  faqConfig,
  highlightsConfig,
  pricingConfig,
  productsConfig,
  testimonialsConfig,
  videosConfig,
} from "../components/dashboard/contentConfigs"
import type { Suggestion, PageView } from "../types/cms"

type TabKey =
  | "traffic"
  | "feedback"
  | "geo"
  | "systems"
  | "content"
  | "site"
  | "products"
  | "pricing"
  | "testimonials"
  | "faqs"
  | "blog"
  | "videos"
  | "highlights"

interface VisitorAnalytics {
  harian: number
  bulanan: number
  per_3_bulan: number
  per_6_bulan: number
  per_1_tahun: number
}

const TABS = [
  { key: "traffic" as TabKey, label: "📊 Grafik & Trafik", icon: Activity },
  { key: "feedback" as TabKey, label: "✉️ Saran", icon: MessageSquare },
  { key: "geo" as TabKey, label: "🌍 Geografis & Lokasi", icon: Globe },
  { key: "systems" as TabKey, label: "💻 Browser & OS", icon: Monitor },
  { key: "content" as TabKey, label: "📝 Konten Fitur", icon: Monitor },
  { key: "site" as TabKey, label: "⚙️ Pengaturan Situs", icon: Monitor },
  { key: "products" as TabKey, label: "📦 Produk", icon: Monitor },
  { key: "pricing" as TabKey, label: "💰 Paket Harga", icon: Monitor },
  { key: "testimonials" as TabKey, label: "💬 Testimoni", icon: Monitor },
  { key: "faqs" as TabKey, label: "❓ FAQ", icon: Monitor },
  { key: "blog" as TabKey, label: "📰 Blog", icon: Monitor },
  { key: "videos" as TabKey, label: "🎬 Video", icon: Monitor },
  { key: "highlights" as TabKey, label: "⭐ Sorotan Produk", icon: Monitor },
]

export default function Dashboard() {
  useSEO({
    title: pageTitle("Dashboard Admin"),
    description: "Halaman khusus admin dan pengelola SpontanJualan.",
    robots: "noindex, nofollow",
  })

  const [auth, setAuth] = useState(pb.authStore.isValid && pb.authStore.isAdmin)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)
  const [analytics, setAnalytics] = useState<VisitorAnalytics>({
    harian: 0,
    bulanan: 0,
    per_3_bulan: 0,
    per_6_bulan: 0,
    per_1_tahun: 0,
  })
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [pageViews, setPageViews] = useState<PageView[]>([])
  const [loadingData, setLoadingData] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>("traffic")
  const [rangeDays, setRangeDays] = useState<RangeDays>(30)

  // Restore admin session securely
  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.isAdmin) {
      setAuth(true)
    }
  }, [])

  useEffect(() => {
    if (auth) loadDashboardData()
  }, [auth, rangeDays])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    setLoggingIn(true)
    try {
      await pb.admins.authWithPassword(email, password)
      setAuth(pb.authStore.isValid && pb.authStore.isAdmin)
    } catch {
      setLoginError("Email atau password admin salah.")
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = () => {
    pb.authStore.clear()
    setAuth(false)
  }

  const loadDashboardData = async () => {
    setLoadingData(true)
    try {
      const [analyticsList, suggestionsList, pageViewsList] = await Promise.all(
        [
          pb.collection("visitor_analytics").getFullList(),
          pb.collection("suggestions").getFullList({ sort: "-created" }),
          pb.collection("page_views").getFullList({
            sort: "-created",
            filter: `created >= "${pbDateFilter(rangeDays)}"`,
          }),
        ],
      )
      if (analyticsList.length > 0)
        setAnalytics(analyticsList[0] as unknown as VisitorAnalytics)
      setSuggestions(suggestionsList as unknown as Suggestion[])
      setPageViews(pageViewsList as unknown as PageView[])
    } catch (err) {
      console.error("Gagal memuat data dashboard:", err)
    } finally {
      setLoadingData(false)
    }
  }

  const handleDeleteSuggestion = async (id: string) => {
    if (
      !confirm("Apakah Anda yakin ingin menghapus saran ini secara permanen?")
    )
      return
    try {
      await pb.collection("suggestions").delete(id)
      setSuggestions((prev) => prev.filter((s) => s.id !== id))
    } catch {
      alert("Gagal menghapus saran.")
    }
  }

  const handleDeleteAllPageViews = async () => {
    if (
      !confirm("Apakah Anda yakin ingin mengosongkan seluruh log page views?")
    )
      return
    try {
      setLoadingData(true)
      await pb.send("/api/clear-traffic", { method: "DELETE" })
      setPageViews([])
      setAnalytics({
        harian: 0,
        bulanan: 0,
        per_3_bulan: 0,
        per_6_bulan: 0,
        per_1_tahun: 0,
      })
    } catch (err) {
      console.error("Gagal mengosongkan log:", err)
      alert("Gagal mengosongkan log.")
    } finally {
      setLoadingData(false)
    }
  }

  // Aggregate geo and system stats from raw page views
  const aggregateStats = (
    key: keyof typeof pageViews[0],
    fallback: string,
  ) => {
    const map: Record<string, number> = {}
    pageViews.forEach((pv) => {
      const v = pv[key] as string || fallback
      map[v] = (map[v] || 0) + 1
    })
    const total = pageViews.length || 1
    return Object.entries(map)
      .map(([name, count]) => ({
        name,
        count,
        pct: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count)
  }

  const geoCountries = aggregateStats("country", "Unknown")
  const geoCities = pageViews
    .reduce<{ name: string; count: number; pct: number }[]>((acc, pv) => {
      const regionStr =
        pv.region && pv.region !== "Unknown" ? ` (${pv.region})` : ""
      const city =
        pv.city && pv.city !== "Unknown"
          ? `${pv.city}${regionStr}`
          : "Lokasi Tidak Diketahui"
      const existing = acc.find((x) => x.name === city)
      if (existing) existing.count++
      else acc.push({ name: city, count: 1, pct: 0 })
      return acc
    }, [])
    .map((c) => ({
      ...c,
      pct: Math.round((c.count / (pageViews.length || 1)) * 100),
    }))
    .sort((a, b) => b.count - a.count)

  const sysBrowsers = aggregateStats("browser", "Lainnya")
  const sysOS = aggregateStats("os", "Lainnya")

  if (!auth) {
    return (
      <DashboardLogin
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        loggingIn={loggingIn}
        onLogin={handleLogin}
      />
    )
  }

  const STAT_CARDS = [
    {
      label: "Hari Ini",
      val: analytics.harian,
      desc: "Kunjungan Hari Ini",
      icon: Activity,
      col: "text-emerald-400",
    },
    {
      label: "30 Hari",
      val: analytics.bulanan,
      desc: "Kunjungan 30 Hari",
      icon: Users,
      col: "text-brand",
    },
    {
      label: "90 Hari",
      val: analytics.per_3_bulan,
      desc: "Kunjungan 3 Bulan",
      icon: Calendar,
      col: "text-cyan-400",
    },
    {
      label: "180 Hari",
      val: analytics.per_6_bulan,
      desc: "Kunjungan 6 Bulan",
      icon: Compass,
      col: "text-violet-400",
    },
    {
      label: "365 Hari",
      val: analytics.per_1_tahun,
      desc: "Kunjungan 1 Tahun",
      icon: Globe,
      col: "text-pink-400",
    },
  ]

  return (
    <div className="min-h-screen bg-[#060d19] text-slate-100 font-sans antialiased flex flex-col relative overflow-x-hidden">
      {/* Mesh Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(12,173,49,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(12,173,49,0.02) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <DashboardHeader
        loadingData={loadingData}
        onRefresh={loadDashboardData}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 relative z-10">
        {/* Quick Numbers Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {STAT_CARDS.map((item, idx) => (
            <div
              key={idx}
              className="glass border border-white/8 rounded-2xl p-5 shadow-card relative overflow-hidden flex flex-col justify-between min-h-[110px]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                  {item.label}
                </span>
                <item.icon size={16} className={`${item.col} opacity-80`} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white font-mono leading-none mb-1">
                  {item.val.toLocaleString()}
                </h3>
                <p className="text-[10px] text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap border-b border-white/8 gap-1 p-1 bg-white/5 rounded-xl max-w-full w-fit">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === t.key
                  ? "bg-brand text-white shadow-emerald-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {t.key === "feedback"
                ? `✉️ Saran (${suggestions.length})`
                : t.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {activeTab === "traffic" && (
          <DashboardTrafficTab
            pageViews={pageViews}
            days={rangeDays}
            onChangeDays={setRangeDays}
            onDeleteAllPageViews={handleDeleteAllPageViews}
          />
        )}
        {activeTab === "feedback" && (
          <DashboardFeedbackTab
            suggestions={suggestions}
            onDelete={handleDeleteSuggestion}
          />
        )}
        {activeTab === "geo" && (
          <DashboardGeoTab countries={geoCountries} cities={geoCities} />
        )}
        {activeTab === "systems" && (
          <DashboardSystemsTab browsers={sysBrowsers} os={sysOS} />
        )}
        {activeTab === "content" && <DashboardContentTab />}
        {activeTab === "site" && <SiteSettingsTab />}
        {activeTab === "products" && <CollectionManager {...productsConfig} />}
        {activeTab === "pricing" && <CollectionManager {...pricingConfig} />}
        {activeTab === "testimonials" && (
          <CollectionManager {...testimonialsConfig} />
        )}
        {activeTab === "faqs" && <CollectionManager {...faqConfig} />}
        {activeTab === "blog" && <CollectionManager {...blogConfig} />}
        {activeTab === "videos" && <CollectionManager {...videosConfig} />}
        {activeTab === "highlights" && (
          <CollectionManager {...highlightsConfig} />
        )}
      </main>

      {/* Footer bar */}
      <footer className="border-t border-white/8 py-6 px-6 mt-12 bg-[#060d19]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-4">
          <p className="font-mono">
            © 2026 SpontanJualan System. Seluruh koneksi data terekam secara
            ter-enkripsi.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 select-none">
            <span className="w-2 h-2 rounded-full bg-brand pulse-dot" />
            <span className="font-mono text-[10px] text-slate-400">
              Database Engine: SQLite &amp; PocketBase
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
