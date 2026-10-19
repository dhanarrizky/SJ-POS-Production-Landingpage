
export interface TrustMarqueeProps {
  brands: string[]
}

export default function TrustMarquee({ brands }: TrustMarqueeProps) {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <p className="text-center font-mono text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Telah dipercaya oleh{" "}
          <span className="text-brand font-black">5.000+</span> Pemilik UMKM di
          Seluruh Indonesia
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #f8fafc, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(-90deg, #f8fafc, transparent)",
          }}
        />
        <div
          className="flex gap-4 animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-card flex-shrink-0"
            >
              <span className="text-xl">{b.slice(-2)}</span>
              <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                {b.slice(0, -2).trim()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
