import { useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { pb } from "../lib/pocketbase"
import { htmlToText } from "../lib/sanitize"
import type { LegalPage, SiteSettings } from "../types/cms"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import LegalHero from "../components/legal/LegalHero"
import LegalBody from "../components/legal/LegalBody"
import { LEGAL_DOCS, fallbackLegal } from "../components/legal/fallbackLegal"
import { pageTitle, useSEO } from "../hooks/useSEO"

interface LegalProps {
  /** Dokumen yang ditampilkan: Kebijakan Privasi atau Syarat & Ketentuan */
  docKey: keyof typeof LEGAL_DOCS
}

export default function Legal({ docKey }: LegalProps) {
  const doc = LEGAL_DOCS[docKey]
  const { slug } = useParams<{ slug?: string }>()
  const [pages, setPages] = useState<LegalPage[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loaded, setLoaded] = useState(false)

  // Security: sanitize slug (hanya dipakai untuk mencocokkan, bukan filter query)
  const safeSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "").substring(0, 100)

  // Semua item aktif diambil sekali; berpindah item cukup ganti slug di URL.
  useEffect(() => {
    let active = true
    async function load() {
      const [list, settings] = await Promise.all([
        pb
          .collection("legal_pages")
          .getFullList({ filter: "active = true", sort: "sort_order,created" })
          .catch(() => []),
        pb
          .collection("site_settings")
          .getFirstListItem("", { sort: "-updated", requestKey: null })
          .catch(() => null),
      ])
      if (!active) return
      setPages(list as unknown as LegalPage[])
      setSiteSettings(settings as unknown as SiteSettings | null)
      setLoaded(true)
    }
    load()
    return () => {
      active = false
    }
  }, [])

  // Hanya item milik dokumen ini. Selama memuat, jangan tampilkan teks cadangan
  // agar tidak berkedip ke isi asli.
  const mine = pages.filter((p) => p.doc_group === doc.group)
  const list = !loaded
    ? []
    : mine.length > 0
      ? mine
      : fallbackLegal.filter((p) => p.doc_group === doc.group)
  // Tanpa slug = item pertama (itulah yang dibuka oleh link footer).
  const current = safeSlug ? list.find((p) => p.slug === safeSlug) : list[0]

  // Konten berganti di halaman yang sama: bawa pengguna ke atas.
  const currentSlug = current?.slug
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentSlug])

  useSEO({
    title: pageTitle(current ? `${doc.group} - ${current.name}` : doc.group),
    description: doc.description,
  })

  // Slug di URL tidak dikenal → kembali ke halaman utama dokumen ini.
  if (loaded && safeSlug && !current) {
    return <Navigate to={doc.path} replace />
  }

  return (
    <div className="min-h-screen bg-[#F5FFF6] font-sans antialiased text-slate-800">
      <Navbar />
      <main className="flex-grow">
        <LegalHero doc={doc} effectiveDate={htmlToText(current?.effective_date)} />
        <LegalBody doc={doc} pages={list} active={current} />
      </main>
      <Footer siteSettings={siteSettings} />
    </div>
  )
}
