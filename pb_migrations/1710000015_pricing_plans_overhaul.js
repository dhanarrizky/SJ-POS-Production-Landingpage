/// <reference path="../pb_data/types.d.ts" />
// Replaces the old 3-tier subscription pricing (Starter/Professional/
// Enterprise) with the new 4-tier prepaid-package wireframe for the F&B
// product (Semua Mitra Baru/Premium/Golden/Unlimited). This is an early,
// unconfirmed sketch of the F&B package structure per the wireframe notes.
migrate(
  (app) => {
    const dao = new Dao(app)

    const pricingCol = dao.findCollectionByNameOrId("pricing_plans")
    pricingCol.schema.addField(
      new SchemaField({ id: "ppacnote", name: "access_note", type: "text" }),
    )
    pricingCol.schema.addField(
      new SchemaField({ id: "ppupnote", name: "upgrade_note", type: "text" }),
    )
    pricingCol.schema.addField(
      new SchemaField({ id: "ppcolink", name: "checkout_link", type: "text" }),
    )
    dao.saveCollection(pricingCol)

    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sscmpplan",
        name: "show_compare_plans",
        type: "bool",
      }),
    )
    siteSettingsCol.schema.addField(
      new SchemaField({
        id: "sscmplink",
        name: "compare_plans_link",
        type: "text",
      }),
    )
    dao.saveCollection(siteSettingsCol)

    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      record.set("show_compare_plans", false) // Hidden: other products can't be purchased yet
      record.set("compare_plans_link", "#")
      dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not seed compare-plans settings:", e)
    }

    // Remove the old subscription tiers entirely - the new wireframe uses a
    // completely different tier structure and pricing model.
    dao.findRecordsByFilter("pricing_plans", "1=1", "", 100, 0).forEach((r) => {
      dao.deleteRecord(r)
    })

    const perks = [
      "GRATIS tanpa langganan",
      "Tanpa kartu kredit",
      "Komunitas mitra",
      "Kelola produk tanpa batas",
      "Pencatatan transaksi harian",
    ]

    const newPlans = [
      {
        tier: "Semua Mitra Baru",
        sub: "Mulai Gratis",
        monthly: 0,
        period: "/Bln",
        cta: "Pilih Paket",
        access_note: "Akses penuh tanpa biaya",
        upgrade_note:
          "Bisa tingkatkan ke paket 3 Bulan seharga Rp25.000. Biaya perpanjangan tersedia.",
      },
      {
        tier: "Premium",
        sub: "Mulai Dari",
        monthly: 25000,
        period: "/3 Bln",
        cta: "Pilih Paket",
        access_note: "Akses penuh dengan biaya",
        upgrade_note:
          "Bisa tingkatkan ke paket 6 Bulan seharga Rp75.000. Biaya perpanjangan tersedia.",
      },
      {
        tier: "Golden",
        sub: "Mulai Dari",
        monthly: 75000,
        period: "/6 Bln",
        cta: "Pilih Paket",
        access_note: "Akses penuh dengan biaya",
        upgrade_note:
          "Bisa tingkatkan ke paket 1 Tahun seharga Rp300.000. Biaya perpanjangan tersedia.",
      },
      {
        tier: "Unlimited",
        sub: "Mulai Dari",
        monthly: 300000,
        period: "/1 Thn",
        cta: "Pilih Paket",
        access_note: "Akses penuh dengan biaya",
        upgrade_note:
          "Bisa tingkatkan paket sesuai kegunaan pengguna dengan menghubungi bantuan kami.",
      },
    ]

    newPlans.forEach((plan) => {
      const record = new Record(pricingCol)
      record.set("tier", plan.tier)
      record.set("sub", plan.sub)
      record.set("monthly", plan.monthly)
      record.set("period", plan.period)
      record.set("cta", plan.cta)
      record.set("access_note", plan.access_note)
      record.set("upgrade_note", plan.upgrade_note)
      record.set("perks", perks)
      record.set("featured", false)
      record.set("active", true)
      record.set("annual", 0)
      record.set("label", "")
      record.set("badge", "")
      record.set("checkout_link", "#")
      dao.saveRecord(record)
    })
  },
  (app) => {
    const dao = new Dao(app)

    dao.findRecordsByFilter("pricing_plans", "1=1", "", 100, 0).forEach((r) => {
      dao.deleteRecord(r)
    })

    const pricingCol = dao.findCollectionByNameOrId("pricing_plans")
    pricingCol.schema.removeField("ppacnote")
    pricingCol.schema.removeField("ppupnote")
    pricingCol.schema.removeField("ppcolink")
    dao.saveCollection(pricingCol)

    const siteSettingsCol = dao.findCollectionByNameOrId("site_settings")
    siteSettingsCol.schema.removeField("sscmpplan")
    siteSettingsCol.schema.removeField("sscmplink")
    dao.saveCollection(siteSettingsCol)

    const oldPlans = [
      {
        tier: "Starter",
        sub: "UMKM Pemula",
        monthly: 0,
        annual: 0,
        label: "Gratis",
        period: "selamanya",
        featured: false,
        cta: "Mulai Gratis",
        perks: [
          "1 Kasir aktif",
          "100 produk katalog",
          "Laporan penjualan dasar",
          "QRIS Instant",
          "Cetak struk digital",
          "Support via WhatsApp",
        ],
        active: true,
      },
      {
        tier: "Professional",
        sub: "Paling Populer",
        monthly: 149000,
        annual: 119000,
        label: "",
        period: "/bulan",
        featured: true,
        cta: "Mulai 14 Hari Gratis",
        badge: "Rekomendasi UMKM ⭐",
        perks: [
          "Unlimited produk katalog",
          "3 Kasir aktif",
          "Alert stok menipis otomatis",
          "Manajemen inventaris lengkap",
          "Multi-payment (QRIS, e-wallet, kartu)",
          "Dashboard laporan real-time",
          "Support prioritas 12 jam",
        ],
        active: true,
      },
      {
        tier: "Enterprise",
        sub: "Multi-Cabang & Ekspor",
        monthly: 299000,
        annual: 239000,
        label: "",
        period: "/bulan",
        featured: false,
        cta: "Hubungi Sales",
        perks: [
          "Unlimited kasir & cabang",
          "Akses Super Admin terpusat",
          "Analytics & insights ekspor lengkap",
          "Manajemen staf & shift",
          "Integrasi global marketplace",
          "API akses kustom",
          "Priority support 24/7",
        ],
        active: true,
      },
    ]

    oldPlans.forEach((plan) => {
      const record = new Record(pricingCol)
      Object.keys(plan).forEach((key) => record.set(key, plan[key]))
      dao.saveRecord(record)
    })
  },
)
