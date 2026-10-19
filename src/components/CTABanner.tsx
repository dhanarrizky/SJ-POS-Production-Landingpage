import { Globe, Smartphone } from "lucide-react"
import SectionLabel from "./SectionLabel"

export interface CTABannerProps {
  siteSettings?: any
}

export default function CTABanner({}: CTABannerProps) {
  return (
    <section className="cta-bg relative overflow-hidden py-28">
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full border border-emerald-500/10" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-emerald-500/10" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/15" />
        <div className="absolute w-[600px] h-[200px] rounded-full blur-3xl opacity-15 bg-brand" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(12,173,49,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(12,173,49,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center z-10">
        <SectionLabel dark>
          <span className="w-2 h-2 rounded-full bg-brand pulse-dot" />
          Mulai hari ini — Gratis 6 bulan
        </SectionLabel>

        <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
          Usaha Anda sudah berjalan.
          <br />
          <span className="text-gradient-emerald">
            Sekarang waktunya membuat pengelolaannya lebih mudah.
          </span>
        </h2>

        <p className="text-slate-300 text-lg mb-4 max-w-xl mx-auto leading-relaxed">
          Tidak perlu menunggu bisnis menjadi besar untuk mulai menggunakan
          teknologi. Mulai dari sekarang.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm text-slate-400">
          <span>✅ Gratis 6 bulan pertama</span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span>✅ Tanpa kartu kredit</span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span>✅ Kesempatan jadi 100 Early Partner</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a
            id="final-cta-web"
            href="#"
            className="inline-flex items-center justify-center gap-2.5 text-white font-bold px-8 py-4 rounded-2xl btn-shimmer shadow-emerald-lg"
          >
            <Globe size={16} /> 🚀 Mulai via Web
          </a>
          <a
            id="final-cta-app"
            href="#"
            className="inline-flex items-center justify-center gap-2.5 text-white font-semibold px-7 py-4 rounded-2xl border border-white/25 hover:border-white/50 hover:bg-white/10 transition-all"
          >
            <Smartphone size={16} /> 📱 Download Aplikasi
          </a>
        </div>

        {/* Early partner note */}
        <div className="inline-block border border-emerald-500/30 bg-emerald-500/10 rounded-2xl px-6 py-3">
          <p className="text-emerald-300 text-sm font-semibold">
            ⭐ 100 Mitra Pertama → Kesempatan mendapatkan fitur premium tertentu{" "}
            <strong className="text-white">GRATIS seumur hidup.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
