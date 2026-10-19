import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { pb } from "../../lib/pocketbase"
import type {
  PricingPlan,
  ProductHighlight,
  SiteSettings,
  VideoItem,
} from "../../types/cms"
import Navbar from "../../components/layout/Navbar"
import Footer from "../../components/Footer"
import PaketHarga from "../../components/landing-page-utama/PaketHarga"
import ProductHero from "../../components/detail-produk/ProductHero"
import FeatureHighlights from "../../components/detail-produk/FeatureHighlights"
import KitchenModernization from "../../components/detail-produk/KitchenModernization"
import MarginTransparency from "../../components/detail-produk/MarginTransparency"
import ProductVideoShowcase from "../../components/detail-produk/ProductVideoShowcase"
import { pageTitle, useSEO } from "../../hooks/useSEO"

const navLinks = [
  { label: "Tentang Kami", href: "/#tentang" },
  { label: "Produk", href: "/#produk" },
  { label: "Cara Mulai", href: "/#cara-mulai" },
  { label: "Harga", href: "#harga" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
]

export default function DetailProduk() {
  const { slug } = useParams<{ slug: string }>()
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [video, setVideo] = useState<VideoItem | null>(null)
  const [highlights, setHighlights] = useState<ProductHighlight[]>([])

  useSEO({
    title: pageTitle("POS F&B — Detail & Spesifikasi Produk"),
    description:
      "Operasional restoran & kafe jadi lebih cepat, akurat, dan rapi dengan POS F&B dari Spontan Jualan.",
  })

  useEffect(() => {
    let active = true

    // Security: sanitize slug to prevent filter injection
    const safeSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "").substring(0, 100)

    async function load() {
      const [plans, settings, videoRecord, highlightList] = await Promise.all([
        pb
          .collection("pricing_plans")
          .getFullList({ filter: "active = true", sort: "created" })
          .catch(() => []),
        pb
          .collection("site_settings")
          .getFirstListItem("")
          .catch(() => null),
        safeSlug
          ? pb
              .collection("videos")
              .getFirstListItem(
                `placement="produk:${safeSlug}" && active = true`,
              )
              .catch(() => null)
          : Promise.resolve(null),
        pb
          .collection("product_highlights")
          .getFullList({ filter: "active = true", sort: "sort_order,created" })
          .catch(() => []),
      ])
      if (!active) return
      setHighlights(highlightList as unknown as ProductHighlight[])
      setPricingPlans(plans as unknown as PricingPlan[])
      setSiteSettings(settings as unknown as SiteSettings | null)
      setVideo(videoRecord as unknown as VideoItem | null)
    }
    load()

    return () => {
      active = false
    }
  }, [slug])

  return (
    <div className="min-h-screen bg-[#F5FFF6] font-sans antialiased text-slate-800">
      <Navbar />
      <main className="flex-grow">
        <ProductHero />
        <FeatureHighlights highlights={highlights} />
        <KitchenModernization />
        <MarginTransparency />
        <ProductVideoShowcase video={video} />
        <PaketHarga />
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
