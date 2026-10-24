/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "ssmtpbdg",
        name: "mitra_pertama_badge",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssmtpttl",
        name: "mitra_pertama_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssmtpdesc",
        name: "mitra_pertama_desc",
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
    const names = [
      "mitra_pertama_badge",
      "mitra_pertama_title",
      "mitra_pertama_desc",
    ]
    names.forEach((name) => {
      const field = siteSettingsCol.schema.getFieldByName(name)
      if (field) {
        siteSettingsCol.schema.removeField(field.id)
      }
    })
    dao.saveCollection(siteSettingsCol)
  },
)
