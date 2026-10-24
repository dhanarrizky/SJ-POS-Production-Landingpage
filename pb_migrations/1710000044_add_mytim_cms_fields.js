/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "ssmytimbadge",
        name: "my_tim_badge",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssmytimtitle",
        name: "my_tim_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssmytimdesc",
        name: "my_tim_desc",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssmytimmembers",
        name: "my_tim_members",
        type: "json",
        required: false,
      }),
      new SchemaField({
        id: "ssmytimstats",
        name: "my_tim_stats",
        type: "json",
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
      "my_tim_badge",
      "my_tim_title",
      "my_tim_desc",
      "my_tim_members",
      "my_tim_stats",
    ].forEach((name) => {
      const field = siteSettingsCol.schema.getFieldByName(name)
      if (field) {
        siteSettingsCol.schema.removeField(field.id)
      }
    })
    dao.saveCollection(siteSettingsCol)
  }
)
