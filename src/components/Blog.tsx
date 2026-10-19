import { Link } from "react-router-dom"
import { Clock } from "lucide-react"
import type { BlogPost, SiteSettings } from "../types/cms"

export interface BlogProps {
  posts?: BlogPost[]
  siteSettings?: SiteSettings | null
}

function ArticleCard({
  post,
  tall = false,
}: {
  post: BlogPost
  tall?: boolean
}) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 hover:shadow-card-md transition-all h-full"
    >
      {/* TODO: ganti dengan gambar artikel sesuai konten */}
      <div
        className={`bg-slate-200 flex-shrink-0 ${tall ? "flex-1 min-h-[200px]" : "h-32"}`}
        data-placeholder="blog-cover-image"
      />
      <div className="p-4">
        {post.category && (
          <span className="inline-block text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-full px-3 py-1 mb-2">
            {post.category}
          </span>
        )}
        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-2 group-hover:text-brand transition-colors">
          {post.title}
        </h3>
        {post.published_date && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock size={12} /> {post.published_date}
          </div>
        )}
      </div>
    </Link>
  )
}

export default function Blog({ posts = [], siteSettings }: BlogProps) {
  if (!posts || posts.length === 0) return null

  const displayPosts = posts.slice(0, 5)
  const [p1, p2, p3, p4, p5] = displayPosts

  const title = siteSettings?.blog_title || "Insight & Tren Bisnis Terkini"
  const desc =
    siteSettings?.blog_desc ||
    "Temukan berbagai informasi, strategi, dan tren terbaru seputar AI, manajemen, bisnis, keuangan, dan teknologi untuk membantu bisnis Anda berkembang."

  return (
    <section id="blog" className="bg-white py-20 scroll-mt-20 lg:scroll-mt-22">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
            {title}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 mb-10">
          {p1 && (
            <div className="md:col-start-1 md:row-start-1">
              <ArticleCard post={p1} />
            </div>
          )}
          {p2 && (
            <div className="md:col-start-1 md:row-start-2">
              <ArticleCard post={p2} />
            </div>
          )}
          {p3 && (
            <div className="md:col-start-2 md:row-start-1 md:row-span-2">
              <ArticleCard post={p3} tall />
            </div>
          )}
          {p4 && (
            <div className="md:col-start-3 md:row-start-1">
              <ArticleCard post={p4} />
            </div>
          )}
          {p5 && (
            <div className="md:col-start-3 md:row-start-2">
              <ArticleCard post={p5} />
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-block px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-semibold text-slate-700 transition-colors"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  )
}
