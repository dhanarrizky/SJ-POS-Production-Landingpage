migrate((app) => {
  // 1. Create collections
  const dao = new Dao(app)

  const siteSettingsColDef = new Collection({
    id: "grdqnwz274t1zx1",
    name: "site_settings",
    type: "base",
    system: false,
    schema: [
      { id: "ssname01", name: "site_name", type: "text", required: true },
      { id: "sstitle0", name: "site_title", type: "text" },
      { id: "ssdesc01", name: "site_description", type: "text" },
      { id: "ssctat01", name: "cta_title", type: "text" },
      { id: "ssctas01", name: "cta_sub", type: "text" },
      { id: "sstwtr01", name: "social_twitter", type: "text" },
      { id: "ssinst01", name: "social_instagram", type: "text" },
      { id: "sswhat01", name: "social_whatsapp", type: "text" },
      { id: "ssyout01", name: "social_youtube", type: "text" },
      { id: "ssbran01", name: "brands", type: "json" },
      { id: "sshdmenu", name: "header_menu", type: "json" },
      { id: "sshrpill", name: "hero_pill", type: "text" },
      { id: "sshrbene", name: "hero_benefits", type: "json" },
      { id: "sshrstat", name: "hero_stats", type: "json" },
      { id: "ssdmtitl", name: "demo_title", type: "text" },
      { id: "ssdmsubt", name: "demo_subtitle", type: "text" },
      { id: "ssftcols", name: "footer_columns", type: "json" },
      { id: "sshdclab", name: "header_cta_label", type: "text" },
      { id: "sshdclin", name: "header_cta_link", type: "text" },
      { id: "sshdllab", name: "header_login_label", type: "text" },
      { id: "sshdllin", name: "header_login_link", type: "text" },
      { id: "ssftcopy", name: "footer_copyright", type: "text" },
      { id: "ssftbotl", name: "footer_bottom_links", type: "json" },
      { id: "ssftstat", name: "footer_status_text", type: "text" },
      { id: "ssftappl", name: "footer_app_links", type: "json" },
    ],
    listRule: "",
    viewRule: "",
  })
  dao.saveCollection(siteSettingsColDef)

  const productsColDef = new Collection({
    id: "grdqnwz274t1zx2",
    name: "products",
    type: "base",
    system: false,
    schema: [
      { id: "prname01", name: "name", type: "text", required: true },
      { id: "prslug01", name: "slug", type: "text", required: true },
      { id: "prdesc01", name: "desc", type: "text" },
      { id: "pricon01", name: "icon", type: "text" },
      { id: "prbadg01", name: "badge", type: "text" },
      { id: "prbgcl01", name: "badge_class", type: "text" },
      { id: "pricbg01", name: "icon_bg", type: "text" },
      { id: "prspan01", name: "span2", type: "bool" },
      { id: "prfeat01", name: "features", type: "json" },
      { id: "prdetd01", name: "detail_desc", type: "text" },
      { id: "prspec01", name: "specs", type: "json" },
      { id: "prseot01", name: "seo_title", type: "text" },
      { id: "prseod01", name: "seo_description", type: "text" },
      { id: "practive", name: "active", type: "bool" },
    ],
    listRule: "",
    viewRule: "",
  })
  dao.saveCollection(productsColDef)

  const pricingPlansColDef = new Collection({
    id: "grdqnwz274t1zx3",
    name: "pricing_plans",
    type: "base",
    system: false,
    schema: [
      { id: "pltier01", name: "tier", type: "text", required: true },
      { id: "plsubb01", name: "sub", type: "text" },
      { id: "plmont01", name: "monthly", type: "number" },
      { id: "plannu01", name: "annual", type: "number" },
      { id: "pllabe01", name: "label", type: "text" },
      { id: "plperi01", name: "period", type: "text" },
      { id: "plfeat01", name: "featured", type: "bool" },
      { id: "plctaa01", name: "cta", type: "text" },
      { id: "plbadg01", name: "badge", type: "text" },
      { id: "plperk01", name: "perks", type: "json" },
      { id: "plactive", name: "active", type: "bool" },
    ],
    listRule: "",
    viewRule: "",
  })
  dao.saveCollection(pricingPlansColDef)

  const testimonialsColDef = new Collection({
    id: "grdqnwz274t1zx4",
    name: "testimonials",
    type: "base",
    system: false,
    schema: [
      { id: "tsname01", name: "name", type: "text", required: true },
      { id: "tsrole01", name: "role", type: "text" },
      { id: "tslocc01", name: "loc", type: "text" },
      { id: "tsinit01", name: "initials", type: "text" },
      { id: "tsbggc01", name: "bg", type: "text" },
      { id: "tsquot01", name: "quote", type: "text" },
      { id: "tsactive", name: "active", type: "bool" },
    ],
    listRule: "",
    viewRule: "",
  })
  dao.saveCollection(testimonialsColDef)

  const suggestionsColDef = new Collection({
    id: "grdqnwz274t1zx5",
    name: "suggestions",
    type: "base",
    system: false,
    schema: [
      { id: "sgname01", name: "name", type: "text" },
      { id: "sgemail0", name: "email", type: "text" },
      { id: "sgmess01", name: "message", type: "text", required: true },
    ],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  })
  dao.saveCollection(suggestionsColDef)

  const pageViewsColDef = new Collection({
    id: "grdqnwz274t1zx6",
    name: "page_views",
    type: "base",
    system: false,
    schema: [
      { id: "pvpath01", name: "path", type: "text", required: true },
      { id: "pvuagt01", name: "user_agent", type: "text" },
      { id: "pvipaddr", name: "ip", type: "text" },
      { id: "pvcontry", name: "country", type: "text" },
      { id: "pvregion", name: "region", type: "text" },
      { id: "pvcitynm", name: "city", type: "text" },
      { id: "pvbrowsr", name: "browser", type: "text" },
      { id: "pvosname", name: "os", type: "text" },
    ],
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
    createRule: "",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  })
  dao.saveCollection(pageViewsColDef)

  const visitorAnalyticsColDef = new Collection({
    id: "grdqnwz274t1zx7",
    name: "visitor_analytics",
    type: "view",
    system: false,
    options: {
      query:
        "SELECT 'visitor-stats' as id, 'http://127.0.0.1:8090/dashboard' as visual_dashboard, SUM(CASE WHEN date(created) = date('now') THEN 1 ELSE 0 END) as harian, SUM(CASE WHEN date(created) >= date('now', '-30 days') THEN 1 ELSE 0 END) as bulanan, SUM(CASE WHEN date(created) >= date('now', '-90 days') THEN 1 ELSE 0 END) as per_3_bulan, SUM(CASE WHEN date(created) >= date('now', '-180 days') THEN 1 ELSE 0 END) as per_6_bulan, SUM(CASE WHEN date(created) >= date('now', '-365 days') THEN 1 ELSE 0 END) as per_1_tahun FROM page_views",
    },
    listRule: "@request.auth.id != ''",
    viewRule: "@request.auth.id != ''",
  })
  dao.saveCollection(visitorAnalyticsColDef)

  // 2. Create Default Admin User
  try {
    const admin = new Admin()
    admin.email = "admin@spontanjualan.com"
    // ⚠️ CRITICAL SECURITY WARNING: PASSWORD SEEDED IN PLAINTEXT
    // HARAP SEGERA GANTI PASSWORD via PocketBase Admin Panel (/_/)
    // Jangan pernah menggunakan password default di production!
    admin.setPassword("SpontanUMKMGlobal2026!#")
    dao.saveAdmin(admin)
  } catch (e) {
    // Suppress if already exists
  }

  const populateRecord = (rec, data) => {
    Object.keys(data).forEach((key) => {
      rec.set(key, data[key])
    })
  }

  // 3. Seed Site Settings
  const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
  const siteSettings = new Record(siteSettingsCol)
  populateRecord(siteSettings, {
    site_name: "SpontanJualan",
    site_title: "SpontanJualan - Platform Produk Digital Pendukung UMKM Global",
    site_description:
      "Platform penampung berbagai produk digital premium yang sangat mendukung UMKM Indonesia & Internasional.",
    cta_title: "Siap Kembangkan Bisnis Anda ke Tingkat Global?",
    cta_sub:
      "Bergabunglah dengan ribuan UMKM Indonesia yang telah sukses go-international bersama SpontanJualan.",
    social_twitter: "#",
    social_instagram: "#",
    social_whatsapp: "#",
    social_youtube: "#",
    brands: [
      "Nusa Coffee Shop ☕",
      "Toko Kelontong Berkah 🛒",
      "Kedai Kopi Nusantara 🍵",
      "Distro Urban Style 👕",
      "Apotek Sehat 💊",
      "Bakery Rumahan 🍞",
      "Mie Ayam Barokah 🍜",
    ],
    header_menu: [
      { label: "Fitur Utama", href: "#fitur" },
      { label: "Kasir POS", href: "#demo" },
      { label: "Manajemen Stok", href: "#fitur" },
      { label: "Harga / Paket UMKM", href: "#harga" },
      { label: "Testimoni", href: "#testimoni" },
    ],
    hero_pill: "Aplikasi & Produk Digital UMKM Global #1",
    hero_benefits: [
      "Pembayaran Global & QRIS",
      "Tanpa Biaya Tersembunyi",
      "Dukungan Ekspor UMKM",
      "100% Data Aman & Cloud",
    ],
    hero_stats: {
      rev_label: "Transaksi Ekspor Hari Ini",
      rev_value: "$3,420.50",
      rev_trend: "+18.5% vs kemarin",
      log_label: "Optimasi Logistik Ekspor",
      log_value: "Kontainer Kopi Arabika",
      log_status: "Siap dikirim ke Singapura!",
      active_badge: "Online Hub Active · 100+ UMKM",
    },
    demo_title: "Coba Langsung Sebelum Daftar",
    demo_subtitle:
      "Jelajahi antarmuka kasir, dashboard owner, dan laporan keuangan secara langsung.",
    footer_columns: [
      {
        title: "Produk",
        links: [
          { label: "Spontan POS", href: "#" },
          { label: "Spontan Payment", href: "#" },
          { label: "Spontan Inventory", href: "#" },
          { label: "Spontan Analytics", href: "#" },
          { label: "Multi-Outlet Hub", href: "#" },
          { label: "API Developer", href: "#" },
        ],
      },
      {
        title: "Perusahaan",
        links: [
          { label: "Tentang Kami", href: "#" },
          { label: "Blog & Tips UMKM", href: "#" },
          { label: "Karir", href: "#" },
          { label: "Press Kit", href: "#" },
          { label: "Afiliasi", href: "#" },
          { label: "Mitra Reseller", href: "#" },
        ],
      },
      {
        title: "Bantuan",
        links: [
          { label: "Help Center", href: "#" },
          { label: "Dokumentasi", href: "#" },
          { label: "Status Server", href: "#" },
          { label: "Kontak Kami", href: "#" },
          { label: "Kebijakan Privasi", href: "#" },
          { label: "Syarat Layanan", href: "#" },
        ],
      },
    ],
    header_cta_label: "Coba Gratis",
    header_cta_link: "#harga",
    header_login_label: "Masuk",
    header_login_link: "#",
    footer_copyright:
      "© 2026 SpontanJualan Inc. Hak Cipta Dilindungi Undang-Undang.",
    footer_bottom_links: [
      { label: "Kebijakan Privasi", href: "#" },
      { label: "Syarat Layanan", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
    footer_status_text: "Semua sistem operasional",
    footer_app_links: {
      app_store: "#",
      google_play: "#",
    },
  })
  dao.saveRecord(siteSettings)

  // 4. Seed Products
  const productsCol = dao.findCollectionByNameOrId("products")

  // Product 1
  const prod1 = new Record(productsCol)
  populateRecord(prod1, {
    name: "Spontan POS Global",
    slug: "spontan-pos-global",
    desc: "Transaksi kasir kilat dengan pencarian produk instant, barcode scanner kamera/USB, multi-currency, diskon otomatis, dan cetak struk bluetooth/digital. Tetap jalan tanpa internet.",
    icon: "Zap",
    badge: "Kasir Online",
    badge_class: "text-brand border-brand/30 bg-brand-light",
    icon_bg: "bg-brand",
    span2: true,
    features: [
      "Pencarian Produk Instan",
      "Barcode Scanner Kamera & USB",
      "Mendukung Banyak Mata Uang (Multi-currency)",
      "Transaksi Offline-Ready",
      "Cetak Struk Bluetooth Thermal & PDF",
    ],
    detail_desc:
      "# Spontan POS Global\n\nSistem Kasir Pintar (Point of Sale) modern yang dirancang khusus untuk membantu UMKM Indonesia melakukan transaksi penjualan secara cepat, aman, dan efisien, baik di dalam negeri maupun di pasar ekspor.\n\n### Fitur Utama\n- **Cepat & Andal**: Transaksi selesai dalam hitungan detik.\n- **Offline Mode**: Tetap bisa melayani pelanggan tanpa koneksi internet. Data akan tersinkronisasi otomatis saat online kembali.\n- **Multi-Mata Uang**: Terima pembayaran dengan berbagai mata uang internasional secara langsung.\n- **Multi-Payment Terintegrasi**: Mendukung QRIS otomatis, e-wallet lokal (GoPay, OVO, ShopeePay), kartu kredit, dan metode internasional.\n\n### Mengapa Spontan POS?\nSistem kasir kami telah digunakan oleh ribuan UMKM untuk mempercepat operasional harian mereka hingga 50% dan meminimalkan kesalahan pencatatan transaksi.",
    specs: {
      Platform: "Android, iOS, Windows, macOS, Web",
      "Printer Support": "Bluetooth & USB Thermal 58mm / 80mm",
      "Mata Uang": "IDR, USD, SGD, MYR",
      "Offline Sinkronisasi": "Otomatis saat tersambung internet",
    },
    seo_title: "Spontan POS Global - Aplikasi Kasir Pintar Digital UMKM",
    seo_description:
      "Gunakan Spontan POS Global untuk pencatatan transaksi kasir kilat, offline-ready, dan integrasi QRIS global untuk UMKM Go-International.",
    active: true,
  })
  dao.saveRecord(prod1)

  // Product 2
  const prod2 = new Record(productsCol)
  populateRecord(prod2, {
    name: "Spontan Pembayaran Terintegrasi",
    slug: "spontan-payment",
    desc: "Terima tunai, QRIS otomatis, GoPay, OVO, ShopeePay, DANA, kartu debit/kredit, hingga pembayaran internasional. Semua terekam dalam satu dashboard tanpa kerumitan.",
    icon: "CreditCard",
    badge: "QRIS Global",
    badge_class: "text-cyan-600 border-cyan-600/30 bg-sky-100",
    icon_bg: "bg-cyan-600",
    span2: false,
    features: [
      "QRIS Dinamis Otomatis",
      "E-Wallet Indonesia Lengkap",
      "Kartu Debit & Kredit Internasional",
      "Pencarian Dana Instan (Instant Settlement)",
      "Keamanan Standar PCI-DSS",
    ],
    detail_desc:
      "# Spontan Pembayaran Terintegrasi\n\nSolusi pembayaran digital all-in-one yang menghubungkan bisnis Anda dengan pelanggan domestik maupun mancanegara tanpa repot menyiapkan banyak mesin EDC atau rekening bank.\n\n### Kelebihan Utama\n- **QRIS Instan**: Tampilkan QR Code unik per transaksi langsung di layar kasir.\n- **Global Ready**: Terima pembayaran dari turis asing melalui kartu debit/kredit internasional.\n- **Satu Dashboard**: Laporan keuangan digital terekam dalam dashboard terpusat.\n\n### Kemudahan Integrasi\nCukup dengan satu akun, Anda sudah bisa mengaktifkan lebih dari 10 metode pembayaran digital terpopuler secara instan tanpa biaya setup tambahan.",
    specs: {
      "Metode Pembayaran":
        "QRIS, GoPay, OVO, ShopeePay, DANA, LinkAja, Visa, Mastercard, JCB",
      "Biaya MDR": "Mulai dari 0.7% (QRIS standar Bank Indonesia)",
      Settlement: "T+1 Hari Kerja (Instan untuk paket premium)",
    },
    seo_title: "Spontan Pembayaran - QRIS & E-Wallet Terintegrasi UMKM",
    seo_description:
      "Terima pembayaran digital QRIS domestik dan kartu kredit internasional dalam satu platform kasir SpontanJualan.",
    active: true,
  })
  dao.saveRecord(prod2)

  // Product 3
  const prod3 = new Record(productsCol)
  populateRecord(prod3, {
    name: "Spontan Inventaris & Stok Ekspor",
    slug: "spontan-inventory",
    desc: "Notifikasi otomatis saat stok akan habis, catat barang masuk/keluar, tracking gudang multi-lokasi, dan cegah kehilangan barang dengan laporan arus barang real-time.",
    icon: "Package",
    badge: "Stok Realtime",
    badge_class: "text-amber-600 border-amber-600/30 bg-amber-100",
    icon_bg: "bg-amber-600",
    span2: false,
    features: [
      "Notifikasi Stok Menipis Otomatis",
      "Manajemen Gudang Multi-Lokasi",
      "Sistem FIFO / LIFO Terkomputerisasi",
      "Penyesuaian Stok (Stock Opname) Cepat",
      "Optimasi Stok Barang Ekspor",
    ],
    detail_desc:
      "# Spontan Inventaris & Stok Ekspor\n\nKelola stok gudang Anda secara profesional tanpa takut kekurangan persediaan bahan baku atau barang siap jual. Sistem ini dilengkapi algoritma cerdas yang memberi peringatan dini sebelum barang habis.\n\n### Keunggulan Utama\n- **Multi-Gudang**: Lacak keberadaan barang di berbagai cabang atau gudang berbeda.\n- **Peringatan Otomatis**: Lacak status di smartphone secara real-time.\n- **Laporan Arus Barang**: Laporan mutasi barang masuk, keluar, dan rusak secara terperinci.",
    specs: {
      "Kapasitas Produk": "Tanpa batas (Unlimited untuk paket Pro)",
      "Metode Penilaian": "FIFO (First In First Out), Rata-rata (Average)",
      Notifikasi: "WhatsApp & Push Notification App",
    },
    seo_title: "Spontan Inventaris - Aplikasi Manajemen Stok Gudang UMKM",
    seo_description:
      "Kelola ribuan stok barang di banyak gudang secara real-time dengan alert otomatis stok menipis bersama SpontanJualan.",
    active: true,
  })
  dao.saveRecord(prod3)

  // Product 4
  const prod4 = new Record(productsCol)
  populateRecord(prod4, {
    name: "Spontan Dashboard Laporan Global",
    slug: "spontan-analytics",
    desc: "Pantau grafik omset, produk terlaris, dan jam sibuk toko langsung dari HP Anda. Tidak perlu hadir di lokasi untuk mengetahui kondisi bisnis Anda baik domestik maupun global.",
    icon: "BarChart3",
    badge: "Live Report",
    badge_class: "text-violet-600 border-violet-600/30 bg-violet-100",
    icon_bg: "bg-violet-600",
    span2: false,
    features: [
      "Visualisasi Grafik Omset Terkini",
      "Analisis Produk Terlaris",
      "Pantau Akses Kasir Real-time",
      "Ekspor Laporan dalam Format Excel & PDF",
      "Laporan Multi-Mata Uang Otomatis",
    ],
    detail_desc:
      "# Spontan Dashboard Laporan Global\n\nDashboard analitik canggih yang memberikan gambaran menyeluruh tentang kondisi kesehatan bisnis Anda dari mana saja dan kapan saja. Sempurna untuk pemilik bisnis dengan mobilitas tinggi.\n\n### Fitur Utama\n- **Owner App**: Aplikasi khusus owner untuk memantau dari smartphone secara real-time.\n- **Prediksi Tren**: Algoritma cerdas yang mendeteksi jam-jam sibuk dan produk paling menguntungkan.\n- **Laporan Akuntansi**: Membantu mempermudah pelaporan pajak bulanan.",
    specs: {
      "Format Ekspor": "Excel (.xlsx), PDF, CSV",
      "Periode Laporan": "Harian, Mingguan, Bulanan, Tahunan, Kustom",
      "Komparasi Multi-Outlet": "Tersedia",
    },
    seo_title: "Spontan Analytics - Dashboard Laporan Keuangan Real-time",
    seo_description:
      "Pantau grafik omset harian, produk terlaris, dan analisis keuntungan cabang bisnis dari smartphone Anda.",
    active: true,
  })
  dao.saveRecord(prod4)

  // Product 5
  const prod5 = new Record(productsCol)
  populateRecord(prod5, {
    name: "Spontan Multi-Cabang & Hak Akses",
    slug: "spontan-multi-outlet",
    desc: "Atur shift kasir, pantau performa staf, dan kelola banyak cabang usaha dalam satu akun Owner. Hak akses terpisah per peran untuk keamanan maksimal.",
    icon: "Users",
    badge: "Multi-Outlet",
    badge_class: "text-pink-600 border-pink-600/30 bg-pink-100",
    icon_bg: "bg-pink-600",
    span2: false,
    features: [
      "Manajemen Shift & Kehadiran Kasir",
      "Hak Akses Peran Kustom (Owner, Admin, Kasir)",
      "Konsolidasi Laporan Multi-Cabang",
      "Sinkronisasi Data Produk Terpusat",
      "Keamanan Akses Tingkat Tinggi",
    ],
    detail_desc:
      "# Spontan Multi-Cabang & Hak Akses\n\nKelola jaringan ritel atau cabang waralaba Anda dengan mudah dan aman tanpa risiko kebocoran data transaksi dari staf Anda.\n\n### Kelebihan Utama\n- **Manajemen Shift**: Lacak uang modal dan uang masuk per shift kasir.\n- **Keamanan Multi-Peran**: Batasi hak akses staf sesuai dengan deskripsi pekerjaan mereka untuk menghindari kecurangan.\n- **Sinkronisasi Katalog**: Tambah produk di akun pusat, otomatis terdistribusi ke seluruh cabang pilihan.",
    specs: {
      "Jumlah Cabang": "Tidak terbatas (Paket Enterprise)",
      "Hak Akses Peran": "Owner, Store Manager, Supervisor, Cashier",
      "Audit Trail":
        "Mencatat setiap transaksi yang diubah/dibatalkan oleh staf",
    },
    seo_title: "Spontan Multi-Cabang - Kelola Banyak Toko & Jaringan Bisnis",
    seo_description:
      "Atur shift staf kasir dan kelola laporan keuangan puluhan cabang usaha dalam satu dashboard pusat SpontanJualan.",
    active: true,
  })
  dao.saveRecord(prod5)

  // 5. Seed Pricing Plans
  const pricingCol = dao.findCollectionByNameOrId("pricing_plans")

  const plan1 = new Record(pricingCol)
  populateRecord(plan1, {
    tier: "Starter",
    sub: "UMKM Pemula",
    monthly: 0,
    annual: 0,
    label: "Gratis",
    period: "selamanya",
    featured: false,
    cta: "Mulai Gratis",
    perks: [
      "1 Kasir aktif",
      "100 produk katalog",
      "Laporan penjualan dasar",
      "QRIS Instant",
      "Cetak struk digital",
      "Support via WhatsApp",
    ],
    active: true,
  })
  dao.saveRecord(plan1)

  const plan2 = new Record(pricingCol)
  populateRecord(plan2, {
    tier: "Professional",
    sub: "Paling Populer",
    monthly: 149000,
    annual: 119000,
    label: "",
    period: "/bulan",
    featured: true,
    cta: "Mulai 14 Hari Gratis",
    badge: "Rekomendasi UMKM ⭐",
    perks: [
      "Unlimited produk katalog",
      "3 Kasir aktif",
      "Alert stok menipis otomatis",
      "Manajemen inventaris lengkap",
      "Multi-payment (QRIS, e-wallet, kartu)",
      "Dashboard laporan real-time",
      "Support prioritas 12 jam",
    ],
    active: true,
  })
  dao.saveRecord(plan2)

  const plan3 = new Record(pricingCol)
  populateRecord(plan3, {
    tier: "Enterprise",
    sub: "Multi-Cabang & Ekspor",
    monthly: 299000,
    annual: 239000,
    label: "",
    period: "/bulan",
    featured: false,
    cta: "Hubungi Sales",
    perks: [
      "Unlimited kasir & cabang",
      "Akses Super Admin terpusat",
      "Analytics & insights ekspor lengkap",
      "Manajemen staf & shift",
      "Integrasi global marketplace",
      "API akses kustom",
      "Priority support 24/7",
    ],
    active: true,
  })
  dao.saveRecord(plan3)

  // 6. Seed Testimonials
  const testimonialsCol = dao.findCollectionByNameOrId("testimonials")

  const test1 = new Record(testimonialsCol)
  populateRecord(test1, {
    name: "Budi Santoso",
    role: "Owner Toko Kopi Nusantara",
    loc: "Yogyakarta & Singapura",
    initials: "BS",
    bg: "#0cad31",
    quote:
      "Sejak pakai SpontanJualan, pembukuan Nusa Coffee shop jadi rapi banget. Nggak ada lagi stok hilang dan transaksi kasir jadi jauh lebih cepat! Ekspor biji kopi ke Singapura juga tercatat rapi.",
    active: true,
  })
  dao.saveRecord(test1)

  const test2 = new Record(testimonialsCol)
  populateRecord(test2, {
    name: "Dewi Rahayu",
    role: "Pengelola Retail Distro Urban",
    loc: "Bandung & Malaysia",
    initials: "DR",
    bg: "#7c3aed",
    quote:
      "Fitur QRIS dan laporan real-time di HP bikin saya tenang biarpun lagi di luar toko. Setup-nya gampang, dalam 1 jam langsung jalan dan kasir saya langsung bisa pakai!",
    active: true,
  })
  dao.saveRecord(test2)

  const test3 = new Record(testimonialsCol)
  populateRecord(test3, {
    name: "Ahmad Fauzi",
    role: "Pemilik Apotek Sehat",
    loc: "Surabaya",
    initials: "AF",
    bg: "#0891b2",
    quote:
      "Alert stok menipis dari SpontanJualan menyelamatkan kami beberapa kali. Tidak lagi kehabisan obat penting. Fitur multi-cabang sangat membantu karena saya punya 3 toko.",
    active: true,
  })
  dao.saveRecord(test3)
})
