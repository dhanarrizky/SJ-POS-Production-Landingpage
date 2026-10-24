migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("site_settings");

  collection.schema.addField(new SchemaField({
    system: false,
    id: "pb_partlog",
    name: "partner_logos",
    type: "file",
    required: false,
    options: {
      maxSelect: 99,
      maxSize: 5242880,
      mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"]
    }
  }));

  collection.schema.addField(new SchemaField({
    system: false,
    id: "pb_showpart",
    name: "show_partners",
    type: "bool",
    required: false,
    options: {}
  }));

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("site_settings");

  collection.schema.removeField("pb_partlog");
  collection.schema.removeField("pb_showpart");

  return dao.saveCollection(collection);
});