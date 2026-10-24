import { htmlToText } from "../../lib/sanitize"
import { getYouTubeEmbedUrl } from "../../lib/utils"
import type { VideoItem } from "../../types/cms"

export interface FeatureHeroProps {
  /** Nama fitur */
  name?: string
  /** Teks biasa (HTML lama otomatis dibersihkan) */
  title?: string
  /** Teks biasa, boleh multi-baris */
  description?: string
  /** Gambar statis (lihat featureImages.ts) */
  image?: string
  /** Video YouTube fitur ini; menggantikan gambar/placeholder bila ada */
  video?: VideoItem | null
}

export default function FeatureHero({
  name,
  title,
  description,
  image,
  video,
}: FeatureHeroProps) {
  const embedUrl = video?.youtube_url
    ? getYouTubeEmbedUrl(video.youtube_url)
    : null

  return (
    <section className="bg-[#012708] w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] pt-[50px] pb-[50px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-[70px]">
          {/* Kiri: Teks */}
          <div className="flex flex-col w-full md:w-1/2 max-w-[600px]">
            <span className="text-[#0CAD31] text-[12px] font-bold mb-4">
              Detail Fitur
            </span>
            <h1 className="text-white text-[32px] font-bold leading-tight mb-6">
              {htmlToText(title)}
            </h1>
            <p className="text-white text-[12px] font-normal leading-relaxed mb-8 whitespace-pre-line">
              {htmlToText(description)}
            </p>
          </div>

          {/* Kanan: Media (Gambar / Video) */}
          <div className="w-full md:w-1/2 xl:w-[514px] shrink-0 md:shrink">
            <div className="w-full aspect-[514/311] rounded-[10px] shadow-[0_4px_50px_rgba(255,255,255,0.25)] overflow-hidden bg-white/5 flex items-center justify-center">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video?.title || name || "Video fitur"}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : image ? (
                <img
                  src={image}
                  alt={name || "Gambar fitur utama"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-poppins text-xs text-white/60">
                  Gambar Fitur Utama — Placeholder
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
