/// <reference path="../pb_data/types.d.ts" />
// Realigns nav copy that was originally seeded in 1710000000_init_schema.js
// with the new wireframe. A prior attempt to do this inside
// 1710000008_add_navbar_fields.js had no effect because that migration was
// already marked as applied before the update was added to it.
migrate(
  (app) => {
    const dao = new Dao(app)
    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("header_menu", [
        { label: "Tentang Kami", href: "#tentang" },
        { label: "Produk", href: "#produk" },
        { label: "Cara Mulai", href: "#cara-mulai" },
        { label: "Harga", href: "#harga" },
        { label: "FAQ", href: "#faq" },
        { label: "Blog", href: "#blog" },
      ])
      record.set("header_login_label", "Log in")
      record.set("header_cta_link", "#harga")
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not update navbar copy:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("header_menu", [
        { label: "Produk", href: "#produk" },
        { label: "Early Partner", href: "#mitra" },
        { label: "Tentang Kami", href: "#tentang" },
        { label: "FAQ", href: "#faq" },
        { label: "Kotak Saran", href: "#saran" },
      ])
      record.set("header_login_label", "Masuk")
      record.set("header_cta_link", "#mitra")
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not revert navbar copy:", e)
    }
  },
)
