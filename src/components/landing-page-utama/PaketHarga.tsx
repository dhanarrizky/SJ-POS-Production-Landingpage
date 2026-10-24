import { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { pb } from "../../lib/pocketbase"
import type { SiteSettings, PricingPackageItem } from "../../types/cms"

interface PaketHargaProps {
  siteSettings?: SiteSettings | null
}

const DEFAULT_PACKAGES: PricingPackageItem[] = [
  // --- POS F&B ---
  {
    label: "BASIC",
    title: "Semua Kebutuhan Kasir",
    currency: "Rp",
    price: "0",
    period: "/Bln",
    access: "Sempurna untuk mulai usaha",
    subText: "Gunakan Spontan Jualan selamanya tanpa biaya langganan bulanan.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "POS F&B",
    features: [
      "Unlimited transaksi",
      "Unlimited produk",
      "Unlimited meja",
      "Order by table",
      "Payment",
      "Receipt",
      "Basic inventory",
      "Sales report",
    ],
  },
  {
    label: "GROWTH",
    title: "Operasional Terorganisir",
    currency: "Rp",
    price: "25.000",
    period: "/Bln",
    access: "Untuk bisnis yang berkembang",
    subText: "Cocok untuk tingkatkan kecepatan pelayanan dan operasional dapur.",
    isPopular: true,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "POS F&B",
    features: [
      "Semua fitur Basic",
      "Kitchen Display",
      "Recipe & bahan baku",
      "Stock management",
      "Customer management",
      "Multi-user",
      "Custom roles",
      "Promotion",
    ],
  },
  {
    label: "PREMIUM",
    title: "Insight & Pengembangan",
    currency: "Rp",
    price: "50.000",
    period: "/Bln",
    access: "Analisis bisnis mendalam",
    subText: "Untuk bisnis yang ingin mengoptimalkan margin dan loyalitas pelanggan.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "POS F&B",
    features: [
      "Semua fitur Growth",
      "Profit & COGS",
      "Advanced analytics",
      "Advanced reports",
      "Loyalty",
      "Customer insights",
      "Advanced promotion",
      "Automation",
    ],
  },
  {
    label: "ENTERPRISE",
    title: "Operasional Kompleks",
    currency: "Rp",
    price: "75.000",
    period: "/Bln",
    access: "Skala bisnis besar & kompleks",
    subText: "Hubungi kami untuk penyesuaian khusus dan integrasi eksternal.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "POS F&B",
    features: [
      "Semua fitur Premium",
      "Multi-outlet",
      "Centralized management",
      "API",
      "Integration",
      "Custom permission",
      "Custom workflow",
      "Dedicated support",
    ],
  },

  // --- LAUNDRY ---
  {
    label: "BASIC",
    title: "Kasir & Nota Laundry",
    currency: "Rp",
    price: "0",
    period: "/Bln",
    access: "Mulai kelola laundry kiloan & satuan",
    subText: "Catat transaksi dan cetak nota tanpa biaya langganan.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Laundry",
    features: [
      "Unlimited transaksi",
      "Cetak nota kiloan & satuan",
      "Status order (Cuci/Kering/Setrika)",
      "Laporan omzet harian",
      "Database pelanggan",
      "Multi metode pembayaran",
      "Kirim nota digital",
    ],
  },
  {
    label: "GROWTH",
    title: "Manajemen Rak & Antrian",
    currency: "Rp",
    price: "25.000",
    period: "/Bln",
    access: "Optimalkan alur kerja operasional",
    subText: "Tingkatkan ketepatan pengambilan baju dan kepuasan pelanggan.",
    isPopular: true,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Laundry",
    features: [
      "Semua fitur Basic",
      "Notifikasi WhatsApp otomatis",
      "Penomoran rak & slot cucian",
      "Sistem deposit pelanggan",
      "Multi-kasir & operator",
      "Tag barcode cucian",
      "Katalog layanan lengkap",
    ],
  },
  {
    label: "PREMIUM",
    title: "Stok Bahan & Performa Karyawan",
    currency: "Rp",
    price: "50.000",
    period: "/Bln",
    access: "Kontrol biaya & analisa keuntungan",
    subText: "Pantau penggunaan deterjen dan hitung komisi karyawan otomatis.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Laundry",
    features: [
      "Semua fitur Growth",
      "Stok deterjen & pewangi otomatis",
      "Perhitungan komisi karyawan",
      "Laporan laba rugi bulanan",
      "Paket member & voucher diskon",
      "Peringatan cucian selesai lama",
      "Analisis pelanggan loyal",
    ],
  },
  {
    label: "ENTERPRISE",
    title: "Multi-Outlet & Kurir Antar-Jemput",
    currency: "Rp",
    price: "75.000",
    period: "/Bln",
    access: "Skala bisnis jaringan laundry",
    subText: "Kelola banyak cabang dan armada kurir dalam satu dashboard terpusat.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Laundry",
    features: [
      "Semua fitur Premium",
      "Manajemen kurir antar-jemput",
      "Dashboard multi-cabang terpusat",
      "Mutasi stok antar-outlet",
      "Akses API & integrasi sistem",
      "Role & permission khusus",
      "Dedicated technical support",
    ],
  },

  // --- RETAIL ---
  {
    label: "BASIC",
    title: "Kasir Toko & Barcode",
    currency: "Rp",
    price: "0",
    period: "/Bln",
    access: "Sistem kasir cepat toko Anda",
    subText: "Dukung barcode scanner dan cetak struk tanpa biaya bulanan.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Retail",
    features: [
      "Unlimited transaksi",
      "Unlimited barcode produk",
      "Dukungan barcode scanner",
      "Cetak struk kasir",
      "Manajemen kategori barang",
      "Laporan penjualan harian",
      "Support cetak thermal printer",
    ],
  },
  {
    label: "GROWTH",
    title: "Manajemen Stok & Supplier",
    currency: "Rp",
    price: "25.000",
    period: "/Bln",
    access: "Cegah barang kosong & pantau stok",
    subText: "Kelola pemesanan ke supplier dan atur stok masuk-keluar secara akurat.",
    isPopular: true,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Retail",
    features: [
      "Semua fitur Basic",
      "Peringatan stok menipis (Low stock alert)",
      "Purchase Order (PO) ke supplier",
      "Catatan batch & tanggal kedaluwarsa",
      "Multi kasir & shift kasir",
      "Diskon promo bertingkat",
      "Laporan produk terlaris",
    ],
  },
  {
    label: "PREMIUM",
    title: "Harga Grosir & Pelanggan",
    currency: "Rp",
    price: "50.000",
    period: "/Bln",
    access: "Penjualan eceran dan grosir fleksibel",
    subText: "Atur multi-satuan (pcs/pack/dus) dan harga khusus untuk pelanggan setia.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Retail",
    features: [
      "Semua fitur Growth",
      "Multi-satuan (Pcs, Lusin, Dus)",
      "Harga grosir bertingkat",
      "Pencatatan kasbon / piutang pelanggan",
      "Laporan margin & profit margin",
      "Loyalty point pelanggan",
      "Stock opname terintegrasi",
    ],
  },
  {
    label: "ENTERPRISE",
    title: "Multi-Gudang & Multi-Cabang",
    currency: "Rp",
    price: "75.000",
    period: "/Bln",
    access: "Jaringan toko ritel terintegrasi",
    subText: "Transfer barang antar-gudang dan sinkronisasi harga semua cabang.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Retail",
    features: [
      "Semua fitur Premium",
      "Multi-cabang & multi-gudang",
      "Transfer stok antar cabang",
      "Sinkronisasi harga terpusat",
      "Integrasi API & ERP",
      "Laporan konsolidasi bisnis",
      "Dedicated account manager",
    ],
  },

  // --- PRODUK DIGITAL ---
  {
    label: "BASIC",
    title: "Agen Pulsa & PPOB",
    currency: "Rp",
    price: "0",
    period: "/Bln",
    access: "Mulai jualan pulsa & bayar tagihan",
    subText: "Satu saldo untuk transaksi berbagai kebutuhan digital harian.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Produk Digital",
    features: [
      "Pulsa & paket data semua operator",
      "Token listrik PLN",
      "Cetak struk pembayaran",
      "Riwayat transaksi real-time",
      "Satu saldo terpadu",
      "Bebas biaya admin bulanan",
      "Customer support bantuan",
    ],
  },
  {
    label: "GROWTH",
    title: "Top Up Game & E-Wallet",
    currency: "Rp",
    price: "25.000",
    period: "/Bln",
    access: "Perluas jangkauan ke generasi muda",
    subText: "Produk voucher game terlengkap dan pengisian dompet digital terpopuler.",
    isPopular: true,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Produk Digital",
    features: [
      "Semua fitur Basic",
      "Top up e-wallet (GoPay, OVO, Dana, ShopeePay)",
      "Voucher game (MLBB, FF, PUBG, Steam)",
      "Atur margin harga jual sendiri",
      "Multi-perangkat kasir",
      "Kirim bukti via WhatsApp otomatis",
      "Laporan keuntungan per produk",
    ],
  },
  {
    label: "PREMIUM",
    title: "Tagihan Bulanan & Multifinance",
    currency: "Rp",
    price: "50.000",
    period: "/Bln",
    access: "Pusat pembayaran tagihan terlengkap",
    subText: "Layani pembayaran PDAM, BPJS, TV kabel, hingga cicilan kredit.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Produk Digital",
    features: [
      "Semua fitur Growth",
      "Pembayaran PDAM, BPJS, Indihome",
      "Multifinance & angsuran kredit",
      "Kasir kasbon & deposit pelanggan",
      "Jalur transaksi prioritas cepat",
      "Rekap komisi otomatis",
      "Promo cashback berkala",
    ],
  },
  {
    label: "ENTERPRISE",
    title: "API Gateway & Whitelabel",
    currency: "Rp",
    price: "75.000",
    period: "/Bln",
    access: "Koneksi sistem skala korporasi",
    subText: "Integrasikan layanan produk digital langsung ke dalam aplikasi atau website Anda.",
    isPopular: false,
    btnLabel: "Pilih Paket",
    btnLink: "/daftar",
    show: true,
    productCategory: "Produk Digital",
    features: [
      "Semua fitur Premium",
      "Akses API PPOB langsung & cepat",
      "Server redundan high-availability",
      "Harga grosir khusus agen besar",
      "Whitelabel receipt & branding",
      "Limit transaksi besar",
      "Dedicated technical support 24/7",
    ],
  },
]

export default function PaketHarga({ siteSettings: propSettings }: PaketHargaProps = {}) {
  const [internalSettings, setInternalSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    if (propSettings) return
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => {
        setInternalSettings(record as unknown as SiteSettings)
      })
      .catch(() => {})
  }, [propSettings])

  const siteSettings = propSettings || internalSettings

  // Header Texts
  const title = siteSettings?.pricing_title || "Mulai GRATIS Tanpa Batas\nPilih Paket Sesuai Pertumbuhan Anda"
  const desc = siteSettings?.pricing_desc || "Spontan Jualan tidak membatasi jumlah transaksi dan produk Anda. Fitur pencetak omzet selalu gratis, Anda hanya bayar untuk alat operasional yang lebih canggih."

  // Bullet points
  let badges = ["Unlimited Transaksi", "Unlimited Meja & Produk", "Batalkan Kapan Saja"]
  if (siteSettings?.pricing_badges) {
    if (Array.isArray(siteSettings.pricing_badges)) {
      badges = siteSettings.pricing_badges
    } else if (typeof siteSettings.pricing_badges === "string") {
      try {
        const parsed = JSON.parse(siteSettings.pricing_badges)
        if (Array.isArray(parsed) && parsed.length > 0) badges = parsed
      } catch (e) {}
    }
  }

  // Packages list
  let rawPackages: PricingPackageItem[] = DEFAULT_PACKAGES
  if (siteSettings?.pricing_packages) {
    if (Array.isArray(siteSettings.pricing_packages) && siteSettings.pricing_packages.length > 0) {
      rawPackages = siteSettings.pricing_packages
    } else if (typeof siteSettings.pricing_packages === "string") {
      try {
        const parsed = JSON.parse(siteSettings.pricing_packages)
        if (Array.isArray(parsed) && parsed.length > 0) rawPackages = parsed
      } catch (e) {}
    }
  }

  // Filter paket yang aktif & untuk kategori yang aktif dari CMS (default: POS F&B)
  const activeCategory = siteSettings?.pricing_active_category || "POS F&B"
  let packages = rawPackages.filter((pkg) => {
    const isVisible = pkg.show !== false && pkg.show !== "false" && pkg.show !== 0 && pkg.show !== "0"
    const cat = pkg.productCategory || "POS F&B"
    return isVisible && cat.toLowerCase() === activeCategory.toLowerCase()
  })

  // Jika belum ada paket custom tersimpan untuk kategori aktif ini, ambil dari template DEFAULT_PACKAGES kategori tersebut
  if (packages.length === 0) {
    packages = DEFAULT_PACKAGES.filter((pkg) => {
      const isVisible = pkg.show !== false
      const cat = pkg.productCategory || "POS F&B"
      return isVisible && cat.toLowerCase() === activeCategory.toLowerCase()
    })
  }

  // Fallback jika masih belum ada
  if (packages.length === 0) {
    packages = rawPackages.filter((pkg) => pkg.show !== false && pkg.show !== "false" && pkg.show !== 0 && pkg.show !== "0")
  }
  if (packages.length === 0) {
    packages = DEFAULT_PACKAGES.filter((pkg) => (pkg.productCategory || "POS F&B").toLowerCase() === "pos f&b")
  }

  // Disclaimer Bawah
  const disclaimer = siteSettings?.pricing_disclaimer || "Fitur unlimited mengikuti Ketentuan Penggunaan kami.\nPaket harus lunas dibayar di awal. Harga bulanan yang di tampilkan adalah paket produk dibagi durasi paket"

  // Tombol Bandingkan Paket
  const showCompareVal = siteSettings?.show_compare_plans
  const showCompare = Boolean(
    showCompareVal === true ||
    showCompareVal === "true" ||
    showCompareVal === 1 ||
    showCompareVal === "1"
  )
  const comparePlansLabel = siteSettings?.compare_plans_label || "Bandingkan Paket"
  const comparePlansLink = siteSettings?.compare_plans_link || "/bandingkan-paket"

  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setIsAtStart(scrollLeft <= 0)
    setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1)
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener("resize", handleScroll)
    return () => window.removeEventListener("resize", handleScroll)
  }, [])

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
  }
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
  }

  return (
    <section id="harga" className="w-full bg-[#F5FFF6] py-[50px] font-sans overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center xl:px-[71px]">

        {/* Header Texts */}
        <div className="flex flex-col items-center text-center gap-[20px] mb-[40px] px-4 lg:px-[71px] xl:px-0">
          <h2 className="text-[32px] md:text-[40px] font-bold text-black leading-tight px-2 whitespace-pre-line">
            {title}
          </h2>
          <p className="text-[16px] font-normal text-black max-w-[700px] leading-relaxed whitespace-pre-line">
            {desc}
          </p>

          {/* Bullet points */}
          {badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-[30px] items-center">
              {badges.map((badge, bIdx) => (
                <div key={bIdx} className="flex items-center gap-[10px]">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#0CAD31]"></div>
                  <span className="text-[16px] font-normal text-black">{badge}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div 
          ref={scrollRef} 
          onScroll={handleScroll} 
          className="flex xl:grid xl:grid-cols-4 gap-[20px] lg:gap-[30px] xl:gap-[40px] overflow-x-auto xl:overflow-x-visible snap-x snap-mandatory scrollbar-none px-0 pt-[20px] xl:pt-[24px] pb-10 xl:pb-0 w-full items-stretch"
        >
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`snap-start scroll-ml-4 lg:scroll-ml-[71px] xl:scroll-ml-0 shrink-0 w-[280px] md:w-[290px] xl:w-full max-w-[290px] h-full rounded-xl flex flex-col relative transition-all duration-300
                ${pkg.isPopular ? "bg-[#012708] shadow-2xl xl:-translate-y-4" : "bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] border border-[#D9D9D9]"} 
                ${idx === 0 ? "ml-4 lg:ml-[71px] xl:ml-0" : ""} 
                ${idx === packages.length - 1 ? "mr-4 lg:mr-[71px] xl:mr-0" : ""}`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0CAD31] text-white text-[12px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md z-10 uppercase tracking-widest">
                  REKOMENDASI
                </div>
              )}

              <div className="flex flex-col h-full px-[20px] py-[30px]">
                
                {/* Upper Section */}
                <div className="flex flex-col min-h-[180px]">
                  <span className={`text-[14px] font-bold mb-[5px] ${pkg.isPopular ? "text-emerald-400" : "text-[#0CAD31]"}`}>
                    {pkg.label}
                  </span>
                  <h3 className={`text-[18px] md:text-[20px] font-bold mb-[5px] line-clamp-2 min-h-[56px] ${pkg.isPopular ? "text-white" : "text-black"}`}>
                    {pkg.title}
                  </h3>

                  <div className={`flex items-baseline mb-[10px] ${pkg.isPopular ? "text-white" : "text-black"}`}>
                    <span className="text-[20px] font-bold">{pkg.currency || "Rp"}</span>
                    <span className="text-[28px] md:text-[32px] font-bold tracking-tight ml-1">{pkg.price}</span>
                    <span className="text-[14px] font-normal ml-1">{pkg.period || "/Bln"}</span>
                  </div>
                  <p className={`text-[13px] font-normal mb-[15px] line-clamp-2 min-h-[40px] ${pkg.isPopular ? "text-gray-300" : "text-black"}`}>
                    {pkg.access}
                  </p>
                </div>

                {/* Button */}
                <Link
                  to={pkg.btnLink || "/daftar"}
                  className={`w-full max-w-[247px] py-[10px] rounded-[5px] mx-auto flex items-center justify-center font-bold text-[16px] transition-all duration-300 shadow-lg active:scale-95 active:translate-y-0 cursor-pointer mb-[15px]
                    ${pkg.isPopular ? "bg-[#0CAD31] hover:bg-[#09992b] text-white shadow-[#0CAD31]/30" : "bg-[#0CAD31] hover:bg-[#09992b] text-white shadow-[#0CAD31]/30 hover:shadow-[#0CAD31]/50 hover:-translate-y-1"}`}
                >
                  {pkg.btnLabel || "Pilih Paket"}
                </Link>

                {/* Subtext */}
                <p className={`text-[11px] font-normal leading-snug mb-[15px] min-h-[34px] ${pkg.isPopular ? "text-emerald-100/70" : "text-gray-700"}`}>
                  {pkg.subText}
                </p>

                {/* Divider */}
                <div className={`w-full h-0 border-t mx-auto mb-[20px] ${pkg.isPopular ? "border-gray-700" : "border-gray-300"}`}></div>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-grow">
                  {(pkg.features || []).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="flex items-center mt-[2px]">
                        <i className={`fa-solid fa-circle-check text-[14px] ${pkg.isPopular ? "text-emerald-400" : "text-[#0CAD31]"}`}></i>
                      </div>
                      <span className={`text-[12px] font-normal leading-tight ${pkg.isPopular ? "text-gray-200" : "text-black"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons (Mobile/Tablet Only) */}
        <div className="w-full flex justify-end gap-3 px-4 lg:px-[71px] mt-1 xl:hidden">
          <button
            onClick={scrollLeft}
            disabled={isAtStart}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtStart ? "bg-[#0CAD31]/50 cursor-not-allowed" : "bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer"}`}
            aria-label="Scroll ke kiri"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={scrollRight}
            disabled={isAtEnd}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtEnd ? "bg-[#0CAD31]/50 cursor-not-allowed" : "bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer"}`}
            aria-label="Scroll ke kanan"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="mt-[30px] flex flex-col items-center text-center gap-[20px]">
          <div className="text-[16px] font-normal text-black leading-relaxed max-w-[800px] whitespace-pre-line">
            {disclaimer}
          </div>

          {/* Tombol Bandingkan Paket - Tampil / Sembunyi sesuai pengaturan CMS */}
          {showCompare && (
            <Link 
              to={comparePlansLink}
              className="bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold text-[16px] w-[247px] h-[44px] rounded-[20px] flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer"
            >
              {comparePlansLabel}
            </Link>
          )}
        </div>

      </div>
    </section>
  )
}
