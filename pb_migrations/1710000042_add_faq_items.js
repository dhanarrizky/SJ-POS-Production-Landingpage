/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "ssfaqtitle",
        name: "faq_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "ssfaqitems",
        name: "faq_items",
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
    const fTitle = siteSettingsCol.schema.getFieldByName("faq_title")
    if (fTitle) {
      siteSettingsCol.schema.removeField(fTitle.id)
    }
    const fItems = siteSettingsCol.schema.getFieldByName("faq_items")
    if (fItems) {
      siteSettingsCol.schema.removeField(fItems.id)
    }
    dao.saveCollection(siteSettingsCol)
  },
)
