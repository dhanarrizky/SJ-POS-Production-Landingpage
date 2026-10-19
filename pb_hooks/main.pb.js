// pb_hooks/main.pb.js

routerAdd("GET", "/sitemap.xml", (c) => {
  const dao = $app.dao()

  let products = []
  try {
    products = dao.findRecordsByFilter(
      "products",
      "id != ''",
      "created",
      100,
      0,
    )
  } catch (e) {
    // Table doesn't exist or migration hasn't run yet
  }

  const domain = "https://spontanjualan.com"

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  // Main landing page
  xml += "  <url>\n"
  xml += `    <loc>${domain}/</loc>\n`
  xml += "    <priority>1.0</priority>\n"
  xml += "  </url>\n"

  // Dynamic products pages
  products.forEach((p) => {
    const slug = p.getString("slug")
    if (slug) {
      xml += "  <url>\n"
      xml += `    <loc>${domain}/product/${slug}</loc>\n`
      xml += "    <priority>0.8</priority>\n"
      xml += "  </url>\n"
    }
  })

  xml += "</urlset>"

  c.response().header().set("Content-Type", "application/xml")
  return c.string(200, xml)
})

// Endpoint POST /api/track untuk tracking page views secara server-side
routerAdd("POST", "/api/track", (c) => {
  let data = {}
  try {
    data = $apis.requestInfo(c).data || {}
  } catch (e) {
    // Fallback
  }

  // Input validation & length constraints
  const rawPath = String(data.path || "/")
  const rawUserAgent = String(
    data.user_agent || c.request().header.get("User-Agent") || "",
  )
  const rawBrowser = String(data.browser || "Lainnya")
  const rawOs = String(data.os || "Lainnya")

  const path = rawPath.substring(0, 255)
  const userAgent = rawUserAgent.substring(0, 500)
  const browser = rawBrowser.substring(0, 50)
  const os = rawOs.substring(0, 50)

  // Field analitik tambahan (dibatasi panjang & karakternya)
  const referrer = String(data.referrer || "").substring(0, 255)
  const rawDevice = String(data.device || "")
  const device = ["mobile", "tablet", "desktop"].indexOf(rawDevice) >= 0
    ? rawDevice
    : "desktop"
  const idPattern = /[^a-zA-Z0-9-]/g
  const visitorId = String(data.visitor_id || "")
    .replace(idPattern, "")
    .substring(0, 64)
  const sessionId = String(data.session_id || "")
    .replace(idPattern, "")
    .substring(0, 64)

  // Membaca IP dari request header/connection server-side secara akurat
  const ip = c.realIP() || "Unknown"

  // Geo dari header reverse proxy/CDN bila tersedia (mis. Cloudflare).
  // Tanpa header tersebut nilainya tetap "Unknown".
  const readHeader = (name) => {
    try {
      return String(c.request().header.get(name) || "").substring(0, 100)
    } catch (e) {
      return ""
    }
  }
  const country =
    readHeader("CF-IPCountry") || readHeader("X-Vercel-IP-Country") || "Unknown"
  const region = readHeader("CF-Region") || "Unknown"
  const city = readHeader("CF-IPCity") || "Unknown"

  try {
    const collection = $app.dao().findCollectionByNameOrId("page_views")
    const record = new Record(collection)
    record.set("path", path)
    record.set("user_agent", userAgent)
    record.set("ip", ip)
    record.set("country", country)
    record.set("region", region)
    record.set("city", city)
    record.set("browser", browser)
    record.set("os", os)
    record.set("referrer", referrer)
    record.set("device", device)
    record.set("visitor_id", visitorId)
    record.set("session_id", sessionId)

    $app.dao().saveRecord(record)
  } catch (e) {
    return c.json(500, { error: e.message || "Gagal menyimpan log kunjungan" })
  }

  // Security: Do not leak the visitor's IP address back in the response
  return c.json(200, { success: true })
})

// Endpoint DELETE /api/clear-traffic untuk mengosongkan log page views (hanya untuk admin)
routerAdd("DELETE", "/api/clear-traffic", (c) => {
  const admin = c.get("admin")
  if (!admin) {
    return c.json(403, { error: "Forbidden: Admin access required" })
  }

  try {
    $app.dao().db().newQuery("DELETE FROM page_views").execute()
  } catch (e) {
    return c.json(500, {
      error: e.message || "Gagal mengosongkan log page views",
    })
  }

  return c.json(200, { success: true })
})

// Event hook sebelum create suggestions untuk mencatat IP pengirim dan menerapkan rate limiting
onRecordBeforeCreateRequest(
  (e) => {
    const dao = $app.dao()
    const ip = e.httpContext.realIP() || "Unknown"

    // Simpan IP client pada record suggestion
    e.record.set("ip", ip)

    // Terapkan rate limit: Maksimal 1 saran per IP per 60 detik
    const oneMinuteAgo = new Date(Date.now() - 60000)
      .toISOString()
      .replace("T", " ")
      .substring(0, 19)

    let count = 0
    try {
      const row = {}
      const query = dao
        .db()
        .newQuery(
          "SELECT COUNT(*) as total FROM suggestions WHERE ip = {:ip} AND created > {:time}",
        )
      query.bind({ ip: ip, time: oneMinuteAgo })
      query.one(row)
      count = parseInt(row.total || "0", 10)
    } catch (err) {
      // Abaikan validasi jika query gagal (misalnya saat migrasi kolom belum selesai)
    }

    if (count > 0) {
      throw new BadRequestError(
        "Harap tunggu 60 detik sebelum mengirim saran lagi.",
      )
    }
  },
  "suggestions",
)

// Global middleware untuk menambahkan standard security headers ke response
routerUse((next) => {
  return (c) => {
    let isSystemRoute = false
    try {
      const req = c.request()
      const path =
        (req && req.url && req.url.path) ||
        (req && req.uRL && req.uRL.path) ||
        (req && req.URL && req.URL.Path) ||
        ""
      if (path.indexOf("/_/") === 0 || path.indexOf("/api/") === 0) {
        isSystemRoute = true
      }
    } catch (err) {
      // Fallback
    }

    if (!isSystemRoute) {
      try {
        const res = c.response()
        if (res) {
          res.header().set("X-Content-Type-Options", "nosniff")
          res.header().set("X-Frame-Options", "DENY")
          res.header().set("Referrer-Policy", "strict-origin-when-cross-origin")

          // Content Security Policy to prevent XSS
          res
            .header()
            .set(
              "Content-Security-Policy",
              "default-src 'self'; " +
                "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; " +
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; " +
                "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:; " +
                "img-src 'self' data: http: http://103.247.10.4:8333; " +
                "connect-src 'self' https://www.google-analytics.com; " +
                "frame-ancestors 'none';",
            )

          // Strict-Transport-Security to enforce HTTPS
          res
            .header()
            .set(
              "Strict-Transport-Security",
              "max-age=31536000; includeSubDomains",
            )

          // Permissions-Policy to disable unwanted features
          res
            .header()
            .set(
              "Permissions-Policy",
              "camera=(), microphone=(), geolocation=(), payment=()",
            )
        }
      } catch (err) {
        // Fallback
      }
    }

    return next(c)
  }
})
