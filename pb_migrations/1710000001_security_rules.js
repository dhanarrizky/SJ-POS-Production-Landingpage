// Migration: Perketat rules keamanan untuk semua collection
migrate((app) => {
  const dao = new Dao(app)

  // Perketat: site_settings — hanya bisa dibaca publik, tidak bisa dibuat/diedit publik
  try {
    const siteSettings = dao.findCollectionByNameOrId("site_settings")
    siteSettings.listRule = "" // publik bisa list
    siteSettings.viewRule = "" // publik bisa view
    siteSettings.createRule = null // TIDAK ada yang bisa create (hanya via admin panel)
    siteSettings.updateRule = null // TIDAK ada yang bisa update
    siteSettings.deleteRule = null // TIDAK ada yang bisa delete
    dao.saveCollection(siteSettings)
  } catch (e) {
    // collection might not exist yet or have different name
  }

  // Perketat: products — read-only publik
  try {
    const products = dao.findCollectionByNameOrId("products")
    products.listRule = ""
    products.viewRule = ""
    products.createRule = null
    products.updateRule = null
    products.deleteRule = null
    dao.saveCollection(products)
  } catch (e) {}

  // Perketat: pricing_plans — read-only publik
  try {
    const pricing = dao.findCollectionByNameOrId("pricing_plans")
    pricing.listRule = ""
    pricing.viewRule = ""
    pricing.createRule = null
    pricing.updateRule = null
    pricing.deleteRule = null
    dao.saveCollection(pricing)
  } catch (e) {}

  // Perketat: testimonials — read-only publik
  try {
    const testimonials = dao.findCollectionByNameOrId("testimonials")
    testimonials.listRule = ""
    testimonials.viewRule = ""
    testimonials.createRule = null
    testimonials.updateRule = null
    testimonials.deleteRule = null
    dao.saveCollection(testimonials)
  } catch (e) {}

  // suggestions — hanya bisa CREATE (publik submit), list/view/update/delete hanya admin
  try {
    const suggestions = dao.findCollectionByNameOrId("suggestions")
    suggestions.listRule = null // Hanya admin
    suggestions.viewRule = null // Hanya admin
    suggestions.createRule = "" // Publik bisa submit
    suggestions.updateRule = null // Tidak ada yang bisa update
    suggestions.deleteRule = null // Hanya admin
    dao.saveCollection(suggestions)
  } catch (e) {}

  // page_views — hanya bisa CREATE via hook (tidak dari client langsung),
  // list/view/delete hanya admin
  try {
    const pageViews = dao.findCollectionByNameOrId("page_views")
    pageViews.listRule = null // Hanya admin
    pageViews.viewRule = null // Hanya admin
    pageViews.createRule = null // TIDAK ada — hanya via server hook /api/track
    pageViews.updateRule = null
    pageViews.deleteRule = null // Hanya admin
    dao.saveCollection(pageViews)
  } catch (e) {}

  // users — Nonaktifkan pendaftaran user baru (hanya admin yang bisa membuat user jika perlu)
  try {
    const users = dao.findCollectionByNameOrId("users")
    users.createRule = null // Menutup registrasi publik
    users.listRule = null // Menutup list publik
    users.viewRule = null // Menutup view publik
    users.updateRule = null
    users.deleteRule = null
    dao.saveCollection(users)
  } catch (e) {}

  // visitor_analytics — view collection aggregat statistik, hanya admin yang bisa akses
  try {
    const analytics = dao.findCollectionByNameOrId("visitor_analytics")
    analytics.listRule = null // Hanya admin
    analytics.viewRule = null // Hanya admin
    dao.saveCollection(analytics)
  } catch (e) {}
})
