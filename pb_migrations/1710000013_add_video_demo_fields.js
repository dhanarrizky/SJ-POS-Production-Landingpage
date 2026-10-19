/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssvdmurl",
        name: "video_demo_url",
        type: "text",
      }),
    )

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      // demo_title/demo_subtitle already existed but were never used in the
      // frontend before this section — realign their copy with the wireframe.
      record.set("demo_title", "Lihat Spontan Jualan Beraksi")
      record.set(
        "demo_subtitle",
        "Kenali cara Spontan Jualan membantu pemilik usaha mengelola bisnis dengan lebih mudah. Dari mencatat transaksi hingga memantau operasional, semuanya dirancang sederhana dan praktis untuk kebutuhan usaha sehari-hari.",
      )
      record.set("video_demo_url", "")
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed video demo fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("ssvdmurl")
    dao.saveCollection(siteSettingsCol)
  },
)
