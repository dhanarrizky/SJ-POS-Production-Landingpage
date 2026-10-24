import React, { useState, useRef, useMemo, useEffect } from "react"
import { Trash2, Upload, Image as ImageIcon, Save, Loader2 } from "lucide-react"
import { pb } from "../../../lib/pocketbase"
import { mediaUrl } from "../../../lib/media"
import type { SiteSettings } from "../../../types/cms"

interface MitraCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
}

export default function MitraCMSContent({ settings, setSettings }: MitraCMSContentProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentLogos = (settings.partner_logos || []).filter(img => !removedImages.includes(img))

  const selectedPreviews = useMemo(() => {
    return selectedFiles.map(file => URL.createObjectURL(file))
  }, [selectedFiles])

  useEffect(() => {
    return () => {
      selectedPreviews.forEach(url => URL.revokeObjectURL(url))
    }
  }, [selectedPreviews])

  const fallbackLogos = useMemo(() => {
    if (!settings.partner_logos_path) return []
    return settings.partner_logos_path
      .split(/[\r\n,]+/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => mediaUrl(p))
  }, [settings.partner_logos_path])

  const showFallbackPreviews = currentLogos.length === 0 && selectedFiles.length === 0 && fallbackLogos.length > 0

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...newFiles])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveExisting = (filename: string) => {
    setRemovedImages(prev => [...prev, filename])
  }

  const handleRemoveSelected = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const formData = new FormData()
      
      // Update show_partners
      formData.append("show_partners", String(settings.show_partners ?? true))

      // Update partner_logos_path (SeaweedFS fallback path)
      formData.append("partner_logos_path", settings.partner_logos_path || "")

      // Inform PocketBase about removed images using the minus modifier
      removedImages.forEach(filename => {
        formData.append("partner_logos-", filename)
      })

      if (currentLogos.length === 0 && selectedFiles.length === 0) {
        formData.append("partner_logos", "") // explicit empty string clears the multiple file field completely
      }

      // Add new files
      selectedFiles.forEach(file => {
        formData.append("partner_logos", file)
      })

      const record = await pb.collection("site_settings").update(settings.id, formData)
      const updatedData = record as unknown as SiteSettings
      
      setSettings(prev => prev ? { 
        ...prev, 
        partner_logos: updatedData.partner_logos,
        partner_logos_path: updatedData.partner_logos_path,
        show_partners: updatedData.show_partners 
      } : null)
      
      setSelectedFiles([])
      setRemovedImages([])
      alert("Berhasil menyimpan perubahan Mitra & Partner!")
    } catch (error: any) {
      console.error("Save error:", error)
      if (error?.data) {
        console.error("PocketBase Error Details:", error.data)
      }
      alert("Gagal menyimpan perubahan. Cek console.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white">Mitra & Partner (Logo)</h2>
          <p className="text-sm text-slate-400 mt-1">
            Kelola logo mitra yang berjalan (marquee) di halaman utama dan tentang kami.
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Toggle Tampilkan Bagian Mitra */}
        <div className="glass p-5 rounded-xl border border-white/10">
          <label className="flex items-center cursor-pointer mb-2">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={settings.show_partners ?? true}
                onChange={(e) => setSettings(prev => prev ? { ...prev, show_partners: e.target.checked } : prev)}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors ${settings.show_partners !== false ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.show_partners !== false ? 'transform translate-x-6' : ''}`}></div>
            </div>
            <div className="ml-3 font-semibold text-white">Tampilkan Bagian Mitra</div>
          </label>
          <p className="text-xs text-slate-400 mt-2">
            Jika dimatikan, bagian logo mitra yang berjalan di halaman utama dan tentang kami akan disembunyikan.
          </p>
        </div>

        {/* LOGO MITRA (DUA KOLOM: UNGGAH GAMBAR & PATH GAMBAR CADANGAN) */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-3">Logo Mitra</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kolom Kiri: Unggah Gambar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Unggah gambar</label>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors border border-slate-700 hover:border-slate-600 cursor-pointer"
                  >
                    <Upload size={14} /> Pilih gambar logo
                  </button>
                  {selectedFiles.length > 0 && (
                    <span className="text-xs text-amber-300 font-medium">
                      {selectedFiles.length} file baru dipilih — belum diunggah, klik Simpan.
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  JPG/PNG/WebP, maks. 5 MB. Diunggah saat klik Simpan dan menggantikan Path gambar di bawah.
                </p>
              </div>
            </div>

            {/* Kolom Kanan: Path Gambar Cadangan */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Path gambar (cadangan)</label>
              <input
                type="text"
                name="partner_logos_path"
                value={settings.partner_logos_path || ""}
                onChange={(e) => setSettings(prev => prev ? { ...prev, partner_logos_path: e.target.value } : prev)}
                placeholder="detail-produk/feature-satset.webp"
                className="w-full bg-slate-800/80 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all text-sm font-mono placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                Path RELATIF di bucket SeaweedFS, bukan URL penuh. Dipakai hanya jika tidak ada gambar yang diunggah.
              </p>
            </div>
          </div>
        </div>

        {/* DAFTAR & PREVIEW LOGO */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-300">
              Preview Logo Mitra
            </label>
            <span className="text-xs text-slate-400">
              {currentLogos.length + selectedFiles.length > 0
                ? `${currentLogos.length + selectedFiles.length} logo aktif / dipilih`
                : fallbackLogos.length > 0
                ? `${fallbackLogos.length} logo cadangan SeaweedFS`
                : "Belum ada logo"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/60 min-h-[120px]">
            {/* Logo yang sudah diunggah */}
            {currentLogos.map((filename, idx) => {
              const url = pb.files.getUrl(settings as any, filename)
              return (
                <div key={`existing-${idx}`} className="relative group bg-white rounded-xl p-3 flex items-center justify-center border border-slate-700 aspect-video shadow-sm">
                  <img src={url} alt={`Partner ${idx}`} className="max-w-full max-h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExisting(filename)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
                    title="Hapus Logo"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )
            })}

            {/* Logo baru yang dipilih tapi belum disimpan */}
            {selectedFiles.map((file, idx) => {
              const previewUrl = selectedPreviews[idx]
              return (
                <div key={`selected-${idx}`} className="relative group bg-white rounded-xl p-3 flex items-center justify-center border-2 border-amber-500/60 aspect-video shadow-sm">
                  <img src={previewUrl} alt={file.name} className="max-w-full max-h-full object-contain" />
                  <span className="absolute bottom-1 right-1 text-[9px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded shadow">
                    Baru
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSelected(idx)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
                    title="Batal Tambah"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )
            })}

            {/* Fallback previews dari SeaweedFS (hanya tampil jika tidak ada gambar yang diunggah) */}
            {showFallbackPreviews && fallbackLogos.map((url, idx) => (
              <div key={`fallback-${idx}`} className="relative group bg-white rounded-xl p-3 flex items-center justify-center border border-emerald-500/40 aspect-video shadow-sm">
                <img src={url} alt={`Cadangan ${idx}`} className="max-w-full max-h-full object-contain" />
                <span className="absolute bottom-1 right-1 text-[9px] bg-emerald-600 text-white font-medium px-1.5 py-0.5 rounded shadow">
                  Cadangan
                </span>
              </div>
            ))}

            {/* State kosong */}
            {currentLogos.length === 0 && selectedFiles.length === 0 && fallbackLogos.length === 0 && (
              <div className="col-span-full py-8 px-4 flex flex-col items-center justify-center text-center text-slate-500">
                <ImageIcon size={32} className="mb-2 text-slate-600" />
                <p className="text-sm">Belum ada logo mitra.</p>
                <p className="text-xs text-slate-600 mt-1">
                  Unggah logo di kolom sebelah kiri atau isi path cadangan di sebelah kanan.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="pt-6 border-t border-white/10">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={18} />
                Simpan Perubahan Logo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
