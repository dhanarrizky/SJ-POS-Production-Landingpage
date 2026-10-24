migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("site_settings");

    // Add social_links field (json)
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "soc_link",
        name: "social_links",
        type: "json",
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSize: 2000000,
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("site_settings");

    collection.schema.removeField("soc_link");

    return dao.saveCollection(collection);
  }
);
