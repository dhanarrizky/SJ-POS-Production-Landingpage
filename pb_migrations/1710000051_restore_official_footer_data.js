/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      if (record) {
        record.set("footer_columns", [
          {
            title: "Produk",
            links: [{ label: "POS F&B", href: "/produk-baru/pos-fnb" }],
          },
          {
            title: "Perusahaan",
            links: [
              { label: "Tentang Kami", href: "/tentang-kami" },
              { label: "Coba Gratis", href: "#harga" },
              { label: "Hubungi Kami", href: "#kontak" },
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
        record.set("support_phone", "+62 822-6127-4176")
        record.set(
          "footer_location",
          "Brubuh, Selatan makam brubuh rt 03/01, Ngadirojolor, Ngadirojo, Wonogiri, Jawa Tengah, Indonesia"
        )
        record.set("footer_tagline", "Kelola Usaha Lebih Mudah. Jualan Lebih Spontan.")
        record.set(
          "footer_desc",
          "Spontan Jualan adalah solusi digital yang dirancang untuk membantu UMKM mengelola usaha dengan lebih mudah dan terorganisir. Mulai dari transaksi, produk, stok, hingga pesanan, semuanya dibuat sederhana agar Anda bisa lebih fokus mengembangkan bisnis."
        )
        record.set("footer_copyright", "© 2026 Spontan Jualan. Semua hak dilindungi.")
        record.set("footer_bottom_links", [
          { label: "Kebijakan Privasi", href: "#" },
          { label: "Syarat & Ketentuan", href: "#" },
        ])
        dao.saveRecord(record)
      }
    } catch (e) {
      console.log("Could not update site_settings footer data:", e)
    }
  },
  () => {}
)
