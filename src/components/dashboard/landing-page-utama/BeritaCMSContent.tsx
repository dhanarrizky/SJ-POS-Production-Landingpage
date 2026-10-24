import React, { useState, useEffect } from "react"
import { pb } from "../../../lib/pocketbase"
import type { SiteSettings, BlogPost } from "../../../types/cms"

interface BeritaCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export default function BeritaCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: BeritaCMSContentProps) {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const titleValue = settings.blog_title ?? "Insight & Tren Bisnis Terkini"
  const descValue =
    settings.blog_desc ??
    "Temukan berbagai informasi, strategi, dan tren terbaru seputar AI, manajemen, bisnis, keuangan, dan teknologi untuk membantu bisnis Anda berkembang."

  const isHidden = Boolean(settings.nav_blog_hide ?? settings.blog_hide)

  const toggleVisibility = (hide: boolean) => {
    setSettings((prev) =>
      prev
        ? {
            ...prev,
            nav_blog_hide: hide,
            blog_hide: hide,
          }
        : null
    )
  }

  useEffect(() => {
    pb.collection("blog_posts")
      .getList(1, 5, {
        sort: "-created",
        filter: "active = true",
        requestKey: null,
      })
      .then((res) => {
        setLatestPosts(res.items as unknown as BlogPost[])
      })
      .catch((err) => {
        console.warn("Gagal memuat berita terbaru:", err)
      })
      .finally(() => {
        setLoadingPosts(false)
      })
  }, [])

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Berita</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola status tampilan serta teks judul dan deskripsi bagian berita di landing page utama dan halaman tentang kami.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* PENGATURAN STATUS TAMPILAN / SEMBUNYIKAN BERITA */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Status Tampilan Bagian Berita
                </h3>
                {isHidden ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                    Disembunyikan (Development)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    Aktif / Ditampilkan
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Fitur ini dapat disembunyikan selama masa pengembangan akhir. Jika disembunyikan, bagian berita di Landing Page Utama, Halaman Tentang Kami, serta menu Blog di Navigasi akan otomatis disembunyikan.
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={!isHidden}
                  onChange={(e) => toggleVisibility(!e.target.checked)}
                />
                <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                <span className="ml-3 text-sm font-semibold text-white">
                  {!isHidden ? "Tampilkan" : "Sembunyikan"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* FORM PENGATURAN TEKS UTAMA */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Teks Bagian Berita
          </h3>

          {/* Judul Bagian */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Judul Bagian Berita
            </label>
            <input
              type="text"
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
              value={titleValue}
              onChange={(e) => handleChange("blog_title", e.target.value)}
              placeholder="Contoh: Insight & Tren Bisnis Terkini"
            />
          </div>

          {/* Deskripsi Bagian */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Deskripsi Bagian Berita
            </label>
            <textarea
              rows={3}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium leading-relaxed"
              value={descValue}
              onChange={(e) => handleChange("blog_desc", e.target.value)}
              placeholder="Tuliskan deskripsi ringkas seputar artikel..."
            />
          </div>
        </div>

        {/* INFORMASI ARTIKEL BERITA TERBARU */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Artikel Berita Terbaru yang Ditampilkan
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Artikel secara otomatis diambil dari berita terbaru yang berstatus aktif.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              {latestPosts.length} Artikel Aktif
            </span>
          </div>

          {loadingPosts ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              Memuat artikel terbaru...
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm bg-slate-900/40 rounded-xl border border-white/5">
              Belum ada artikel di database. Tampilan akan menggunakan artikel bawaan.
            </div>
          ) : (
            <div className="space-y-2.5">
              {latestPosts.map((post, idx) => (
                <div
                  key={post.id ?? idx}
                  className="bg-slate-900/80 border border-white/10 rounded-xl p-3.5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span className="px-2 py-0.5 bg-white/5 rounded text-[11px] font-medium text-slate-300">
                          {post.category || "Umum"}
                        </span>
                        <span>•</span>
                        <span>{post.published_date || "Terbaru"}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 rounded-lg shrink-0">
                    Aktif
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SATU TOMBOL SIMPAN DI BAWAH */}
        {onSave && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer text-base"
            >
              {isSaving ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
