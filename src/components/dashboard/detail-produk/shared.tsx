import { useEffect, useMemo, useRef, type ChangeEvent, type Dispatch, type ReactNode, type SetStateAction } from "react"
import { Image as ImageIcon, Trash2 } from "lucide-react"
import { dpImage, dpSection, type DpImageField, type DpKey, type DpSections } from "../../../lib/detailProduk"
import { pbFileUrl } from "../../../lib/media"
import type { SiteSettings } from "../../../types/cms"

export interface SectionProps {
  settings: SiteSettings
  setSettings: Dispatch<SetStateAction<SiteSettings | null>>
}

export const inputCls =
  "w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"

/** Baca satu section (sudah digabung dengan bawaan) + setter yang menimpa sebagian field. */
export function useDpSection<K extends DpKey>({ settings, setSettings }: SectionProps, key: K) {
  const value = dpSection(settings, key)
  const update = (patch: Partial<DpSections[K]>) =>
    setSettings((prev) => (prev ? { ...prev, [key]: { ...dpSection(prev, key), ...patch } } : null))
  return [value, update] as const
}

export function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-white/10">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-sm text-slate-400 mt-1">{desc}</p>
    </div>
  )
}

export function Card({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
      <div className="pb-3 border-b border-white/10">
        <h3 className="text-base font-bold text-white">{title}</h3>
        {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

export function TextField({
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-1.5">{label}</label>
      {rows ? (
        <textarea rows={rows} className={`${inputCls} leading-relaxed`} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type="text" className={inputCls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

export function ImageField({
  settings,
  setSettings,
  field,
  label,
}: SectionProps & { field: DpImageField; label: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const current = settings[field]
  const uploaded = current instanceof File || (typeof current === "string" && current !== "")

  const preview = useMemo(() => {
    if (current instanceof File) return URL.createObjectURL(current)
    if (typeof current === "string" && current) return pbFileUrl(settings, current)
    return dpImage(settings, field)
  }, [current, settings, field])

  useEffect(() => () => { if (preview.startsWith("blob:")) URL.revokeObjectURL(preview) }, [preview])

  const set = (v: File | "") => setSettings((prev) => (prev ? { ...prev, [field]: v } : null))
  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) set(file)
  }
  const onRemove = () => {
    set("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 flex items-center justify-center p-1.5">
          {preview ? <img src={preview} alt={label} className="max-h-full max-w-full object-cover rounded-lg" /> : <ImageIcon size={22} className="text-slate-500" />}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" className="hidden" ref={inputRef} onChange={onPick} />
            <button type="button" onClick={() => inputRef.current?.click()} className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-white/10 hover:border-white/20 cursor-pointer">
              {uploaded ? "Ganti gambar" : "Pilih gambar"}
            </button>
            {uploaded && (
              <button type="button" onClick={onRemove} className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer">
                <Trash2 size={12} /> Kembalikan ke bawaan
              </button>
            )}
          </div>
          {current instanceof File ? (
            <span className="text-[10px] text-amber-300">{current.name} ({Math.round(current.size / 1024)} KB) — belum diunggah, klik Simpan.</span>
          ) : (
            !uploaded && <span className="text-[10px] text-slate-500">Memakai gambar bawaan.</span>
          )}
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-2">JPG/PNG/WebP, maks. 5 MB. Diunggah saat klik Simpan.</p>
    </div>
  )
}
