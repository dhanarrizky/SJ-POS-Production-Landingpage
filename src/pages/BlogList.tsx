import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Clock } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { pb } from "../lib/pocketbase"
import { useSEO } from "../hooks/useSEO"
import type { BlogPost, SiteSettings } from "../types/cms"

const navLinks = [
  { label: "Tentang Kami", href: "/#tentang" },
  { label: "Produk", href: "/#produk" },
  { label: "Cara Mulai", href: "/#cara-mulai" },
  { label: "Harga", href: "/#harga" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/blog" },
]

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadPosts() {
      try {
        const [postsList, settingsRecord] = await Promise.all([
          pb
            .collection("blog_posts")
            .getFullList({ filter: "active = true", sort: "-created" }),
          pb
            .collection("site_settings")
            .getFirstListItem("")
            .catch(() => null),
        ])
        if (active) {
          setPosts(postsList as unknown as BlogPost[])
          if (settingsRecord) setSiteSettings(settingsRecord as unknown as SiteSettings)
        }
      } catch (err) {
        console.error("Failed to load blog posts", err)
      } finally {
        if (active) setLoading(false)
      }
    }
    loadPosts()

    return () => {
      active = false
    }
  }, [])

  useSEO({
    title: "Blog | SpontanJualan",
    description:
      "Insight dan tren bisnis terkini seputar AI, manajemen, bisnis, keuangan, dan teknologi untuk UMKM.",
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

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 flex flex-col justify-between">
      <Header navLinks={navLinks} siteName={displaySiteName} siteSettings={siteSettings} />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
              Insight &amp; Tren Bisnis Terkini
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
              Temukan berbagai informasi, strategi, dan tren terbaru seputar
              AI, manajemen, bisnis, keuangan, dan teknologi untuk membantu
              bisnis Anda berkembang.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-slate-400">
              Belum ada artikel yang dipublikasikan.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 hover:shadow-card-md transition-all"
                >
                  {/* TODO: ganti dengan gambar artikel sesuai konten */}
                  <div
                    className="h-40 bg-slate-200 flex-shrink-0"
                    data-placeholder="blog-cover-image"
                  />
                  <div className="p-5">
                    {post.category && (
                      <span className="inline-block text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-full px-3 py-1 mb-2">
                        {post.category}
                      </span>
                    )}
                    <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-brand transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    {post.published_date && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock size={12} /> {post.published_date}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  )
}
