import { useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { pb } from "../../lib/pocketbase"
import { htmlToText } from "../../lib/sanitize"
import type { FeaturePage, SiteSettings, VideoItem } from "../../types/cms"
import Navbar from "../../components/layout/Navbar"
import Footer from "../../components/Footer"
import FeatureHero from "../../components/detail-fitur/FeatureHero"
import FeatureDetailBody from "../../components/detail-fitur/FeatureDetailBody"
import { fallbackFeatures } from "../../components/detail-fitur/fallbackFeatures"
import { getFeatureImages } from "../../components/detail-fitur/featureImages"
import { pageTitle, useSEO } from "../../hooks/useSEO"

const navLinks = [
  { label: "Tentang Kami", href: "/#tentang" },
  { label: "Produk", href: "/#produk" },
  { label: "Cara Mulai", href: "/#cara-mulai" },
  { label: "Harga", href: "/#harga" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
]

export default function DetailFitur() {
  const { slug } = useParams<{ slug?: string }>()
  const [features, setFeatures] = useState<FeaturePage[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [video, setVideo] = useState<VideoItem | null>(null)
  const [loaded, setLoaded] = useState(false)

  // Security: sanitize slug to prevent filter injection
  const safeSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "").substring(0, 100)

  // Semua fitur aktif diambil sekali; berpindah fitur cukup ganti slug di URL.
  useEffect(() => {
    let active = true
    async function load() {
      const [list, settings] = await Promise.all([
        pb
          .collection("feature_pages")
          .getFullList({ filter: "active = true", sort: "sort_order,created" })
          .catch(() => []),
        pb
          .collection("site_settings")
          .getFirstListItem("")
          .catch(() => null),
      ])
      if (!active) return
      setFeatures(list as unknown as FeaturePage[])
      setSiteSettings(settings as unknown as SiteSettings | null)
      setLoaded(true)
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const list = features.length > 0 ? features : fallbackFeatures
  const current = safeSlug ? list.find((f) => f.slug === safeSlug) : list[0]

  // Video per fitur (CMS: collection `videos`, placement "fitur:<slug>")
  const currentSlug = current?.slug
  useEffect(() => {
    let active = true
    setVideo(null)
    if (!currentSlug) return
    pb.collection("videos")
      .getFirstListItem(`placement="fitur:${currentSlug}" && active = true`)
      .then((v) => {
        if (active) setVideo(v as unknown as VideoItem)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [currentSlug])

  // Konten berganti di halaman yang sama: bawa pengguna ke atas.
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentSlug])

  const name = current?.name
  useSEO({
    title: pageTitle(name || "Detail Fitur"),
    description:
      htmlToText(current?.description).slice(0, 160) ||
      "Kenali fitur-fitur unggulan Spontan Jualan yang membantu UMKM mengelola usaha lebih mudah dan terorganisir.",
  })

  // Slug di URL tidak dikenal → kembali ke fitur pertama.
  if (loaded && safeSlug && !current) {
    return <Navigate to="/fitur" replace />
  }

  const images = getFeatureImages(current?.slug)

  return (
    <div className="min-h-screen bg-[#F5FFF6] font-sans antialiased text-slate-800">
      <Navbar />
      <main className="flex-grow">
        <FeatureHero
          name={name}
          title={current?.title}
          description={current?.description}
          image={images.hero}
          video={video}
        />
        <FeatureDetailBody
          features={list}
          active={current}
          screenshot={images.screenshot}
        />
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
