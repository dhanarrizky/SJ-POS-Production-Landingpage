import React, { useRef } from "react"
import { mediaUrl } from "../../../lib/media"
import type { SiteSettings, FeedbackCustomerItem } from "../../../types/cms"

import imgDhanar from "../../../assets/team/Dhanar rizki.webp"
import imgRian from "../../../assets/team/Rian alfatian.webp"
import imgRicardo from "../../../assets/team/Ricardo augusto.webp"
import imgBagus from "../../../assets/team/Bagus wikan.webp"

interface FeedbackCustomerCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

const DEFAULT_FEEDBACKS: FeedbackCustomerItem[] = [
  {
    id: 1,
    name: "Dhanar Rizky",
    title: "Lead",
    quote: "Kami membangun SpontanJualan untuk memastikan setiap transaksi berjalan mulus tanpa hambatan. Fokus utama kami adalah menciptakan ekosistem yang dapat diandalkan oleh para pemilik usaha dalam mengembangkan bisnis mereka.",
    location: "Yogyakarta",
    image: imgDhanar,
    rating: 5,
  },
  {
    id: 2,
    name: "Rian Alfatian",
    title: "QA Engineer",
    quote: "Kualitas adalah prioritas utama. Setiap fitur yang rilis telah melewati pengujian ketat agar pengguna tidak mengalami kendala dan bisa menjalankan operasional bisnis dengan tenang dan nyaman.",
    location: "Yogyakarta",
    image: imgRian,
    rating: 5,
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    title: "Full stack Developer",
    quote: "Dari sisi teknis, kami merancang sistem POS yang sangat ringan dan mudah di-scale up. Harapannya, aplikasi ini tidak hanya cepat tapi juga bisa beradaptasi dengan kebutuhan masa depan yang semakin kompleks.",
    location: "Yogyakarta",
    image: imgRicardo,
    rating: 5,
  },
  {
    id: 4,
    name: "Bagus Wikan",
    title: "Full stack Developer",
    quote: "Tujuan kami adalah menghadirkan antarmuka dan fungsi yang intuitif. Membantu UMKM untuk beralih ke digital seharusnya tidak sulit, karena itulah kami membuat SpontanJualan senyaman mungkin.",
    location: "Yogyakarta",
    image: imgBagus,
    rating: 5,
  }
]

export default function FeedbackCustomerCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: FeedbackCustomerCMSContentProps) {
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const titleValue = settings.feedback_title ?? "Pesan Dari\nPengembang"
  const subtitleValue = settings.feedback_subtitle ?? "Dibalik Layar\nSpontan Jualan"

  const currentItems: FeedbackCustomerItem[] =
    Array.isArray(settings.feedback_items) && settings.feedback_items.length > 0
      ? settings.feedback_items
      : DEFAULT_FEEDBACKS

  const handleUpdateItem = (index: number, field: keyof FeedbackCustomerItem, val: any) => {
    const updated = [...currentItems]
    updated[index] = { ...updated[index], [field]: val }
    setSettings((prev) => (prev ? { ...prev, feedback_items: updated } : null))
  }

  const handleAddItem = () => {
    const newItem: FeedbackCustomerItem = {
      id: Date.now(),
      name: "Nama Pengguna / Tim",
      title: "Pemilik Usaha",
      quote: "Pengalaman saya menggunakan Spontan Jualan sangat mempermudah pencatatan dan operasional harian.",
      location: "Indonesia",
      image: "",
      image_path: "",
      rating: 5,
    }
    const updated = [...currentItems, newItem]
    setSettings((prev) => (prev ? { ...prev, feedback_items: updated } : null))
  }

  const handleRemoveItem = (index: number) => {
    if (currentItems.length <= 1) {
      alert("Minimal harus ada 1 item feedback.")
      return
    }
    const updated = currentItems.filter((_, i) => i !== index)
    setSettings((prev) => (prev ? { ...prev, feedback_items: updated } : null))
  }

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= currentItems.length) return
    const updated = [...currentItems]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setSettings((prev) => (prev ? { ...prev, feedback_items: updated } : null))
  }

  // Handle upload foto lokal (dikompres/dibaca menjadi base64 Data URL)
  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Konversi file gambar ke data URL agar tersimpan rapi di JSON state
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        handleUpdateItem(index, "image", result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (index: number) => {
    handleUpdateItem(index, "image", "")
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ""
    }
  }

  // Helper tampilan gambar item
  const getItemPreviewUrl = (item: FeedbackCustomerItem) => {
    if (item.image) {
      if (item.image.includes("Dhanar")) return imgDhanar
      if (item.image.includes("Rian")) return imgRian
      if (item.image.includes("Ricardo")) return imgRicardo
      if (item.image.includes("Bagus")) return imgBagus
      return item.image
    }
    if (item.image_path) {
      return mediaUrl(item.image_path)
    }
    return ""
  }

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Feedback Customer</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola teks judul dan daftar pesan pengembang / testimoni pelanggan di landing page utama.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* FORM PENGATURAN TEKS BAGIAN */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">
              Teks Judul &amp; Keterangan Bagian
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sesuaikan judul utama dan subjudul yang tampil di sisi kiri card testimoni.
            </p>
          </div>

          <div className="space-y-4">
            {/* 1. Judul Utama */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Judul Utama
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={titleValue}
                onChange={(e) => handleChange("feedback_title", e.target.value)}
                placeholder={"Pesan Dari\nPengembang"}
              />
              <p className="text-xs text-slate-500 mt-1">
                Gunakan baris baru (Enter) untuk memisahkan baris judul.
              </p>
            </div>

            {/* 2. Subjudul / Keterangan */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Subjudul / Keterangan Bawah
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={subtitleValue}
                onChange={(e) => handleChange("feedback_subtitle", e.target.value)}
                placeholder={"Dibalik Layar\nSpontan Jualan"}
              />
              <p className="text-xs text-slate-500 mt-1">
                Teks pendukung di bawah judul utama.
              </p>
            </div>
          </div>
        </div>

        {/* FORM DAFTAR ITEM FEEDBACK */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
            <div>
              <h3 className="text-base font-bold text-white">
                Daftar Feedback &amp; Testimoni
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Kelola nama, jabatan, pesan, lokasi, dan foto pengguna.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
            >
              + Tambah Feedback
            </button>
          </div>

          <div className="space-y-5">
            {currentItems.map((item, index) => {
              const previewSrc = getItemPreviewUrl(item)

              return (
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
                      <span className="text-sm font-bold text-white">
                        {item.name || `Feedback ${index + 1}`}
                      </span>
                      <div className="hidden sm:flex items-center gap-0.5 text-amber-400 text-xs ml-2">
                        {[...Array(item.rating ?? 5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star text-[11px]"></i>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
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
                        disabled={index === currentItems.length - 1}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Nama */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                        value={item.name || ""}
                        onChange={(e) => handleUpdateItem(index, "name", e.target.value)}
                        placeholder="Contoh: Dhanar Rizky"
                      />
                    </div>

                    {/* Jabatan / Role */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Jabatan / Posisi / Usaha
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                        value={item.title || ""}
                        onChange={(e) => handleUpdateItem(index, "title", e.target.value)}
                        placeholder="Contoh: Lead / Owner Coffee Shop"
                      />
                    </div>

                    {/* Lokasi */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Lokasi (Kota)
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                        value={item.location || ""}
                        onChange={(e) => handleUpdateItem(index, "location", e.target.value)}
                        placeholder="Contoh: Yogyakarta"
                      />
                    </div>

                    {/* Rating Bintang */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Rating Bintang ({item.rating ?? 5} dari 5)
                      </label>
                      <div className="flex items-center gap-1.5 h-[38px] px-3 bg-slate-800 border border-white/10 rounded-xl">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const currentRating = typeof item.rating === "number" ? item.rating : 5
                          const isFilled = star <= currentRating
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleUpdateItem(index, "rating", star)}
                              className="p-1 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                              title={`Pilih ${star} Bintang`}
                            >
                              <i
                                className={`fa-solid fa-star text-sm ${
                                  isFilled ? "text-amber-400" : "text-slate-600 hover:text-slate-400"
                                }`}
                              ></i>
                            </button>
                          )
                        })}
                        <span className="text-xs font-bold text-slate-300 ml-auto">
                          {item.rating ?? 5} ★
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pesan Testimoni (Quote) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Pesan Testimoni / Kutipan
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                      value={item.quote || ""}
                      onChange={(e) => handleUpdateItem(index, "quote", e.target.value)}
                      placeholder="Tuliskan pengalaman atau pesan..."
                    />
                  </div>

                  {/* PENGATURAN FOTO / GAMBAR (DUA KOLOM: UNGGAH GAMBAR & PATH CADANGAN) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Foto Profil Pengguna
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-white/5">
                      {/* Kolom Kiri: Unggah Gambar */}
                      <div>
                        <span className="block text-[11px] font-medium text-slate-400 mb-2">
                          Unggah File Foto
                        </span>

                        <div className="flex items-center gap-3">
                          {/* Thumbnail Preview atau Icon People Otomatis */}
                          <div className="w-14 h-14 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center shrink-0 overflow-hidden">
                            {previewSrc ? (
                              <img
                                src={previewSrc}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <i className="fa-solid fa-user text-xl"></i>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/svg+xml"
                              className="hidden"
                              ref={(el) => {
                                fileInputRefs.current[index] = el
                              }}
                              onChange={(e) => handleFileUpload(index, e)}
                            />

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRefs.current[index]?.click()}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                              >
                                {previewSrc ? "Ganti foto" : "Pilih foto"}
                              </button>

                              {previewSrc && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                >
                                  Hapus
                                </button>
                              )}
                            </div>

                            <span className="text-[11px] text-slate-400">
                              {previewSrc ? "Foto aktif" : "Tanpa foto (Otomatis icon people)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Kolom Kanan: Path Cadangan / URL Gambar */}
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                          Path Cadangan / URL Gambar (Opsional)
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-800 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/40 text-xs font-medium"
                          value={item.image_path || ""}
                          onChange={(e) => handleUpdateItem(index, "image_path", e.target.value)}
                          placeholder="Misal: team/Dhanar rizki.webp atau https://..."
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                          Jika kosong dan tidak ada file, akan otomatis memakai icon people.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-3 border-2 border-dashed border-white/15 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-300 hover:text-emerald-400 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            >
              + Tambah Feedback Baru
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
