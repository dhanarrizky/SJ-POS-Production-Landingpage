/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "ssksbadge",
        name: "kontak_saran_badge",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sskstitle",
        name: "kontak_saran_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssksdesc",
        name: "kontak_saran_desc",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssksinfot",
        name: "kontak_saran_info_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssksinfod",
        name: "kontak_saran_info_desc",
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
    ;[
      "kontak_saran_badge",
      "kontak_saran_title",
      "kontak_saran_desc",
      "kontak_saran_info_title",
      "kontak_saran_info_desc",
    ].forEach((name) => {
      const field = siteSettingsCol.schema.getFieldByName(name)
      if (field) {
        siteSettingsCol.schema.removeField(field.id)
      }
    })
    dao.saveCollection(siteSettingsCol)
  },
)
