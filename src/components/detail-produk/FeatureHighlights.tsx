import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { mediaUrl, pbFileUrl } from "../../lib/media"
import type { ProductHighlight } from "../../types/cms"
import LazyImage from "./LazyImage"

// Cadangan bila koleksi `product_highlights` kosong / belum termigrasi.
// Sumber utama teks, gambar, dan tujuan tombol ada di CMS (dashboard → Sorotan Produk).
const fallbackHighlights: ProductHighlight[] = [
  {
    id: "sat-set",
    label: "Fitur Utama",
    title: "Sat Set",
    description:
      "Menu favorit, kategori, varian, topping, ukuran, dan metode pembayaran tersedia dalam satu alur kasir yg sederhana.",
    button_label: "Kasir siap melayani tanpa antrean",
    feature_slug: "kasir",
    image_path: "detail-produk/feature-satset.webp",
  },
  {
    id: "semua-bayar",
    label: "Fitur Pembayaran",
    title: "Semua Bayar",
    description:
      "Satu kasir untuk semua metode pembayaran. Catat cash, QRIS, transfer, dan metode pembayaran lainnya dalam satu transaksi.",
    button_label: "Rekonsiliasi otomatis tanpa selisih",
    feature_slug: "bayar-dari-meja",
    image_path: "detail-produk/feature-semua-bayar.webp",
  },
  {
    id: "stokauto",
    label: "Fitur Inventori",
    title: "Stokauto",
    description:
      "Setiap penjualan langsung menghitung pemakaian bahan. Hubungkan menu dengan resep dan bahan bakunya.",
    button_label: "Potong Stok Bahan Baku",
    feature_slug: "deteksi-inventori",
    image_path: "detail-produk/feature-stok-auto.webp",
  },
]

/** Prioritas: file yang diunggah dari dashboard → path relatif di SeaweedFS → kosong. */
function imageSrc(c: ProductHighlight): string {
  return pbFileUrl(c, c.image) || (c.image_path ? mediaUrl(c.image_path) : "")
}

interface FeatureHighlightsProps {
  highlights?: ProductHighlight[]
}

// Exact geometry from Figma "Copy as code" (CSS, all layers):
// card box 340x512, photo 340x420 (radius 10), dark box 309x332 at left:31 top:180 (radius 20)
export default function FeatureHighlights({
  highlights,
}: FeatureHighlightsProps) {
  const cards = highlights && highlights.length > 0 ? highlights : fallbackHighlights

  return (
    <section
      id="fitur"
      className="bg-brand-lightest py-[50px] px-4 sm:px-10 lg:px-[158px]"
    >
      <div className="max-w-[1124px] mx-auto flex flex-col items-center gap-[30px]">
        <div className="w-full flex flex-col items-center gap-5 max-w-[627px] text-center">
          <span className="font-poppins text-base font-semibold text-brand">
            Spesifikasi dan Fitur
          </span>
          <h2 className="font-poppins text-[28px] sm:text-[40px] leading-[1.3] sm:leading-[60px] tracking-[-1.38px] font-semibold text-slate-900">
            Fitur Spesifikasi Bisnis Restoran, Kafe, dan Food Court
          </h2>
        </div>

        <div className="w-full flex flex-wrap justify-center items-start gap-[50px]">
          {cards.map((c) => (
            <div
              key={c.id}
              className="relative w-full sm:w-[340px] sm:shrink-0 max-w-[340px] aspect-[340/512]"
            >
              {imageSrc(c) ? (
                <LazyImage
                  src={imageSrc(c)}
                  alt={c.title}
                  className="absolute inset-x-0 top-0 h-[82.03%] w-full object-cover rounded-[10px]"
                />
              ) : (
                <div className="absolute inset-x-0 top-0 h-[82.03%] w-full rounded-[10px] bg-slate-200" />
              )}

              <div className="absolute left-[9.12%] right-0 top-[35.16%] bottom-0 flex flex-col gap-[30px] rounded-[20px] bg-[#012708] px-5 py-[30px]">
                <div className="flex flex-col gap-5">
                  {c.label && (
                    <span className="font-poppins text-base font-semibold text-brand">
                      {c.label}
                    </span>
                  )}
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-poppins text-xl leading-[30px] font-semibold text-white">
                      {c.title}
                    </h3>
                    {c.description && (
                      <p className="font-poppins text-base leading-6 text-white">
                        {c.description}
                      </p>
                    )}
                  </div>
                </div>
                {c.button_label && (
                  <Link
                    to="/bandingkan-paket"
                    className="group btn-shimmer shadow-emerald mt-auto self-start inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-poppins text-xs font-semibold leading-[18px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>{c.button_label}</span>
                    <ArrowRight
                      size={14}
                      className="shrink-0 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/bandingkan-paket"
          className="group btn-shimmer shadow-emerald inline-flex items-center justify-center gap-2 rounded-[20px] px-8 sm:px-[82px] py-2.5 font-poppins text-base font-semibold text-white text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Lihat Semua Fitur
          <ArrowRight
            size={18}
            className="shrink-0 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  )
}
