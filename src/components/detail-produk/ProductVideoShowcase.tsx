import { mediaUrl } from "../../lib/media"
import LazyImage from "./LazyImage"

const videoThumbImg = mediaUrl("detail-produk/video-thumb.jpeg")
import type { VideoItem } from "../../types/cms"
import { getYouTubeEmbedUrl } from "../../lib/utils"

export interface ProductVideoShowcaseProps {
  video?: VideoItem | null
}

export default function ProductVideoShowcase({
  video,
}: ProductVideoShowcaseProps) {
  const title =
    video?.title || "Lihat Cara Spontan Jualan Kelola Bisnis F&B Anda"
  const desc =
    video?.subtitle ||
    "Dari catat pesanan pelanggan, atur varian menu, sampai kontrol stok bahan baku semuanya tersaji dalam satu sistem yang simpel dan siap tingkatkan kecepatan layanan resto Anda."
  const embedUrl = video?.youtube_url
    ? getYouTubeEmbedUrl(video.youtube_url)
    : null

  return (
    <section className="bg-brand-lightest py-[50px] px-4 sm:px-[71px]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-[50px]">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-[216px]">
          <h2 className="font-poppins text-[28px] sm:text-[40px] leading-[1.3] sm:leading-[55px] font-semibold text-brand max-w-[546px]">
            {title}
          </h2>
          <p className="font-poppins text-lg leading-[30px] text-slate-900 max-w-[536px]">
            {desc}
          </p>
        </div>

        {embedUrl ? (
          <div className="relative w-full max-w-[916px] aspect-[916/500] rounded-[20px] overflow-hidden shadow-[0_4px_50px_rgba(0,0,0,0.25)]">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          // Fallback saat link YouTube belum diisi di CMS (collection `videos`, placement "produk:<slug>")
          <div className="relative w-full max-w-[916px] aspect-[916/500] rounded-[20px] overflow-hidden shadow-[0_4px_50px_rgba(0,0,0,0.25)]">
            <LazyImage
              src={videoThumbImg}
              alt="Demo Spontan Jualan dikelola langsung dari tablet"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
