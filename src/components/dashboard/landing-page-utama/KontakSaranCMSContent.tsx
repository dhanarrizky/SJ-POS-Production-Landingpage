import React, { useState, useEffect } from "react"
import { pb } from "../../../lib/pocketbase"
import type { SiteSettings, Suggestion } from "../../../types/cms"

function FormattedDate({ dateString }: { dateString: string }) {
  const [formatted, setFormatted] = useState("")
  useEffect(() => {
    try {
      setFormatted(
        new Date(dateString).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      )
    } catch {
      setFormatted(dateString)
    }
  }, [dateString])
  return <>{formatted}</>
}

interface KontakSaranCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export default function KontakSaranCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: KontakSaranCMSContentProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const loadSuggestions = async () => {
    setLoadingSuggestions(true)
    try {
      const records = await pb.collection("suggestions").getFullList({ sort: "-created" })
      setSuggestions(records as unknown as Suggestion[])
    } catch (err) {
      console.error("Gagal memuat daftar saran:", err)
    } finally {
      setLoadingSuggestions(false)
    }
  }

  useEffect(() => {
    loadSuggestions()
  }, [])

  const handleDeleteSuggestion = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan saran ini?")) return
    setDeletingId(id)
    try {
      await pb.collection("suggestions").delete(id)
      setSuggestions((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.error("Gagal menghapus saran:", err)
      alert("Gagal menghapus saran.")
    } finally {
      setDeletingId(null)
    }
  }

  const badgeValue = settings.kontak_saran_badge ?? "Hubungi & Berikan Masukan"
  const titleValue = settings.kontak_saran_title ?? "Kontak Saran & Kritik"
  const descValue =
    settings.kontak_saran_desc ??
    "Kami selalu terbuka untuk mendengarkan saran, kritik, dan masukan dari Anda. Karena setiap pesan dari Anda, membantu kami untuk terus berkembang dan memberikan yang terbaik."
  const infoTitleValue = settings.kontak_saran_info_title ?? "Buka 24 Jam / 7 Hari"
  const infoDescValue =
    settings.kontak_saran_info_desc ??
    "Anda bisa mengirimkan saran, kritik, atau pertanyaan kapan saja. Kami siap membantu"

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Kontak & Saran</h2>
          <p className="text-sm text-slate-400 mt-1">
            Kelola teks bagian Kontak & Saran serta lihat pesan yang dikirim oleh pengunjung landing page.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSuggestions}
          disabled={loadingSuggestions}
          className="px-3.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer border border-white/10"
        >
          {loadingSuggestions ? "Memuat..." : "Segarkan Pesan Masuk"}
        </button>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* SECTION 1: PENGATURAN TEKS & KONTEN */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Pengaturan Teks Informasi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Badge / Kicker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Badge / Kicker
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={badgeValue}
                onChange={(e) => handleChange("kontak_saran_badge", e.target.value)}
                placeholder="Contoh: Hubungi & Berikan Masukan"
              />
            </div>

            {/* Judul Utama */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Judul Utama
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={titleValue}
                onChange={(e) => handleChange("kontak_saran_title", e.target.value)}
                placeholder="Contoh: Kontak Saran & Kritik"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Deskripsi
            </label>
            <textarea
              rows={3}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium leading-relaxed"
              value={descValue}
              onChange={(e) => handleChange("kontak_saran_desc", e.target.value)}
              placeholder="Tuliskan deskripsi..."
            />
          </div>

          {/* Card Info Tambahan */}
          <div className="pt-2 border-t border-white/5 space-y-4">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Card Info Bantuan (Kotak Jam Layanan)
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Info
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                  value={infoTitleValue}
                  onChange={(e) => handleChange("kontak_saran_info_title", e.target.value)}
                  placeholder="Contoh: Buka 24 Jam / 7 Hari"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Keterangan Info
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                  value={infoDescValue}
                  onChange={(e) => handleChange("kontak_saran_info_desc", e.target.value)}
                  placeholder="Contoh: Anda bisa mengirimkan saran..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: KOTAK PESAN MASUK (SARAN & KRITIK) */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Pesan Masuk dari Pengunjung
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Total {suggestions.length} pesan saran &amp; kritik diterima dari landing page.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              {suggestions.length} Pesan
            </span>
          </div>

          {loadingSuggestions ? (
            <div className="py-10 text-center text-slate-400 text-sm">
              Memuat pesan masuk...
            </div>
          ) : suggestions.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm bg-slate-900/40 rounded-xl border border-white/5">
              Belum ada pesan saran atau kritik yang dikirimkan oleh pengunjung.
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((s) => (
                <div
                  key={s.id}
                  className="bg-slate-900/80 border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors hover:border-white/20"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-bold text-white">
                        {s.name?.trim() ? s.name : "Anonim"}
                      </span>
                      {s.email && (
                        <span className="text-xs text-slate-400 font-mono bg-white/5 px-2 py-0.5 rounded">
                          {s.email}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 font-mono ml-auto sm:ml-0">
                        <FormattedDate dateString={s.created} />
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed pt-1">
                      {s.message}
                    </p>
                  </div>

                  <div className="shrink-0 self-end sm:self-start">
                    <button
                      type="button"
                      onClick={() => handleDeleteSuggestion(s.id)}
                      disabled={deletingId === s.id}
                      className="px-3 py-1.5 text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                      title="Hapus Pesan Ini"
                    >
                      {deletingId === s.id ? "Menghapus..." : "Hapus"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SATU TOMBOL SIMPAN DI BAWAH (UNTUK TEKS CMS) */}
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
