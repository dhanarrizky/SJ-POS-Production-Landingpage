import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { mediaUrl, pbFileUrl } from "../../lib/media"
import { dpSection } from "../../lib/detailProduk"
import type { ProductHighlight, SiteSettings } from "../../types/cms"
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
    button_label: "Kasir Cepat",
    feature_slug: "kasir",
    image_path: "detail-produk/feature-satset.webp",
  },
  {
    id: "semua-bayar",
    label: "Fitur Pembayaran",
    title: "Semua Bayar",
    description:
      "Satu kasir untuk semua metode pembayaran. Catat cash, QRIS, transfer, dan metode pembayaran lainnya dalam satu transaksi.",
    button_label: "Anti Selisih",
    feature_slug: "bayar-dari-meja",
    image_path: "detail-produk/feature-semua-bayar.webp",
  },
  {
    id: "stokauto",
    label: "Fitur Inventori",
    title: "Stokauto",
    description:
      "Setiap penjualan langsung menghitung pemakaian bahan. Hubungkan menu dengan resep dan bahan bakunya.",
    button_label: "Stok Otomatis",
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
  settings?: SiteSettings | null
}

// Exact geometry from Figma "Copy as code" (CSS, all layers):
// card box 340x512, photo 340x420 (radius 10), dark box 309x332 at left:31 top:180 (radius 20)
// Helper untuk menyingkat teks tombol dari CMS agar tidak terlalu panjang di mobile
const getShortLabel = (label: string) => {
  if (!label) return "";
  const lower = label.toLowerCase();
  if (lower.includes("antrean")) return "Kasir Cepat";
  if (lower.includes("selisih")) return "Anti Selisih";
  if (lower.includes("potong stok")) return "Stok Otomatis";
  return label;
}

export default function FeatureHighlights({
  highlights,
  settings,
}: FeatureHighlightsProps) {
  const c = dpSection(settings, "dp_fitur")
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setIsAtStart(scrollLeft <= 0)
      // Gunakan buffer kecil 2px untuk menoleransi pembulatan desimal
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 2)
    }
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener("resize", handleScroll)
    return () => window.removeEventListener("resize", handleScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef
      const scrollAmount = current.offsetWidth * 0.8
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  const cards = highlights && highlights.length > 0 ? highlights : fallbackHighlights

  return (
    <section
      id="fitur"
      className="bg-brand-lightest py-[50px] xl:px-[158px]"
    >
      <div className="max-w-[1124px] mx-auto flex flex-col items-center gap-[30px]">
        <div className="w-full flex flex-col items-center gap-5 max-w-[627px] text-center px-4 sm:px-10 xl:px-0">
          <span className="font-poppins text-base font-semibold text-brand">
            {c.badge}
          </span>
          <h2 className="font-poppins text-[28px] sm:text-[40px] leading-[1.3] sm:leading-[60px] tracking-[-1.38px] font-semibold text-slate-900">
            {c.title}
          </h2>
        </div>

        <div className="relative w-full max-w-full group/slider">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full flex flex-nowrap xl:flex-wrap xl:justify-center items-stretch gap-4 sm:gap-[50px] overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 xl:pb-0 px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((c, idx) => (
              <div
                key={c.id}
                className={`relative w-[280px] sm:w-[340px] shrink-0 max-w-[340px] snap-center xl:snap-align-none xl:aspect-[340/512] flex flex-col
                  ${idx === 0 ? "ml-4 sm:ml-10 xl:ml-0" : ""}
                  ${idx === cards.length - 1 ? "mr-4 sm:mr-10 xl:mr-0" : ""}
                `}
              >
              <div className="relative w-full aspect-[340/420] xl:aspect-auto xl:absolute xl:inset-x-0 xl:top-0 xl:h-[82.03%]">
                {imageSrc(c) ? (
                  <LazyImage
                    src={imageSrc(c)}
                    alt={c.title}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                ) : (
                  <div className="w-full h-full rounded-[10px] bg-slate-200" />
                )}
              </div>

              <div className="relative -mt-[70.58%] self-end w-[90.88%] flex flex-col gap-[30px] rounded-[20px] bg-[#012708] px-5 py-[30px] min-h-[332px] flex-1 xl:flex-none xl:min-h-0 xl:absolute xl:left-[9.12%] xl:right-0 xl:top-[35.16%] xl:bottom-0 xl:w-auto xl:mt-0 xl:self-auto">
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
                    to={c.feature_slug ? `/fitur/${c.feature_slug}` : "/fitur"}
                    className="group btn-shimmer shadow-emerald mt-auto self-start inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-poppins text-xs font-semibold leading-[18px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-w-full"
                  >
                    <span className="whitespace-nowrap">{getShortLabel(c.button_label)}</span>
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
          
          {/* Navigation Buttons (Mobile/Tablet Only) */}
          <div className="w-full flex justify-end gap-3 mt-1 xl:hidden px-4 sm:px-10 xl:px-0">
            <button
              onClick={() => scroll("left")}
              disabled={isAtStart}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtStart ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={() => scroll("right")}
              disabled={isAtEnd}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtEnd ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Link
          to={c.btn_link || "/fitur"}
          className="group btn-shimmer shadow-emerald inline-flex items-center justify-center gap-2 rounded-[20px] px-8 sm:px-[82px] py-2.5 font-poppins text-base font-semibold text-white text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {c.btn_label}
          <ArrowRight
            size={18}
            className="shrink-0 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  )
}
