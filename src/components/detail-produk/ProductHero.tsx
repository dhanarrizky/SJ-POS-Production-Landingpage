import { ArrowRight, Package } from "lucide-react"
import { Link } from "react-router-dom"
import { dpImage, dpSection } from "../../lib/detailProduk"
import type { SiteSettings } from "../../types/cms"
import LazyImage from "./LazyImage"

export default function ProductHero({
  settings,
}: {
  settings?: SiteSettings | null
}) {
  const c = dpSection(settings, "dp_hero")
  const heroBgImg = dpImage(settings, "dp_hero_image")
  return (
    <section className="relative overflow-hidden w-full min-h-[520px] sm:min-h-[560px] lg:aspect-[1440/616] lg:h-auto lg:min-h-[520px]">
      <LazyImage
        priority
        src={heroBgImg}
        alt="Operasional kasir POS di restoran & kafe"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 z-10 flex items-center py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-[71px] w-full">
          <div className="flex flex-col gap-5 mb-[30px]">
            <span className="font-poppins text-base font-bold text-white">
              {c.badge}
            </span>
            <div className="flex flex-col gap-5">
              <h1 className="w-full font-poppins text-[28px] sm:text-[40px] leading-[1.3] sm:leading-[60px] tracking-[-1.38px] font-semibold text-white max-w-3xl">
                {c.title}
              </h1>
              <p className="w-full font-poppins text-base leading-6 font-medium text-white max-w-[577px]">
                {c.desc}
              </p>
            </div>
          </div>
          <Link
            to={c.btn_link || "/bandingkan-paket"}
            className="group btn-shimmer shadow-emerald inline-flex items-center gap-2.5 text-white font-poppins font-semibold px-[30px] py-[15px] rounded-full text-base border border-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Package size={24} /> {c.btn_label}
            <ArrowRight
              size={18}
              className="shrink-0 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
