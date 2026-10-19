/// <reference path="../pb_data/types.d.ts" />
// Realigns each product's short `desc` copy with the new wireframe wording.
// `desc` is shown both in the Produk section list and at the top of each
// product's detail page, so this keeps both in sync.
migrate(
  (app) => {
    const dao = new Dao(app)
    const newDescBySlug = {
      "pos-fnb":
        "Dirancang khusus untuk bisnis kuliner agar pelayanan lebih cepat dan operasional lebih rapi",
      "pos-retail":
        "Solusi lengkap untuk membantu proses penjualan, manajemen produk, dan pemantauan stok lebih efisien",
      "pos-laundry":
        "Pantau status cucian, data pelanggan, dan riwayat order dalam satu sistem yang sederhana",
    }

    Object.keys(newDescBySlug).forEach((slug) => {
      try {
        const record = dao.findFirstRecordByFilter(
          "products",
          `slug = "${slug}"`,
        )
        record.set("desc", newDescBySlug[slug])
        dao.saveRecord(record)
      } catch (e) {
        console.log(`Note: Could not update desc for ${slug}:`, e)
      }
    })
  },
  (app) => {
    const dao = new Dao(app)
    const oldDescBySlug = {
      "pos-fnb":
        "Dibuat untuk restoran, warung makan, coffee shop, kedai, dan bisnis F&B lainnya.",
      "pos-retail":
        "Cocok untuk toko kelontong, minimarket, butik, toko retail, dan berbagai usaha penjualan barang.",
      "pos-laundry": "Dirancang untuk usaha laundry kiloan maupun satuan.",
    }

    Object.keys(oldDescBySlug).forEach((slug) => {
      try {
        const record = dao.findFirstRecordByFilter(
          "products",
          `slug = "${slug}"`,
        )
        record.set("desc", oldDescBySlug[slug])
        dao.saveRecord(record)
      } catch (e) {
        console.log(`Note: Could not revert desc for ${slug}:`, e)
      }
    })
  },
)
