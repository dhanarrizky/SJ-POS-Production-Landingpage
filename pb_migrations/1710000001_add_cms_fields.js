/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")

    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssstatum",
        name: "stats_umkm",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssstattr",
        name: "stats_transaksi",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssstatrt",
        name: "stats_rating",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssstatup",
        name: "stats_uptime",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "ssctawha",
        name: "cta_whatsapp_url",
        type: "text",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sstrustj",
        name: "trust_items",
        type: "json",
      }),
    )

    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("stats_umkm", "5.000+")
      record.set("stats_transaksi", "2.5 Juta+")
      record.set("stats_rating", "4.9 ⭐")
      record.set("stats_uptime", "99.9%")
      record.set("cta_whatsapp_url", "https://wa.me/6281234567890")
      record.set("trust_items", [
        {
          icon: "Cpu",
          title: "99.9% Uptime",
          desc: "Jaminan ketersediaan server dengan SLA tertulis selama bisnis beroperasi.",
        },
        {
          icon: "Cloud",
          title: "Cloud Encrypted Backup",
          desc: "Data ter-enkripsi AES-256 dan di-backup otomatis setiap 6 jam.",
        },
        {
          icon: "Shield",
          title: "ISO Standard Security",
          desc: "Infrastruktur memenuhi standar keamanan ISO 27001 & OWASP Top 10.",
        },
        {
          icon: "Headset",
          title: "Tim Dukungan Indonesia",
          desc: "CS berbahasa Indonesia via WA, telepon & live chat. Tersedia setiap hari.",
        },
      ])
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed new site_settings fields:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("ssstatum")
    siteSettingsCol.schema.removeField("ssstattr")
    siteSettingsCol.schema.removeField("ssstatrt")
    siteSettingsCol.schema.removeField("ssstatup")
    siteSettingsCol.schema.removeField("ssctawha")
    siteSettingsCol.schema.removeField("sstrustj")
    dao.saveCollection(siteSettingsCol)
  },
)
