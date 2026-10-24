/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    if (!siteSettingsCol.schema.getFieldByName("logo_path")) {
      siteSettingsCol.schema.addField(
        new SchemaField({
          id: "sslogopath",
          name: "logo_path",
          type: "text",
          required: false,
        }),
      )
      dao.saveCollection(siteSettingsCol)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    const field = siteSettingsCol.schema.getFieldByName("logo_path")
    if (field) {
      siteSettingsCol.schema.removeField(field.id)
      dao.saveCollection(siteSettingsCol)
    }
  },
)
