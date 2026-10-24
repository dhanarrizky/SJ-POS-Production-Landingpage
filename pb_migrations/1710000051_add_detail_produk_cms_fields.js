/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const json = (id, name) =>
      new SchemaField({ id, name, type: "json", required: false, options: { maxSize: 2000000 } })
    const image = (id, name) =>
      new SchemaField({
        id,
        name,
        type: "file",
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"],
          thumbs: [],
        },
      })

    const fieldsToAdd = [
      json("ssdphero", "dp_hero"),
      json("ssdpfitur", "dp_fitur"),
      json("ssdpdapur", "dp_dapur"),
      json("ssdpmargin", "dp_margin"),
      image("ssdpheroimg", "dp_hero_image"),
      image("ssdpdapurimg", "dp_dapur_image"),
      image("ssdpmarginimg", "dp_margin_image"),
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
      "dp_hero",
      "dp_fitur",
      "dp_dapur",
      "dp_margin",
      "dp_hero_image",
      "dp_dapur_image",
      "dp_margin_image",
    ].forEach((name) => {
      const field = siteSettingsCol.schema.getFieldByName(name)
      if (field) siteSettingsCol.schema.removeField(field.id)
    })
    dao.saveCollection(siteSettingsCol)
  }
)
