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
    <section className="bg-[#F5FFF6] w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] py-[50px] flex flex-col xl:flex-row justify-between gap-10">
        
        {/* Sidebar: Keunggulan Fitur (Menyamai Topik Artikel) */}
        <div className="w-full xl:w-[220px] shrink-0 order-3 xl:order-1">
          <h3 className="text-[16px] font-bold text-black mb-[20px]">
            Keunggulan Fitur
          </h3>
          <div className="bg-[#0CAD31] rounded-[5px] px-[20px] py-[5px] flex flex-col">
            {features.map((feature, i) => {
              const isActive = feature.slug === active?.slug
              return (
                <div 
                  key={feature.id} 
                  className={`py-[15px] ${i !== features.length - 1 ? 'border-b border-white/50' : ''}`}
                >
                  <Link
                    to={`/fitur/${feature.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`block text-[12px] font-medium hover:underline transition-colors ${
                      isActive ? "text-[#E6F7E9] underline" : "text-white"
                    }`}
                  >
                    {feature.name}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Konten (Menyamai Konten Artikel) */}
        <div className="flex-1 max-w-[700px] xl:mx-auto order-2 xl:order-2">
          {/* Output HTML untuk konten */}
          <div
            className="rich-content font-poppins text-base leading-6 text-black mb-[30px]"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(active?.content) }}
          />

          {screenshot ? (
            <div className="w-full h-auto overflow-hidden rounded-[10px] mb-[30px]">
              <img
                src={screenshot}
                alt={`Screenshot ${active?.name || "fitur"}`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
        </div>

        {/* Written by (Menyamai Share & Written By) */}
        <div className="w-full xl:w-[250px] shrink-0 order-1 xl:order-3">
          <h3 className="text-[14px] font-bold text-black mb-[15px]">Written by</h3>
          <div className="flex items-center gap-[15px] mb-[15px]">
            <div className="w-[40px] h-[40px] rounded-full bg-emerald-100 text-[#0CAD31] flex items-center justify-center shrink-0">
              <i className="fa-solid fa-user text-[18px]"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-black">
                {active?.author_name || "Admin"}
              </span>
              {active?.published_date && (
                <span className="text-[12px] font-normal text-gray-500">
                  {active.published_date}
                </span>
              )}
            </div>
          </div>
          {active?.quote && (
            <p className="text-[12px] font-normal text-gray-600 leading-relaxed italic">
              "{active.quote}"
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
