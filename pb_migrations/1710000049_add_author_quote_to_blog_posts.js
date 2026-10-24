/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("blog_posts")

    if (!col.schema.getFieldByName("author_quote")) {
      col.schema.addField(
        new SchemaField({
          id: "bpautquo",
          name: "author_quote",
          type: "text",
          required: false,
        })
      )
    }

    dao.saveCollection(col)
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("blog_posts")
    const field = col.schema.getFieldByName("author_quote")
    if (field) col.schema.removeField(field.id)
    dao.saveCollection(col)
  }
)
