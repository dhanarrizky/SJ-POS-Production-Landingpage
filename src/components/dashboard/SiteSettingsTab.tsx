import { useEffect, useState } from "react"
import { Save } from "lucide-react"
import { pb } from "../../lib/pocketbase"
import { formatPbError } from "../../lib/pbError"
import { FormFields } from "./ui/fields"
import { buildDraft, serializeDraft, validateRequired } from "./ui/serialize"
import type { Draft } from "./ui/types"
import { siteSections, type SiteSection } from "./contentConfigs"

interface SectionProps {
  section: SiteSection
  record: Draft | null
  /** Dipanggil dengan record terbaru setelah berhasil menyimpan */
  onSaved: (record: Draft) => void
  defaultOpen?: boolean
}

// Tiap seksi punya draft & tombol simpan sendiri, dan hanya mengirim
// field miliknya, supaya edit di seksi lain tidak ikut tertimpa.
function SiteSectionForm({ section, record, onSaved, defaultOpen }: SectionProps) {
  const [draft, setDraft] = useState<Draft>(() =>
    buildDraft(section.fields, {}, record),
  )
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  )

  const handleSave = async () => {
    const missing = validateRequired(section.fields, draft)
    if (missing) {
      setMessage({ ok: false, text: missing })
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      const data = serializeDraft(section.fields, draft)
      const saved = record?.id
        ? await pb.collection("site_settings").update(record.id, data)
        : await pb.collection("site_settings").create({
            site_name: "SpontanJualan",
            ...data,
          })
      onSaved(saved as unknown as Draft)
      setMessage({ ok: true, text: "Tersimpan." })
    } catch (err) {
      console.error("Gagal menyimpan pengaturan situs:", err)
      setMessage({ ok: false, text: formatPbError(err) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <details
      open={defaultOpen}
      className="glass border border-white/8 rounded-2xl group"
    >
      <summary className="cursor-pointer select-none list-none px-5 py-3.5 flex items-center justify-between text-sm font-bold text-slate-200">
        {section.title}
        <span className="text-slate-500 text-xs group-open:rotate-90 transition-transform">
          ▶
        </span>
      </summary>
      <div className="px-5 pb-5 flex flex-col gap-5">
        <FormFields
          fields={section.fields}
          draft={draft}
          onChange={(key, value) => setDraft((d) => ({ ...d, [key]: value }))}
        />
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white hover:bg-brand-hover disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} /> {saving ? "Menyimpan…" : `Simpan ${section.title}`}
          </button>
          {message && (
            <span
              className={`text-xs ${message.ok ? "text-emerald-400" : "text-red-400"}`}
            >
              {message.text}
            </span>
          )}
        </div>
      </div>
    </details>
  )
}

export default function SiteSettingsTab() {
  const [record, setRecord] = useState<Draft | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((r) => {
        if (active) setRecord(r as unknown as Draft)
      })
      .catch((err) => {
        // 404 = belum ada record; form akan membuatnya saat pertama disimpan
        if (active && err?.status !== 404) setError(formatPbError(err, "Gagal memuat pengaturan."))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) return <p className="text-sm text-slate-500">Memuat…</p>

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-slate-500">
        Teks dan tautan di beranda, header, dan footer. Tiap bagian disimpan
        sendiri-sendiri.
      </p>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {siteSections.map((section, i) => (
        <SiteSectionForm
          key={section.id}
          section={section}
          record={record}
          defaultOpen={i === 0}
          onSaved={setRecord}
        />
      ))}
    </div>
  )
}
