import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { pb } from "./lib/pocketbase"
import {
  getDeviceType,
  getExternalReferrer,
  getSessionId,
  getVisitorId,
  parseUserAgent,
} from "./lib/utils"

import LandingPageUtama from "./pages/LandingPageUtama"
import DetailProduk from "./pages/DetailProduk"
import DetailFitur from "./pages/DetailFitur"
import Legal from "./pages/Legal"
import Berita from "./pages/Berita"
import DetailBerita from "./pages/DetailBerita"
import TentangKami from "./pages/TentangKami"
import BandingkanPaket from "./pages/BandingkanPaket"
import Dashboard from "./pages/Dashboard"

import React, { Component, type ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = "/"
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5FFF6] text-black font-sans p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-[#0CAD31] flex items-center justify-center text-2xl font-bold">
              <i className="fa-solid fa-rotate text-emerald-600"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Memperbarui Halaman</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Terjadi penyesuaian saat memuat data halaman. Silakan klik tombol di bawah untuk memuat ulang tampilan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 bg-[#0CAD31] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Muat Ulang Halaman
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Ke Beranda
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}


function NotFoundRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/"
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FFF6] text-black font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-3 border-[#0CAD31] border-t-transparent animate-spin" />
        <p className="text-sm font-semibold text-gray-700">Mengarahkan ke Beranda...</p>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  // (Scroll handling is consolidated below)
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
        } else {
          // Jika elemen (hash) tidak ditemukan di halaman, bersihkan URL-nya
          window.history.replaceState(null, "", location.pathname + location.search)
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [location])

  return (
    <AppErrorBoundary>
      <Routes>
        {/* Rute (Halaman Aplikasi) */}
        <Route path="/" element={<LandingPageUtama />} />
        <Route path="/produk-baru/:slug" element={<DetailProduk />} />
        <Route path="/fitur" element={<DetailFitur />} />
        <Route path="/fitur/:slug" element={<DetailFitur />} />
        <Route path="/kebijakan-privasi" element={<Legal docKey="privasi" />} />
        <Route path="/kebijakan-privasi/:slug" element={<Legal docKey="privasi" />} />
        <Route path="/syarat-ketentuan" element={<Legal docKey="syarat" />} />
        <Route path="/syarat-ketentuan/:slug" element={<Legal docKey="syarat" />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/berita/:slug" element={<DetailBerita />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/bandingkan-paket" element={<BandingkanPaket />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Not Found (404) -> Redirect ke Home */}
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </AppErrorBoundary>
  )
}
