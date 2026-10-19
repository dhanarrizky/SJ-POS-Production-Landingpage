import { useEffect, useState, CSSProperties } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  HelpCircle,
  Globe,
  Smartphone,
} from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductSpecs from "../components/ProductSpecs"
import { pb } from "../lib/pocketbase"
import { useSEO } from "../hooks/useSEO"
import { parseMarkdown } from "../lib/markdown"
import type { Product, SiteSettings } from "../types/cms"

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadProduct() {
      // Security: Sanitize user input (slug) to prevent filter injection
      const safeSlug = (slug || "")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .substring(0, 100)
      if (!safeSlug) {
        if (active) {
          setError(true)
          setLoading(false)
        }
        return
      }

      try {
        if (active) {
          setLoading(true)
          setError(false)
        }
        const [prodRecord, settingsRecord] = await Promise.all([
          pb.collection("products").getFirstListItem(`slug="${safeSlug}"`),
          pb
            .collection("site_settings")
            .getFirstListItem("")
            .catch(() => null),
        ])

        if (active) {
          setProduct(prodRecord as unknown as Product)
          if (settingsRecord) {
            setSiteSettings(settingsRecord as unknown as SiteSettings)
          }
        }
      } catch (err: any) {
        if (err?.isAbort) return
        if (active) {
          console.error("Failed to load product detail", err)
          setError(true)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    loadProduct()

    return () => {
      active = false
    }
  }, [slug])

  // Hook for SEO meta tags
  useSEO({
    title: product
      ? `${product.seo_title || product.name} | SpontanJualan`
      : "Detail Produk | SpontanJualan",
    description:
      product?.seo_description ||
      product?.desc ||
      "Detail spesifikasi product digital dari SpontanJualan.",
  })

  const navLinks = [
    { label: "Tentang Kami", href: "/#tentang" },
    { label: "Produk", href: "/#produk" },
    { label: "Cara Mulai", href: "/#cara-mulai" },
    { label: "Harga", href: "/#harga" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
  ]

  const displaySiteName = siteSettings?.site_name || "SpontanJualan"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1628] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
          <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
            Memuat detail produk...
          </p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header navLinks={navLinks} siteName={displaySiteName} />
        <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 text-center flex-grow flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-6">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-4">
            Produk Tidak Ditemukan
          </h1>
          <p className="text-slate-500 mb-8 max-w-md leading-relaxed">
            Maaf, produk digital yang Anda cari tidak tersedia atau telah
            dihapus oleh administrator.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/10"
          >
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
        </main>
        <Footer siteSettings={siteSettings} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col justify-between">
      <Header navLinks={navLinks} siteName={displaySiteName} />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb / Back button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 text-sm font-medium transition-colors hover:text-[var(--accent-color)]"
              style={
                {
                  "--accent-color": product.accent_color || "#10b981",
                } as CSSProperties
              }
            >
              <ArrowLeft size={16} /> Kembali ke Beranda
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left Content (Markdown Description) */}
            <div className="lg:col-span-2 order-1 lg:order-1 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm shadow-slate-100/50">
              {/* Product Header Info */}
              <div className="border-b border-slate-100 pb-8 mb-8">
                <div
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase mb-4 border border-slate-200 text-slate-600 bg-slate-50`}
                >
                  {product.badge || "Produk Digital"}
                </div>
                <h1 className="text-3xl sm:text-4.5xl font-black text-slate-900 leading-tight tracking-tight mb-4">
                  {product.name}
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed">
                  {product.desc}
                </p>
              </div>

              {/* Render dynamic markdown */}
              <div className="prose max-w-none">
                {parseMarkdown(product.detail_desc)}
              </div>
            </div>

            {/* Full Width Gorgeous Specs Section (order 2 on mobile, order 3 on desktop) */}
            <ProductSpecs
              productName={product.name}
              accentColor={product.accent_color}
              specs={product.specs}
            />

            {/* Right Sidebar (Quick CTA - order 3 on mobile, order 2 on desktop) */}
            <div className="lg:col-span-1 order-3 lg:order-2 w-full">
              {/* CTA Panel */}
              <div className="bg-[#0a1628] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-950/20">
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

                <h3 className="text-xl font-extrabold relative z-10 mb-2">
                  Mulai Gunakan Aplikasi
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10 mb-6">
                  Pilih platform untuk mulai menggunakan {product.name} secara
                  gratis.
                </p>

                <div className="flex flex-col gap-3 relative z-10">
                  <a
                    href={
                      product.login_url ||
                      import.meta.env.VITE_DEFAULT_LOGIN_URL ||
                      "/login"
                    }
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl text-sm font-semibold text-white transition-all active:scale-[0.98] select-none cursor-pointer hover:brightness-110"
                    style={{
                      backgroundColor: product.accent_color || "#10b981",
                      boxShadow: `0 4px 12px ${product.accent_color || "#10b981"}20`,
                    }}
                  >
                    <Globe size={18} /> Gunakan Versi Web
                  </a>

                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-2xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700/50 transition-all active:scale-[0.98] select-none cursor-pointer"
                  >
                    <Smartphone size={18} /> Unduh Play Store
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800/50 text-center relative z-10">
                  <a
                    href={siteSettings?.cta_whatsapp_url || "https://wa.me/#"}
                    className="text-xs text-slate-400 transition-colors hover:underline hover:text-[var(--hover-color)]"
                    style={
                      {
                        "--hover-color": product.accent_color || "#10b981",
                      } as CSSProperties
                    }
                  >
                    Butuh bantuan? Hubungi Sales Kami
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
