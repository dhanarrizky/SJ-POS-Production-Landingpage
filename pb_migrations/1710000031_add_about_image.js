/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    // Add about_subtitle
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssaboutsub",
        name: "about_subtitle",
        type: "text",
      }),
    )

    // Add about_image
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssaboutimg",
        name: "about_image",
        type: "file",
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"],
          thumbs: [],
        },
      }),
    )

    dao.saveCollection(siteSettingsCol)
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("ssaboutsub")
    siteSettingsCol.schema.removeField("ssaboutimg")
    dao.saveCollection(siteSettingsCol)
  },
)
