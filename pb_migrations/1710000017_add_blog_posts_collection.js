/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)

    const blogPostsColDef = new Collection({
      id: "grdqnwz274t1zx9",
      name: "blog_posts",
      type: "base",
      system: false,
      schema: [
        { id: "bptitle0", name: "title", type: "text", required: true },
        { id: "bpslug00", name: "slug", type: "text", required: true },
        { id: "bpexcpt0", name: "excerpt", type: "text" },
        { id: "bpcatg00", name: "category", type: "text" },
        { id: "bpcovimg", name: "cover_image", type: "text" },
        { id: "bppubdat", name: "published_date", type: "text" },
        { id: "bpcontnt", name: "content", type: "text", options: { maxSize: 2000000 } },
        { id: "bpactive", name: "active", type: "bool" },
      ],
      listRule: "",
      viewRule: "",
    })
    dao.saveCollection(blogPostsColDef)

    const posts = [
      {
        title: "AI Jadi Senjata Baru UMKM di 2026",
        slug: "ai-jadi-senjata-baru-umkm-2026",
        category: "AI",
        excerpt:
          "Bagaimana pelaku UMKM mulai memanfaatkan AI untuk mempercepat operasional dan pengambilan keputusan.",
        published_date: "29 September 2026",
        content:
          "# AI Jadi Senjata Baru UMKM di 2026\n\nArtikel ini sedang disiapkan. Konten lengkap akan segera hadir.",
      },
      {
        title: "Kelola UMKM Lebih Efisien dengan Sistem Digital",
        slug: "kelola-umkm-lebih-efisien-sistem-digital",
        category: "Manajemen",
        excerpt:
          "Sistem digital membantu pemilik usaha mengelola operasional harian dengan lebih rapi dan efisien.",
        published_date: "29 September 2026",
        content:
          "# Kelola UMKM Lebih Efisien dengan Sistem Digital\n\nArtikel ini sedang disiapkan. Konten lengkap akan segera hadir.",
      },
      {
        title: "Tren UMKM Indonesia di 2026",
        slug: "tren-umkm-indonesia-2026",
        category: "Bisnis",
        excerpt:
          "Rangkuman tren yang membentuk arah pertumbuhan UMKM Indonesia tahun ini.",
        published_date: "29 September 2026",
        content:
          "# Tren UMKM Indonesia di 2026\n\nArtikel ini sedang disiapkan. Konten lengkap akan segera hadir.",
      },
      {
        title: "Strategi Keuangan UMKM untuk Bisnis Berkelanjutan",
        slug: "strategi-keuangan-umkm-bisnis-berkelanjutan",
        category: "Keuangan",
        excerpt:
          "Langkah-langkah pengelolaan keuangan yang membantu usaha bertahan dan berkembang jangka panjang.",
        published_date: "29 September 2026",
        content:
          "# Strategi Keuangan UMKM untuk Bisnis Berkelanjutan\n\nArtikel ini sedang disiapkan. Konten lengkap akan segera hadir.",
      },
      {
        title: "Teknologi Digital yang Wajib Dipahami UMKM",
        slug: "teknologi-digital-wajib-dipahami-umkm",
        category: "Teknologi",
        excerpt:
          "Beberapa teknologi digital dasar yang sebaiknya dipahami pemilik usaha di era sekarang.",
        published_date: "29 September 2026",
        content:
          "# Teknologi Digital yang Wajib Dipahami UMKM\n\nArtikel ini sedang disiapkan. Konten lengkap akan segera hadir.",
      },
    ]

    posts.forEach((post) => {
      const record = new Record(blogPostsColDef)
      record.set("title", post.title)
      record.set("slug", post.slug)
      record.set("category", post.category)
      record.set("excerpt", post.excerpt)
      record.set("published_date", post.published_date)
      record.set("content", post.content)
      record.set("cover_image", "")
      record.set("active", true)
      dao.saveRecord(record)
    })
  },
  (app) => {
    const dao = new Dao(app)
    const blogPostsCol = dao.findCollectionByNameOrId("blog_posts")
    dao.deleteCollection(blogPostsCol)
  },
)
