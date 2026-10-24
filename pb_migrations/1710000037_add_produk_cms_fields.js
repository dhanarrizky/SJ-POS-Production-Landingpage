/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    const fieldsToAdd = [
      new SchemaField({
        id: "sspdkicker",
        name: "produk_kicker",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdimg1",
        name: "produk_image_1",
        type: "file",
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"],
          thumbs: [],
        },
      }),
      new SchemaField({
        id: "sspdimg1pth",
        name: "produk_image_1_path",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdfnbtitle",
        name: "produk_fnb_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdfnbdesc",
        name: "produk_fnb_desc",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdfnbbtnlbl",
        name: "produk_fnb_btn_label",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdfnbbtnlnk",
        name: "produk_fnb_btn_link",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdcmsnshow",
        name: "show_produk_coming_soon",
        type: "bool",
        required: false,
      }),
      new SchemaField({
        id: "sspdcmsntitle",
        name: "produk_coming_soon_title",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdcmsnfoot",
        name: "produk_coming_soon_footer_text",
        type: "text",
        required: false,
      }),
      new SchemaField({
        id: "sspdcmsnitems",
        name: "produk_coming_soon_items",
        type: "json",
        required: false,
        options: { maxSize: 2000000 },
      }),
      new SchemaField({
        id: "sspdbnrimg",
        name: "produk_banner_image",
        type: "file",
        required: false,
        options: {
          maxSelect: 1,
          maxSize: 5242880,
          mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/webp"],
          thumbs: [],
        },
      }),
      new SchemaField({
        id: "sspdbnrimpth",
        name: "produk_banner_image_path",
        type: "text",
        required: false,
      }),
    ]

    fieldsToAdd.forEach((field) => {
      if (!siteSettingsCol.schema.getFieldByName(field.name)) {
        siteSettingsCol.schema.addField(field)
      }
    })

    dao.saveCollection(siteSettingsCol)
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    const names = [
      "produk_kicker",
      "produk_image_1",
      "produk_image_1_path",
      "produk_fnb_title",
      "produk_fnb_desc",
      "produk_fnb_btn_label",
      "produk_fnb_btn_link",
      "show_produk_coming_soon",
      "produk_coming_soon_title",
      "produk_coming_soon_footer_text",
      "produk_coming_soon_items",
      "produk_banner_image",
      "produk_banner_image_path",
    ]
    names.forEach((name) => {
      const field = siteSettingsCol.schema.getFieldByName(name)
      if (field) {
        siteSettingsCol.schema.removeField(field.id)
      }
    })
    dao.saveCollection(siteSettingsCol)
  },
)
