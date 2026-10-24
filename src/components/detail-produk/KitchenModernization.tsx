import { Monitor, Timer, BarChart3 } from "lucide-react"
import { dpImage, dpSection } from "../../lib/detailProduk"
import type { SiteSettings } from "../../types/cms"
import LazyImage from "./LazyImage"

const kdsIcons = [Monitor, Timer, BarChart3]

export default function KitchenModernization({
  settings,
}: {
  settings?: SiteSettings | null
}) {
  const c = dpSection(settings, "dp_dapur")
  const dapurImg = dpImage(settings, "dp_dapur_image")
  return (
    <section>
      <div className="bg-brand-lightest py-[50px] px-4 sm:px-[71px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[145px]">
          {/* Copy side */}
          <div className="w-full flex flex-col gap-5 max-w-[392px]">
            <span className="font-poppins text-base font-semibold text-brand">
              {c.badge}
            </span>
            <div className="flex flex-col gap-5">
              <h2 className="font-poppins text-[28px] sm:text-[40px] leading-[1.3] sm:leading-[60px] tracking-[-1.38px] font-semibold text-slate-900">
                {c.title}
              </h2>
              <p className="font-poppins text-base leading-6 text-slate-900">
                {c.desc}
              </p>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative w-full max-w-[759px]">
            {/* Gambar disembunyikan di mobile, tampil dari sm: ke atas (tablet & desktop) */}
            <div className="hidden sm:block relative aspect-[759/567]">
              <LazyImage
                src={dapurImg}
                alt="Aktivitas dapur modern"
                className="absolute left-[5.8%] top-[4.76%] w-[94.2%] h-[76.4%] object-cover"
                style={{
                  clipPath:
                    "polygon(1.3% 49.4%, 2.2% 46.1%, 3.8% 41.3%, 6.0% 36.5%, 8.4% 32.4%, 10.4% 29.2%, 13.4% 25.5%, 16.4% 22.3%, 18.3% 20.3%, 21.4% 17.6%, 23.4% 16.0%, 25.5% 14.4%, 28.5% 12.6%, 30.5% 11.3%, 32.5% 10.0%, 34.3% 9.0%, 36.5% 7.9%, 38.5% 7.1%, 40.5% 6.1%, 42.6% 5.3%, 45.2% 4.2%, 46.6% 3.7%, 49.6% 2.9%, 51.6% 2.4%, 53.6% 1.8%, 55.6% 1.5%, 58.7% 0.8%, 60.7% 0.5%, 63.7% 0.2%, 65.7% 0.2%, 68.7% 0.2%, 71.7% 0.3%, 74.7% 0.5%, 78.8% 1.5%, 81.8% 2.6%, 85.8% 4.8%, 88.8% 7.6%, 91.2% 10.6%, 94.1% 15.5%, 95.4% 18.7%, 97.3% 25.2%, 97.9% 27.6%, 98.9% 33.9%, 99.3% 38.1%, 99.9% 46.6%, 100.0% 52.6%, 100.0% 57.4%, 99.7% 63.9%, 99.0% 68.7%, 98.9% 69.8%, 97.4% 75.2%, 95.8% 80.0%, 93.1% 84.8%, 90.5% 88.1%, 87.0% 91.3%, 83.8% 93.4%, 80.8% 95.0%, 77.8% 96.5%, 74.7% 97.4%, 71.7% 98.1%, 68.7% 98.5%, 65.7% 99.0%, 62.7% 99.4%, 60.7% 99.5%, 58.7% 99.7%, 55.6% 99.7%, 53.6% 99.7%, 50.6% 99.8%, 48.6% 99.8%, 46.6% 99.8%, 43.6% 99.8%, 41.5% 100.0%, 39.5% 100.0%, 36.5% 99.7%, 33.5% 99.8%, 31.5% 99.7%, 28.5% 99.7%, 24.4% 99.2%, 21.4% 98.5%, 17.4% 97.3%, 14.4% 95.8%, 10.4% 92.9%, 7.3% 89.8%, 5.2% 86.5%, 3.3% 82.4%, 2.0% 78.4%, 0.6% 71.9%, 0.3% 68.4%, 0.1% 63.9%, 0.3% 57.4%, 0.8% 52.6%)",
                  filter: "drop-shadow(0 4px 50px rgba(0,0,0,0.25))",
                }}
              />
            </div>

            {/* HP: kartu normal. Tablet (sm, md, lg): disembunyikan. Laptop/Desktop (xl): kartu tampil normal atau overlay */}
            <div className="flex flex-col sm:hidden xl:flex xl:flex-row gap-4 xl:gap-[30px] xl:absolute xl:top-[52.4%] xl:left-0 xl:right-0 xl:bottom-0">
              {c.kds_items.map(({ title, desc }, i) => {
                const Icon = kdsIcons[i]
                return (
                <div
                  key={title}
                  className="flex-1 bg-white rounded-[20px] p-4 lg:p-[30px] flex flex-col gap-3 lg:gap-5"
                >
                  <span className="w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-full bg-brand text-white flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 lg:w-[30px] lg:h-[30px]" />
                  </span>
                  <div className="flex flex-col gap-1 lg:gap-2.5">
                    <h3 className="font-poppins text-sm lg:text-base font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="font-poppins text-xs lg:text-base leading-snug lg:leading-6 text-slate-900">
                      {desc}
                    </p>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Seating banner */}
      <div className="bg-[#012708] py-[50px] px-4 sm:px-[71px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-[183px]">
          <div className="w-full flex flex-col gap-5 max-w-[471px]">
            <h3 className="font-poppins text-xl leading-[30px] font-semibold text-white">
              {c.seating_title}
            </h3>
            <p className="font-poppins text-base leading-6 text-white">
              {c.seating_desc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-row gap-4 lg:gap-[30px] w-full lg:w-auto">
            {c.seating_stats.map((s) => (
              <div
                key={s.label}
                className="bg-brand-lightest rounded-[20px] p-[30px] sm:p-4 lg:p-[30px] flex flex-col gap-2.5 w-full sm:flex-1 lg:w-[307px] min-h-[196px] sm:min-h-[140px] lg:min-h-[196px]"
              >
                <div className="font-poppins text-xl sm:text-base lg:text-xl leading-[30px] sm:leading-relaxed lg:leading-[30px] font-semibold text-brand">
                  {s.value}
                </div>
                <div className="flex flex-col gap-5 sm:gap-2 lg:gap-5">
                  <h4 className="font-poppins text-lg sm:text-sm lg:text-lg leading-[27px] sm:leading-tight lg:leading-[27px] font-semibold text-slate-900">
                    {s.label}
                  </h4>
                  <p className="font-poppins text-base sm:text-xs lg:text-base leading-6 sm:leading-snug lg:leading-6 text-slate-900">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
