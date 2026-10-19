import { Check, Users, Smartphone, CalendarClock, Star } from "lucide-react"
import SectionLabel from "./SectionLabel"
import type { SiteSettings } from "../types/cms"

export interface AboutUsProps {
  siteSettings?: SiteSettings | null
}

const fallbackChecklistItems = [
  {
    title: "Kasir Mudah Dipahami",
    desc: "Proses transaksi cepat dan untuk semua pengguna",
  },
  {
    title: "Pencatatan Lebih Rapi",
    desc: "Semua data usaha tercatat otomatis dan terorganisir",
  },
  {
    title: "Stok Lebih Mudah Dipantau",
    desc: "Pantau stok secara real-time dan hindari kehabisan barang",
  },
  {
    title: "Pesanan Tidak Berantakan",
    desc: "Kelola pesanan dengan lebih teratur dan efisien",
  },
  {
    title: "Sistem yang Membantu",
    desc: "Teknologi yang dirancang untuk memudahkan, bukan menambah pekerjaan",
  },
]

export default function AboutUs({ siteSettings }: AboutUsProps) {
  const showPartnerLogos = !!siteSettings?.show_trust_marquee
  const partnerLogoCount = siteSettings?.brands?.length || 5

  const title =
    siteSettings?.about_title ||
    "Teknologi sederhana untuk usaha yang lebih spontan"
  const desc =
    siteSettings?.about_desc ||
    "Banyak UMKM butuh teknologi, tapi tidak semua butuh yang rumit. Kami membuat Spontan Jualan agar pemilik usaha bisa fokus menjalankan bisnis, bukan menguras sistem."
  const checklistItems =
    siteSettings?.about_checklist && siteSettings.about_checklist.length > 0
      ? siteSettings.about_checklist
      : fallbackChecklistItems

  const showStats = !!siteSettings?.show_about_stats
  const stats = [
    {
      Icon: Users,
      value: siteSettings?.about_mitra_aktif || "120+",
      label: "Mitra Aktif",
      sub: "Bekerja sama dengan kami",
    },
    {
      Icon: Smartphone,
      value: siteSettings?.about_pengguna_aktif || "1.000+",
      label: "Pengguna Aktif",
      sub: "Menggunakan setiap hari",
    },
    {
      Icon: CalendarClock,
      value: siteSettings?.about_lama_kemitraan || "1 Tahun",
      label: "Bersama Mitra",
      sub: "Tumbuh dan berkembang",
    },
    {
      Icon: Star,
      value: siteSettings?.about_rating || "4.9/5",
      label: "Rating Kepuasan",
      sub: "Dari para mitra kami",
    },
  ]

  return (
    <section id="tentang" className="bg-white scroll-mt-10 lg:scroll-mt-5">
      {/* Partner logos */}
      {showPartnerLogos && (
        <div className="border-b border-slate-100 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-4">
            {/* TODO: ganti tiap kotak dengan logo mitra yang sebenarnya */}
            {Array.from({ length: partnerLogoCount }).map((_, i) => (
              <div
                key={i}
                className="w-28 h-10 rounded-lg bg-slate-100 border border-dashed border-slate-300"
                data-placeholder="partner-logo"
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Copy side */}
          <div className="flex-1 max-w-xl">
            <SectionLabel>Tentang Kami</SectionLabel>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-5">
              {title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">{desc}</p>

            <div className="space-y-5 mb-8">
              {checklistItems.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-light text-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <div>
                    <div className="font-bold text-slate-800 text-sm mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#footer"
              className="inline-flex items-center justify-center text-white font-bold px-6 py-3 rounded-xl btn-shimmer text-sm"
            >
              Kontak Kami
            </a>
          </div>

          {/* Visual side */}
          {/* TODO: ganti dengan gambar ilustrasi sistem Spontan Jualan */}
          <div
            className="flex-1 w-full self-stretch min-h-[320px] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center text-slate-400 text-sm text-center px-6"
            data-placeholder="about-system-image"
          >
            Gambar Sistem Spontan Jualan
          </div>
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="bg-slate-100 border-y border-slate-200 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ Icon, value, label, sub }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-5 shadow-card border border-slate-100 flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-lightest text-brand flex items-center justify-center flex-shrink-0">
                  <Icon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    {value}
                  </div>
                  <div className="text-sm font-semibold text-slate-700">
                    {label}
                  </div>
                  <div className="text-xs text-slate-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
