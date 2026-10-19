import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Testimonial, SiteSettings } from "../types/cms"

export interface TestimonialsProps {
  testimonials?: Testimonial[]
  siteSettings?: SiteSettings | null
}

export default function Testimonials({
  testimonials = [],
  siteSettings,
}: TestimonialsProps) {
  const [index, setIndex] = useState(0)

  if (!testimonials || testimonials.length === 0) return null

  const title = siteSettings?.feedback_title || "Customer Feedback"
  const subtitle =
    siteSettings?.feedback_subtitle ||
    "Ribuan Pemilik Usaha Sudah Merasakan Manfaatnya"

  const total = testimonials.length
  const current = testimonials[index]

  const goPrev = () => setIndex((i) => (i - 1 + total) % total)
  const goNext = () => setIndex((i) => (i + 1) % total)

  return (
    <section id="feedback" className="bg-white py-20 scroll-mt-20 lg:scroll-mt-22">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: heading + pagination */}
          <div>
            <p className="font-mono text-sm text-slate-400 mb-3">
              {index + 1}/{total}
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4">
              {title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-sm">
              {subtitle}
            </p>

            <div className="flex gap-3">
              <button
                onClick={goPrev}
                aria-label="Feedback sebelumnya"
                className="w-11 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                aria-label="Feedback berikutnya"
                className="w-11 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right: active feedback card */}
          <div className="bg-slate-100 rounded-2xl p-10 text-center min-h-[420px] flex flex-col justify-center">
            {/* Avatar default untuk mitra yang belum punya foto profil */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-lg mx-auto mb-5"
              style={{ backgroundColor: current.bg || "#0cad31" }}
            >
              {current.initials || current.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="font-bold text-slate-900">{current.name}</div>
            {current.role && (
              <div className="text-sm text-slate-500 mb-6">
                {current.role}
              </div>
            )}

            <p className="text-slate-600 italic leading-relaxed mb-6">
              &ldquo;{current.quote || ""}&rdquo;
            </p>

            {current.loc && (
              <>
                <div className="text-xs text-slate-400 uppercase tracking-wide">
                  Location
                </div>
                <div className="font-bold text-slate-700">{current.loc}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
