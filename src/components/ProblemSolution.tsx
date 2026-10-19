import { X, Check } from "lucide-react"
import SectionLabel from "./SectionLabel"

const beforeItems = [
  {
    title: "Catatan transaksi tercecer",
    desc: "Masih mengandalkan buku, nota, atau catatan pribadi yang mudah hilang dan sulit dicari kembali.",
  },
  {
    title: "Stok sering tidak sesuai",
    desc: "Barang masuk dan keluar tidak tercatat dengan rapi sehingga sulit mengetahui stok sebenarnya.",
  },
  {
    title: "Pesanan mudah terlewat",
    desc: "Pesanan pelanggan harus dicatat manual dan berisiko salah atau tertukar.",
  },
  {
    title: "Sulit melihat kondisi usaha",
    desc: "Ingin tahu penjualan hari ini, tetapi harus menghitung dan merekap semuanya terlebih dahulu.",
  },
]

const afterItems = [
  {
    title: "Semua transaksi lebih teratur",
    desc: "Catat transaksi langsung melalui sistem kasir yang praktis.",
  },
  {
    title: "Stok lebih mudah dipantau",
    desc: "Ketahui pergerakan stok tanpa harus menghitung semuanya dari awal.",
  },
  {
    title: "Pesanan lebih terorganisir",
    desc: "Kelola pesanan sesuai jenis usaha, dari meja restoran hingga status cucian laundry.",
  },
  {
    title: "Bisnis lebih mudah dipantau",
    desc: "Data usaha tersimpan secara digital sehingga Anda dapat mengelola bisnis dengan lebih terstruktur.",
  },
]

export default function ProblemSolution() {
  return (
    <section id="masalah" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <SectionLabel>Kenapa Spontan Jualan?</SectionLabel>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            Masih Kelola Usaha{" "}
            <span className="text-gradient-emerald">Secara Manual?</span>
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Menjalankan usaha setiap hari sudah cukup sibuk. Jangan sampai
            pencatatan dan pengelolaan bisnis justru membuat semuanya semakin
            rumit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before column */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <X size={20} className="text-red-500" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Sebelum Spontan Jualan
              </h3>
            </div>
            <div className="space-y-5">
              {beforeItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-red-100"
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={12} className="text-red-500" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm mb-1">
                      {item.title}
                    </div>
                    <div className="text-slate-500 text-xs leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After column */}
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-200/50 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-8 relative">
              <div className="w-10 h-10 rounded-2xl bg-brand flex items-center justify-center flex-shrink-0">
                <Check size={20} className="text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Setelah Spontan Jualan
              </h3>
            </div>
            <div className="space-y-5 relative">
              {afterItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-emerald-100"
                >
                  <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm mb-1">
                      {item.title}
                    </div>
                    <div className="text-slate-500 text-xs leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-[#0a1628] text-white rounded-2xl px-8 py-5 shadow-screen">
            <p className="text-base font-bold leading-relaxed">
              Fokus jualan.{" "}
              <span className="text-emerald-400">
                Biar Spontan Jualan yang bantu urus pencatatannya.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
