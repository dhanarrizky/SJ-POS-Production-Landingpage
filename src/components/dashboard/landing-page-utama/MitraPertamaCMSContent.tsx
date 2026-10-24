import React from "react"
import type { SiteSettings } from "../../../types/cms"

interface MitraPertamaCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export default function MitraPertamaCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: MitraPertamaCMSContentProps) {
  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const badgeValue = settings.mitra_pertama_badge ?? "100 Bisnis Pertama"
  const titleValue = settings.mitra_pertama_title ?? "Bukan Sekadar Menggunakan.\nIkut Membentuk."
  const descValue =
    settings.mitra_pertama_desc ??
    "Spontan Jualan membangun solusi untuk bisnis Indonesia, dimulai dari kebutuhan sehari-hari yang praktis. Pengalaman dan kebutuhan Anda akan menjadi bagian dari perjalanan kami."

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Mitra Pertama</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola teks ajakan kemitraan awal (100 Bisnis Pertama) di landing page utama.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* FORM PENGATURAN TEKS */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">
              Teks Bagian Mitra Pertama
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sesuaikan teks label atas, judul utama, dan kalimat deskripsi.
            </p>
          </div>

          <div className="space-y-4">
            {/* 1. Badge / Label Atas */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Label Atas (Badge)
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={badgeValue}
                onChange={(e) => handleChange("mitra_pertama_badge", e.target.value)}
                placeholder="100 Bisnis Pertama"
              />
              <p className="text-xs text-slate-500 mt-1">
                Teks label kecil yang berada di dalam pill di atas judul.
              </p>
            </div>

            {/* 2. Judul Utama */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Judul Utama
              </label>
              <textarea
                rows={3}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={titleValue}
                onChange={(e) => handleChange("mitra_pertama_title", e.target.value)}
                placeholder={"Bukan Sekadar Menggunakan.\nIkut Membentuk."}
              />
              <p className="text-xs text-slate-500 mt-1">
                Gunakan baris baru (Enter) untuk memisahkan baris judul.
              </p>
            </div>

            {/* 3. Deskripsi */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Deskripsi
              </label>
              <textarea
                rows={4}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={descValue}
                onChange={(e) => handleChange("mitra_pertama_desc", e.target.value)}
                placeholder="Spontan Jualan membangun solusi untuk bisnis Indonesia..."
              />
              <p className="text-xs text-slate-500 mt-1">
                Kalimat penjelasan yang tampil di bawah judul utama.
              </p>
            </div>
          </div>
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
