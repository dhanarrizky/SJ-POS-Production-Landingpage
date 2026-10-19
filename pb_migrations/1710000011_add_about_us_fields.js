/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssabstat",
        name: "show_about_stats",
        type: "bool",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssabmitr",
        name: "about_mitra_aktif",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssabpngg",
        name: "about_pengguna_aktif",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssablama",
        name: "about_lama_kemitraan",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssabratg",
        name: "about_rating",
        type: "text",
      }),
    )

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("show_about_stats", false) // Hide by default until real numbers are ready
      record.set("about_mitra_aktif", "120+")
      record.set("about_pengguna_aktif", "1.000+")
      record.set("about_lama_kemitraan", "1 Tahun")
      record.set("about_rating", "4.9/5")
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed about-us fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("ssabstat")
    siteSettingsCol.schema.removeField("ssabmitr")
    siteSettingsCol.schema.removeField("ssabpngg")
    siteSettingsCol.schema.removeField("ssablama")
    siteSettingsCol.schema.removeField("ssabratg")
    dao.saveCollection(siteSettingsCol)
  },
)
