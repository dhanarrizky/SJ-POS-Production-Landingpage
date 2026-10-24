/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "sspckpkgjson",
        name: "pricing_packages",
        type: "json",
        required: false,
        options: { maxSize: 2000000 },
      }),
      new SchemaField({
        id: "sscmplabel",
        name: "compare_plans_label",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspractcat",
        name: "pricing_active_category",
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
      "pricing_packages",
      "compare_plans_label",
      "pricing_active_category",
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
