import React from "react"
import { Video, Save, Loader2, PlaySquare } from "lucide-react"
import { getYouTubeEmbedUrl } from "../../../lib/media"
import type { SiteSettings } from "../../../types/cms"

interface VideoDemoCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export default function VideoDemoCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: VideoDemoCMSContentProps) {
  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const embedPreviewUrl = getYouTubeEmbedUrl(
    settings.video_demo_url,
    "https://www.youtube.com/embed/BJxfee8_Q4k?si=TR19zEbsUgioPslX"
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white">Video Demo</h2>
          <p className="text-sm text-slate-400 mt-1">
            Kelola teks judul, deskripsi, dan URL video YouTube untuk bagian Video Demo di Landing Page Utama.
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* JUDUL VIDEO DEMO */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Judul Video Demo
          </label>
          <textarea
            rows={2}
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all font-medium"
            value={settings.demo_title !== undefined ? settings.demo_title : "Lihat Spontan Jualan\nBeraksi"}
            onChange={(e) => handleChange("demo_title", e.target.value)}
            placeholder={"Lihat Spontan Jualan\nBeraksi"}
          />
          <p className="text-xs text-slate-500 mt-1">
            Gunakan tombol Enter untuk memisahkan baris jika diinginkan (seperti pada tampilan aslinya).
          </p>
        </div>

        {/* DESKRIPSI VIDEO DEMO */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Deskripsi Video Demo
          </label>
          <textarea
            rows={4}
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm leading-relaxed"
            value={
              settings.demo_subtitle !== undefined
                ? settings.demo_subtitle
                : "Kenali cara Spontan Jualan membantu pemilik usaha mengelola bisnis dengan lebih mudah. Dari mencatat transaksi hingga memantau operasional, semuanya dirancang sederhana dan praktis untuk kebutuhan usaha sehari-hari."
            }
            onChange={(e) => handleChange("demo_subtitle", e.target.value)}
            placeholder="Kenali cara Spontan Jualan membantu pemilik usaha mengelola bisnis dengan lebih mudah..."
          />
          <p className="text-xs text-slate-500 mt-1">
            Teks pengantar di samping judul yang menjelaskan cuplikan video.
          </p>
        </div>

        {/* URL VIDEO YOUTUBE */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
            <Video size={16} className="text-red-400" />
            URL Video YouTube
          </label>
          <input
            type="text"
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm font-mono placeholder:text-slate-500"
            value={settings.video_demo_url || ""}
            onChange={(e) => handleChange("video_demo_url", e.target.value)}
            placeholder="https://www.youtube.com/watch?v=BJxfee8_Q4k"
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Mendukung link YouTube biasa (<code>watch?v=...</code>), link pendek (<code>youtu.be/...</code>), maupun link embed.
          </p>
        </div>

        {/* PREVIEW VIDEO */}
        <div className="pt-2">
          <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
            <PlaySquare size={16} className="text-emerald-400" />
            Preview Pemutar Video
          </label>
          <div className="w-full max-w-xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-950/80 shadow-lg relative">
            <iframe
              className="w-full h-full"
              src={embedPreviewUrl}
              title="YouTube Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        {/* TOMBOL SIMPAN (JIKA ONSAVE TERSEDIA) */}
        {onSave && (
          <div className="pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onSave}
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
                  Simpan Video Demo
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
