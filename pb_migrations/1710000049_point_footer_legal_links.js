/// <reference path="../pb_data/types.d.ts" />
// Mengarahkan link legal di footer (yang masih "#") ke halaman /legal/*.
// Hanya link berlabel Kebijakan Privasi / Syarat & Ketentuan yang disentuh;
// link lain di footer_columns dan footer_bottom_links dibiarkan apa adanya.
(function () {
const PRIVACY_HREF = "/legal/kebijakan-privasi"
const TERMS_HREF = "/legal/syarat-ketentuan"

// Nilai field JSON dari record bisa berupa array, string JSON, atau deretan
// byte (angka) tergantung versi PocketBase. Kembalikan null bila tidak terbaca.
function readJson(value) {
  if (value === null || value === undefined) return null
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] === "number") {
      try {
        const escaped = value
          .map(function (b) {
            return "%" + ("0" + b.toString(16)).slice(-2)
          })
          .join("")
        return JSON.parse(decodeURIComponent(escaped))
      } catch (e) {
        return null
      }
    }
    return value
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  }
  try {
    return JSON.parse(toString(value))
  } catch (e) {
    return null
  }
}

function labelKind(label) {
  const l = String(label || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
  if (l === "kebijakan privasi") return "privacy"
  if (l === "syarat & ketentuan" || l === "syarat dan ketentuan" || l === "syarat layanan")
    return "terms"
  return null
}

// mapHref(kind, currentHref) -> href baru, atau null bila tidak diubah
function rewriteLinks(links, mapHref) {
  let changed = false
  const next = links.map(function (link) {
    const kind = link && typeof link === "object" ? labelKind(link.label) : null
    const href = kind ? mapHref(kind, link.href) : null
    if (href === null) return link
    changed = true
    return { label: link.label, href: href }
  })
  return changed ? next : null
}

function rewriteField(record, field, mapHref) {
  const data = readJson(record.get(field))
  if (!Array.isArray(data) || data.length === 0) return false

  if (field === "footer_columns") {
    let changed = false
    const next = data.map(function (col) {
      if (!col || !Array.isArray(col.links)) return col
      const links = rewriteLinks(col.links, mapHref)
      if (!links) return col
      changed = true
      return { title: col.title, links: links }
    })
    if (changed) record.set(field, next)
    return changed
  }

  const links = rewriteLinks(data, mapHref)
  if (links) record.set(field, links)
  return !!links
}

function apply(app, mapHref) {
  const dao = new Dao(app)
  try {
    const record = dao.findFirstRecordByFilter("site_settings", "1=1")
    const a = rewriteField(record, "footer_columns", mapHref)
    const b = rewriteField(record, "footer_bottom_links", mapHref)
    if (a || b) dao.saveRecord(record)
  } catch (e) {
    console.log("Note: Could not update footer legal links:", e)
  }
}

migrate(
  (app) => {
    apply(app, function (kind, href) {
      const target = kind === "privacy" ? PRIVACY_HREF : TERMS_HREF
      // Hanya timpa placeholder kosong; link yang sudah diisi admin dibiarkan.
      const h = String(href || "").trim()
      return h === "" || h === "#" || h === "/syarat" || h === "/privasi"
        ? target
        : null
    })
  },
  (app) => {
    apply(app, function (kind, href) {
      const target = kind === "privacy" ? PRIVACY_HREF : TERMS_HREF
      return href === target ? "#" : null
    })
  },
)
})()
