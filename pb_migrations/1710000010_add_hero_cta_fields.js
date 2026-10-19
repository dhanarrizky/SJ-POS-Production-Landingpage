/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sshrctal",
        name: "hero_cta_label",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sshrctau",
        name: "hero_cta_link",
        type: "text",
      }),
    )

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("hero_cta_label", "Mulai Via Web")
      record.set("hero_cta_link", "#")
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed hero CTA fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("sshrctal")
    siteSettingsCol.schema.removeField("sshrctau")
    dao.saveCollection(siteSettingsCol)
  },
)
