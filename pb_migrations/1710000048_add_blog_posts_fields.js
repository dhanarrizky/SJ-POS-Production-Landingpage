/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("blog_posts")

    if (!col.schema.getFieldByName("cover_image_path")) {
      col.schema.addField(
        new SchemaField({
          id: "bpcovpat",
          name: "cover_image_path",
          type: "text",
          required: false,
        })
      )
    }

    if (!col.schema.getFieldByName("author_name")) {
      col.schema.addField(
        new SchemaField({
          id: "bpautnam",
          name: "author_name",
          type: "text",
          required: false,
        })
      )
    }

    if (!col.schema.getFieldByName("author_role")) {
      col.schema.addField(
        new SchemaField({
          id: "bpautrol",
          name: "author_role",
          type: "text",
          required: false,
        })
      )
    }

    if (!col.schema.getFieldByName("author_avatar")) {
      col.schema.addField(
        new SchemaField({
          id: "bpautava",
          name: "author_avatar",
          type: "text",
          required: false,
        })
      )
    }

    dao.saveCollection(col)

    // Update existing posts with initial high quality images and author if empty
    const posts = dao.findRecordsByFilter("blog_posts", "1 = 1", "-created", 50)
    const initialImages = {
      "ai-jadi-senjata-baru-umkm-2026": "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=800&auto=format&fit=crop",
      "kelola-umkm-lebih-efisien-sistem-digital": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
      "tren-umkm-indonesia-2026": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
      "strategi-keuangan-umkm-bisnis-berkelanjutan": "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
      "teknologi-digital-wajib-dipahami-umkm": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    }

    posts.forEach((rec) => {
      const slug = rec.getString("slug")
      if (!rec.getString("cover_image") && initialImages[slug]) {
        rec.set("cover_image", initialImages[slug])
      }
      if (!rec.getString("author_name")) {
        rec.set("author_name", "Admin")
      }
      if (!rec.getString("author_role")) {
        rec.set("author_role", "Spontan Jualan Team")
      }
      dao.saveRecord(rec)
    })
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("blog_posts")
    ;["cover_image_path", "author_name", "author_role", "author_avatar"].forEach((name) => {
      const field = col.schema.getFieldByName(name)
      if (field) col.schema.removeField(field.id)
    })
    dao.saveCollection(col)
  }
)
