import React, { useState, useEffect, useRef } from "react"
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  FileText,
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  Image as ImageIcon,
  Check,
} from "lucide-react"
import { pb } from "../../../lib/pocketbase"
import { mediaUrl, pbFileUrl } from "../../../lib/media"
import type { BlogPost } from "../../../types/cms"
import RichTextEditor from "../RichTextEditor"

const DEFAULT_CATEGORIES = ["Bisnis", "Teknologi", "Keuangan", "Manajemen", "AI"]

export default function BeritaCMS() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  // View mode: 'list' for article table/cards, 'form' for creating or editing (replaces popup modal)
  const [viewMode, setViewMode] = useState<"list" | "form">("list")
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [savingPost, setSavingPost] = useState(false)

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedStatus, setSelectedStatus] = useState<"semua" | "aktif" | "draft">("semua")

  // Pending file upload state
  const [pendingFileName, setPendingFileName] = useState("")
  const [pendingFileSize, setPendingFileSize] = useState("")

  // Form state
  const [formData, setFormData] = useState<{
    title: string
    slug: string
    category: string
    published_date: string
    excerpt: string
    content: string
    cover_image: string
    cover_image_path: string
    author_name: string
    author_role: string
    author_quote: string
    active: boolean
  }>({
    title: "",
    slug: "",
    category: "Bisnis",
    published_date: "",
    excerpt: "",
    content: "",
    cover_image: "",
    cover_image_path: "",
    author_name: "Admin",
    author_role: "Spontan Jualan Team",
    author_quote: "Spontan Jualan berkomitmen memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia.",
    active: true,
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Auto-generate Indonesian date: e.g. "16 Oktober 2026"
  const getTodayIndonesianDate = () => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ]
    const now = new Date()
    return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
  }

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  // Load all posts from PocketBase
  const loadPosts = async () => {
    setLoadingPosts(true)
    try {
      const records = await pb.collection("blog_posts").getFullList({
        sort: "-created",
        requestKey: null,
      })
      setPosts(records as unknown as BlogPost[])
    } catch (err) {
      console.error("Gagal memuat blog_posts:", err)
    } finally {
      setLoadingPosts(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  // Switch to Form Mode for Create
  const handleStartCreate = () => {
    setEditingPost(null)
    setPendingFileName("")
    setPendingFileSize("")
    setFormData({
      title: "",
      slug: "",
      category: "Bisnis",
      published_date: getTodayIndonesianDate(),
      excerpt: "",
      content: "",
      cover_image: "",
      cover_image_path: "",
      author_name: "Admin",
      author_role: "Spontan Jualan Team",
      author_quote: "Spontan Jualan berkomitmen memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia.",
      active: true,
    })
    setViewMode("form")
  }

  // Switch to Form Mode for Edit
  const handleStartEdit = (post: BlogPost) => {
    setEditingPost(post)
    setPendingFileName("")
    setPendingFileSize("")
    setFormData({
      title: post.title || "",
      slug: post.slug || "",
      category: post.category || "Bisnis",
      published_date: post.published_date || getTodayIndonesianDate(),
      excerpt: post.excerpt || "",
      content: post.content || "",
      cover_image: post.cover_image || "",
      cover_image_path: post.cover_image_path || "",
      author_name: "Admin",
      author_role: "Spontan Jualan Team",
      author_quote:
        post.author_quote ||
        "Spontan Jualan berkomitmen memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia.",
      active: post.active !== false,
    })
    setViewMode("form")
  }

  // Cover image upload with automatic canvas compression
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPendingFileName(file.name)
    setPendingFileSize(`${Math.round(file.size / 1024)} KB`)

    const reader = new FileReader()
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string
      if (!rawDataUrl) return

      const img = new Image()
      img.onload = () => {
        const maxDim = 1200
        let w = img.width
        let h = img.height
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w)
            w = maxDim
          } else {
            w = Math.round((w * maxDim) / h)
            h = maxDim
          }
        }
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h)
          const compressed = canvas.toDataURL("image/webp", 0.85)
          setFormData((prev) => ({ ...prev, cover_image: compressed }))
        } else {
          setFormData((prev) => ({ ...prev, cover_image: rawDataUrl }))
        }
      }
      img.src = rawDataUrl
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveCover = () => {
    setFormData((prev) => ({ ...prev, cover_image: "", cover_image_path: "" }))
    setPendingFileName("")
    setPendingFileSize("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Save Post (Create or Update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert("Judul berita tidak boleh kosong.")
      return
    }

    const autoSlug = generateSlug(formData.title) || `berita-${Date.now()}`
    const finalSlug = (editingPost?.slug ? editingPost.slug : "") || formData.slug.trim() || autoSlug

    // Set publish date automatically to today if creating, or keep existing date if editing
    const finalDate = editingPost?.published_date || getTodayIndonesianDate()

    setSavingPost(true)
    try {
      const payload = {
        title: formData.title.trim(),
        slug: finalSlug,
        category: formData.category.trim() || "Umum",
        published_date: finalDate,
        excerpt: formData.excerpt.trim(),
        content: formData.content,
        cover_image: formData.cover_image,
        cover_image_path: formData.cover_image_path.trim(),
        author_name: "Admin",
        author_role: "Spontan Jualan Team",
        author_quote: formData.author_quote.trim(),
        active: formData.active,
      }

      if (editingPost) {
        // Update existing post
        const updated = await pb.collection("blog_posts").update(editingPost.id, payload, {
          requestKey: null,
        })
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? (updated as unknown as BlogPost) : p))
        )
        alert("Berita berhasil diperbarui!")
      } else {
        // Create new post
        const created = await pb.collection("blog_posts").create(payload, {
          requestKey: null,
        })
        setPosts((prev) => [created as unknown as BlogPost, ...prev])
        alert("Berita baru berhasil diterbitkan!")
      }

      // Return back to list view
      setViewMode("list")
      setEditingPost(null)
    } catch (err: any) {
      console.error("Gagal menyimpan berita:", err)
      alert("Terjadi kesalahan saat menyimpan berita: " + (err?.message || "Silakan coba lagi."))
    } finally {
      setSavingPost(false)
    }
  }

  // Toggle active status directly from list
  const handleToggleActive = async (post: BlogPost) => {
    const newStatus = post.active === false ? true : false
    try {
      const updated = await pb.collection("blog_posts").update(
        post.id,
        { active: newStatus },
        { requestKey: null }
      )
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? (updated as unknown as BlogPost) : p))
      )
    } catch (err) {
      console.error("Gagal mengubah status aktif:", err)
      alert("Gagal mengubah status artikel.")
    }
  }

  // Delete Post
  const handleDeletePost = async (post: BlogPost) => {
    if (!window.confirm(`Yakin ingin menghapus berita "${post.title}" secara permanen?`)) {
      return
    }

    try {
      await pb.collection("blog_posts").delete(post.id, { requestKey: null })
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
      alert("Berita berhasil dihapus.")
    } catch (err) {
      console.error("Gagal menghapus berita:", err)
      alert("Gagal menghapus berita.")
    }
  }

  // Resolve cover image helper
  const resolveCover = (post?: BlogPost) => {
    if (!post)
      return "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop"
    if (post.cover_image) {
      if (post.cover_image.startsWith("http") || post.cover_image.startsWith("data:")) {
        return post.cover_image
      }
      return (
        pbFileUrl(post, post.cover_image) ||
        `http://127.0.0.1:8090/api/files/blog_posts/${post.id}/${post.cover_image}`
      )
    }
    if (post.cover_image_path) return mediaUrl(post.cover_image_path)
    return "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop"
  }

  // Display cover in edit form
  const pbCoverUrl =
    typeof formData.cover_image === "string" &&
    formData.cover_image &&
    !formData.cover_image.startsWith("http") &&
    !formData.cover_image.startsWith("data:")
      ? pbFileUrl(editingPost || {}, formData.cover_image) ||
        `http://127.0.0.1:8090/api/files/blog_posts/${editingPost?.id}/${formData.cover_image}`
      : ""
  const fallbackCover = formData.cover_image_path ? mediaUrl(formData.cover_image_path) : ""
  const displayCover =
    (typeof formData.cover_image === "string" &&
    (formData.cover_image.startsWith("http") || formData.cover_image.startsWith("data:"))
      ? formData.cover_image
      : pbCoverUrl) || fallbackCover

  // Filter calculations
  const allCategories = Array.from(
    new Set(["Semua", ...DEFAULT_CATEGORIES, ...(posts || []).map((p) => p?.category).filter(Boolean)])
  )

  const filteredPosts = (posts || []).filter((post) => {
    const title = (post?.title || "").toLowerCase()
    const excerpt = (post?.excerpt || "").toLowerCase()
    const category = (post?.category || "").toLowerCase()
    const query = (searchQuery || "").trim().toLowerCase()
    const targetCategory = (selectedCategory || "Semua").toLowerCase()

    const matchSearch =
      !query || title.includes(query) || excerpt.includes(query) || category.includes(query)

    const matchCategory = targetCategory === "semua" || category === targetCategory

    const matchStatus =
      selectedStatus === "semua" ||
      (selectedStatus === "aktif" && post?.active !== false) ||
      (selectedStatus === "draft" && post?.active === false)

    return matchSearch && matchCategory && matchStatus
  })

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* KIRI: Unified Sidebar (Matches Tentang Kami & Landing Page Utama) */}
      <div className="w-full md:w-64 flex flex-col gap-2 bg-slate-900 rounded-2xl p-4 border border-white/10 shrink-0 h-fit">
        <h2 className="text-white font-bold mb-2 px-2 text-sm uppercase tracking-wider text-slate-500">
          Berita
        </h2>

        {/* Tab Daftar Berita */}
        <button
          onClick={() => {
            setViewMode("list")
            setEditingPost(null)
          }}
          className={`flex items-center gap-2.5 text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            viewMode === "list"
              ? "bg-white/10 text-white"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <FileText size={16} className={viewMode === "list" ? "text-emerald-400" : ""} />
          <span>Daftar Berita</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
            {posts.length}
          </span>
        </button>

        {/* Quick Summary Card */}
        <div className="mt-3 pt-3 border-t border-white/10 text-xs space-y-2 text-slate-400 px-2">
          <div className="flex justify-between items-center">
            <span>Total Berita:</span>
            <span className="font-bold text-white">{posts.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Berita Aktif:</span>
            <span className="font-bold text-emerald-400">
              {posts.filter((p) => p.active !== false).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Draft / Non-Aktif:</span>
            <span className="font-bold text-amber-400">
              {posts.filter((p) => p.active === false).length}
            </span>
          </div>
        </div>

        {/* Tombol Tambah Berita Baru di Sidebar */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <button
            onClick={handleStartCreate}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] cursor-pointer text-xs"
          >
            <Plus size={16} />
            <span>Tulis Berita Baru</span>
          </button>
        </div>
      </div>

      {/* KANAN: Detail Content Panel (Switches in-place, NO POPUP MODAL) */}
      <div className="flex-1 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden min-h-[500px]">
        {/* ===================== VIEW 1: DAFTAR BERITA ===================== */}
        {viewMode === "list" && (
          <div className="p-6 space-y-6">
            {/* Header Content */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Kelola Berita &amp; Artikel</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Kelola konten artikel berita, tips UMKM, dan informasi yang tampil di halaman Blog dan Landing Page.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartCreate}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer shrink-0"
              >
                <Plus size={16} />
                <span>Tambah Berita</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-800/60 p-3.5 rounded-xl border border-white/5">
              {/* Search */}
              <div className="md:col-span-6 relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul, ringkasan, atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      Kategori: {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="semua">Semua Status</option>
                  <option value="aktif">Hanya Aktif</option>
                  <option value="draft">Hanya Non-Aktif / Draft</option>
                </select>
              </div>
            </div>

            {/* Posts List */}
            {loadingPosts ? (
              <div className="py-16 text-center text-slate-400 text-sm">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                Memuat daftar berita...
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-16 text-center bg-slate-800/30 rounded-2xl border border-white/5 space-y-3">
                <BookOpen size={40} className="mx-auto text-slate-500 stroke-1" />
                <h3 className="text-white font-bold text-base">Tidak ada berita yang ditemukan</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  {searchQuery || selectedCategory !== "Semua" || selectedStatus !== "semua"
                    ? "Coba ubah kata kunci pencarian atau filter yang dipilih."
                    : "Belum ada artikel berita. Klik tombol 'Tambah Berita' untuk menerbitkan berita pertama Anda."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("Semua")
                      setSelectedStatus("semua")
                    }}
                    className="text-xs text-emerald-400 hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPosts.map((post, idx) => {
                  const cover = resolveCover(post)
                  const isActive = post.active !== false

                  return (
                    <div
                      key={post.id || idx}
                      className="bg-slate-800/50 hover:bg-slate-800/80 border border-white/10 rounded-2xl p-4 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 group"
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        {/* Thumbnail */}
                        <div className="w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0 relative">
                          <img
                            src={cover}
                            alt={post.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          />
                          {!isActive && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                                Draft
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Title & Metadata */}
                        <div className="min-w-0 flex-1 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
                              {post.category || "Umum"}
                            </span>
                            <span className="text-slate-400 text-xs flex items-center gap-1">
                              <Calendar size={12} />
                              {post.published_date || "Tanggal otomatis"}
                            </span>
                            <span className="text-slate-400 text-xs flex items-center gap-1">
                              <User size={12} />
                              Admin
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug truncate">
                            {post.title}
                          </h3>

                          {post.excerpt && (
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-2xl">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="flex items-center gap-2 pt-0.5">
                            <span className="text-[11px] font-mono text-slate-500">
                              /berita/{post.slug || post.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto justify-end border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0">
                        {/* Toggle Active Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleActive(post)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                              : "bg-slate-700/50 text-slate-400 border border-white/10 hover:bg-slate-700"
                          }`}
                          title={isActive ? "Klik untuk jadikan Draft" : "Klik untuk Terbitkan"}
                        >
                          {isActive ? (
                            <>
                              <CheckCircle2 size={13} />
                              <span>Aktif</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={13} />
                              <span>Draft</span>
                            </>
                          )}
                        </button>

                        {/* View in new tab */}
                        <a
                          href={`/berita/${post.slug || post.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          title="Lihat Halaman Publik"
                        >
                          <ExternalLink size={16} />
                        </a>

                        {/* Edit Button -> Switches in-place to Form View */}
                        <button
                          type="button"
                          onClick={() => handleStartEdit(post)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post)}
                          className="p-2 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Hapus Berita"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ===================== VIEW 2: FORM TULIS / EDIT BERITA ===================== */}
        {viewMode === "form" && (
          <div className="p-6 space-y-6">
            {/* Top Back Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("list")
                    setEditingPost(null)
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer mb-2"
                >
                  <ArrowLeft size={14} />
                  <span>Kembali ke Daftar Berita</span>
                </button>
                <h2 className="text-xl font-bold text-white">
                  {editingPost ? "Edit Berita" : "Tulis Berita Baru"}
                </h2>
                <p className="text-sm text-slate-400">
                  {editingPost
                    ? "Perbarui konten berita di bawah ini lalu klik Simpan Perubahan."
                    : "Lengkapi data berita di bawah ini untuk mempublikasikan artikel baru."}
                </p>
              </div>

              {/* Status badge in header */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2.5 cursor-pointer bg-slate-800/80 px-3.5 py-2 rounded-xl border border-white/10">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 relative"></div>
                  <span className="text-xs font-bold text-white">
                    {formData.active ? "Status: Aktif" : "Status: Draft"}
                  </span>
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSavePost} className="space-y-6">
              {/* Card 1: Informasi Utama */}
              <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Informasi Berita
                </h3>

                {/* Judul */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Judul Berita <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => {
                      const newTitle = e.target.value
                      setFormData((prev) => ({
                        ...prev,
                        title: newTitle,
                        slug:
                          !editingPost && (!prev.slug || prev.slug === generateSlug(prev.title))
                            ? generateSlug(newTitle)
                            : prev.slug,
                      }))
                    }}
                    placeholder="Contoh: Strategi Efektif Mengelola Arus Kas UMKM"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 text-sm font-semibold"
                  />
                </div>

                {/* Kategori Berita */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Kategori Berita <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ringkasan Singkat / Excerpt */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ringkasan Singkat (Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Tuliskan 1-2 kalimat ringkasan yang menarik pembaca..."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Card 2: Tanggal & Penulis (Otomatis Sesuai Request) */}
              <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Waktu Terbit &amp; Penulis (Otomatis)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tanggal Otomatis (Tidak bisa diedit manual) */}
                  <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Tanggal Dibuat / Terbit</div>
                      <div className="text-sm font-bold text-white">
                        {editingPost?.published_date || getTodayIndonesianDate()}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">
                        * Otomatis terpasang saat berita dibuat
                      </div>
                    </div>
                  </div>

                  {/* Penulis Otomatis (Admin dengan User Icon) */}
                  <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <User size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium">Penulis Berita</div>
                      <div className="text-sm font-bold text-white">Admin</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        * Otomatis akun admin (foto berupa icon)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Pesan / Kutipan Admin (Written by) */}
              <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Pesan Admin (Bagian Written By)
                  </h3>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    Tampil di Detail Berita
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Pesan / Kutipan Admin Kepada Pembaca
                  </label>
                  <textarea
                    rows={3}
                    value={formData.author_quote}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author_quote: e.target.value }))}
                    placeholder="Contoh: Spontan Jualan berkomitmen memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-emerald-500 leading-relaxed italic"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Pesan ini dapat diedit untuk setiap artikel dan akan tampil dalam format kutipan di bawah nama Admin pada kolom kanan "Written by" di halaman detail berita.
                  </p>
                </div>
              </div>

              {/* Card 4: GAMBAR BERITA (DUA KOLOM: UNGGAH GAMBAR & PATH GAMBAR CADANGAN) */}
              <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5 space-y-4">
                <label className="block text-sm font-semibold text-slate-300">
                  Gambar Sampul Berita (Cover)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Kolom Kiri: Unggah Gambar */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Unggah gambar</label>
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 flex items-center justify-center p-1.5">
                        {displayCover ? (
                          <img
                            src={displayCover}
                            alt="Cover"
                            className="max-h-full max-w-full object-cover rounded-lg"
                          />
                        ) : (
                          <ImageIcon size={22} className="text-slate-500" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/svg+xml"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleCoverUpload}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-white/10 hover:border-white/20 cursor-pointer"
                          >
                            {displayCover ? "Ganti gambar" : "Pilih gambar"}
                          </button>
                          {displayCover && (
                            <button
                              type="button"
                              onClick={handleRemoveCover}
                              className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <Trash2 size={12} /> Hapus
                            </button>
                          )}
                        </div>
                        {pendingFileName && (
                          <span className="text-[10px] text-amber-300">
                            {pendingFileName} ({pendingFileSize}) — belum diunggah, klik Simpan.
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      JPG/PNG/WebP, maks. 5 MB. Diunggah saat klik Simpan dan menggantikan Path gambar di bawah.
                    </p>
                  </div>

                  {/* Kolom Kanan: Path Gambar Cadangan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Path gambar (cadangan)</label>
                    <input
                      type="text"
                      value={formData.cover_image_path || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, cover_image_path: e.target.value }))}
                      placeholder="detail-produk/feature-satset.webp"
                      className="w-full bg-slate-800 border border-white/10 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl px-4 py-3 text-white outline-none transition-all text-sm font-mono placeholder:text-slate-500"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Path RELATIF di bucket SeaweedFS, bukan URL penuh. Dipakai hanya jika tidak ada gambar yang diunggah.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5: Isi Lengkap Berita (Doc / Word Style TipTap Rich Text Editor) */}
              <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                      Isi Lengkap Berita (Word / Doc Editor)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Format artikel seperti judul sub-bab, tebal, miring, daftar poin, kutipan, tabel, serta sisipkan foto.
                    </p>
                  </div>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0">
                    Mendukung Sisip Foto &amp; Format Dokumen
                  </span>
                </div>

                {/* Editor TipTap */}
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <RichTextEditor
                    key={editingPost?.id || "create-berita"}
                    value={formData.content}
                    onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
                  />
                </div>

                <p className="text-[11px] text-slate-400 italic">
                  💡 Tips: Klik ikon gambar pada toolbar di atas untuk menyisipkan foto ke dalam isi berita. Jika foto dihapus di dalam editor, foto tersebut tidak akan muncul di halaman detail berita.
                </p>
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode("list")
                    setEditingPost(null)
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-bold transition-all border border-white/10 cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={savingPost}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-500/25 active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  <Check size={16} />
                  <span>
                    {savingPost
                      ? "Menyimpan Berita..."
                      : editingPost
                      ? "Simpan Perubahan Berita"
                      : "Terbitkan Berita Baru"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
