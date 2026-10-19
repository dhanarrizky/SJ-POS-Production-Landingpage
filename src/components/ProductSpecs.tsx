import React from "react"
import { ShieldCheck } from "lucide-react"

interface ProductSpecsProps {
  productName: string
  accentColor?: string
  specs?: Record<string, any>
}

export default function ProductSpecs({
  productName,
  accentColor = "#10b981",
  specs,
}: ProductSpecsProps) {
  if (!specs || Object.keys(specs).length === 0) return null

  return (
    <div className="lg:col-span-3 order-2 lg:order-3 bg-white rounded-3xl border border-slate-100 p-8 sm:p-10 shadow-sm">
      <h3 className="text-slate-900 font-black text-2xl mb-2 flex items-center gap-2.5">
        <ShieldCheck
          className="w-7 h-7 shrink-0 text-[var(--accent-color)]"
          style={
            {
              "--accent-color": accentColor,
            } as React.CSSProperties
          }
        />{" "}
        Spesifikasi &amp; Lisensi Layanan
      </h3>
      <p className="text-slate-400 text-sm mb-8 font-medium">
        Detail kapasitas operasional, tipe lisensi, dan batasan penggunaan untuk {productName}.
      </p>

      {/* Grid of Spec Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(specs).map(([key, val]: [string, any]) => {
          const isEditorialKey = key === "subtitle" || key === "benefit"
          if (isEditorialKey) return null

          const specDefinitions: Record<
            string,
            {
              label: string
              icon: string
              bg: string
              text: string
              desc: string
              style?: React.CSSProperties
            }
          > = {
            paket: {
              label: "Tipe Lisensi",
              icon: "💎",
              bg: "",
              text: "Basic (Keseluruhan)",
              desc: "Akses penuh ke semua fitur dasar POS tanpa batasan modul.",
              style: {
                backgroundColor: `${accentColor}08`,
                color: accentColor,
                borderColor: `${accentColor}20`,
              },
            },
            produk_limit: {
              label: "Batas Produk",
              icon: "📦",
              bg: "bg-blue-50 text-blue-600 border border-blue-100/50",
              text: "Tanpa Batas",
              desc: "Tambahkan produk, menu, dan variasi katalog sebanyak yang Anda mau.",
            },
            transaksi_limit: {
              label: "Batas Transaksi",
              icon: "💸",
              bg: "bg-cyan-50 text-cyan-600 border border-cyan-100/50",
              text: "Tanpa Batas",
              desc: "Proses transaksi penjualan harian dan bulanan tanpa ada kuota limit.",
            },
            kasir_limit: {
              label: "Multi Kasir",
              icon: "👥",
              bg: "bg-indigo-50 text-indigo-600 border border-indigo-100/50",
              text: "Tanpa Batas",
              desc: "Aktifkan banyak staf kasir/dapur secara simultan di toko Anda.",
            },
            super_admin: {
              label: "Akses Super Admin",
              icon: "🛡️",
              bg: "bg-rose-50 text-rose-600 border border-rose-100/50",
              text: "Internal Only",
              desc: "Khusus untuk operator pengembang Spontan Jualan. Tidak diperjualbelikan.",
            },
            paket_lain: {
              label: "Paket Tingkat Lanjut",
              icon: "🚀",
              bg: "bg-amber-50 text-amber-600 border border-amber-100/50",
              text: "Rencana Rilis",
              desc: "Skema paket Pro/Enterprise dengan opsi kustom direncanakan di masa depan.",
            },
          }

          const def = specDefinitions[key] || {
            label: key.replace(/_/g, " "),
            icon: "⚙️",
            bg: "bg-slate-50 text-slate-600 border border-slate-100/50",
            text: String(val),
            desc: "Spesifikasi tambahan sistem.",
          }

          return (
            <div
              key={key}
              className="p-6 rounded-2xl border border-slate-100 bg-slate-50/20 hover:bg-slate-50/60 transition-all duration-200 hover:shadow-2xs flex flex-col justify-between"
            >
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${def.bg}`}
                  style={def.style}
                >
                  {def.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">
                    {def.label}
                  </span>
                  <span className="text-slate-800 font-extrabold text-sm leading-tight block">
                    {typeof val === "object" ? JSON.stringify(val) : String(val)}
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed">{def.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
