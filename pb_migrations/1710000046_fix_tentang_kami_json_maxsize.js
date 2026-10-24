/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const maxSize = 2000000 // 2MB, PocketBase default

    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    let changed = false
    siteSettingsCol.schema.fields().forEach((field) => {
      if (field.type !== "json") return
      if (!field.options || !field.options.maxSize || field.options.maxSize <= 0) {
        field.options = { maxSize: maxSize }
        changed = true
      }
    })
    if (changed) {
      dao.saveCollection(siteSettingsCol)
    }
  },
  () => {}
)
