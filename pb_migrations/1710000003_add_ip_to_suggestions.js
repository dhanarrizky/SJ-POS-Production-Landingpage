/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("suggestions")

    col.schema.addField(
      new SchemaField({
        id: "sgipaddr",
        name: "ip",
        type: "text",
      }),
    )

    dao.saveCollection(col)
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("suggestions")

    col.schema.removeField("sgipaddr")

    dao.saveCollection(col)
  },
)
