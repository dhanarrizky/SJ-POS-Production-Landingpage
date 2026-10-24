/// <reference path="../pb_data/types.d.ts" />
// Follow-up to 1710000007_fix_json_field_maxsize.js. That migration used a
// hardcoded field list and missed `site_settings.trust_items` (added later in
// 1710000001_add_cms_fields.js without options.maxSize), so saving any
// site_settings record from the Admin UI failed with
// "validation_json_size_limit: The maximum allowed JSON size is 0 bytes."
// This one scans every collection and fixes any JSON field whose maxSize is 0.
migrate(
  (app) => {
    const dao = new Dao(app)
    const maxSize = 2000000 // 2MB, PocketBase Admin UI's own default

    dao.findCollectionsByType("base").forEach((collection) => {
      let changed = false
      collection.schema.fields().forEach((field) => {
        if (field.type !== "json") return
        if (field.options && field.options.maxSize > 0) return
        field.options = { maxSize: maxSize }
        changed = true
      })
      if (changed) dao.saveCollection(collection)
    })
  },
  () => {
    // No-op: restoring maxSize = 0 would only re-introduce the bug.
  },
)
