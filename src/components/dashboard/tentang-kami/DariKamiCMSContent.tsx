import React, { useRef } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import type { SiteSettings, DariKamiItem } from "../../../types/cms"
import { mediaUrl } from "../../../lib/media"

import dariDhanar from "../../../assets/team/dari-dhanar.webp"
import dariRian from "../../../assets/team/dari-rian.webp"
import dariRicardo from "../../../assets/team/dari-ricardo.webp"
import dariBagus from "../../../assets/team/dari-bagus.webp"

interface DariKamiCMSContentProps {
  settings: SiteSettings | null
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export const DEFAULT_DARI_KAMI_ITEMS: DariKamiItem[] = [
  {
    id: 1,
    name: "Dhanar Rizky",
    role: "Lead",
    image: "",
    image_path: "",
    tag: "Opsi utama",
    title: "Kami Membangun Spontan\nJualan untuk Membantu Bisnis\nAnda Tumbuh",
    description:
      "Kami percaya teknologi seharusnya membantu, bukan membuat pengelolaan usaha menjadi lebih rumit. Spontan Jualan hadir untuk memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia.",
  },
  {
    id: 2,
    name: "Rian Alfatian",
    role: "QA Engineer",
    image: "",
    image_path: "",
    tag: "Fokus Kualitas",
    title: "Kualitas adalah Prioritas\nKami untuk Pengalaman\nTerbaik",
    description:
      "Sebagai QA Engineer, tugas saya memastikan setiap fitur berjalan dengan lancar tanpa hambatan. Kami melakukan pengujian ketat agar Anda bisa menjalankan bisnis tanpa khawatir akan kendala teknis pada aplikasi.",
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    role: "Full stack Developer",
    image: "",
    image_path: "",
    tag: "Inovasi Berkelanjutan",
    title: "Sistem yang Tangguh\nuntuk Pertumbuhan\nJangka Panjang",
    description:
      "Kami mengembangkan infrastruktur yang tidak hanya cepat hari ini, tapi juga siap menghadapi skala bisnis Anda di masa depan. Teknologi yang kami bangun dirancang untuk stabil dan mudah diadaptasi.",
  },
  {
    id: 4,
    name: "Bagus Wikan",
    role: "Full stack Developer",
    image: "",
    image_path: "",
    tag: "Performa Optimal",
    title: "Kecepatan dan Keamanan\nuntuk Kenyamanan\nAnda",
    description:
      "Sebagai pengembang, fokus saya adalah memastikan sistem berjalan dengan cepat, aman, dan tanpa hambatan. Kami merancang arsitektur Spontan Jualan agar data Anda selalu terlindungi dan aplikasi merespons secara instan.",
  },
]

export default function DariKamiCMSContent({
  settings,
  setSettings,
  onSave: _onSave,
  isSaving: _isSaving = false,
}: DariKamiCMSContentProps) {
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  if (!settings) {
    return (
      <div className="p-8 text-center text-slate-400">
        Memuat data pengaturan Dari Kami...
      </div>
    )
  }

  const currentItems: DariKamiItem[] =
    Array.isArray(settings.dari_kami_items) && settings.dari_kami_items.length > 0
      ? settings.dari_kami_items
      : DEFAULT_DARI_KAMI_ITEMS

  const handleUpdateItem = (index: number, field: keyof DariKamiItem, val: any) => {
    const updated = [...currentItems]
    updated[index] = { ...updated[index], [field]: val }
    setSettings((prev) => (prev ? { ...prev, dari_kami_items: updated } : null))
  }

  const handleAddItem = () => {
    const newItem: DariKamiItem = {
      id: Date.now(),
      name: "Nama Anggota Baru",
      role: "Peran / Posisi",
      image: "",
      image_path: "",
      tag: "Nilai Unggulan",
      title: "Judul Pesan Utama",
      description: "Tuliskan isi pesan atau visi dari anggota tim di sini...",
    }
    const updated = [...currentItems, newItem]
    setSettings((prev) => (prev ? { ...prev, dari_kami_items: updated } : null))
  }

  const handleRemoveItem = (index: number) => {
    if (currentItems.length <= 1) {
      alert("Minimal harus ada 1 cerita / anggota.")
      return
    }
    if (!window.confirm(`Yakin ingin menghapus cerita dari "${currentItems[index].name}"?`)) {
      return
    }
    const updated = currentItems.filter((_, i) => i !== index)
    setSettings((prev) => (prev ? { ...prev, dari_kami_items: updated } : null))
  }

  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= currentItems.length) return
    const updated = [...currentItems]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setSettings((prev) => (prev ? { ...prev, dari_kami_items: updated } : null))
  }

  // Handle upload gambar dengan kompresi canvas otomatis agar ringan & cepat disimpan
  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string
      if (!rawDataUrl) return

      const img = new Image()
      img.onload = () => {
        const maxDim = 1000
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
          const compressed = canvas.toDataURL("image/jpeg", 0.85)
          handleUpdateItem(index, "image", compressed)
        } else {
          handleUpdateItem(index, "image", rawDataUrl)
        }
      }
      img.src = rawDataUrl
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (index: number) => {
    handleUpdateItem(index, "image", "")
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ""
    }
  }

  // Helper tampilan preview foto
  const getItemPreview = (item: DariKamiItem, idx: number) => {
    if (item.image) return item.image
    if (item.image_path) return mediaUrl(item.image_path)
    if (idx === 0) return dariDhanar
    if (idx === 1) return dariRian
    if (idx === 2) return dariRicardo
    if (idx === 3) return dariBagus
    return ""
  }

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Dari Kami</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola pesan, visi &amp; cerita dari tim pendiri di halaman Tentang Kami. Kartu nama dapat ditambah atau dikurangi, dan terhubung langsung dengan teks cerita serta foto besar di sebelah kiri.
        </p>
      </div>

      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h3 className="text-base font-bold text-white">Daftar Cerita &amp; Anggota</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Total {currentItems.length} anggota/cerita. Saat pengunjung mengklik salah satu nama, foto besar dan teks cerita akan berganti otomatis.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <Plus size={15} />
            Tambah Anggota
          </button>
        </div>

        {/* List of Dari Kami Cards */}
        <div className="space-y-6">
          {currentItems.map((item, idx) => {
            const previewImg = getItemPreview(item, idx)
            return (
              <div
                key={item.id ?? idx}
                className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-5 transition-all hover:border-white/20"
              >
                {/* Bar Atas Item */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {item.name || `Anggota #${idx + 1}`}
                    </h4>
                    <span className="text-xs text-slate-400">({item.role || "Peran"})</span>
                    {item.tag && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveItem(idx, "up")}
                      disabled={idx === 0}
                      title="Geser ke Atas"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ArrowUp size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveItem(idx, "down")}
                      disabled={idx === currentItems.length - 1}
                      title="Geser ke Bawah"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ArrowDown size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      disabled={currentItems.length <= 1}
                      title="Hapus Anggota"
                      className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer ml-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Row 1: Nama, Peran, Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-white/40"
                        value={item.name}
                        onChange={(e) => handleUpdateItem(idx, "name", e.target.value)}
                        placeholder="Contoh: Dhanar Rizky"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Peran / Posisi
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-white/40"
                        value={item.role}
                        onChange={(e) => handleUpdateItem(idx, "role", e.target.value)}
                        placeholder="Contoh: Lead"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Tag / Badge Hijau
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-white/40 font-medium"
                        value={item.tag || ""}
                        onChange={(e) => handleUpdateItem(idx, "tag", e.target.value)}
                        placeholder="Contoh: Opsi utama"
                      />
                    </div>
                  </div>

                  {/* Row 2: Judul Cerita */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Judul Cerita / Visi
                    </label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-white/40 leading-relaxed font-medium"
                      value={item.title || ""}
                      onChange={(e) => handleUpdateItem(idx, "title", e.target.value)}
                      placeholder="Contoh: Kami Membangun Spontan&#10;Jualan untuk Membantu Bisnis&#10;Anda Tumbuh"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Gunakan baris baru (Enter) untuk memecah baris judul di halaman.
                    </p>
                  </div>

                  {/* Row 3: Deskripsi Cerita */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Deskripsi Cerita / Isi Pesan
                    </label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-white/40 leading-relaxed"
                      value={item.description || ""}
                      onChange={(e) => handleUpdateItem(idx, "description", e.target.value)}
                      placeholder="Tuliskan isi pesan dari anggota tim..."
                    />
                  </div>

                  {/* Row 4: Foto Dua Kolom (Sesuai Standar Sebelum-Sebelumnya) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Foto Anggota Tim (Tampil Besar di Kiri &amp; Thumbnail di Kartu)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-white/5">
                      {/* Kolom Kiri: Unggah Gambar */}
                      <div>
                        <span className="block text-[11px] font-medium text-slate-400 mb-2">
                          Unggah File Foto
                        </span>

                        <div className="flex items-center gap-3">
                          {/* Thumbnail Preview */}
                          <div className="w-14 h-16 rounded-xl border border-white/10 bg-slate-900 flex items-center justify-center shrink-0 overflow-hidden">
                            {previewImg ? (
                              <img
                                src={previewImg}
                                alt={item.name}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold">
                                No Foto
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/svg+xml"
                              className="hidden"
                              ref={(el) => {
                                fileInputRefs.current[idx] = el
                              }}
                              onChange={(e) => handleFileUpload(idx, e)}
                            />

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRefs.current[idx]?.click()}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                              >
                                {item.image ? "Ganti foto" : "Pilih foto"}
                              </button>

                              {item.image && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                >
                                  Hapus
                                </button>
                              )}
                            </div>

                            <span className="text-[11px] text-slate-400">
                              {item.image
                                ? "Foto kustom aktif"
                                : previewImg
                                ? "Foto bawaan (default)"
                                : "Belum ada foto"}
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
                          value={item.image_path || ""}
                          onChange={(e) => handleUpdateItem(idx, "image_path", e.target.value)}
                          placeholder="team/dari-dhanar.webp atau https://..."
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                        <p className="text-[10px] text-slate-500 mt-1.5">
                          Path relatif di bucket SeaweedFS atau URL gambar langsung.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
