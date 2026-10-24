import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ContentProdukOne from "../../assets/Content_Produk_One.webp"
import ContentProdukTwo from "../../assets/Content_Produk_Two.webp"
import { pb } from "../../lib/pocketbase"
import { resolveProdukImage1, resolveProdukBannerImage } from "../../lib/media"
import type { SiteSettings, ProdukEkosistemItem } from "../../types/cms"

interface ProdukProps {
  siteSettings?: SiteSettings | null
}

export default function Produk({ siteSettings: propSettings }: ProdukProps) {
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

  // Top Title & Subtitle
  const kicker = siteSettings?.produk_kicker || "Produk Kami"
  const title = siteSettings?.produk_title || "Satu Platform,\nUntuk Kebutuhan Usaha"
  const desc = siteSettings?.produk_desc || "Kami siap tumbuh bersama bisnis Anda. Temukan berbagai kebutuhan operasional dan pengelolaan usaha di dalam satu ekosistem Spontan Jualan yang terintegrasi secara utuh."

  // Main Product (POS F&B)
  const image1 = resolveProdukImage1(siteSettings, ContentProdukOne)
  const fnbTitle = siteSettings?.produk_fnb_title || "POS F&B"
  const fnbDesc = siteSettings?.produk_fnb_desc || "Kasir dan operasional untuk restoran, coffee shop, kedai, dan bisnis kuliner."
  const fnbBtnLabel = siteSettings?.produk_fnb_btn_label || "Detail & Spesifikasi Produk"
  const fnbBtnLink = siteSettings?.produk_fnb_btn_link || "/produk-baru/pos-fnb"

  // Ekosistem Produk Lainnya (Tahap Pengembangan)
  const isComingSoonVal = siteSettings?.show_produk_coming_soon
  const showComingSoon = Boolean(
    isComingSoonVal === true ||
    isComingSoonVal === "true" ||
    isComingSoonVal === 1 ||
    isComingSoonVal === "1"
  )
  const comingSoonTitle = siteSettings?.produk_coming_soon_title || "Ekosistem Produk Spontan Jualan"

  let rawEkosistemItems: ProdukEkosistemItem[] = [
    {
      icon: "fa-shirt",
      title: "Laundry",
      desc: "Kelola transaksi kasir, operasional cuci-setrika, dan pelacakan status pesanan pelanggan dengan lebih praktis dan otomatis.",
      badge: "Tahap Pengembangan",
      link: "/produk-baru/laundry",
      show: true,
    },
    {
      icon: "fa-store",
      title: "Retail",
      desc: "Bantu minimarket, toko kelontong, dan bisnis retail mengelola kasir, stok inventaris barcode, dan riwayat penjualan akurat.",
      badge: "Tahap Pengembangan",
      link: "/produk-baru/retail",
      show: true,
    },
    {
      icon: "fa-mobile-screen-button",
      title: "Produk Digital",
      desc: "Berbagai solusi transaksi digital, pulsa, token listrik, dan tagihan PPOB terpadu untuk melengkapi potensi omzet bisnis Anda.",
      badge: "Tahap Pengembangan",
      link: "/produk-baru/produk-digital",
      show: true,
    },
  ]

  if (siteSettings?.produk_coming_soon_items) {
    if (Array.isArray(siteSettings.produk_coming_soon_items)) {
      rawEkosistemItems = siteSettings.produk_coming_soon_items
    } else if (typeof siteSettings.produk_coming_soon_items === "string") {
      try {
        const parsed = JSON.parse(siteSettings.produk_coming_soon_items)
        if (Array.isArray(parsed) && parsed.length > 0) rawEkosistemItems = parsed
      } catch (e) {}
    }
  }

  // Filter hanya produk yang aktif / tampil (show !== false), serta lengkapi link dan badge
  const visibleEkosistemItems = rawEkosistemItems
    .filter((item) => item.show !== false && item.show !== "false" && item.show !== 0 && item.show !== "0")
    .map((item) => {
      const defaultLink = item.title?.toLowerCase().includes("laundry") ? "/produk-baru/laundry" :
        item.title?.toLowerCase().includes("retail") ? "/produk-baru/retail" :
        item.title?.toLowerCase().includes("digital") ? "/produk-baru/produk-digital" :
        "/produk-baru/pos-fnb"
      return {
        ...item,
        link: item.link || defaultLink,
        badge: item.badge === "Coming Soon" ? "Tahap Pengembangan" : (item.badge || "Tahap Pengembangan"),
      }
    })

  // Bottom Banner
  const bannerTitle = siteSettings?.produk_banner_title || "Ekosistem Lengkap Bisnis Anda"
  const bannerDesc = siteSettings?.produk_banner_desc || "Bertransformasi dan melangkah lebih jauh bersama Spontan Jualan. Sebuah ekosistem terintegrasi yang dirancang untuk merangkul dan mendukung seluruh kebutuhan operasional bisnis Anda."
  const bannerImage = resolveProdukBannerImage(siteSettings, ContentProdukTwo)

  return (
    <section id="produk" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">

        {/* Judul Bagian */}
        <div className="text-center mb-[50px]">
          <h4 className="text-[16px] font-bold text-[#0CAD31] mb-2">{kicker}</h4>
          <h2 className="text-[40px] font-bold text-black leading-tight whitespace-pre-line">
            {title}
          </h2>
        </div>

        {/* Produk Pertama (POS F&B) */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-[100px] items-start mb-[50px]">
          {/* Kiri: Gambar Produk */}
          <div className="w-full max-w-[585px] shrink-0 flex justify-center lg:justify-start">
            <div className="w-full h-[300px] md:h-[450px] lg:h-[613px] rounded-[30px] overflow-hidden shadow-[0_4px_50px_rgba(0,0,0,0.25)] bg-slate-100">
              <img src={image1} alt={title.replace(/\n/g, " ")} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Kanan: Penjelasan Produk */}
          <div className="flex flex-col items-start text-left w-full">
            <p className="text-[16px] font-normal text-black mb-12 max-w-[480px] leading-relaxed whitespace-pre-line">
              {desc}
            </p>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center text-[#0CAD31]">
                    <i className="fa-solid fa-burger text-2xl"></i>
                  </div>
                  <h3 className="text-[32px] font-bold text-black">{fnbTitle}</h3>
                </div>
                <p className="text-[16px] font-normal text-gray-800 max-w-[400px] mb-4 whitespace-pre-line">
                  {fnbDesc}
                </p>

                <Link 
                  to={fnbBtnLink}
                  className="bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold rounded-[100px] w-[202px] h-[28px] flex items-center justify-center text-[12px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer"
                >
                  {fnbBtnLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ekosistem Produk Lainnya - Tampil Sesuai Pengaturan CMS */}
        {showComingSoon && visibleEkosistemItems.length > 0 && (
          <div className="w-full max-w-[1247px] mx-auto mb-[70px]">
            {/* Judul Bagian - Teks Hijau 'Ekosistem Terintegrasi' Selaras dengan Judul Bagian Lainnya */}
            <div className="text-center mb-[50px]">
              <h4 className="text-[16px] font-bold text-[#0CAD31] mb-2">
                Ekosistem Terintegrasi
              </h4>
              <h2 className="text-[40px] font-bold text-black leading-tight whitespace-pre-line">
                {comingSoonTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visibleEkosistemItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.05)] flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#E7F7E9] flex items-center justify-center text-[#0CAD31] text-[22px] shrink-0">
                        <i className={`fa-solid ${item.icon || 'fa-box'}`}></i>
                      </div>

                      {item.badge && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#E7F7E9] text-[#012708]">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Judul Produk */}
                    <h3 className="text-[22px] font-bold text-black mb-3">
                      {item.title}
                    </h3>

                    {/* Deskripsi */}
                    <p className="text-[15px] font-normal text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Tombol Lihat Detail Produk - Hanya tombol ini yang di-hover dan diklik */}
                  <div className="pt-5 border-t border-gray-100 mt-auto">
                    <Link 
                      to={item.link || "#"}
                      className="bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold rounded-[100px] w-full max-w-[202px] h-[34px] flex items-center justify-center text-[12px] transition-all duration-300 shadow-md shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer"
                    >
                      <span>Lihat Detail Produk</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Card CTA Bawah */}
        <div className="w-full max-w-[1247px] mx-auto bg-[#012708] rounded-[20px] min-h-[262px] flex flex-col md:flex-row items-center justify-between p-8 md:px-[60px] gap-8">

          {/* Teks Card */}
          <div className="flex-1 text-white">
            <h3 className="text-[20px] font-bold mb-4">
              {bannerTitle}
            </h3>
            <p className="text-[16px] font-normal leading-relaxed text-gray-200 max-w-[500px] whitespace-pre-line">
              {bannerDesc}
            </p>
          </div>

          {/* Gambar Card */}
          <div className="w-full md:w-[342px] h-[162px] rounded-[10px] overflow-hidden shrink-0 bg-emerald-950">
            <img src={bannerImage} alt={bannerTitle} className="w-full h-full object-cover" />
          </div>

        </div>

      </div>
    </section>
  )
}
