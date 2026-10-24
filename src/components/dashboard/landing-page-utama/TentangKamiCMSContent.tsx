import { useRef, useMemo, useEffect, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import { Trash2, Image as ImageIcon } from "lucide-react"
import type { SiteSettings } from "../../../types/cms"
import { mediaUrl, pbFileUrl } from "../../../lib/media"

interface TentangKamiCMSContentProps {
  settings: SiteSettings
  setSettings: Dispatch<SetStateAction<SiteSettings | null>>
}

export default function TentangKamiCMSContent({ settings, setSettings }: TentangKamiCMSContentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => prev ? { ...prev, [field]: value } : null)
  }

  const checklist = Array.isArray(settings.about_checklist) && settings.about_checklist.length > 0
    ? settings.about_checklist 
    : [
        { title: "Teknologi Sederhana", desc: "Intuitif dan mudah digunakan untuk operasional harian." },
        { title: "Solusi Kebutuhan Nyata", desc: "Dirancang langsung dari permasalahan asli pelaku usaha." },
        { title: "Adaptasi Tanpa Rumit", desc: "Go-digital dengan mulus tanpa proses yang membingungkan." },
        { title: "Terhubung dengan Peluang", desc: "Membuka akses ke berbagai solusi untuk akselerasi bisnis." },
        { title: "Ekosistem Terintegrasi", desc: "Menyatukan bisnis, operasional, dan pelanggan dalam satu wadah." }
      ]

  const handleAddChecklist = () => {
    handleChange("about_checklist", [...checklist, { title: "", desc: "" }])
  }

  const handleUpdateChecklist = (index: number, field: "title" | "desc", val: string) => {
    const newList = [...checklist]
    newList[index] = { ...newList[index], [field]: val }
    handleChange("about_checklist", newList)
  }

  const handleRemoveChecklist = (index: number) => {
    handleChange("about_checklist", checklist.filter((_, i) => i !== index))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleChange("about_image", file)
  }

  const handleRemoveImage = () => {
    handleChange("about_image", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Preview URL: File blob or PocketBase URL
  const previewUrl = useMemo(() => {
    if (settings.about_image instanceof File) {
      return URL.createObjectURL(settings.about_image)
    }
    if (typeof settings.about_image === "string" && settings.about_image) {
      return pbFileUrl(settings, settings.about_image) || `http://127.0.0.1:8090/api/files/site_settings/${settings.id}/${settings.about_image}`
    }
    return ""
  }, [settings.about_image, settings.id])

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  // Display preview: uploaded image first, then fallback SeaweedFS path
  const fallbackPreview = settings.about_image_path ? mediaUrl(settings.about_image_path) : ""
  const displayPreview = previewUrl || fallbackPreview

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
        Tentang Kami
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Subjudul (Kicker Text)
          </label>
          <input
            type="text"
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            value={settings.about_subtitle !== undefined ? settings.about_subtitle : "Komitmen Kami"}
            onChange={(e) => handleChange("about_subtitle", e.target.value)}
            placeholder="Contoh: Komitmen Kami"
          />
        </div>

        {/* GAMBAR TENTANG KAMI (DUA KOLOM: UNGGAH GAMBAR & PATH GAMBAR CADANGAN) */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Gambar Tentang Kami
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kolom Kiri: Unggah Gambar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Unggah gambar</label>
              <div className="flex items-center gap-3">
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 flex items-center justify-center p-1.5">
                  {displayPreview ? (
                    <img src={displayPreview} alt="About" className="max-h-full max-w-full object-cover rounded-lg" />
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
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-white/10 hover:border-white/20 cursor-pointer"
                    >
                      {previewUrl ? "Ganti gambar" : "Pilih gambar"}
                    </button>
                    {previewUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} /> Hapus
                      </button>
                    )}
                  </div>
                  {settings.about_image instanceof File && (
                    <span className="text-[10px] text-amber-300">
                      {settings.about_image.name} ({Math.round(settings.about_image.size / 1024)} KB) — belum diunggah, klik Simpan.
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
                value={settings.about_image_path || ""}
                onChange={(e) => handleChange("about_image_path", e.target.value)}
                placeholder="detail-produk/feature-satset.webp"
                className="w-full bg-slate-800 border border-white/10 focus:border-brand focus:ring-1 focus:ring-brand rounded-xl px-4 py-3 text-white outline-none transition-all text-sm font-mono placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                Path RELATIF di bucket SeaweedFS, bukan URL penuh. Dipakai hanya jika tidak ada gambar yang diunggah.
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Judul Utama
          </label>
          <textarea
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all min-h-[80px]"
            value={settings.about_title !== undefined ? settings.about_title : "Membangun Ekosistem,\nMenghubungkan Bisnis"}
            onChange={(e) => handleChange("about_title", e.target.value)}
            placeholder="Contoh: Membangun Ekosistem, Menghubungkan Bisnis"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Deskripsi
          </label>
          <textarea
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all min-h-[120px]"
            value={settings.about_desc !== undefined ? settings.about_desc : "Hadir membangun ekosistem digital untuk membantu bisnis Indonesia tumbuh, berkembang, dan terhubung dengan lebih mudah."}
            onChange={(e) => handleChange("about_desc", e.target.value)}
          />
        </div>

        <div className="pt-4 border-t border-white/10">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Poin Komitmen (Checklist)
          </label>
          <div className="space-y-4">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-slate-800 p-4 rounded-xl border border-white/10">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                    value={item.title}
                    onChange={(e) => handleUpdateChecklist(idx, "title", e.target.value)}
                    placeholder="Judul Poin"
                  />
                  <input
                    type="text"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                    value={item.desc}
                    onChange={(e) => handleUpdateChecklist(idx, "desc", e.target.value)}
                    placeholder="Deskripsi Poin"
                  />
                </div>
                <button
                  onClick={() => handleRemoveChecklist(idx)}
                  className="bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 border border-white/10 hover:border-rose-500/50 p-3 rounded-lg transition-all flex items-center justify-center shrink-0"
                  title="Hapus poin"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddChecklist}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-brand text-sm font-semibold transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            Tambah Poin
          </button>
        </div>

        <div className="pt-4 border-t border-white/10">
          <label className="block text-sm font-semibold text-slate-300 mb-4">
            Statistik Kami
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Mitra Aktif</label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand transition-all"
                value={settings.about_mitra_aktif || ""}
                onChange={(e) => handleChange("about_mitra_aktif", e.target.value)}
                placeholder="Misal: 120+"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Pengguna Aktif</label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand transition-all"
                value={settings.about_pengguna_aktif || ""}
                onChange={(e) => handleChange("about_pengguna_aktif", e.target.value)}
                placeholder="Misal: 1.000+"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Lama Kemitraan</label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand transition-all"
                value={settings.about_lama_kemitraan || ""}
                onChange={(e) => handleChange("about_lama_kemitraan", e.target.value)}
                placeholder="Misal: 1 Tahun"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Rating Kepuasan</label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand transition-all"
                value={settings.about_rating || ""}
                onChange={(e) => handleChange("about_rating", e.target.value)}
                placeholder="Misal: 4.9/5"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
