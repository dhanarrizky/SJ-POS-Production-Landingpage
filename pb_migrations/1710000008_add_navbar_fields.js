/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sscntem",
        name: "contact_email",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sshdrgl",
        name: "header_register_label",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sshdrgu",
        name: "header_register_link",
        type: "text",
      }),
    )

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("contact_email", "spontan.jualan@spontan.com")
      record.set("header_register_label", "Daftar")
      record.set("header_register_link", "#harga")
      // Realign existing seeded nav copy with the new wireframe
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
      console.log("Note: Could not seed new site_settings fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("sscntem")
    siteSettingsCol.schema.removeField("sshdrgl")
    siteSettingsCol.schema.removeField("sshdrgu")
    dao.saveCollection(siteSettingsCol)
  },
)
