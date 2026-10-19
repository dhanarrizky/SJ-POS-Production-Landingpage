import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Clock, HelpCircle } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { pb } from "../lib/pocketbase"
import { useSEO } from "../hooks/useSEO"
import { parseMarkdown } from "../lib/markdown"
import type { BlogPost, SiteSettings } from "../types/cms"

const navLinks = [
  { label: "Tentang Kami", href: "/#tentang" },
  { label: "Produk", href: "/#produk" },
  { label: "Cara Mulai", href: "/#cara-mulai" },
  { label: "Harga", href: "/#harga" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
]

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    async function loadPost() {
      const safeSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "").substring(0, 150)
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
        const [postRecord, settingsRecord] = await Promise.all([
          pb.collection("blog_posts").getFirstListItem(`slug="${safeSlug}"`),
          pb
            .collection("site_settings")
            .getFirstListItem("")
            .catch(() => null),
        ])
        if (active) {
          setPost(postRecord as unknown as BlogPost)
          if (settingsRecord) setSiteSettings(settingsRecord as unknown as SiteSettings)
        }
      } catch (err: any) {
        if (err?.isAbort) return
        if (active) {
          console.error("Failed to load blog post", err)
          setError(true)
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    loadPost()

    return () => {
      active = false
    }
  }, [slug])

  useSEO({
    title: post ? `${post.title} | SpontanJualan Blog` : "Artikel | SpontanJualan",
    description: post?.excerpt || "Insight dan tren bisnis terkini dari SpontanJualan.",
  })

  const displaySiteName = siteSettings?.site_name || "SpontanJualan"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1628] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
          <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
            Memuat artikel...
          </p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Header navLinks={navLinks} siteName={displaySiteName} />
        <main className="max-w-3xl mx-auto px-6 py-24 text-center flex-grow flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 mb-6">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-slate-500 mb-8 max-w-md leading-relaxed">
            Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Blog
          </Link>
        </main>
        <Footer siteSettings={siteSettings} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 flex flex-col justify-between">
      <Header navLinks={navLinks} siteName={displaySiteName} siteSettings={siteSettings} />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-500 text-sm font-medium hover:text-brand transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Blog
            </Link>
          </div>

          {/* TODO: ganti dengan gambar artikel sesuai konten */}
          <div
            className="w-full h-64 rounded-2xl bg-slate-200 mb-8"
            data-placeholder="blog-cover-image"
          />

          {post.category && (
            <span className="inline-block text-xs font-semibold text-slate-600 bg-slate-100 rounded-full px-3 py-1 mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-3">
            {post.title}
          </h1>
          {post.published_date && (
            <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-8">
              <Clock size={14} /> {post.published_date}
            </div>
          )}

          <div className="prose max-w-none">{parseMarkdown(post.content)}</div>
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
