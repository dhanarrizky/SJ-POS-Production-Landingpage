migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("site_settings")
  
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sslogo01",
    "name": "logo",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": ["100x100"]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("site_settings")
  collection.schema.removeField("sslogo01")
  return dao.saveCollection(collection)
})
