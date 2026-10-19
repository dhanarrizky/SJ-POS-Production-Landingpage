/// <reference path="../pb_data/types.d.ts" />
// Wires up the remaining sections of the redesigned Home.tsx (Hero, Tentang
// Kami, Produk, Paket Harga, Cara Mulai, Feedback, Blog, Footer) to the CMS.
// These sections were still rendering hardcoded copy after the wireframe
// redesign landed. Also re-seeds the pre-existing (but previously unused)
// `footer_columns` field with the new wireframe's link columns.
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    const maxSize = 2000000 // 2MB, PocketBase Admin UI's own default

    const textFields = [
      ["sshrttl1", "hero_title"],
      ["sshrtlhl", "hero_title_highlight"],
      ["sshrsubt", "hero_subtitle"],
      ["ssabttl1", "about_title"],
      ["ssabdesc", "about_desc"],
      ["sspdttl1", "produk_title"],
      ["sspddesc", "produk_desc"],
      ["sspdbnrt", "produk_banner_title"],
      ["sspdbnrd", "produk_banner_desc"],
      ["sspcttl1", "pricing_title"],
      ["sspcttl2", "pricing_title2"],
      ["sspcdesc", "pricing_desc"],
      ["sspcdisc", "pricing_disclaimer"],
      ["sscmttl1", "cara_mulai_title"],
      ["ssfbttl1", "feedback_title"],
      ["ssfbsubt", "feedback_subtitle"],
      ["ssblttl1", "blog_title"],
      ["ssbldesc", "blog_desc"],
      ["ssftdesc", "footer_desc"],
      ["ssfttagl", "footer_tagline"],
    ]
    textFields.forEach(([id, name]) => {
      siteSettingsCol.schema.addField(new SchemaField({ id, name, type: "text" }))
    })

    const jsonFields = [
      ["ssabchk1", "about_checklist"],
      ["sspcbdgs", "pricing_badges"],
      ["sscmstps", "cara_mulai_steps"],
    ]
    jsonFields.forEach(([id, name]) => {
      siteSettingsCol.schema.addField(
        new SchemaField({ id, name, type: "json", options: { maxSize } }),
      )
    })

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("hero_title", "Kelola Usaha Lebih Mudah,")
      record.set("hero_title_highlight", "Jualan Lebih Spontan")
      record.set(
        "hero_subtitle",
        "Satu ekosistem digital untuk membantu UMKM mengelola kasir, transaksi, pesanan, laundry, dan operasional usaha tanpa ribet.",
      )

      record.set(
        "about_title",
        "Teknologi sederhana untuk usaha yang lebih spontan",
      )
      record.set(
        "about_desc",
        "Banyak UMKM butuh teknologi, tapi tidak semua butuh yang rumit. Kami membuat Spontan Jualan agar pemilik usaha bisa fokus menjalankan bisnis, bukan menguras sistem.",
      )
      record.set("about_checklist", [
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
      ])

      record.set("produk_title", "Satu Platform untuk Kebutuhan Usaha")
      record.set(
        "produk_desc",
        "Kami memahami bahwa menjalankan usaha F&B membutuhkan kecepatan, ketelitian, dan alur kerja yang rapi. Spontan Jualan hadir untuk membantu pemilik usaha mengelola pesanan, meja, transaksi, dan operasional dengan lebih sederhana.",
      )
      record.set("produk_banner_title", "Usaha Anda, Prioritas Kami")
      record.set(
        "produk_banner_desc",
        "Spontan Jualan hadir untuk membantu Anda mengelola usaha lebih mudah, aman, dan nyaman setiap hari. Kami siap mendukung keperluan bisnis Anda.",
      )

      record.set("pricing_title", "Mulai GRATIS 1 Bulan")
      record.set(
        "pricing_title2",
        "Pilih Paket yang Sesuai dengan Kebutuhan Anda",
      )
      record.set(
        "pricing_desc",
        "Kami ingin membangun Jualan bersama pemilik usaha, bukan hanya membuat produk lalu meninggalkannya.",
      )
      record.set("pricing_badges", [
        "Jaminan 30 hari uang kembali",
        "Batalkan kapan saja",
        "Bantuan 24/7",
      ])
      record.set(
        "pricing_disclaimer",
        "Fitur unlimited mengikuti Ketentuan Penggunaan kami. Paket harus lunas dibayar di awal. Harga yang ditampilkan adalah paket produk F&B, dibagi sesuai durasi paket.",
      )

      record.set(
        "cara_mulai_title",
        "Siap Jualan dalam 3 Langkah Sederhana",
      )
      record.set("cara_mulai_steps", [
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
      ])

      record.set("feedback_title", "Customer Feedback")
      record.set(
        "feedback_subtitle",
        "Ribuan Pemilik Usaha Sudah Merasakan Manfaatnya",
      )

      record.set("blog_title", "Insight & Tren Bisnis Terkini")
      record.set(
        "blog_desc",
        "Temukan berbagai informasi, strategi, dan tren terbaru seputar AI, manajemen, bisnis, keuangan, dan teknologi untuk membantu bisnis Anda berkembang.",
      )

      record.set(
        "footer_desc",
        "Spontan Jualan adalah solusi digital yang dirancang untuk membantu UMKM mengelola usaha dengan lebih mudah dan terorganisir. Mulai dari transaksi, produk, stok, hingga pesanan, semuanya dibuat sederhana agar Anda bisa lebih fokus mengembangkan bisnis.",
      )
      record.set(
        "footer_tagline",
        "Kelola Usaha Lebih Mudah. Jualan Lebih Spontan.",
      )
      record.set("footer_columns", [
        {
          title: "Produk",
          links: [
            { label: "POS F&B", href: "#produk" },
            { label: "POS Retail", href: "#produk" },
            { label: "POS Laundry", href: "#produk" },
          ],
        },
        {
          title: "Perusahaan",
          links: [
            { label: "Tentang Kami", href: "#tentang" },
            { label: "Coba Gratis", href: "#harga" },
            { label: "Hubungi Kami", href: "#footer" },
          ],
        },
        {
          title: "Bantuan",
          links: [
            { label: "FAQ", href: "#faq" },
            { label: "Pusat Bantuan", href: "#" },
            { label: "Syarat & Ketentuan", href: "#" },
            { label: "Kebijakan Privasi", href: "#" },
          ],
        },
      ])

      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed remaining section copy fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldIds = [
      "sshrttl1",
      "sshrtlhl",
      "sshrsubt",
      "ssabttl1",
      "ssabdesc",
      "sspdttl1",
      "sspddesc",
      "sspdbnrt",
      "sspdbnrd",
      "sspcttl1",
      "sspcttl2",
      "sspcdesc",
      "sspcdisc",
      "sscmttl1",
      "ssfbttl1",
      "ssfbsubt",
      "ssblttl1",
      "ssbldesc",
      "ssftdesc",
      "ssfttagl",
      "ssabchk1",
      "sspcbdgs",
      "sscmstps",
    ]
    fieldIds.forEach((id) => siteSettingsCol.schema.removeField(id))
    dao.saveCollection(siteSettingsCol)
  },
)
