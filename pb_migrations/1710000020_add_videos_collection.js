/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)

    const videosColDef = new Collection({
      id: "grdqnwz274vid01",
      name: "videos",
      type: "base",
      system: false,
      schema: [
        // Kunci penempatan video, mis. "home", "produk:pos-fnb", "fitur:kasir"
        {
          id: "vdplace1",
          name: "placement",
          type: "text",
          required: true,
        },
        { id: "vdtitle1", name: "title", type: "text" },
        { id: "vdsubtl1", name: "subtitle", type: "text" },
        { id: "vdyturl1", name: "youtube_url", type: "text" },
        { id: "vdactive", name: "active", type: "bool" },
      ],
      indexes: ["CREATE UNIQUE INDEX idx_videos_placement ON videos (placement)"],
      // Read-only untuk publik, edit lewat PocketBase admin
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
    })
    dao.saveCollection(videosColDef)

    try {
      const col = dao.findCollectionByNameOrId("videos")
      const record = new Record(col)
      record.set("placement", "produk:pos-fnb")
      record.set("title", "Lihat Cara Spontan Jualan Kelola Bisnis F&B Anda")
      record.set(
        "subtitle",
        "Dari catat pesanan pelanggan, atur varian menu, sampai kontrol stok bahan baku semuanya tersaji dalam satu sistem yang simpel dan siap tingkatkan kecepatan layanan resto Anda.",
      )
      record.set("youtube_url", "")
      record.set("active", true)
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed videos:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("videos")
    dao.deleteCollection(col)
  },
)
