import { Link } from "react-router-dom"
import SectionLabel from "./SectionLabel"
import { Product, SiteSettings } from "../types/cms"

export interface FeaturesProps {
  products?: Product[]
  siteSettings?: SiteSettings | null
}

// Strategic focus: POS F&B is promoted first while the other products stay
// listed (per wireframe note), without any "coming soon"/"launching" copy.
const FOCUS_SLUG_ORDER = ["pos-fnb", "pos-retail", "pos-laundry"]

export default function Features({ products = [], siteSettings }: FeaturesProps) {
  if (!products || products.length === 0) return null

  const title = siteSettings?.produk_title || "Satu Platform untuk Kebutuhan Usaha"
  const desc =
    siteSettings?.produk_desc ||
    "Kami memahami bahwa menjalankan usaha F&B membutuhkan kecepatan, ketelitian, dan alur kerja yang rapi. Spontan Jualan hadir untuk membantu pemilik usaha mengelola pesanan, meja, transaksi, dan operasional dengan lebih sederhana."
  const bannerTitle = siteSettings?.produk_banner_title || "Usaha Anda, Prioritas Kami"
  const bannerDesc =
    siteSettings?.produk_banner_desc ||
    "Spontan Jualan hadir untuk membantu Anda mengelola usaha lebih mudah, aman, dan nyaman setiap hari. Kami siap mendukung keperluan bisnis Anda."

  const colors = ["#0891b2", "#0cad31", "#7c3aed", "#e11d48", "#2563eb"]
  const iconMap: Record<string, string> = {
    Zap: "⚡",
    CreditCard: "💳",
    Package: "📦",
    BarChart3: "📊",
    Users: "👥",
    Store: "🛒",
    Utensils: "🍽️",
    Shirt: "👕",
  }

  const sortedProducts = [...products].sort((a, b) => {
    const ai = FOCUS_SLUG_ORDER.indexOf(a.slug)
    const bi = FOCUS_SLUG_ORDER.indexOf(b.slug)
    return (ai === -1 ? FOCUS_SLUG_ORDER.length : ai) -
      (bi === -1 ? FOCUS_SLUG_ORDER.length : bi)
  })

  const displayList = sortedProducts.map((p, index) => ({
    slug: p.slug,
    name: p.name,
    desc: p.desc || "Solusi digital cerdas untuk efisiensi usaha.",
    emoji: p.emoji || iconMap[p.icon || ""] || "🚀",
    accentColor: p.accent_color || colors[index % colors.length],
  }))

  return (
    <section id="produk" className="bg-white py-20 scroll-mt-20 lg:scroll-mt-22">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-12">
          <div className="lg:max-w-sm">
            <SectionLabel>Produk Kami</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              {title}
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md">
            {desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12">
          {/* Visual side */}
          {/* TODO: ganti dengan gambar produk Spontan Jualan (fokus F&B) */}
          <div
            className="w-full min-h-[320px] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center text-slate-400 text-sm text-center px-6"
            data-placeholder="produk-main-image"
          >
            Gambar Produk Spontan Jualan
          </div>

          {/* Product list */}
          <div className="flex flex-col gap-7">
            {displayList.map((p) => (
              <div key={p.slug} className="flex gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: p.accentColor + "18" }}
                >
                  {p.emoji}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 mb-1">{p.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">
                    {p.desc}
                  </p>
                  <Link
                    to={`/product/${p.slug}`}
                    className="inline-block text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    Detail &amp; Spesifikasi Produk
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight banner */}
        <div className="bg-slate-100 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="font-black text-slate-900 mb-2">{bannerTitle}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {bannerDesc}
            </p>
          </div>
          {/* TODO: ganti dengan gambar inti produk Spontan Jualan */}
          <div
            className="w-full md:w-56 h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-200 flex-shrink-0"
            data-placeholder="produk-core-image"
          />
        </div>
      </div>
    </section>
  )
}
