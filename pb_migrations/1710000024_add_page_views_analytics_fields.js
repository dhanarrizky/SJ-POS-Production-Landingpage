/// <reference path="../pb_data/types.d.ts" />
// Menambah field analitik pada page_views: referrer, device, visitor_id, session_id.
migrate(
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("page_views")

    const fields = [
      { id: "pvreferr", name: "referrer", type: "text" },
      { id: "pvdevice", name: "device", type: "text" },
      { id: "pvvisitr", name: "visitor_id", type: "text" },
      { id: "pvsessn1", name: "session_id", type: "text" },
    ]

    fields.forEach((f) => {
      if (!col.schema.getFieldByName(f.name)) {
        col.schema.addField(new SchemaField(f))
      }
    })

    dao.saveCollection(col)
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("page_views")

    ;["referrer", "device", "visitor_id", "session_id"].forEach((name) => {
      const field = col.schema.getFieldByName(name)
      if (field) col.schema.removeField(field.id)
    })

    dao.saveCollection(col)
  },
)
