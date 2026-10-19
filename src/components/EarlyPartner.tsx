import { Check } from "lucide-react"
import type { PricingPlan, SiteSettings } from "../types/cms"

const fallbackPricingPlans: PricingPlan[] = [
  {
    id: "fallback-gratis",
    tier: "Semua Mitra Baru",
    sub: "Mulai Gratis",
    monthly: 0,
    period: "/Bln",
    cta: "Pilih Paket",
    access_note: "Akses penuh tanpa biaya",
    upgrade_note:
      "Bisa tingkatkan ke paket 3 Bulan seharga Rp25.000. Biaya perpanjangan tersedia.",
    perks: [
      "GRATIS tanpa langganan",
      "Tanpa kartu kredit",
      "Komunitas mitra",
      "Kelola produk tanpa batas",
      "Pencatatan transaksi harian",
    ],
    active: true,
  },
  {
    id: "fallback-premium",
    tier: "Premium",
    sub: "Mulai Dari",
    monthly: 25000,
    period: "/3 Bln",
    cta: "Pilih Paket",
    access_note: "Akses penuh dengan biaya",
    upgrade_note:
      "Bisa tingkatkan ke paket 6 Bulan seharga Rp75.000. Biaya perpanjangan tersedia.",
    perks: [
      "GRATIS tanpa langganan",
      "Tanpa kartu kredit",
      "Komunitas mitra",
      "Kelola produk tanpa batas",
      "Pencatatan transaksi harian",
    ],
    active: true,
  },
  {
    id: "fallback-golden",
    tier: "Golden",
    sub: "Mulai Dari",
    monthly: 75000,
    period: "/6 Bln",
    cta: "Pilih Paket",
    access_note: "Akses penuh dengan biaya",
    upgrade_note:
      "Bisa tingkatkan ke paket 1 Tahun seharga Rp300.000. Biaya perpanjangan tersedia.",
    perks: [
      "GRATIS tanpa langganan",
      "Tanpa kartu kredit",
      "Komunitas mitra",
      "Kelola produk tanpa batas",
      "Pencatatan transaksi harian",
    ],
    active: true,
  },
  {
    id: "fallback-unlimited",
    tier: "Unlimited",
    sub: "Mulai Dari",
    monthly: 300000,
    period: "/1 Thn",
    cta: "Pilih Paket",
    access_note: "Akses penuh dengan biaya",
    upgrade_note:
      "Bisa tingkatkan paket sesuai kegunaan pengguna dengan menghubungi bantuan kami.",
    perks: [
      "GRATIS tanpa langganan",
      "Tanpa kartu kredit",
      "Komunitas mitra",
      "Kelola produk tanpa batas",
      "Pencatatan transaksi harian",
    ],
    active: true,
  },
]

export interface EarlyPartnerProps {
  pricingPlans?: PricingPlan[]
  siteSettings?: SiteSettings | null
}

export default function EarlyPartner({
  pricingPlans = [],
  siteSettings,
}: EarlyPartnerProps) {
  const plans = pricingPlans.length > 0 ? pricingPlans : fallbackPricingPlans
  const showComparePlans = !!siteSettings?.show_compare_plans
  const comparePlansLink = siteSettings?.compare_plans_link || "#"

  const title = siteSettings?.pricing_title || "Mulai GRATIS 1 Bulan"
  const title2 =
    siteSettings?.pricing_title2 ||
    "Pilih Paket yang Sesuai dengan Kebutuhan Anda"
  const desc =
    siteSettings?.pricing_desc ||
    "Kami ingin membangun Jualan bersama pemilik usaha, bukan hanya membuat produk lalu meninggalkannya."
  const badges =
    siteSettings?.pricing_badges && siteSettings.pricing_badges.length > 0
      ? siteSettings.pricing_badges
      : ["Jaminan 30 hari uang kembali", "Batalkan kapan saja", "Bantuan 24/7"]
  const disclaimer =
    siteSettings?.pricing_disclaimer ||
    "Fitur unlimited mengikuti Ketentuan Penggunaan kami. Paket harus lunas dibayar di awal. Harga yang ditampilkan adalah paket produk F&B, dibagi sesuai durasi paket."

  return (
    <section id="harga" className="bg-white py-20 scroll-mt-20 lg:scroll-mt-22">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            {title}
          </h2>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-5">
            {title2}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            {desc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-slate-500">
            {badges.map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Gambaran besar paket produk F&B saat ini; angka & syarat masih bisa berubah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col"
            >
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-400 mb-1">
                  {plan.tier}
                </div>
                <div className="text-lg font-black text-slate-900">
                  {plan.sub}
                </div>
              </div>

              <div className="mb-2">
                <span className="text-3xl font-black text-slate-900">
                  Rp{(plan.monthly ?? 0).toLocaleString("id-ID")}
                </span>
                <span className="text-slate-400 text-sm">{plan.period}</span>
              </div>
              {plan.access_note && (
                <p className="text-xs text-slate-500 mb-4">
                  {plan.access_note}
                </p>
              )}

              {/* TODO: arahkan ke halaman checkout paket saat sudah tersedia */}
              <a
                href={plan.checkout_link || "#"}
                className="block text-center font-bold py-3 rounded-xl text-sm text-white btn-shimmer shadow-emerald mb-4"
              >
                {plan.cta || "Pilih Paket"}
              </a>

              {plan.upgrade_note && (
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4 pb-4 border-b border-slate-100">
                  {plan.upgrade_note}
                </p>
              )}

              <ul className="space-y-2 mt-auto">
                {(plan.perks || []).map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-xs text-slate-600"
                  >
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-brand-light text-brand">
                      <Check size={9} strokeWidth={3} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {disclaimer}
        </p>

        {/* Disembunyikan dulu: produk selain F&B belum bisa dibeli paketnya (masih development) */}
        {showComparePlans && (
          <div className="text-center">
            <a
              href={comparePlansLink}
              className="inline-block px-6 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Bandingkan Paket
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
