import React, { useState } from "react"
import type { SiteSettings, PricingPackageItem } from "../../../types/cms"

interface PaketHargaCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
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

const CATEGORY_OPTIONS = [
  {
    id: "POS F&B",
    name: "POS F&B",
    desc: "Sistem kasir dan operasional resto, cafe, & rumah makan",
  },
  {
    id: "Laundry",
    name: "Laundry",
    desc: "Sistem kasir kiloan & satuan serta manajemen rak cucian",
  },
  {
    id: "Retail",
    name: "Retail",
    desc: "Sistem kasir toko ritel, barcode scanner, & stok barang",
  },
  {
    id: "Produk Digital",
    name: "Produk Digital",
    desc: "Layanan pulsa, paket data, voucher game, & tagihan PPOB",
  },
]

export default function PaketHargaCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: PaketHargaCMSContentProps) {
  // Kategori aktif yang sedang ditampilkan di landing page depan
  const activeCategoryInFront = settings.pricing_active_category || "POS F&B"

  // Tab kategori yang sedang dipilih / diedit di CMS
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryInFront)

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  // Ambil packages dari settings atau gunakan default jika belum ada
  let packages: PricingPackageItem[] = DEFAULT_PACKAGES
  if (settings.pricing_packages) {
    if (Array.isArray(settings.pricing_packages)) {
      packages = settings.pricing_packages
    } else if (typeof settings.pricing_packages === "string") {
      try {
        const parsed = JSON.parse(settings.pricing_packages)
        if (Array.isArray(parsed) && parsed.length > 0) packages = parsed
      } catch (e) {}
    }
  }

  // Lengkapi dengan kategori dari DEFAULT_PACKAGES jika ada kategori yang belum ada di packages
  const existingCategories = new Set(
    packages.map((pkg) => (pkg.productCategory || "POS F&B").toLowerCase())
  )
  const missingFromDefaults = DEFAULT_PACKAGES.filter(
    (dpkg) => !existingCategories.has((dpkg.productCategory || "POS F&B").toLowerCase())
  )
  if (missingFromDefaults.length > 0) {
    packages = [...packages, ...missingFromDefaults]
  }

  // Filter paket yang sesuai dengan kategori yang sedang dipilih di tab CMS
  const filteredPackagesWithIndex = packages
    .map((pkg, realIndex) => ({ pkg, realIndex }))
    .filter(({ pkg }) => {
      const cat = pkg.productCategory || "POS F&B"
      return cat.toLowerCase() === selectedCategory.toLowerCase()
    })

  // Badges / Poin Keunggulan
  let badges: string[] = [
    "Unlimited Transaksi",
    "Unlimited Meja & Produk",
    "Batalkan Kapan Saja",
  ]
  if (settings.pricing_badges) {
    if (Array.isArray(settings.pricing_badges)) {
      badges = settings.pricing_badges
    } else if (typeof settings.pricing_badges === "string") {
      try {
        const parsed = JSON.parse(settings.pricing_badges)
        if (Array.isArray(parsed) && parsed.length > 0) badges = parsed
      } catch (e) {}
    }
  }

  // State Tombol Bandingkan Paket
  const showCompareVal = settings.show_compare_plans
  const isCompareActive = Boolean(
    showCompareVal === true ||
    showCompareVal === "true" ||
    showCompareVal === 1 ||
    showCompareVal === "1"
  )

  // Handlers untuk Badges
  const handleAddBadge = () => {
    const updated = [...badges, "Poin Keunggulan Baru"]
    handleChange("pricing_badges", updated)
  }

  const handleUpdateBadge = (idx: number, val: string) => {
    const updated = [...badges]
    updated[idx] = val
    handleChange("pricing_badges", updated)
  }

  const handleRemoveBadge = (idx: number) => {
    const updated = badges.filter((_, i) => i !== idx)
    handleChange("pricing_badges", updated)
  }

  // Handlers untuk Packages
  const handleAddPackage = () => {
    const newPkg: PricingPackageItem = {
      label: "PAKET BARU",
      title: "Nama Paket Baru",
      currency: "Rp",
      price: "100.000",
      period: "/Bln",
      access: "Akses lengkap usaha Anda",
      subText: "Keterangan singkat paket ini.",
      isPopular: false,
      btnLabel: "Pilih Paket",
      btnLink: "/daftar",
      show: true,
      productCategory: selectedCategory,
      features: ["Fitur unggulan 1", "Fitur unggulan 2"],
    }
    const updated = [...packages, newPkg]
    handleChange("pricing_packages", updated)
  }

  const handleUpdatePackage = (realIndex: number, field: keyof PricingPackageItem, value: any) => {
    const updated = [...packages]
    updated[realIndex] = { ...updated[realIndex], [field]: value }
    handleChange("pricing_packages", updated)
  }

  const handleRemovePackage = (realIndex: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket harga ini?")) return
    const updated = packages.filter((_, i) => i !== realIndex)
    handleChange("pricing_packages", updated)
  }

  const handleAddFeature = (realIndex: number) => {
    const pkg = packages[realIndex]
    const updatedFeatures = [...(pkg.features || []), "Fitur Baru"]
    handleUpdatePackage(realIndex, "features", updatedFeatures)
  }

  const handleUpdateFeature = (realIndex: number, featIdx: number, val: string) => {
    const pkg = packages[realIndex]
    const updatedFeatures = [...(pkg.features || [])]
    updatedFeatures[featIdx] = val
    handleUpdatePackage(realIndex, "features", updatedFeatures)
  }

  const handleRemoveFeature = (realIndex: number, featIdx: number) => {
    const pkg = packages[realIndex]
    const updatedFeatures = (pkg.features || []).filter((_, i) => i !== featIdx)
    handleUpdatePackage(realIndex, "features", updatedFeatures)
  }

  return (
    <div className="p-6">
      {/* Header Halaman CMS - Tanpa Icon & Tanpa Tombol Simpan Duplikat */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">
          Paket Harga
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola paket harga setiap produk, tentukan produk yang tampil di landing page depan, serta atur tombol Bandingkan Paket.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* BAGIAN 1: PENGATURAN TOMBOL BANDINGKAN PAKET */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">
              1. Pengaturan Tombol "Bandingkan Paket"
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Atur apakah tombol pembanding paket ditampilkan di bawah kartu harga serta halaman yang dituju.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="glass p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Tampilkan Tombol Bandingkan Paket</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Aktifkan jika ingin memunculkan tombol "Bandingkan Paket" di landing page.
              </p>
            </div>
            <label className="flex items-center cursor-pointer shrink-0">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isCompareActive}
                  onChange={(e) => handleChange("show_compare_plans", e.target.checked)}
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${isCompareActive ? "bg-emerald-500" : "bg-slate-700"}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isCompareActive ? "transform translate-x-6" : ""}`}></div>
              </div>
              <span className="ml-3 text-sm font-semibold text-white">
                {isCompareActive ? "Aktif (Tampil)" : "Disembunyikan"}
              </span>
            </label>
          </div>

          {/* Pengaturan Teks & Link Tombol */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Teks Label Tombol
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={settings.compare_plans_label !== undefined ? settings.compare_plans_label : "Bandingkan Paket"}
                onChange={(e) => handleChange("compare_plans_label", e.target.value)}
                placeholder="Bandingkan Paket"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tautan / URL Halaman Tujuan
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={settings.compare_plans_link !== undefined ? settings.compare_plans_link : "/bandingkan-paket"}
                onChange={(e) => handleChange("compare_plans_link", e.target.value)}
                placeholder="/bandingkan-paket"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: JUDUL & INFORMASI ATAS */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">
              2. Judul & Informasi Bagian Paket Harga
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Teks pengantar di bagian atas sebelum kartu-kartu paket harga.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Judul Utama
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={settings.pricing_title !== undefined ? settings.pricing_title : "Mulai GRATIS Tanpa Batas\nPilih Paket Sesuai Pertumbuhan Anda"}
                onChange={(e) => handleChange("pricing_title", e.target.value)}
                placeholder={"Mulai GRATIS Tanpa Batas\nPilih Paket Sesuai Pertumbuhan Anda"}
              />
              <p className="text-xs text-slate-500 mt-1">
                Gunakan baris baru (Enter) untuk memisahkan baris judul.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Deskripsi / Subtitle
              </label>
              <textarea
                rows={3}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={settings.pricing_desc !== undefined ? settings.pricing_desc : "Spontan Jualan tidak membatasi jumlah transaksi dan produk Anda. Fitur pencetak omzet selalu gratis, Anda hanya bayar untuk alat operasional yang lebih canggih."}
                onChange={(e) => handleChange("pricing_desc", e.target.value)}
                placeholder="Spontan Jualan tidak membatasi jumlah transaksi dan produk Anda..."
              />
            </div>

            {/* Poin Keunggulan / Badges */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-300">
                  Poin Keunggulan (Bullet Points di Bawah Judul)
                </label>
                <button
                  type="button"
                  onClick={handleAddBadge}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  + Tambah Poin
                </button>
              </div>

              <div className="space-y-2">
                {badges.map((badge, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white shrink-0 ml-1"></div>
                    <input
                      type="text"
                      className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
                      value={badge}
                      onChange={(e) => handleUpdateBadge(bIdx, e.target.value)}
                      placeholder="Poin Keunggulan..."
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBadge(bIdx)}
                      className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer font-semibold border border-transparent hover:border-red-500/20"
                      title="Hapus Poin"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 3: DAFTAR KARTU PAKET HARGA & PEMILIHAN PRODUK */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">
                3. Kartu Paket Harga per Produk
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Kelola paket untuk setiap produk dan aktifkan produk yang ingin ditampilkan di landing page depan.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddPackage}
              className="text-xs bg-white/15 hover:bg-white/25 text-white border border-white/25 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer self-start sm:self-auto"
            >
              + Tambah Paket ({selectedCategory})
            </button>
          </div>

          {/* PEMILIHAN KATEGORI PRODUK & TOMBOL AKTIFKAN DI DEPAN */}
          <div className="space-y-3">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Pilih Produk & Atur Paket yang Tampil di Depan:
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Klik produk untuk mengelola paketnya. Gunakan tombol <strong>"Aktifkan Paket di Bagian Depan Landing Page"</strong> untuk memilih paket produk apa yang tampil di halaman depan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = selectedCategory === cat.id
                const isCurrentlyActiveInFront = activeCategoryInFront.toLowerCase() === cat.id.toLowerCase()

                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-800 border-white/50 shadow-md ring-1 ring-white/20"
                        : "bg-slate-800/40 border-white/10 hover:bg-slate-800/70 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-bold text-sm text-white">{cat.name}</span>
                        {isCurrentlyActiveInFront ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                            Aktif di Depan
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded font-medium text-slate-400 bg-white/5 border border-white/10 shrink-0">
                            Tersimpan
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-snug line-clamp-2 mb-3">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      {isCurrentlyActiveInFront ? (
                        <div className="w-full py-2 px-2 text-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-xs">
                          Sedang Aktif di Depan
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChange("pricing_active_category", cat.id)
                            setSelectedCategory(cat.id)
                          }}
                          className="w-full py-2 px-2 text-center rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Aktifkan Paket di Bagian Depan Landing Page
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* BANNER STATUS KATEGORI YANG SEDANG DIBUKA */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            activeCategoryInFront.toLowerCase() === selectedCategory.toLowerCase()
              ? "bg-emerald-950/30 border-emerald-500/30"
              : "bg-slate-800/60 border-white/10"
          }`}>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Kelola Paket: <strong className="underline">{selectedCategory}</strong></span>
                {activeCategoryInFront.toLowerCase() === selectedCategory.toLowerCase() && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Aktif di Landing Page
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeCategoryInFront.toLowerCase() === selectedCategory.toLowerCase()
                  ? `Paket untuk produk ${selectedCategory} sedang aktif ditampilkan ke pengunjung landing page.`
                  : `Paket untuk produk ${selectedCategory} tersimpan di sistem, namun saat ini yang tampil di landing page adalah produk "${activeCategoryInFront}".`}
              </p>
            </div>

            {activeCategoryInFront.toLowerCase() !== selectedCategory.toLowerCase() && (
              <button
                type="button"
                onClick={() => handleChange("pricing_active_category", selectedCategory)}
                className="shrink-0 text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md active:scale-98 cursor-pointer"
              >
                Aktifkan Paket di Bagian Depan Landing Page
              </button>
            )}
          </div>

          {/* DAFTAR PAKET UNTUK KATEGORI YANG DIPILIH */}
          <div className="space-y-6 pt-2">
            {filteredPackagesWithIndex.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-white/5">
                <p className="text-slate-400 text-sm">
                  Belum ada paket harga untuk produk <strong>{selectedCategory}</strong>.
                </p>
                <button
                  type="button"
                  onClick={handleAddPackage}
                  className="mt-3 text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3.5 py-1.5 rounded-lg font-semibold inline-flex items-center cursor-pointer"
                >
                  + Buat Paket Baru
                </button>
              </div>
            ) : (
              filteredPackagesWithIndex.map(({ pkg, realIndex }, listIdx) => {
                const isItemVisible = pkg.show !== false
                return (
                  <div
                    key={realIndex}
                    className={`p-5 rounded-2xl border transition-all duration-200 ${
                      pkg.isPopular
                        ? "bg-slate-800 border-white/30 shadow-lg"
                        : isItemVisible
                        ? "bg-slate-800/80 border-white/10"
                        : "bg-slate-900/60 border-white/5 opacity-70"
                    }`}
                  >
                    {/* Header Card Paket - Tanpa Icon */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center">
                          #{listIdx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-white">
                              {pkg.label || "PAKET"} - {pkg.title || "Tanpa Judul"}
                            </span>
                            {pkg.isPopular && (
                              <span className="bg-white/20 text-white border border-white/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                REKOMENDASI
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>Harga: <strong className="text-white">{pkg.currency || "Rp"} {pkg.price} {pkg.period || "/Bln"}</strong></span>
                            <span>•</span>
                            <span className={isItemVisible ? "text-white font-semibold" : "text-amber-400 font-semibold"}>
                              {isItemVisible ? "Tampil di Landing Page" : "Disembunyikan"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tombol Aksi Header Card - Tanpa Icon */}
                      <div className="flex items-center gap-2">
                        {/* Toggle Rekomendasi */}
                        <button
                          type="button"
                          onClick={() => handleUpdatePackage(realIndex, "isPopular", !pkg.isPopular)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            pkg.isPopular
                              ? "bg-white text-slate-900 border-white font-bold"
                              : "bg-slate-800 text-slate-400 border-white/10 hover:text-white"
                          }`}
                          title="Tandai sebagai paket rekomendasi"
                        >
                          {pkg.isPopular ? "Rekomendasi (Aktif)" : "Jadikan Rekomendasi"}
                        </button>

                        {/* Toggle Tampil/Sembunyi */}
                        <button
                          type="button"
                          onClick={() => handleUpdatePackage(realIndex, "show", !isItemVisible)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            isItemVisible
                              ? "bg-white/15 text-white border-white/30 hover:bg-white/20"
                              : "bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700 hover:text-white"
                          }`}
                        >
                          {isItemVisible ? "Tampil" : "Sembunyi"}
                        </button>

                        {/* Hapus Paket */}
                        <button
                          type="button"
                          onClick={() => handleRemovePackage(realIndex)}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-500/15 border border-transparent hover:border-red-500/20 font-semibold transition-all cursor-pointer"
                          title="Hapus Paket"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>

                    {/* Field Data Paket */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Label Paket (Kicker)
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-semibold"
                          value={pkg.label}
                          onChange={(e) => handleUpdatePackage(realIndex, "label", e.target.value)}
                          placeholder="BASIC / GROWTH / PREMIUM"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Judul / Nama Paket
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-semibold"
                          value={pkg.title}
                          onChange={(e) => handleUpdatePackage(realIndex, "title", e.target.value)}
                          placeholder="Semua Kebutuhan Kasir"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Nominal Harga
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="w-16 bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-white text-center text-sm font-bold"
                            value={pkg.currency || "Rp"}
                            onChange={(e) => handleUpdatePackage(realIndex, "currency", e.target.value)}
                            placeholder="Rp"
                          />
                          <input
                            type="text"
                            className="flex-1 bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm font-bold"
                            value={pkg.price}
                            onChange={(e) => handleUpdatePackage(realIndex, "price", e.target.value)}
                            placeholder="25.000"
                          />
                          <input
                            type="text"
                            className="w-24 bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-white text-center text-sm"
                            value={pkg.period || "/Bln"}
                            onChange={(e) => handleUpdatePackage(realIndex, "period", e.target.value)}
                            placeholder="/Bln"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Sub-judul Akses
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
                          value={pkg.access || ""}
                          onChange={(e) => handleUpdatePackage(realIndex, "access", e.target.value)}
                          placeholder="Untuk bisnis yang berkembang"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Keterangan / Subtext Bawah Tombol
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
                          value={pkg.subText || ""}
                          onChange={(e) => handleUpdatePackage(realIndex, "subText", e.target.value)}
                          placeholder="Cocok untuk tingkatkan kecepatan pelayanan..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Teks Tombol CTA
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
                          value={pkg.btnLabel || "Pilih Paket"}
                          onChange={(e) => handleUpdatePackage(realIndex, "btnLabel", e.target.value)}
                          placeholder="Pilih Paket"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Link Tombol CTA
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-white/40 text-sm"
                          value={pkg.btnLink || "/daftar"}
                          onChange={(e) => handleUpdatePackage(realIndex, "btnLink", e.target.value)}
                          placeholder="/daftar atau link WhatsApp"
                        />
                      </div>
                    </div>

                    {/* DAFTAR FITUR (CHECKLIST) PAKET - Tanpa Icon */}
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs font-bold text-white">
                          Daftar Fitur Paket ({pkg.features?.length || 0})
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddFeature(realIndex)}
                          className="text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded font-semibold cursor-pointer border border-white/10"
                        >
                          + Tambah Fitur
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(pkg.features || []).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-white/5">
                            <span className="text-white text-xs font-bold">•</span>
                            <input
                              type="text"
                              className="flex-1 bg-transparent text-white text-xs px-2 py-1 focus:outline-none focus:bg-slate-800 rounded"
                              value={feat}
                              onChange={(e) => handleUpdateFeature(realIndex, fIdx, e.target.value)}
                              placeholder="Nama fitur..."
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(realIndex, fIdx)}
                              className="px-2 py-0.5 text-xs text-slate-400 hover:text-red-400 rounded transition-colors cursor-pointer"
                              title="Hapus Fitur"
                            >
                              Hapus
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* BAGIAN 4: CATATAN DISCLAIMER BAWAH */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">
              4. Catatan / Disclaimer di Bawah Kartu
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Teks penjelasan syarat & ketentuan penggunaan di bagian bawah kartu paket harga.
            </p>
          </div>

          <div>
            <textarea
              rows={3}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
              value={settings.pricing_disclaimer !== undefined ? settings.pricing_disclaimer : "Fitur unlimited mengikuti Ketentuan Penggunaan kami.\nPaket harus lunas dibayar di awal. Harga bulanan yang di tampilkan adalah paket produk dibagi durasi paket"}
              onChange={(e) => handleChange("pricing_disclaimer", e.target.value)}
              placeholder="Fitur unlimited mengikuti Ketentuan Penggunaan kami..."
            />
          </div>
        </div>

        {/* SATU TOMBOL SIMPAN DI BAWAH (HANYA SATU, TANPA ICON) */}
        {onSave && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer text-base"
            >
              {isSaving ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

