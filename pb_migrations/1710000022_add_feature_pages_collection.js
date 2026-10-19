/// <reference path="../pb_data/types.d.ts" />
// Halaman detail fitur (single page). Satu baris per fitur. `title`,
// `description`, dan `content` berisi HTML hasil editor Tiptap (/dashboard).
migrate(
  (app) => {
    const dao = new Dao(app)

    const featurePagesColDef = new Collection({
      id: "grdqnwz274ftr01",
      name: "feature_pages",
      type: "base",
      system: false,
      schema: [
        // Label di sidebar "Keunggulan Fitur"
        { id: "fpname01", name: "name", type: "text", required: true },
        // Bagian URL: /fitur/<slug>
        { id: "fpslug01", name: "slug", type: "text", required: true },
        { id: "fpsort01", name: "sort_order", type: "number" },
        { id: "fpactive", name: "active", type: "bool" },
        { id: "fptitle1", name: "title", type: "text" },
        { id: "fpdescr1", name: "description", type: "text" },
        {
          id: "fpcontnt",
          name: "content",
          type: "text",
          options: { max: 500000 },
        },
        { id: "fpauthor", name: "author_name", type: "text" },
        { id: "fppubdat", name: "published_date", type: "text" },
        { id: "fpquote1", name: "quote", type: "text" },
      ],
      indexes: [
        "CREATE UNIQUE INDEX idx_feature_pages_slug ON feature_pages (slug)",
      ],
      // Read-only untuk publik, edit lewat /dashboard (token admin)
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
    })
    dao.saveCollection(featurePagesColDef)

    const features = [
      ["customer-ui", "Fitur Customer UI"],
      ["bayar-dari-meja", "Fitur Bayar dari Meja"],
      ["kasir", "Fitur Kasir"],
      ["display-kitchen", "Fitur Display Kitchen"],
      ["owner", "Fitur Owner"],
      ["laporan-penjualan", "Fitur Laporan Penjualan"],
      ["laporan-bisnis", "Fitur Laporan Bisnis"],
      ["manajemen-pengguna", "Fitur Manajemen Pengguna"],
      ["poin-bisnis", "Fitur Poin Bisnis"],
      ["manajemen-meja", "Fitur Manajemen Meja"],
      ["shift-kasir", "Fitur Shift Kasir"],
      ["deteksi-inventori", "Fitur Deteksi Inventori"],
      ["resep", "Fitur Resep"],
    ]

    try {
      const col = dao.findCollectionByNameOrId("feature_pages")
      features.forEach((f, i) => {
        const slug = f[0]
        const name = f[1]
        const record = new Record(col)
        record.set("name", name)
        record.set("slug", slug)
        record.set("sort_order", i + 1)
        record.set("active", true)
        record.set("title", "<p>" + name + " Spontan Jualan</p>")
        record.set(
          "description",
          "<p>Ringkasan singkat tentang " +
            name.toLowerCase() +
            " dan manfaatnya bagi usaha Anda. Ubah teks ini lewat editor di /dashboard.</p>",
        )
        record.set(
          "content",
          "<p>Jelaskan cara kerja " +
            name.toLowerCase() +
            " di sini. Anda bisa memakai judul, daftar, dan teks tebal lewat editor.</p><h2>Keunggulan</h2><ul><li>Poin keunggulan pertama</li><li>Poin keunggulan kedua</li></ul>",
        )
        record.set("author_name", "Admin")
        record.set("published_date", "29 September 2026")
        record.set(
          "quote",
          "Kutipan singkat tentang " + name.toLowerCase() + ".",
        )
        dao.saveRecord(record)
      })
    } catch (e) {
      console.log("Note: Could not seed feature_pages:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("feature_pages")
    dao.deleteCollection(col)
  },
)
