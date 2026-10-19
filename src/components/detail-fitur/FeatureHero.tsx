import { Link } from "react-router-dom"
import { htmlToText } from "../../lib/sanitize"
import { getYouTubeEmbedUrl } from "../../lib/utils"
import type { VideoItem } from "../../types/cms"

export interface FeatureHeroProps {
  /** Nama fitur (untuk breadcrumb) */
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
    <section className="bg-[#012708] px-4 sm:px-10 lg:px-[71px] py-14 sm:py-16 lg:py-[64px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 lg:gap-[30px]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2.5 font-poppins text-xs font-semibold text-white"
        >
          <Link to="/" className="hover:text-brand-light transition-colors">
            Beranda
          </Link>
          <span aria-hidden="true">›</span>
          <Link to="/#produk" className="hover:text-brand-light transition-colors">
            Produk
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-brand-light">{name || "Detail Fitur"}</span>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[100px]">
          <div className="w-full flex flex-col gap-5 max-w-[510px]">
            <span className="font-poppins text-xs text-white">
              {name || "Detail Fitur"}
            </span>
            <h1 className="font-poppins text-[28px] sm:text-[32px] leading-[1.25] font-semibold text-white">
              {htmlToText(title)}
            </h1>
            <p className="font-poppins text-xs leading-5 text-white/90 whitespace-pre-line">
              {htmlToText(description)}
            </p>
          </div>

          {embedUrl ? (
            <div className="w-full max-w-[514px] lg:w-[514px] h-[220px] sm:h-[270px] lg:h-[311px] shrink-0 rounded-[10px] overflow-hidden shadow-[0_4px_50px_rgba(255,255,255,0.25)]">
              <iframe
                src={embedUrl}
                title={video?.title || name || "Video fitur"}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : image ? (
            <img
              src={image}
              alt={name || "Gambar fitur utama"}
              className="w-full max-w-[514px] lg:w-[514px] h-[220px] sm:h-[270px] lg:h-[311px] shrink-0 rounded-[10px] object-cover shadow-[0_4px_50px_rgba(255,255,255,0.25)]"
            />
          ) : (
            <div
              className="w-full max-w-[514px] lg:w-[514px] h-[220px] sm:h-[270px] lg:h-[311px] shrink-0 rounded-[10px] border-2 border-dashed border-white/30 bg-white/5 shadow-[0_4px_50px_rgba(255,255,255,0.25)] flex items-center justify-center"
              role="img"
              aria-label="Placeholder gambar fitur utama"
            >
              <span className="font-poppins text-xs text-white/60">
                Gambar Fitur Utama — Placeholder
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
