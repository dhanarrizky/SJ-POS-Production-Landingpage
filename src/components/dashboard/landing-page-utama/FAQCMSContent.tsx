import React from "react"
import type { SiteSettings, FAQItem } from "../../../types/cms"

interface FAQCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "Apa itu Spontan Jualan dan siapa saja yang bisa menggunakannya?",
    answer: "Spontan Jualan adalah platform Point of Sales (POS) dan manajemen toko yang dirancang khusus untuk membantu UMKM, kedai kopi, restoran, hingga ritel dalam mencatat transaksi dan mengelola stok barang dengan mudah."
  },
  {
    id: 2,
    question: "Apakah saya harus berlangganan untuk menggunakan fitur kasir?",
    answer: "Tidak. Anda bisa memulai dengan paket Gratis yang mencakup fitur kasir dasar. Untuk kebutuhan manajemen lanjutan dan laporan lengkap, Anda dapat beralih ke paket Premium kami."
  },
  {
    id: 3,
    question: "Apa bedanya paket gratis dan paket berbayar?",
    answer: "Paket gratis memberikan akses fitur transaksi dengan batas tertentu, sedangkan paket berbayar memberikan akses fitur tak terbatas, manajemen multi-cabang, serta laporan keuangan yang mendetail."
  },
  {
    id: 4,
    question: "Bagaimana cara mengecek laporan harian?",
    answer: "Laporan harian dapat dilihat secara real-time langsung melalui menu Dashboard atau Laporan di dalam aplikasi Anda, dan dapat diunduh (eksport) kapan saja."
  },
  {
    id: 5,
    question: "Apakah data toko saya aman tersimpan di cloud?",
    answer: "Sangat aman. Spontan Jualan menggunakan enkripsi standar industri dan pencadangan otomatis. Jika perangkat Anda rusak atau hilang, data Anda tetap aman di cloud dan bisa diakses dari perangkat lain."
  },
  {
    id: 6,
    question: "Bagaimana jika ada kendala atau pertanyaan lain?",
    answer: "Tim dukungan pelanggan kami siap membantu Anda. Anda dapat menghubungi kami melalui fitur Bantuan di aplikasi, email, atau layanan WhatsApp resmi yang tersedia 24/7."
  }
]

export default function FAQCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: FAQCMSContentProps) {
  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const titleValue = settings.faq_title ?? "FAQs"

  const currentFaqs: FAQItem[] =
    Array.isArray(settings.faq_items) && settings.faq_items.length > 0
      ? settings.faq_items
      : DEFAULT_FAQS

  const handleUpdateItem = (index: number, field: "question" | "answer", val: string) => {
    const updated = [...currentFaqs]
    updated[index] = { ...updated[index], [field]: val }
    setSettings((prev) => (prev ? { ...prev, faq_items: updated } : null))
  }

  const handleAddItem = () => {
    const newItem: FAQItem = {
      id: Date.now(),
      question: "Pertanyaan Baru?",
      answer: "Tuliskan jawaban yang jelas dan informatif untuk pertanyaan ini di sini."
    }
    const updated = [...currentFaqs, newItem]
    setSettings((prev) => (prev ? { ...prev, faq_items: updated } : null))
  }

  const handleRemoveItem = (index: number) => {
    if (currentFaqs.length <= 1) {
      alert("Minimal harus ada 1 item FAQ.")
      return
    }
    const updated = currentFaqs.filter((_, i) => i !== index)
    setSettings((prev) => (prev ? { ...prev, faq_items: updated } : null))
  }

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= currentFaqs.length) return
    const updated = [...currentFaqs]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setSettings((prev) => (prev ? { ...prev, faq_items: updated } : null))
  }

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">FAQ (Tanya Jawab)</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola pertanyaan dan jawaban yang sering diajukan pada landing page utama.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* PENGATURAN JUDUL SECTION */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Judul Bagian FAQ
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Judul Header (Default: FAQs)
            </label>
            <input
              type="text"
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
              value={titleValue}
              onChange={(e) => handleChange("faq_title", e.target.value)}
              placeholder="Contoh: FAQs"
            />
          </div>
        </div>

        {/* DAFTAR PERTANYAAN & JAWABAN */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Daftar Pertanyaan & Jawaban
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Total {currentFaqs.length} pertanyaan aktif. Urutan nomor sesuai dengan urutan di bawah.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition-colors cursor-pointer"
            >
              + Tambah FAQ
            </button>
          </div>

          <div className="space-y-4">
            {currentFaqs.map((item, index) => (
              <div
                key={item.id ?? index}
                className="bg-slate-900/80 border border-white/10 rounded-xl p-5 space-y-4"
              >
                {/* Header Item */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-white line-clamp-1">
                      {item.question ? item.question : `Pertanyaan ${index + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveItem(index, "up")}
                      disabled={index === 0}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
                      title="Geser ke atas"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveItem(index, "down")}
                      disabled={index === currentFaqs.length - 1}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
                      title="Geser ke bawah"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="px-3 py-1 text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

                {/* Form Input Item */}
                <div className="space-y-3">
                  {/* Pertanyaan */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Pertanyaan
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                      value={item.question || ""}
                      onChange={(e) => handleUpdateItem(index, "question", e.target.value)}
                      placeholder="Tuliskan pertanyaan..."
                    />
                  </div>

                  {/* Jawaban */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Jawaban
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium leading-relaxed"
                      value={item.answer || ""}
                      onChange={(e) => handleUpdateItem(index, "answer", e.target.value)}
                      placeholder="Tuliskan jawaban yang lengkap dan jelas..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-3 border-2 border-dashed border-white/15 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-400 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              + Tambah FAQ Baru
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
