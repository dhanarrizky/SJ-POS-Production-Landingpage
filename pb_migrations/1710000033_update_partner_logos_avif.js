migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("site_settings");

  const field = collection.schema.getFieldByName("partner_logos");
  if (field) {
    field.options.mimeTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp", "image/avif"];
  }

  return dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("site_settings");

  const field = collection.schema.getFieldByName("partner_logos");
  if (field) {
    field.options.mimeTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"];
  }

  return dao.saveCollection(collection);
});
