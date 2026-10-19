import { useCallback, useEffect, useState } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { pb } from "../../lib/pocketbase"
import { formatPbError } from "../../lib/pbError"
import { FormFields } from "./ui/fields"
import {
  buildDraft,
  serializeDraft,
  toRequestBody,
  validateRequired,
} from "./ui/serialize"
import type { Draft, FieldDef } from "./ui/types"

const NEW_ID = "__new__"

export interface CollectionManagerProps {
  /** Nama collection PocketBase */
  collection: string
  /** Judul daftar, mis. "Paket Harga" */
  title: string
  /** Kata benda satu item, mis. "paket" (untuk pesan) */
  noun: string
  fields: FieldDef[]
  /** Nilai awal saat membuat data baru */
  defaults?: Draft
  listLabel: (record: Draft) => string
  listSub?: (record: Draft) => string
  sort?: string
  /** Keterangan singkat di atas form */
  description?: string
}

export default function CollectionManager({
  collection,
  title,
  noun,
  fields,
  defaults = {},
  listLabel,
  listSub,
  sort = "created",
  description,
}: CollectionManagerProps) {
  const [records, setRecords] = useState<Draft[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  )

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const list = await pb.collection(collection).getFullList({ sort })
      setRecords(list as unknown as Draft[])
    } catch (err) {
      setMessage({ ok: false, text: formatPbError(err, "Gagal memuat data.") })
    } finally {
      setLoading(false)
    }
  }, [collection, sort])

  useEffect(() => {
    load()
  }, [load])

  const select = (record: Draft) => {
    setMessage(null)
    setSelectedId(record.id)
    setDraft(buildDraft(fields, defaults, record))
  }

  const startNew = () => {
    setMessage(null)
    setSelectedId(NEW_ID)
    setDraft(buildDraft(fields, defaults, null))
  }

  const setField = (key: string, value: any) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const handleSave = async () => {
    const missing = validateRequired(fields, draft)
    if (missing) {
      setMessage({ ok: false, text: missing })
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      const data = toRequestBody(serializeDraft(fields, draft)) as Draft
      const saved =
        selectedId && selectedId !== NEW_ID
          ? await pb.collection(collection).update(selectedId, data)
          : await pb.collection(collection).create(data)
      await load()
      setSelectedId(saved.id)
      setDraft(buildDraft(fields, defaults, saved as unknown as Draft))
      setMessage({ ok: true, text: "Tersimpan." })
    } catch (err) {
      console.error(`Gagal menyimpan ${collection}:`, err)
      setMessage({ ok: false, text: formatPbError(err) })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    const record = records.find((r) => r.id === selectedId)
    if (!record) return
    if (!confirm(`Hapus ${noun} "${listLabel(record)}" secara permanen?`)) return
    try {
      await pb.collection(collection).delete(record.id)
      setSelectedId(null)
      await load()
    } catch (err) {
      setMessage({ ok: false, text: formatPbError(err, "Gagal menghapus.") })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
      <aside className="glass border border-white/8 rounded-2xl p-3 self-start">
        <div className="flex items-center justify-between px-1 pb-2">
          <span className="text-xs font-bold text-slate-300">
            {title} ({records.length})
          </span>
          <button
            type="button"
            onClick={startNew}
            className="inline-flex items-center gap-1 rounded-lg bg-brand px-2.5 py-1 text-[11px] font-bold text-white hover:bg-brand-hover cursor-pointer"
          >
            <Plus size={12} /> Tambah
          </button>
        </div>
        {loading ? (
          <p className="px-1 py-4 text-xs text-slate-500">Memuat…</p>
        ) : records.length === 0 ? (
          <p className="px-1 py-4 text-xs text-slate-500">Belum ada data.</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {records.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => select(r)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                    selectedId === r.id
                      ? "bg-brand text-white font-bold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span className="block truncate">
                    {listLabel(r) || "(tanpa judul)"}
                    {r.active === false && (
                      <span className="ml-1.5 text-[10px] text-amber-400">
                        (nonaktif)
                      </span>
                    )}
                  </span>
                  {listSub && (
                    <span
                      className={`block truncate text-[10px] font-normal ${
                        selectedId === r.id ? "text-white/80" : "text-slate-500"
                      }`}
                    >
                      {listSub(r)}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <section className="glass border border-white/8 rounded-2xl p-5">
        {selectedId === null ? (
          <p className="text-sm text-slate-400">
            Pilih {noun} di kiri untuk mengedit, atau klik “Tambah” untuk
            membuat yang baru.
          </p>
        ) : (
          // key: ganti item = form (dan editor di dalamnya) dimuat ulang
          <div key={selectedId} className="flex flex-col gap-5">
            {description && (
              <p className="text-[11px] text-slate-500">{description}</p>
            )}
            <FormFields
              fields={fields}
              draft={draft}
              onChange={setField}
              record={records.find((r) => r.id === selectedId)}
            />
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-50 cursor-pointer"
              >
                <Save size={14} /> {saving ? "Menyimpan…" : "Simpan"}
              </button>
              {selectedId !== NEW_ID && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              )}
              {message && (
                <span
                  className={`text-xs ${message.ok ? "text-emerald-400" : "text-red-400"}`}
                >
                  {message.text}
                </span>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
