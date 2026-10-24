import DOMPurify from "dompurify"

// Hanya tag yang bisa dihasilkan editor Tiptap di /dashboard (isi halaman).
const CONTENT_TAGS = [
  "p",
  "br",
  "span",
  "strong",
  "em",
  "s",
  "u",
  "sub",
  "sup",
  "mark",
  "code",
  "pre",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "img",
]
const CONTENT_ATTRS = [
  "href",
  "target",
  "rel",
  "style",
  "colspan",
  "rowspan",
  "data-color",
  "src",
  "alt",
  "title",
  "width",
  "height",
  "class",
]

// `style` hanya boleh berisi properti tampilan berikut dengan nilai aman
// (tanpa url(), expression(), position, dll).
const STYLE_ALLOWED = new Set([
  "color",
  "background-color",
  "font-size",
  "text-align",
])
const STYLE_VALUE =
  /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%/]+\)|hsla?\([\d\s.,%/deg]+\)|[a-z-]+|\d+(\.\d+)?(px|em|rem|%|pt))$/i

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A") {
    node.setAttribute("rel", "noopener noreferrer")
    if (node.getAttribute("target") !== "_blank") node.removeAttribute("target")
  }
  const style = node.getAttribute?.("style")
  if (style) {
    const safe: string[] = []
    style.split(";").forEach((decl) => {
      const i = decl.indexOf(":")
      if (i < 0) return
      const prop = decl.slice(0, i).trim().toLowerCase()
      const value = decl.slice(i + 1).trim()
      if (STYLE_ALLOWED.has(prop) && STYLE_VALUE.test(value)) {
        safe.push(`${prop}: ${value}`)
      }
    })
    if (safe.length) node.setAttribute("style", safe.join("; "))
    else node.removeAttribute("style")
  }
})

/** Sanitasi HTML isi halaman dari editor Tiptap. */
export function sanitizeHtml(html?: string | null): string {
  if (!html) return ""
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: CONTENT_TAGS,
    ALLOWED_ATTR: CONTENT_ATTRS,
    ADD_DATA_URI_TAGS: ["img"],
  })
}

/**
 * Ubah nilai field jadi teks polos. Data lama (judul/deskripsi yang dulu
 * disimpan sebagai HTML) dibersihkan dari tag; teks biasa tidak berubah.
 */
export function htmlToText(html?: string | null): string {
  if (!html) return ""
  if (!/<\/?[a-z][^>]*>/i.test(html)) return html.trim()
  const withBreaks = html
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
  const stripped = DOMPurify.sanitize(withBreaks, { ALLOWED_TAGS: [] })
  const doc = new DOMParser().parseFromString(stripped, "text/html")
  return (doc.body.textContent || "").trim()
}
