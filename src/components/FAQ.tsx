import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-start justify-between gap-4 cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-900 text-sm leading-relaxed">
          {q}
        </span>
        <span className="flex-shrink-0 mt-0.5 text-slate-400">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {open && (
        <div className="pt-4">
          {a.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-slate-500 text-sm leading-relaxed mb-3 last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export interface FAQProps {
  faqs?: {
    question: string
    answer: string
  }[]
}

export default function FAQ({ faqs = [] }: FAQProps) {
  if (!faqs || faqs.length === 0) return null

  const displayFaqs = faqs.map((f) => ({ q: f.question, a: f.answer }))

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayFaqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  }

  return (
    <section id="faq" className="bg-white py-20 scroll-mt-40 lg:scroll-mt-44">
      {/* Dynamic SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900">FAQs</h2>
          </div>
          <div className="lg:col-span-2 border-t border-slate-200">
            {displayFaqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
