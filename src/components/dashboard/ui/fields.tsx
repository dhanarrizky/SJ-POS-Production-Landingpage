import { useEffect, useId, useMemo, useState } from "react"
import { ArrowDown, ArrowUp, Image as ImageIcon, Plus, Trash2 } from "lucide-react"
import { pbFileUrl } from "../../../lib/media"
import { parseMarkdown } from "../../../lib/markdown"
import { toSlug } from "../../../lib/slug"
import RichTextEditor from "../RichTextEditor"
import type { Draft, FieldDef, ListColumn } from "./types"

export const inputCls =
  "w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-brand/60"
export const labelCls = "block text-[11px] font-semibold text-slate-400 mb-1.5"
const smallBtn =
  "inline-flex items-center gap-1 rounded-lg border border-white/15 px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:bg-white/5 cursor-pointer"
const iconBtn =
  "h-7 w-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-default cursor-pointer"

function moveItem<T>(list: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir
  if (j < 0 || j >= list.length) return list
  const next = [...list]
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}

// ---------------------------------------------------------------- string[]
function StringListEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const rows = Array.isArray(value) ? value : []
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <input
            className={inputCls}
            value={row}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(rows.map((r, idx) => (idx === i ? e.target.value : r)))
            }
          />
          <button type="button" className={iconBtn} aria-label="Naik" disabled={i === 0} onClick={() => onChange(moveItem(rows, i, -1))}>
            <ArrowUp size={14} />
          </button>
          <button type="button" className={iconBtn} aria-label="Turun" disabled={i === rows.length - 1} onClick={() => onChange(moveItem(rows, i, 1))}>
            <ArrowDown size={14} />
          </button>
          <button type="button" className={iconBtn} aria-label="Hapus" onClick={() => onChange(rows.filter((_, idx) => idx !== i))}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button type="button" className={`${smallBtn} w-fit`} onClick={() => onChange([...rows, ""])}>
        <Plus size={12} /> Tambah
      </button>
    </div>
  )
}

// ------------------------------------------------------------ [{...}] rows
function ObjectListEditor({
  columns,
  value,
  onChange,
}: {
  columns: ListColumn[]
  value: Draft[]
  onChange: (v: Draft[]) => void
}) {
  const rows = Array.isArray(value) ? value : []
  const update = (i: number, key: string, v: string) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, [key]: v } : r)))
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex items-start gap-1.5 rounded-lg border border-white/10 p-2">
          <div className="grid flex-1 gap-2 sm:grid-cols-2">
            {columns.map((c) =>
              c.multiline ? (
                <textarea
                  key={c.key}
                  className={`${inputCls} sm:col-span-2 min-h-[4rem] resize-y`}
                  placeholder={c.label}
                  value={row?.[c.key] ?? ""}
                  onChange={(e) => update(i, c.key, e.target.value)}
                />
              ) : (
                <input
                  key={c.key}
                  className={inputCls}
                  placeholder={c.placeholder || c.label}
                  aria-label={c.label}
                  value={row?.[c.key] ?? ""}
                  onChange={(e) => update(i, c.key, e.target.value)}
                />
              ),
            )}
          </div>
          <button type="button" className={iconBtn} aria-label="Naik" disabled={i === 0} onClick={() => onChange(moveItem(rows, i, -1))}>
            <ArrowUp size={14} />
          </button>
          <button type="button" className={iconBtn} aria-label="Turun" disabled={i === rows.length - 1} onClick={() => onChange(moveItem(rows, i, 1))}>
            <ArrowDown size={14} />
          </button>
          <button type="button" className={iconBtn} aria-label="Hapus" onClick={() => onChange(rows.filter((_, idx) => idx !== i))}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        className={`${smallBtn} w-fit`}
        onClick={() =>
          onChange([...rows, Object.fromEntries(columns.map((c) => [c.key, ""]))])
        }
      >
        <Plus size={12} /> Tambah baris
      </button>
    </div>
  )
}

// ------------------------------------------- [{title, links:[{label,href}]}]
function FooterColumnsEditor({
  value,
  onChange,
}: {
  value: Draft[]
  onChange: (v: Draft[]) => void
}) {
  const cols = Array.isArray(value) ? value : []
  const setCol = (i: number, patch: Draft) =>
    onChange(cols.map((c, idx) => (idx === i ? { ...c, ...patch } : c)))
  return (
    <div className="flex flex-col gap-3">
      {cols.map((col, i) => {
        const links: Draft[] = Array.isArray(col?.links) ? col.links : []
        const setLinks = (next: Draft[]) => setCol(i, { links: next })
        return (
          <div key={i} className="rounded-lg border border-white/10 p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <input
                className={inputCls}
                placeholder="Judul kolom (mis. Produk)"
                value={col?.title ?? ""}
                onChange={(e) => setCol(i, { title: e.target.value })}
              />
              <button type="button" className={iconBtn} aria-label="Naik" disabled={i === 0} onClick={() => onChange(moveItem(cols, i, -1))}>
                <ArrowUp size={14} />
              </button>
              <button type="button" className={iconBtn} aria-label="Turun" disabled={i === cols.length - 1} onClick={() => onChange(moveItem(cols, i, 1))}>
                <ArrowDown size={14} />
              </button>
              <button type="button" className={iconBtn} aria-label="Hapus kolom" onClick={() => onChange(cols.filter((_, idx) => idx !== i))}>
                <Trash2 size={14} />
              </button>
            </div>
            {links.map((l, li) => (
              <div key={li} className="flex items-center gap-1.5 pl-3">
                <input
                  className={inputCls}
                  placeholder="Teks link"
                  value={l?.label ?? ""}
                  onChange={(e) =>
                    setLinks(links.map((x, k) => (k === li ? { ...x, label: e.target.value } : x)))
                  }
                />
                <input
                  className={inputCls}
                  placeholder="Alamat (mis. /#faq)"
                  value={l?.href ?? ""}
                  onChange={(e) =>
                    setLinks(links.map((x, k) => (k === li ? { ...x, href: e.target.value } : x)))
                  }
                />
                <button type="button" className={iconBtn} aria-label="Naik" disabled={li === 0} onClick={() => setLinks(moveItem(links, li, -1))}>
                  <ArrowUp size={14} />
                </button>
                <button type="button" className={iconBtn} aria-label="Turun" disabled={li === links.length - 1} onClick={() => setLinks(moveItem(links, li, 1))}>
                  <ArrowDown size={14} />
                </button>
                <button type="button" className={iconBtn} aria-label="Hapus link" onClick={() => setLinks(links.filter((_, k) => k !== li))}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className={`${smallBtn} w-fit ml-3`}
              onClick={() => setLinks([...links, { label: "", href: "" }])}
            >
              <Plus size={12} /> Tambah link
            </button>
          </div>
        )
      })}
      <button
        type="button"
        className={`${smallBtn} w-fit`}
        onClick={() => onChange([...cols, { title: "", links: [] }])}
      >
        <Plus size={12} /> Tambah kolom
      </button>
    </div>
  )
}

// ------------------------------------------------- Record<string,string>
function KeyValueEditor({
  value,
  onChange,
  suggestions,
}: {
  value: Record<string, string>
  onChange: (v: Record<string, string>) => void
  suggestions?: string[]
}) {
  // Baris disimpan lokal agar kunci kosong/ganda tidak hilang saat mengetik.
  const [rows, setRows] = useState<{ k: string; v: string }[]>(() =>
    Object.entries(value && typeof value === "object" ? value : {}).map(
      ([k, v]) => ({ k, v: String(v ?? "") }),
    ),
  )
  const listId = useId()
  const commit = (next: { k: string; v: string }[]) => {
    setRows(next)
    const obj: Record<string, string> = {}
    next.forEach((r) => {
      if (r.k.trim()) obj[r.k.trim()] = r.v
    })
    onChange(obj)
  }
  return (
    <div className="flex flex-col gap-2">
      {suggestions && (
        <datalist id={listId}>
          {suggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      )}
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <input
            className={`${inputCls} sm:max-w-[220px]`}
            placeholder="Kunci"
            list={suggestions ? listId : undefined}
            value={r.k}
            onChange={(e) => commit(rows.map((x, idx) => (idx === i ? { ...x, k: e.target.value } : x)))}
          />
          <input
            className={inputCls}
            placeholder="Isi"
            value={r.v}
            onChange={(e) => commit(rows.map((x, idx) => (idx === i ? { ...x, v: e.target.value } : x)))}
          />
          <button type="button" className={iconBtn} aria-label="Hapus" onClick={() => commit(rows.filter((_, idx) => idx !== i))}>
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button type="button" className={`${smallBtn} w-fit`} onClick={() => commit([...rows, { k: "", v: "" }])}>
        <Plus size={12} /> Tambah
      </button>
    </div>
  )
}

// ---------------------------------------------------------------- markdown
function MarkdownField({
  value,
  onChange,
  rows,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
}) {
  const [preview, setPreview] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <button type="button" className={`${smallBtn} ${!preview ? "bg-white/10" : ""}`} onClick={() => setPreview(false)}>
          Tulis
        </button>
        <button type="button" className={`${smallBtn} ${preview ? "bg-white/10" : ""}`} onClick={() => setPreview(true)}>
          Pratinjau
        </button>
        <span className="text-[10px] text-slate-500">
          Mendukung # ## ### judul, - daftar, **tebal**, `kode`
        </span>
      </div>
      {preview ? (
        <div className="prose max-w-none rounded-lg bg-white p-4 text-sm text-slate-800 min-h-[8rem]">
          {parseMarkdown(value) || (
            <span className="text-slate-400">Belum ada isi.</span>
          )}
        </div>
      ) : (
        <textarea
          className={`${inputCls} font-mono resize-y`}
          rows={rows ?? 12}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

// ------------------------------------------------------------- gambar
/**
 * Nilai: File (baru dipilih) | string (nama file tersimpan, bukan URL penuh) | "" (kosong).
 * Unggah terjadi saat form disimpan, bukan saat file dipilih.
 */
function ImageField({
  value,
  onChange,
  record,
}: {
  value: File | string | null | undefined
  onChange: (v: File | "") => void
  record?: Draft | null
}) {
  const inputId = useId()
  const preview = useMemo(() => {
    if (value instanceof File) return URL.createObjectURL(value)
    return typeof value === "string" ? pbFileUrl(record, value) : ""
  }, [value, record])

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="flex items-center gap-3">
      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-white/5 flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImageIcon size={18} className="text-slate-500" />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap gap-2">
          <label htmlFor={inputId} className={smallBtn}>
            {preview ? "Ganti gambar" : "Pilih gambar"}
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onChange(file)
              e.target.value = ""
            }}
          />
          {preview && (
            <button type="button" className={smallBtn} onClick={() => onChange("")}>
              <Trash2 size={12} /> Hapus
            </button>
          )}
        </div>
        {value instanceof File && (
          <span className="text-[10px] text-amber-300">
            {value.name} ({Math.round(value.size / 1024)} KB) — belum diunggah, klik Simpan.
          </span>
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------------- satu field
export function FieldInput({
  def,
  value,
  onChange,
  record,
}: {
  def: FieldDef
  value: any
  onChange: (v: any) => void
  record?: Draft | null
}) {
  switch (def.type) {
    case "image":
      return <ImageField value={value} onChange={onChange} record={record} />
    case "bool":
      return (
        <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
          {def.label}
        </label>
      )
    case "textarea":
      return (
        <textarea
          className={`${inputCls} resize-y`}
          rows={def.rows ?? 3}
          value={value ?? ""}
          placeholder={def.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case "number":
      return (
        <input
          type="number"
          className={inputCls}
          value={value ?? ""}
          placeholder={def.placeholder}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      )
    case "color":
      return (
        <div className="flex items-center gap-2">
          <input
            className={inputCls}
            value={value ?? ""}
            placeholder={def.placeholder || "#0cad31"}
            onChange={(e) => onChange(e.target.value)}
          />
          <input
            type="color"
            aria-label="Pilih warna"
            className="h-9 w-12 shrink-0 cursor-pointer rounded border border-white/15 bg-transparent p-0"
            value={/^#[0-9a-f]{6}$/i.test(value ?? "") ? value : "#0cad31"}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )
    case "slug":
      return (
        <input
          className={inputCls}
          value={value ?? ""}
          placeholder={def.placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onChange(toSlug(e.target.value))}
        />
      )
    case "markdown":
      return (
        <MarkdownField
          value={value ?? ""}
          onChange={onChange}
          rows={def.rows}
          placeholder={def.placeholder}
        />
      )
    case "richtext":
      // Editor dimuat ulang saat berganti item lewat `key` di CollectionManager
      return <RichTextEditor value={value ?? ""} onChange={onChange} />
    case "stringList":
      return (
        <StringListEditor
          value={value}
          onChange={onChange}
          placeholder={def.placeholder}
        />
      )
    case "objectList":
      return (
        <ObjectListEditor
          columns={def.columns || []}
          value={value}
          onChange={onChange}
        />
      )
    case "footerColumns":
      return <FooterColumnsEditor value={value} onChange={onChange} />
    case "keyValue":
      return (
        <KeyValueEditor
          value={value}
          onChange={onChange}
          suggestions={def.suggestions}
        />
      )
    default:
      return (
        <input
          className={inputCls}
          value={value ?? ""}
          placeholder={def.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )
  }
}

// ------------------------------------------------------ banyak field
/** Merender daftar field sebagai form (label, petunjuk, tata letak). */
export function FormFields({
  fields,
  draft,
  onChange,
  record,
}: {
  fields: FieldDef[]
  draft: Draft
  onChange: (key: string, value: any) => void
  /** Record tersimpan (untuk membangun URL file); kosong untuk data baru */
  record?: Draft | null
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((f) => (
        <div key={f.key} className={f.half ? "" : "sm:col-span-2"}>
          {f.type !== "bool" && (
            <label className={labelCls}>
              {f.label}
              {f.required && <span className="text-red-400"> *</span>}
            </label>
          )}
          <FieldInput
            def={f}
            value={draft[f.key]}
            onChange={(v) => onChange(f.key, v)}
            record={record}
          />
          {f.hint && <p className="mt-1 text-[10px] text-slate-500">{f.hint}</p>}
        </div>
      ))}
    </div>
  )
}
