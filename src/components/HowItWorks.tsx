import { UserPlus, ShieldCheck, Rocket } from "lucide-react"
import SectionLabel from "./SectionLabel"
import type { SiteSettings } from "../types/cms"

const stepIcons = [UserPlus, ShieldCheck, Rocket]

const fallbackSteps = [
  {
    title: "Daftar",
    desc: "Buat akun Spontan Jualan dengan cepat dan mudah. Lengkapi data dasar usaha Anda untuk memulai.",
  },
  {
    title: "Verifikasi",
    desc: "Pastikan data usaha Anda sesuai dan lakukan proses verifikasi agar akun siap digunakan.",
  },
  {
    title: "Pakai",
    desc: "Akun siap digunakan. Kelola produk, transaksi, dan kebutuhan usaha Anda dengan lebih praktis bersama Spontan Jualan.",
  },
]

export interface HowItWorksProps {
  siteSettings?: SiteSettings | null
}

export default function HowItWorks({ siteSettings }: HowItWorksProps) {
  const title =
    siteSettings?.cara_mulai_title || "Siap Jualan dalam 3 Langkah Sederhana"
  const steps = (
    siteSettings?.cara_mulai_steps && siteSettings.cara_mulai_steps.length > 0
      ? siteSettings.cara_mulai_steps
      : fallbackSteps
  ).map((step, i) => ({ ...step, Icon: stepIcons[i % stepIcons.length] }))

  return (
    <section id="cara-mulai" className="py-20 bg-white scroll-mt-40 lg:scroll-mt-44">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <SectionLabel>Cara Mulai</SectionLabel>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {steps.map(({ Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-20 h-20 rounded-full bg-brand-lightest text-brand flex items-center justify-center mx-auto mb-5">
                <Icon size={30} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
