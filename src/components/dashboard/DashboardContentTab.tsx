import { useCallback, useEffect, useState } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { pb } from "../../lib/pocketbase"
import { htmlToText } from "../../lib/sanitize"
import type { FeaturePage, VideoItem } from "../../types/cms"
import RichTextEditor from "./RichTextEditor"

interface Draft {
  name: string
  slug: string
  sort_order: number
  active: boolean
  title: string
  description: string
  content: string
  author_name: string
  published_date: string
  quote: string
  youtube_url: string
}

const NEW_ID = "__new__"

const emptyDraft = (sortOrder: number): Draft => ({
  name: "",
  slug: "",
  sort_order: sortOrder,
  active: true,
  title: "",
  description: "",
  content: "",
  author_name: "Admin",
  published_date: "",
  quote: "",
  youtube_url: "",
})

const toSlug = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")

const inputCls =
  "w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-brand/60"
const labelCls = "block text-[11px] font-semibold text-slate-400 mb-1.5"

export default function DashboardContentTab() {
  const [features, setFeatures] = useState<FeaturePage[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft>(emptyDraft(1))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  )

  const videoFor = useCallback(
    (list: VideoItem[], slug: string) =>
      list.find((v) => v.placement === `fitur:${slug}`),
    [],
  )

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [fp, vd] = await Promise.all([
        pb.collection("feature_pages").getFullList({ sort: "sort_order,created" }),
        pb
          .collection("videos")
          .getFullList({ filter: 'placement ~ "fitur:"' })
          .catch(() => []),
      ])
      setFeatures(fp as unknown as FeaturePage[])
      setVideos(vd as unknown as VideoItem[])
    } catch (err) {
      console.error("Gagal memuat konten fitur:", err)
      setMessage({ ok: false, text: "Gagal memuat daftar fitur." })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const selectFeature = (f: FeaturePage) => {
    setMessage(null)
    setSelectedId(f.id)
    setDraft({
      name: f.name || "",
      slug: f.slug || "",
      sort_order: f.sort_order ?? 0,
      active: f.active ?? true,
      // Data lama disimpan sebagai HTML; sekarang teks biasa
      title: htmlToText(f.title),
      description: htmlToText(f.description),
      content: f.content || "",
      author_name: f.author_name || "",
      published_date: f.published_date || "",
      quote: f.quote || "",
      youtube_url: videoFor(videos, f.slug)?.youtube_url || "",
    })
  }

  const startNew = () => {
    setMessage(null)
    setSelectedId(NEW_ID)
    const max = features.reduce((m, f) => Math.max(m, f.sort_order ?? 0), 0)
    setDraft(emptyDraft(max + 1))
  }

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const handleSave = async () => {
    const slug = toSlug(draft.slug)
    if (!draft.name.trim() || !slug) {
      setMessage({ ok: false, text: "Nama fitur dan slug wajib diisi." })
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      const existing = features.find((f) => f.id === selectedId)
      const data = {
        name: draft.name.trim(),
        slug,
        sort_order: Number(draft.sort_order) || 0,
        active: draft.active,
        title: draft.title,
        description: draft.description,
        content: draft.content,
        author_name: draft.author_name,
        published_date: draft.published_date,
        quote: draft.quote,
      }
      const saved = existing
        ? await pb.collection("feature_pages").update(existing.id, data)
        : await pb.collection("feature_pages").create(data)

      // Video YouTube per fitur (collection `videos`, placement "fitur:<slug>")
      const oldVideo = existing ? videoFor(videos, existing.slug) : undefined
      const url = draft.youtube_url.trim()
      if (url) {
        const videoData = {
          placement: `fitur:${slug}`,
          youtube_url: url,
          active: true,
        }
        if (oldVideo) await pb.collection("videos").update(oldVideo.id, videoData)
        else await pb.collection("videos").create(videoData)
      } else if (oldVideo) {
        await pb.collection("videos").delete(oldVideo.id)
      }

      await load()
      setSelectedId(saved.id)
      setDraft((d) => ({ ...d, slug }))
      setMessage({ ok: true, text: "Tersimpan." })
    } catch (err: any) {
      console.error("Gagal menyimpan fitur:", err)
      const detail =
        err?.response?.data?.slug?.message ||
        err?.response?.message ||
        "Gagal menyimpan."
      setMessage({ ok: false, text: detail })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const existing = features.find((f) => f.id === selectedId)
    if (!existing) return
    if (!confirm(`Hapus "${existing.name}" secara permanen?`)) return
    try {
      const oldVideo = videoFor(videos, existing.slug)
      if (oldVideo) await pb.collection("videos").delete(oldVideo.id)
      await pb.collection("feature_pages").delete(existing.id)
      setSelectedId(null)
      await load()
    } catch {
      setMessage({ ok: false, text: "Gagal menghapus." })
    }
  }

  const editing = selectedId !== null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
      {/* Daftar fitur */}
      <aside className="glass border border-white/8 rounded-2xl p-3 self-start">
        <div className="flex items-center justify-between px-1 pb-2">
          <span className="text-xs font-bold text-slate-300">
            Daftar Fitur ({features.length})
          </span>
          <button
            type="button"
            onClick={startNew}
            className="inline-flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1 text-[11px] font-bold text-white hover:bg-brand-hover cursor-pointer"
          >
            <Plus size={12} /> Tambah
          </button>
        </div>
        {loading ? (
          <p className="px-1 py-4 text-xs text-slate-500">Memuat…</p>
        ) : features.length === 0 ? (
          <p className="px-1 py-4 text-xs text-slate-500">Belum ada fitur.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {features.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => selectFeature(f)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                    selectedId === f.id
                      ? "bg-brand text-white font-bold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="text-slate-500 mr-1.5">
                    {f.sort_order ?? "-"}.
                  </span>
                  {f.name}
                  {f.active === false && (
                    <span className="ml-1.5 text-[10px] text-amber-400">
                      (nonaktif)
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* Form edit */}
      <section className="glass border border-white/8 rounded-2xl p-5">
        {!editing ? (
          <p className="text-sm text-slate-400">
            Pilih fitur di kiri untuk mengedit, atau klik “Tambah” untuk membuat
            fitur baru.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_90px] gap-3">
              <div>
                <label className={labelCls}>Nama di sidebar</label>
                <input
                  className={inputCls}
                  value={draft.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Fitur Kasir"
                />
              </div>
              <div>
                <label className={labelCls}>Slug (URL: /fitur/…)</label>
                <input
                  className={inputCls}
                  value={draft.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  onBlur={(e) => set("slug", toSlug(e.target.value))}
                  placeholder="kasir"
                />
              </div>
              <div>
                <label className={labelCls}>Urutan</label>
                <input
                  type="number"
                  className={inputCls}
                  value={draft.sort_order}
                  onChange={(e) => set("sort_order", Number(e.target.value))}
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(e) => set("active", e.target.checked)}
              />
              Aktif (tampil di halaman publik)
            </label>

            <div>
              <label className={labelCls}>Judul</label>
              <input
                className={inputCls}
                value={draft.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Judul di hero halaman fitur"
              />
            </div>
            <div>
              <label className={labelCls}>Deskripsi singkat</label>
              <textarea
                className={`${inputCls} min-h-[5rem] resize-y`}
                value={draft.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Ringkasan di hero, di bawah judul"
              />
            </div>
            {/* key = ganti fitur memuat ulang isi editor */}
            <div key={selectedId}>
              <label className={labelCls}>
                Isi halaman (Tiptap): tampilan di editor sama dengan di halaman
                publik (lebar desktop)
              </label>
              <RichTextEditor
                value={draft.content}
                onChange={(html) => set("content", html)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Penulis</label>
                <input
                  className={inputCls}
                  value={draft.author_name}
                  onChange={(e) => set("author_name", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Tanggal terbit</label>
                <input
                  className={inputCls}
                  value={draft.published_date}
                  onChange={(e) => set("published_date", e.target.value)}
                  placeholder="29 September 2026"
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Kutipan singkat</label>
              <input
                className={inputCls}
                value={draft.quote}
                onChange={(e) => set("quote", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Link video YouTube (opsional)</label>
              <input
                className={inputCls}
                value={draft.youtube_url}
                onChange={(e) => set("youtube_url", e.target.value)}
                placeholder="https://www.youtube.com/watch?v=…"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-50 cursor-pointer"
              >
                <Save size={14} /> {saving ? "Menyimpan…" : "Simpan"}
              </button>
              {selectedId !== NEW_ID && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              )}
              {draft.slug && (
                <a
                  href={`/fitur/${toSlug(draft.slug)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 underline hover:text-white"
                >
                  Lihat halaman
                </a>
              )}
              {message && (
                <span
                  className={`text-xs ${message.ok ? "text-emerald-400" : "text-red-400"}`}
                >
                  {message.text}
                </span>
              )}
            </div>
            {htmlToText(draft.title) === "" && (
              <p className="text-[11px] text-amber-400">
                Judul masih kosong, halaman publik akan menampilkan judul
                kosong.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
