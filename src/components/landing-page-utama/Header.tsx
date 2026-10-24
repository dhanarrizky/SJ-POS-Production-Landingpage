import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import POSMockup from "./POSMockup"
import { pb } from "../../lib/pocketbase"
import type { SiteSettings } from "../../types/cms"

interface HeaderProps {
  siteSettings?: SiteSettings | null
}

export default function Header({ siteSettings: propSettings }: HeaderProps = {}) {
  const [internalSettings, setInternalSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    if (propSettings) return
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => {
        setInternalSettings(record as unknown as SiteSettings)
      })
      .catch(() => {})
  }, [propSettings])

  const siteSettings = propSettings || internalSettings

  const title = siteSettings?.hero_title || "Bantu Bisnis Anda Tumbuh Lebih Mudah"
  const subtitle = siteSettings?.hero_subtitle || "Spontan Jualan menyediakan berbagai solusi digital untuk membantu bisnis menjalankan operasional, mengelola transaksi, dan berkembang mengikuti kebutuhan zaman."

  let benefits = ["Tanpa Kartu Kredit", "Tanpa komitmen pembayaran di awal"]
  if (siteSettings?.hero_benefits) {
    if (Array.isArray(siteSettings.hero_benefits)) {
      benefits = siteSettings.hero_benefits
    } else if (typeof siteSettings.hero_benefits === "string") {
      try {
        const parsed = JSON.parse(siteSettings.hero_benefits)
        if (Array.isArray(parsed) && parsed.length > 0) benefits = parsed
      } catch (e) {}
    }
  }

  return (
    <section className="w-full bg-[#F5FFF6] py-16 md:py-24 font-sans border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Kiri: Teks & Tombol */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 relative">
            <h1 className="text-[40px] font-bold leading-[1.15] text-black mb-6 whitespace-pre-line">
              {title}
            </h1>
            <p className="text-[16px] font-normal text-gray-800 mb-8 max-w-[480px] leading-relaxed whitespace-pre-line">
              {subtitle}
            </p>
            <Link to="/bandingkan-paket" className="bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 flex items-center gap-3 text-[16px] mb-8 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer">
              <i className="fa-solid fa-bolt text-xl"></i>
              Mulai Sekarang
            </Link>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start mx-auto lg:mx-0 gap-4 sm:gap-8 text-[12px] font-normal text-gray-700">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <i className="fa-solid fa-circle-check text-[#0CAD31] text-lg"></i>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Kanan: POS Mockup Interaktif */}
          <div className="hidden lg:block w-full">
            <POSMockup />
          </div>

        </div>
      </div>
    </section>
  )
}
