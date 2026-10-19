import { Link } from "react-router-dom"
import type { FeaturePage } from "../../types/cms"
import { sanitizeHtml } from "../../lib/sanitize"

export interface FeatureDetailBodyProps {
  /** Semua fitur aktif untuk sidebar "Keunggulan Fitur" */
  features: FeaturePage[]
  /** Fitur yang sedang dibuka */
  active?: FeaturePage
  /** Screenshot statis (lihat featureImages.ts) */
  screenshot?: string
}

export default function FeatureDetailBody({
  features,
  active,
  screenshot,
}: FeatureDetailBodyProps) {
  return (
    <section className="bg-[#F5FFF6] px-4 sm:px-10 lg:px-[177px] py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-[50px]">
        {/* Written by */}
        <div className="w-full lg:w-[180px] shrink-0 flex flex-col gap-5 lg:order-3">
          <span className="font-poppins text-xs font-semibold text-slate-900">
            Written by
          </span>
          <div className="flex items-center gap-5">
            <div
              className="w-10 h-10 rounded-full border-2 border-dashed border-brand/40 bg-brand-lightest shrink-0"
              role="img"
              aria-label="Placeholder foto penulis"
            />
            <div className="flex flex-col gap-2.5">
              <span className="font-poppins text-xs font-semibold text-slate-900">
                {active?.author_name || "Admin"}
              </span>
              {active?.published_date && (
                <span className="font-poppins text-xs text-slate-900">
                  {active.published_date}
                </span>
              )}
            </div>
          </div>
          {active?.quote && (
            <p className="font-poppins text-xs leading-[18px] text-slate-900">
              &ldquo;{active.quote}&rdquo;
            </p>
          )}
        </div>

        {/* Konten: isi dari CMS + video + screenshot */}
        <div className="w-full lg:flex-1 lg:max-w-[594px] flex flex-col gap-5 lg:order-2">
          <div
            className="rich-content font-poppins text-base leading-6 text-slate-900"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(active?.content) }}
          />

          {screenshot ? (
            <img
              src={screenshot}
              alt={`Screenshot ${active?.name || "fitur"}`}
              className="w-full aspect-[594/377] rounded-[10px] object-cover"
            />
          ) : (
            <div
              className="w-full aspect-[594/377] rounded-[10px] border-2 border-dashed border-brand/40 bg-brand-lightest flex items-center justify-center"
              role="img"
              aria-label="Placeholder screenshot fitur"
            >
              <span className="font-poppins text-xs text-brand-dark">
                Screenshot Fitur — Placeholder
              </span>
            </div>
          )}
        </div>

        {/* Sidebar: Keunggulan Fitur */}
        <div className="w-full lg:w-[212px] shrink-0 flex flex-col gap-2.5 lg:order-1">
          <span className="font-poppins text-xs font-semibold text-slate-900">
            Keunggulan Fitur
          </span>
          <div className="rounded-[5px] bg-brand px-6 py-5 flex flex-col">
            {features.map((feature, i) => {
              const isActive = feature.slug === active?.slug
              return (
                <div key={feature.id}>
                  <Link
                    to={`/fitur/${feature.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`block w-full text-left py-2.5 font-poppins text-[8px] font-semibold leading-[12px] transition-colors hover:underline hover:text-brand-light ${
                      isActive ? "text-brand-light underline" : "text-white"
                    }`}
                  >
                    {feature.name}
                  </Link>
                  {i < features.length - 1 && (
                    <div className="h-px w-full bg-white/50" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
