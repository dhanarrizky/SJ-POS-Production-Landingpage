/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "sskenapakmibdg",
        name: "kenapa_kami_badge",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sskenapakmititl",
        name: "kenapa_kami_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sskenapakmidesc",
        name: "kenapa_kami_desc",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sskenapakmibtnlb",
        name: "kenapa_kami_btn_label",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sskenapakmibtnlk",
        name: "kenapa_kami_btn_link",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sskenapakmicrds",
        name: "kenapa_kami_cards",
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
      "kenapa_kami_badge",
      "kenapa_kami_title",
      "kenapa_kami_desc",
      "kenapa_kami_btn_label",
      "kenapa_kami_btn_link",
      "kenapa_kami_cards",
    ].forEach((name) => {
      const field = siteSettingsCol.schema.getFieldByName(name)
      if (field) {
        siteSettingsCol.schema.removeField(field.id)
      }
    })
    dao.saveCollection(siteSettingsCol)
  }
)
