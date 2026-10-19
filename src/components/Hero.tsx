import { Globe, Check } from "lucide-react"
import POSMockup from "./POSMockup"
import type { SiteSettings } from "../types/cms"

export interface HeroProps {
  siteSettings?: SiteSettings | null
}

export default function Hero({ siteSettings }: HeroProps) {
  const displayBenefits = siteSettings?.hero_benefits
  const ctaLabel = siteSettings?.hero_cta_label || "Mulai Via Web"
  const ctaLink =
    siteSettings?.hero_cta_link || siteSettings?.header_login_link || "#"
  const title = siteSettings?.hero_title || "Kelola Usaha Lebih Mudah,"
  const titleHighlight =
    siteSettings?.hero_title_highlight || "Jualan Lebih Spontan"
  const subtitle =
    siteSettings?.hero_subtitle ||
    "Satu ekosistem digital untuk membantu UMKM mengelola kasir, transaksi, pesanan, laundry, dan operasional usaha tanpa ribet."

  return (
    <section className="relative bg-white pt-40 lg:pt-44 pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Copy side */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-[2.2rem] sm:text-[2.6rem] lg:text-[2.9rem] font-black text-slate-900 leading-[1.15] tracking-[-0.02em] mb-5">
              {title} <span className="text-brand">{titleHighlight}</span>
            </h1>

            <p className="text-slate-500 text-[1.05rem] leading-relaxed mb-8 max-w-[520px]">
              {subtitle}
            </p>

            {/* CTA */}
            <div className="mb-8">
              <a
                id="hero-cta-web"
                href={ctaLink}
                className="inline-flex items-center justify-center gap-2.5 text-white font-bold px-7 py-3.5 rounded-full text-[0.95rem] btn-shimmer shadow-emerald"
              >
                <Globe size={16} /> {ctaLabel}
              </a>
            </div>

            {/* Trust badges */}
            {displayBenefits && displayBenefits.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {displayBenefits.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-2 text-sm text-slate-500 select-none"
                  >
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-brand text-white">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Visual side */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none flex justify-center">
            <div className="relative w-full max-w-[480px]">
              {/* Main POS window */}
              <div className="animate-float-a rounded-[20px] overflow-hidden shadow-screen h-[400px]">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900 border-b border-white/10 select-none">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <div className="flex-1 mx-3 rounded-md h-6 flex items-center px-3 border border-white/10 bg-white/5">
                    <span className="font-mono text-slate-400 text-[11px]">
                      ⚡ spontanjualan.com
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand pulse-dot" />
                    <span className="font-mono text-slate-400 text-[10px]">
                      LIVE
                    </span>
                  </div>
                </div>
                <div className="h-[calc(100%-44px)]">
                  <POSMockup />
                </div>
              </div>

              {/* Floating card: free period */}
              <div className="hidden sm:block absolute -left-6 top-12 bg-[#0f172a] border border-white/10 rounded-2xl px-4 py-3 animate-float-b shadow-screen z-10 min-w-[170px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand pulse-dot" />
                  <span className="text-slate-300 font-medium text-[11px]">
                    Periode Gratis
                  </span>
                </div>
                <div className="font-mono text-xl font-black text-white mb-0.5">
                  6 Bulan
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-emerald-400 font-semibold text-[11px]">
                    Tanpa kartu kredit ✓
                  </span>
                </div>
              </div>

              {/* Floating card: products */}
              <div className="hidden sm:block absolute -right-6 bottom-20 bg-[#0f172a] border border-white/10 rounded-2xl px-4 py-3 animate-float-b-delay shadow-screen z-10 min-w-[190px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-emerald-400">🛒</span>
                  <span className="text-slate-300 font-semibold text-[11px]">
                    Pilih Produk Anda
                  </span>
                </div>
                <div className="space-y-1">
                  {["POS Retail", "POS F&B", "POS Laundry"].map((p) => (
                    <div key={p} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      <span className="font-bold text-white text-[12px]">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge: early partner */}
              <div className="hidden sm:block absolute right-4 top-2 bg-[#0f172a] border border-white/10 rounded-xl px-3 py-2 z-10 animate-float-b-delay2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand pulse-dot" />
                  <span className="font-mono text-white font-semibold text-[11px]">
                    100 Mitra Pertama · Early Partner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
