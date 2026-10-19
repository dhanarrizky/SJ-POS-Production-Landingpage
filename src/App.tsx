import { useEffect, lazy, Suspense } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { pb } from "./lib/pocketbase"
import {
  getDeviceType,
  getExternalReferrer,
  getSessionId,
  getVisitorId,
  parseUserAgent,
} from "./lib/utils"

// Route-based code splitting — each page is a separate JS chunk
const Home = lazy(() => import("./pages/Home"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const DetailProduk = lazy(() => import("./pages/detail-produk"))
const DetailFitur = lazy(() => import("./pages/detail-fitur"))
const BlogList = lazy(() => import("./pages/BlogList"))
const BlogDetail = lazy(() => import("./pages/BlogDetail"))
const Dashboard = lazy(() => import("./pages/Dashboard"))

// Halaman Baru (Pembelajaran Struktur Folder)
const LandingPageUtama = lazy(() => import("./pages/landing-page-utama"))
const Berita = lazy(() => import("./pages/berita"))
const DetailBerita = lazy(() => import("./pages/detail-berita"))
const TentangKami = lazy(() => import("./pages/tentang-kami"))
const BandingkanPaket = lazy(() => import("./pages/bandingkan-paket"))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1628] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
        <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
          Memuat...
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      target?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    // SECURITY: Avoid logging dashboard visits in page_views
    // This prevents leaking administrator access patterns to public logs
    if (location.pathname.startsWith("/dashboard")) return

    async function logVisit() {
      const ua = navigator.userAgent
      const { browser, os } = parseUserAgent(ua)

      fetch(`${pb.baseUrl}/api/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: location.pathname,
          user_agent: ua,
          browser,
          os,
          device: getDeviceType(ua),
          referrer: getExternalReferrer(),
          visitor_id: getVisitorId(),
          session_id: getSessionId(),
        }),
      }).catch((err) =>
        console.warn("Failed to log page view server-side:", err),
      )
    }

    logVisit()
  }, [location.pathname])

  // Handle Hash Scrolling & Scroll to top
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "")
      // Delay to ensure the new page components are fully mounted
      setTimeout(() => {
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [location])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Rute Baru (Yang Tampil Pertama Kali) */}
        <Route path="/" element={<LandingPageUtama />} />
        <Route path="/produk-baru/:slug" element={<DetailProduk />} />
        <Route path="/fitur" element={<DetailFitur />} />
        <Route path="/fitur/:slug" element={<DetailFitur />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:slug" element={<DetailBerita />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/bandingkan-paket" element={<BandingkanPaket />} />

        {/* Rute Lama (Bawaan Aplikasi - Dipindah agar tidak hilang) */}
        <Route path="/home-lama" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}
