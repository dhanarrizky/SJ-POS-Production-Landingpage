/// <reference path="../pb_data/types.d.ts" />
// Fixes JSON schema fields that were defined via raw object literals in the
// init migration without going through SchemaField's initOptions(), leaving
// their `options.maxSize` at 0. PocketBase then rejects ANY non-empty JSON
// value saved through the API (including from the Admin UI) with:
//   "validation_json_size_limit: The maximum allowed JSON size is 0 bytes."
// Seed data written directly via migrations was unaffected because
// dao.saveRecord() during a migration bypasses field validation.
migrate(
  (app) => {
    const dao = new Dao(app)
    const maxSize = 2000000 // 2MB, PocketBase Admin UI's own default

    const jsonFieldsByCollection = {
      site_settings: [
        "brands",
        "header_menu",
        "hero_benefits",
        "hero_stats",
        "footer_columns",
        "footer_bottom_links",
        "footer_app_links",
      ],
      products: ["features", "specs"],
      pricing_plans: ["perks"],
    }

    Object.keys(jsonFieldsByCollection).forEach((collectionName) => {
      const collection = dao.findCollectionByNameOrId(collectionName)
      jsonFieldsByCollection[collectionName].forEach((fieldName) => {
        const field = collection.schema.getFieldByName(fieldName)
        if (field) field.options = { maxSize: maxSize }
      })
      dao.saveCollection(collection)
    })
  },
  (app) => {
    const dao = new Dao(app)

    const jsonFieldsByCollection = {
      site_settings: [
        "brands",
        "header_menu",
        "hero_benefits",
        "hero_stats",
        "footer_columns",
        "footer_bottom_links",
        "footer_app_links",
      ],
      products: ["features", "specs"],
      pricing_plans: ["perks"],
    }

    Object.keys(jsonFieldsByCollection).forEach((collectionName) => {
      const collection = dao.findCollectionByNameOrId(collectionName)
      jsonFieldsByCollection[collectionName].forEach((fieldName) => {
        const field = collection.schema.getFieldByName(fieldName)
        if (field) field.options = { maxSize: 0 }
      })
      dao.saveCollection(collection)
    })
  },
)
