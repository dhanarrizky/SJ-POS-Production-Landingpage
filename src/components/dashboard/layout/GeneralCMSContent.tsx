import React, { useRef } from "react"
import { Trash2, Image as ImageIcon } from "lucide-react"
import type { SiteSettings } from "../../../types/cms"
import { mediaUrl } from "../../../lib/media"

interface Props {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  previewLogo: string | null
  setPreviewLogo: (val: string | null) => void
  selectedLogoFile: File | null
  setSelectedLogoFile: (file: File | null) => void
}

export default function GeneralCMSContent({
  settings,
  setSettings,
  previewLogo,
  setPreviewLogo,
  selectedLogoFile,
  setSelectedLogoFile,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings((prev) => (prev ? { ...prev, [name]: value } : prev))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedLogoFile(file)
    const url = URL.createObjectURL(file)
    setPreviewLogo(url)
  }

  const handleRemoveLogo = () => {
    setSelectedLogoFile(null)
    setPreviewLogo(null)
    setSettings((prev) => (prev ? { ...prev, logo: "" } : prev))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Display preview: uploaded file / previewLogo first, or fallback from SeaweedFS path
  const fallbackPreview = settings.logo_path ? mediaUrl(settings.logo_path) : ""
  const displayPreview = previewLogo || fallbackPreview

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-bold text-white mb-4">Identitas Global</h3>
      <p className="text-sm text-slate-400 mb-6">
        Pengaturan ini bersifat &quot;General&quot;, artinya jika diubah di sini, akan otomatis berubah di seluruh halaman (Navbar, Footer, dll).
      </p>

      <div className="space-y-6 max-w-3xl">
        {/* LOGO UTAMA (DUA KOLOM: UNGGAH GAMBAR & PATH GAMBAR CADANGAN) */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-3">Logo Utama</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kolom Kiri: Unggah Gambar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Unggah gambar</label>
              <div className="flex items-center gap-3">
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-700 bg-slate-800/80 flex items-center justify-center p-1.5">
                  {displayPreview ? (
                    <img src={displayPreview} alt="Logo" className="max-h-full max-w-full object-contain" />
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
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-700 hover:border-slate-600 cursor-pointer"
                    >
                      {previewLogo ? "Ganti gambar" : "Pilih gambar"}
                    </button>
                    {previewLogo && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} /> Hapus
                      </button>
                    )}
                  </div>
                  {selectedLogoFile && (
                    <span className="text-[10px] text-amber-300">
                      {selectedLogoFile.name} ({Math.round(selectedLogoFile.size / 1024)} KB) — belum diunggah, klik Simpan.
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
                name="logo_path"
                value={settings.logo_path || ""}
                onChange={handleChange}
                placeholder="detail-produk/feature-satset.webp"
                className="w-full bg-slate-800/80 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all text-sm font-mono placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                Path RELATIF di bucket SeaweedFS, bukan URL penuh. Dipakai hanya jika tidak ada gambar yang diunggah.
              </p>
            </div>
          </div>
        </div>

        {/* SITE NAME */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Teks Logo (Site Name)</label>
          <input
            type="text"
            name="site_name"
            value={settings.site_name || ""}
            onChange={handleChange}
            className="w-full bg-slate-800/80 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
            placeholder="Contoh: SpontanJualan"
          />
          <p className="text-xs text-slate-500 mt-1">Ditampilkan di sebelah ikon logo pada Navbar &amp; Footer.</p>
        </div>

        {/* CONTACT EMAIL */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Email Utama (General)</label>
          <input
            type="email"
            name="contact_email"
            value={settings.contact_email || ""}
            onChange={handleChange}
            className="w-full bg-slate-800/80 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
            placeholder="Contoh: hello@spontanjualan.com"
          />
          <p className="text-xs text-slate-500 mt-1">Email resmi yang terhubung ke seluruh sistem.</p>
        </div>
      </div>
    </div>
  )
}
