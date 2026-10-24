/// <reference path="../pb_data/types.d.ts" />
// Kartu "Spesifikasi dan Fitur" di halaman detail produk (/produk-baru/:slug).
// Satu baris per kartu. `image_path` berisi path RELATIF di SeaweedFS (bukan URL
// penuh); URL dibangun di frontend lewat VITE_MEDIA_BASE_URL. `feature_slug`
// menunjuk ke feature_pages.slug, yaitu tujuan tombol hijau (/fitur/<slug>).
migrate(
  (app) => {
    const dao = new Dao(app)

    const colDef = new Collection({
      id: "grdqnwz274phl01",
      name: "product_highlights",
      type: "base",
      system: false,
      schema: [
        { id: "phlabel1", name: "label", type: "text" },
        { id: "phtitle1", name: "title", type: "text", required: true },
        { id: "phdescr1", name: "description", type: "text" },
        { id: "phbtnlb1", name: "button_label", type: "text" },
        { id: "phftslg1", name: "feature_slug", type: "text" },
        { id: "phimgpt1", name: "image_path", type: "text" },
        { id: "phsort01", name: "sort_order", type: "number" },
        { id: "phactive", name: "active", type: "bool" },
      ],
      // Read-only untuk publik, edit lewat /dashboard (token admin)
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
    })
    dao.saveCollection(colDef)

    const seed = [
      {
        label: "Fitur Utama",
        title: "Sat Set",
        description:
          "Menu favorit, kategori, varian, topping, ukuran, dan metode pembayaran tersedia dalam satu alur kasir yg sederhana.",
        button_label: "Kasir siap melayani tanpa antrean",
        feature_slug: "kasir",
        image_path: "detail-produk/feature-satset.webp",
      },
      {
        label: "Fitur Pembayaran",
        title: "Semua Bayar",
        description:
          "Satu kasir untuk semua metode pembayaran. Catat cash, QRIS, transfer, dan metode pembayaran lainnya dalam satu transaksi.",
        button_label: "Rekonsiliasi otomatis tanpa selisih",
        feature_slug: "bayar-dari-meja",
        image_path: "detail-produk/feature-semua-bayar.webp",
      },
      {
        label: "Fitur Inventori",
        title: "Stokauto",
        description:
          "Setiap penjualan langsung menghitung pemakaian bahan. Hubungkan menu dengan resep dan bahan bakunya.",
        button_label: "Potong Stok Bahan Baku",
        feature_slug: "deteksi-inventori",
        image_path: "detail-produk/feature-stok-auto.webp",
      },
    ]

    try {
      const col = dao.findCollectionByNameOrId("product_highlights")
      seed.forEach((item, i) => {
        const record = new Record(col)
        Object.keys(item).forEach((key) => record.set(key, item[key]))
        record.set("sort_order", i + 1)
        record.set("active", true)
        dao.saveRecord(record)
      })
    } catch (e) {
      console.log("Note: Could not seed product_highlights:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("product_highlights")
    dao.deleteCollection(col)
  },
)
