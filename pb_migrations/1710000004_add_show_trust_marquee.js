/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssshowtm",
        name: "show_trust_marquee",
        type: "bool",
      }),
    )

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("show_trust_marquee", false) // Hide by default
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not set default show_trust_marquee value:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("ssshowtm")
    dao.saveCollection(siteSettingsCol)
  },
)
