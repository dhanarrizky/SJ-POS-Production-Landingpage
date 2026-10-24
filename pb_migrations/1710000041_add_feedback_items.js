/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "ssfbitem",
        name: "feedback_items",
        type: "json",
        required: false,
        options: { maxSize: 2000000 },
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
    const field = siteSettingsCol.schema.getFieldByName("feedback_items")
    if (field) {
      siteSettingsCol.schema.removeField(field.id)
    }
    dao.saveCollection(siteSettingsCol)
  },
)
