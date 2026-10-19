/// <reference path="../pb_data/types.d.ts" />
// product_highlights.image: gambar kartu yang diunggah dari dashboard. Field file
// PocketBase, jadi DB hanya menyimpan NAMA FILE (relatif). Bila storage
// PocketBase diarahkan ke SeaweedFS (Settings → Files storage → S3), file
// otomatis tersimpan di sana. Field `image_path` tetap dipertahankan: dipakai
// bila tidak ada file yang diunggah (mis. gambar statis dari `pnpm media:upload`).
migrate(
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("product_highlights")

    if (!col.schema.getFieldByName("image")) {
      col.schema.addField(
        new SchemaField({
          id: "phimgfl1",
          name: "image",
          type: "file",
          required: false,
          options: {
            maxSelect: 1,
            maxSize: 5242880, // 5 MB
            mimeTypes: ["image/jpeg", "image/png", "image/webp"],
            thumbs: [],
            protected: false,
          },
        }),
      )
      dao.saveCollection(col)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("product_highlights")
    const field = col.schema.getFieldByName("image")
    if (field) {
      col.schema.removeField(field.id)
      dao.saveCollection(col)
    }
  },
)
