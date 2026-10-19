import { Play } from "lucide-react"
import type { SiteSettings } from "../types/cms"
import { getYouTubeEmbedUrl } from "../lib/utils"

export interface VideoDemoProps {
  siteSettings?: SiteSettings | null
}

export default function VideoDemo({ siteSettings }: VideoDemoProps) {
  const title = siteSettings?.demo_title || "Lihat Spontan Jualan Beraksi"
  const desc =
    siteSettings?.demo_subtitle ||
    "Kenali cara Spontan Jualan membantu pemilik usaha mengelola bisnis dengan lebih mudah. Dari mencatat transaksi hingga memantau operasional, semuanya dirancang sederhana dan praktis untuk kebutuhan usaha sehari-hari."
  const embedUrl = siteSettings?.video_demo_url
    ? getYouTubeEmbedUrl(siteSettings.video_demo_url)
    : null

  return (
    <section id="video-demo" className="bg-white py-20 scroll-mt-40 lg:scroll-mt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10">
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 max-w-sm leading-tight">
            {title}
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md">
            {desc}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {embedUrl ? (
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-card-lg">
              <iframe
                src={embedUrl}
                title={title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            // TODO: isi field `video_demo_url` di CMS (site_settings) dengan link video YouTube (landscape)
            <div
              className="aspect-video w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center gap-3 text-slate-400"
              data-placeholder="video-demo"
            >
              <span className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand">
                <Play size={20} className="ml-0.5" fill="currentColor" />
              </span>
              <span className="text-sm text-center px-6">
                Video Demo Spontan Jualan (Landscape, dari YouTube)
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
