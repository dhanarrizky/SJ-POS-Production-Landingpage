/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "sscmbdg0",
        name: "cara_mulai_badge",
        type: "text",
        required: false,
      }),
    ]

    fieldsToAdd.forEach((field) => {
      if (!siteSettingsCol.schema.getFieldByName(field.name)) {
        siteSettingsCol.schema.addField(field)
      }
    })

    dao.saveCollection(siteSettingsCol)
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    const field = siteSettingsCol.schema.getFieldByName("cara_mulai_badge")
    if (field) {
      siteSettingsCol.schema.removeField(field.id)
    }
    dao.saveCollection(siteSettingsCol)
  },
)
