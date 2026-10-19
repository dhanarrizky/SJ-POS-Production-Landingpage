/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    siteSettingsCol.schema.addField(
      new SchemaField({ id: "sssupphn", name: "support_phone", type: "text" }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({ id: "ssftloc0", name: "footer_location", type: "text" }),
    )
    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("support_phone", "+123456789")
      record.set("footer_location", "Daerah Istimewa Yogyakarta")
      record.set("footer_copyright", "© 2026 Spontan Jualan. Semua hak dilindungi.")
      record.set("footer_bottom_links", [
        { label: "Kebijakan Privasi", href: "#" },
        { label: "Syarat & Ketentuan", href: "#" },
      ])
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed footer contact fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("sssupphn")
    siteSettingsCol.schema.removeField("ssftloc0")
    dao.saveCollection(siteSettingsCol)
  },
)
