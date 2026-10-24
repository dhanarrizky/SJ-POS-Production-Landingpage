/// <reference path="../pb_data/types.d.ts" />
// Kebijakan Privasi dan Syarat & Ketentuan kini dua halaman terpisah
// (/kebijakan-privasi dan /syarat-ketentuan), bukan /legal/*. Link footer yang
// sebelumnya diarahkan oleh migration 1710000049 dipindahkan ke URL baru.
// Hanya href yang persis sama dengan nilai lama yang diganti.
(function () {
  const MAP = {
    "/legal/kebijakan-privasi": "/kebijakan-privasi",
    "/legal/syarat-ketentuan": "/syarat-ketentuan",
  }
  const REVERSE = {
    "/kebijakan-privasi": "/legal/kebijakan-privasi",
    "/syarat-ketentuan": "/legal/syarat-ketentuan",
  }

  // Nilai field JSON bisa berupa array, string JSON, atau deretan byte (angka).
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

  function rewriteLinks(links, map) {
    let changed = false
    const next = links.map(function (link) {
      const href = link && typeof link === "object" ? map[link.href] : undefined
      if (!href) return link
      changed = true
      return { label: link.label, href: href }
    })
    return changed ? next : null
  }

  function rewriteField(record, field, map) {
    const data = readJson(record.get(field))
    if (!Array.isArray(data) || data.length === 0) return false

    if (field === "footer_columns") {
      let changed = false
      const next = data.map(function (col) {
        if (!col || !Array.isArray(col.links)) return col
        const links = rewriteLinks(col.links, map)
        if (!links) return col
        changed = true
        return { title: col.title, links: links }
      })
      if (changed) record.set(field, next)
      return changed
    }

    const links = rewriteLinks(data, map)
    if (links) record.set(field, links)
    return !!links
  }

  function apply(app, map) {
    const dao = new Dao(app)
    try {
      const record = dao.findFirstRecordByFilter("site_settings", "1=1")
      const a = rewriteField(record, "footer_columns", map)
      const b = rewriteField(record, "footer_bottom_links", map)
      if (a || b) dao.saveRecord(record)
    } catch (e) {
      console.log("Note: Could not update footer legal links:", e)
    }
  }

  migrate(
    (app) => {
      apply(app, MAP)
    },
    (app) => {
      apply(app, REVERSE)
    },
  )
})()
