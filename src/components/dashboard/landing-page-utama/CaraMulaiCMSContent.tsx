import React from "react"
import type { SiteSettings, CaraMulaiStep } from "../../../types/cms"

interface CaraMulaiCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

const DEFAULT_STEPS: CaraMulaiStep[] = [
  {
    title: "Daftar",
    description: "Buat akun Spontan Jualan dengan cepat dan mudah. Lengkapi data dasar usaha Anda untuk memulai."
  },
  {
    title: "Verifikasi",
    description: "Pastikan data usaha Anda sesuai dan lakukan proses verifikasi agar akun siap digunakan."
  },
  {
    title: "Pakai",
    description: "Akun siap digunakan. Kelola produk, transaksi, dan kebutuhan usaha Anda dengan lebih praktis bersama Spontan Jualan."
  }
]

export default function CaraMulaiCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: CaraMulaiCMSContentProps) {
  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const badgeValue = settings.cara_mulai_badge ?? "Cara Mulai"
  const titleValue = settings.cara_mulai_title ?? "Siap Jualan dalam 3 Langkah Sederhana"

  const currentSteps: CaraMulaiStep[] =
    Array.isArray(settings.cara_mulai_steps) && settings.cara_mulai_steps.length > 0
      ? settings.cara_mulai_steps
      : DEFAULT_STEPS

  const handleUpdateStep = (index: number, field: "title" | "description", val: string) => {
    const updated = [...currentSteps]
    updated[index] = { ...updated[index], [field]: val }
    setSettings((prev) => (prev ? { ...prev, cara_mulai_steps: updated } : null))
  }

  const handleAddStep = () => {
    const newStep: CaraMulaiStep = {
      title: "Langkah Baru",
      description: "Jelaskan langkah ini untuk pengguna usaha Anda."
    }
    const updated = [...currentSteps, newStep]
    setSettings((prev) => (prev ? { ...prev, cara_mulai_steps: updated } : null))
  }

  const handleRemoveStep = (index: number) => {
    if (currentSteps.length <= 1) {
      alert("Minimal harus ada 1 langkah.")
      return
    }
    const updated = currentSteps.filter((_, i) => i !== index)
    setSettings((prev) => (prev ? { ...prev, cara_mulai_steps: updated } : null))
  }

  const handleMoveStep = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= currentSteps.length) return
    const updated = [...currentSteps]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setSettings((prev) => (prev ? { ...prev, cara_mulai_steps: updated } : null))
  }

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Cara Mulai</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola teks judul bagian dan langkah-langkah penggunaan di landing page utama.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* FORM PENGATURAN TEKS UTAMA */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">
              Teks Judul Bagian
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sesuaikan teks label kecil dan judul utama bagian Cara Mulai.
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
                onChange={(e) => handleChange("cara_mulai_badge", e.target.value)}
                placeholder="Cara Mulai"
              />
              <p className="text-xs text-slate-500 mt-1">
                Teks label hijau kecil di atas judul utama.
              </p>
            </div>

            {/* 2. Judul Utama */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Judul Utama
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={titleValue}
                onChange={(e) => handleChange("cara_mulai_title", e.target.value)}
                placeholder="Siap Jualan dalam 3 Langkah Sederhana"
              />
              <p className="text-xs text-slate-500 mt-1">
                Gunakan baris baru (Enter) jika ingin memisahkan baris judul.
              </p>
            </div>
          </div>
        </div>

        {/* FORM DAFTAR LANGKAH-LANGKAH */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
            <div>
              <h3 className="text-base font-bold text-white">
                Daftar Langkah-Langkah
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Nomor langkah diisi otomatis (1, 2, 3...) berdasarkan urutan langkah.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddStep}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
            >
              + Tambah Langkah
            </button>
          </div>

          <div className="space-y-4">
            {currentSteps.map((step, index) => (
              <div
                key={index}
                className="bg-slate-900/80 border border-white/10 rounded-xl p-5 space-y-4 relative"
              >
                {/* Header Card Langkah */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-white">
                      Langkah {index + 1} (Nomor Otomatis)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Tombol Geser Atas */}
                    <button
                      type="button"
                      onClick={() => handleMoveStep(index, "up")}
                      disabled={index === 0}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
                      title="Geser ke atas"
                    >
                      ▲
                    </button>
                    {/* Tombol Geser Bawah */}
                    <button
                      type="button"
                      onClick={() => handleMoveStep(index, "down")}
                      disabled={index === currentSteps.length - 1}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
                      title="Geser ke bawah"
                    >
                      ▼
                    </button>
                    {/* Tombol Hapus */}
                    <button
                      type="button"
                      onClick={() => handleRemoveStep(index)}
                      className="px-3 py-1 text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                {/* Form Input Langkah */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Judul Langkah
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                      value={step.title || ""}
                      onChange={(e) => handleUpdateStep(index, "title", e.target.value)}
                      placeholder={`Contoh: Daftar`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Deskripsi Langkah
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                      value={step.description ?? step.desc ?? ""}
                      onChange={(e) => handleUpdateStep(index, "description", e.target.value)}
                      placeholder="Jelaskan instruksi atau proses langkah ini..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleAddStep}
              className="w-full py-3 border-2 border-dashed border-white/15 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-400 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              + Tambah Langkah Baru
            </button>
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
