/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const textFields = [
      { id: "nvtktxt0", name: "nav_tentang_kami_text" },
      { id: "nvpdtxt0", name: "nav_produk_text" },
      { id: "nvhrtxt0", name: "nav_harga_text" },
      { id: "nvcmtxt0", name: "nav_cara_mulai_text" },
      { id: "nvfqtxt0", name: "nav_faq_text" },
      { id: "nvbltxt0", name: "nav_blog_text" },
      { id: "nvcgtxt0", name: "nav_coba_gratis_text" }
    ]
    
    const boolFields = [
      { id: "nvtkhid0", name: "nav_tentang_kami_hide" },
      { id: "nvpdhid0", name: "nav_produk_hide" },
      { id: "nvhrhid0", name: "nav_harga_hide" },
      { id: "nvcmhid0", name: "nav_cara_mulai_hide" },
      { id: "nvfqhid0", name: "nav_faq_hide" },
      { id: "nvblhid0", name: "nav_blog_hide" },
      { id: "nvcghid0", name: "nav_coba_gratis_hide" }
    ]

    textFields.forEach(f => {
      siteSettingsCol.schema.addField(
        new SchemaField({
          id: f.id,
          name: f.name,
          type: "text",
        })
      )
    })

    boolFields.forEach(f => {
      siteSettingsCol.schema.addField(
        new SchemaField({
          id: f.id,
          name: f.name,
          type: "bool",
        })
      )
    })

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("nav_tentang_kami_text", "Tentang Kami")
      record.set("nav_tentang_kami_hide", false)
      record.set("nav_produk_text", "Produk")
      record.set("nav_produk_hide", false)
      record.set("nav_harga_text", "Harga")
      record.set("nav_harga_hide", false)
      record.set("nav_cara_mulai_text", "Cara Mulai")
      record.set("nav_cara_mulai_hide", false)
      record.set("nav_faq_text", "FAQ")
      record.set("nav_faq_hide", false)
      record.set("nav_blog_text", "Blog")
      record.set("nav_blog_hide", false)
      record.set("nav_coba_gratis_text", "Coba Gratis")
      record.set("nav_coba_gratis_hide", false)
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed new navbar site_settings fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    
    const allFields = [
      "nav_tentang_kami_text", "nav_tentang_kami_hide",
      "nav_produk_text", "nav_produk_hide",
      "nav_harga_text", "nav_harga_hide",
      "nav_cara_mulai_text", "nav_cara_mulai_hide",
      "nav_faq_text", "nav_faq_hide",
      "nav_blog_text", "nav_blog_hide",
      "nav_coba_gratis_text", "nav_coba_gratis_hide"
    ]

    allFields.forEach(name => {
      try {
        siteSettingsCol.schema.removeField(name)
      } catch (e) {}
    })
    
    dao.saveCollection(siteSettingsCol)
  },
)
