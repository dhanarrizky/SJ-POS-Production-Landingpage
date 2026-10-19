/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const productsCol = dao.findCollectionByNameOrId("products")

    productsCol.schema.addField(
      new SchemaField({
        id: "prloginu",
        name: "login_url",
        type: "text",
      }),
    )
    productsCol.schema.addField(
      new SchemaField({
        id: "pracccol",
        name: "accent_color",
        type: "text",
      }),
    )
    productsCol.schema.addField(
      new SchemaField({
        id: "premoji0",
        name: "emoji",
        type: "text",
      }),
    )

    dao.saveCollection(productsCol)

    // Seed existing records
    const updateProductDetails = (slug, loginUrl, accentColor, emoji) => {
      try {
        const record = dao.findFirstRecordByFilter(
          "products",
          `slug = "${slug}"`,
        )
        if (record) {
          record.set("login_url", loginUrl)
          record.set("accent_color", accentColor)
          record.set("emoji", emoji)
          dao.saveRecord(record)
          console.log(
            `Successfully updated PocketBase dynamic fields for: ${slug}`,
          )
        }
      } catch (e) {
        console.log(`Failed to update dynamic fields for ${slug}:`, e)
      }
    }

    updateProductDetails(
      "pos-retail",
      "http://localhost:5173/login/retail",
      "#0cad31",
      "🛒",
    )
    updateProductDetails(
      "pos-fnb",
      "http://localhost:5173/login/fnb",
      "#0891b2",
      "🍽️",
    )
    updateProductDetails(
      "pos-laundry",
      "http://localhost:5173/login/laundry",
      "#7c3aed",
      "👕",
    )
  },
  (app) => {
    const dao = new Dao(app)
    const productsCol = dao.findCollectionByNameOrId("products")
    productsCol.schema.removeField("prloginu")
    productsCol.schema.removeField("pracccol")
    productsCol.schema.removeField("premoji0")
    dao.saveCollection(productsCol)
  },
)
