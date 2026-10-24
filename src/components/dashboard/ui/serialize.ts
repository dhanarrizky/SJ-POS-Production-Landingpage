import { toSlug } from "../../../lib/slug"
import type { Draft, FieldDef } from "./types"

function emptyFor(f: FieldDef): any {
  switch (f.type) {
    case "bool":
      return false
    case "number":
      return ""
    case "stringList":
    case "objectList":
    case "footerColumns":
      return []
    case "keyValue":
      return {}
    default:
      return ""
  }
}

/** Isi form dari record PocketBase (atau nilai default untuk data baru). */
export function buildDraft(
  fields: FieldDef[],
  defaults: Draft,
  record?: Draft | null,
): Draft {
  const draft: Draft = {}
  for (const f of fields) {
    const fromRecord = record ? record[f.key] : undefined
    const value = fromRecord ?? defaults[f.key] ?? emptyFor(f)
    draft[f.key] = value
  }
  return draft
}

/** Bersihkan form jadi payload untuk PocketBase. */
export function serializeDraft(fields: FieldDef[], draft: Draft): Draft {
  const out: Draft = {}
  for (const f of fields) {
    const v = draft[f.key]
    switch (f.type) {
      case "number":
        out[f.key] = v === "" || v == null ? 0 : Number(v)
        break
      case "bool":
        out[f.key] = !!v
        break
      case "slug":
        out[f.key] = toSlug(String(v ?? ""))
        break
      case "stringList":
        out[f.key] = (Array.isArray(v) ? v : [])
          .map((s) => String(s ?? "").trim())
          .filter(Boolean)
        break
      case "objectList":
        out[f.key] = (Array.isArray(v) ? v : [])
          .map((row: Draft) => {
            const clean: Draft = {}
            for (const c of f.columns || []) clean[c.key] = String(row?.[c.key] ?? "").trim()
            return clean
          })
          .filter((row) => Object.values(row).some(Boolean))
        break
      case "footerColumns":
        out[f.key] = (Array.isArray(v) ? v : [])
          .map((col: Draft) => ({
            title: String(col?.title ?? "").trim(),
            links: (Array.isArray(col?.links) ? col.links : [])
              .map((l: Draft) => ({
                label: String(l?.label ?? "").trim(),
                href: String(l?.href ?? "").trim(),
              }))
              .filter((l: Draft) => l.label || l.href),
          }))
          .filter((col) => col.title || col.links.length)
        break
      case "keyValue":
        out[f.key] = v && typeof v === "object" ? v : {}
        break
      case "image":
        // File baru → diunggah. String (nama file tersimpan) → jangan dikirim
        // ulang agar file lama tidak berubah. Kosong → hapus file.
        if (v instanceof File) out[f.key] = v
        else if (!(typeof v === "string" && v)) out[f.key] = ""
        break
      default:
        out[f.key] = typeof v === "string" ? v : (v ?? "")
    }
  }
  return out
}

/** Payload dikirim sebagai multipart bila ada File yang perlu diunggah. */
export function toRequestBody(payload: Draft): Draft | FormData {
  if (!Object.values(payload).some((v) => v instanceof File)) return payload
  const form = new FormData()
  for (const [key, value] of Object.entries(payload)) {
    if (value instanceof File) form.append(key, value)
    else if (value !== null && typeof value === "object")
      form.append(key, JSON.stringify(value))
    else form.append(key, String(value ?? ""))
  }
  return form
}

/** Pesan kesalahan jika ada field wajib yang kosong, selain itu null. */
export function validateRequired(fields: FieldDef[], draft: Draft): string | null {
  const missing = fields
    .filter((f) => f.required)
    .filter((f) => {
      const v = draft[f.key]
      if (v instanceof File) return false
      return typeof v === "string" ? v.trim() === "" : v == null
    })
    .map((f) => f.label)
  return missing.length ? `Wajib diisi: ${missing.join(", ")}.` : null
}
