import { useState, useEffect } from "react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Header from "../components/landing-page-utama/Header"
import TentangKami from "../components/landing-page-utama/TentangKami"
import VideoDemo from "../components/landing-page-utama/VideoDemo"
import Produk from "../components/landing-page-utama/Produk"
import PaketHarga from "../components/landing-page-utama/PaketHarga"
import MitraPertama from "../components/landing-page-utama/MitraPertama"
import CaraMulai from "../components/landing-page-utama/CaraMulai"
import FeedbackCustomer from "../components/landing-page-utama/FeedbackCustomer"
import FAQ from "../components/landing-page-utama/FAQ"
import KontakSaran from "../components/landing-page-utama/KontakSaran"
import Blog from "../components/landing-page-utama/Blog"
import { pb } from "../lib/pocketbase"
import type { SiteSettings } from "../types/cms"
import { useSEO, pageTitle } from "../hooks/useSEO"

export default function LandingPageUtama() {
  useSEO({
    title: pageTitle("Kelola Usaha Lebih Mudah"),
    description: "Aplikasi kasir pintar untuk solusi usaha Anda.",
  })

  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)

  const loadSettings = () => {
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => {
        setSiteSettings(record as unknown as SiteSettings)
      })
      .catch((err) => {
        console.error("Gagal memuat site_settings di LandingPageUtama:", err)
      })
  }

  useEffect(() => {
    loadSettings()
    window.addEventListener("focus", loadSettings)
    return () => window.removeEventListener("focus", loadSettings)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Header siteSettings={siteSettings} />
        <TentangKami siteSettings={siteSettings} />
        <VideoDemo siteSettings={siteSettings} />
        <Produk siteSettings={siteSettings} />
        <PaketHarga siteSettings={siteSettings} />
        <MitraPertama siteSettings={siteSettings} />
        <CaraMulai siteSettings={siteSettings} />
        <FeedbackCustomer siteSettings={siteSettings} />
        <FAQ siteSettings={siteSettings} />
        <KontakSaran siteSettings={siteSettings} />
        <Blog siteSettings={siteSettings} />
      </main>
      <Footer />
    </div>
  )
}
