import { useState, useEffect } from "react"
import { Save } from "lucide-react"
import { pb } from "../../../lib/pocketbase"
import { formatPbError } from "../../../lib/pbError"
import { dpSection, type DpImageField, type DpKey } from "../../../lib/detailProduk"
import type { SiteSettings } from "../../../types/cms"

import HeroCMSContent from "./HeroCMSContent"
import FiturCMSContent from "./FiturCMSContent"
import DapurCMSContent from "./DapurCMSContent"
import MarginCMSContent from "./MarginCMSContent"

export type DetailProdukActiveMenu = "dp_hero" | "dp_fitur" | "dp_dapur" | "dp_margin"

const MENUS: { key: DetailProdukActiveMenu; label: string }[] = [
  { key: "dp_hero", label: "Hero" },
  { key: "dp_fitur", label: "Spesifikasi dan Fitur" },
  { key: "dp_dapur", label: "Dapur Modern" },
  { key: "dp_margin", label: "Margin & Akurasi" },
]

const SECTION_KEYS: DpKey[] = ["dp_hero", "dp_fitur", "dp_dapur", "dp_margin"]
const IMAGE_FIELDS: DpImageField[] = ["dp_hero_image", "dp_dapur_image", "dp_margin_image"]

export default function DetailProdukCMS() {
  const [activeMenu, setActiveMenu] = useState<DetailProdukActiveMenu>("dp_hero")
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)

  useEffect(() => {
    let active = true
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => active && setSettings(record as unknown as SiteSettings))
      .catch((err) => console.error("Gagal load site_settings di DetailProdukCMS:", err))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const handleSave = async () => {
    if (!settings?.id) return
    setSaving(true)
    setMessage(null)
    try {
      const formData = new FormData()
      // Section yang belum pernah diisi/diedit tidak dikirim (tetap memakai bawaan).
      for (const key of SECTION_KEYS) {
        if (settings[key] != null) formData.append(key, JSON.stringify(dpSection(settings, key)))
      }
      for (const field of IMAGE_FIELDS) {
        const v = settings[field]
        if (v instanceof File) formData.append(field, v)
        else if (v === "") formData.append(field, "")
      }
      const updated = await pb.collection("site_settings").update(settings.id, formData)
      setSettings(updated as unknown as SiteSettings)
      setMessage({ ok: true, text: "Tersimpan." })
    } catch (err) {
      console.error("Gagal simpan site_settings Detail Produk:", err)
      setMessage({ ok: false, text: formatPbError(err) })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-3" />
        Memuat konten Detail Produk CMS...
      </div>
    )
  }

  if (!settings) {
    return <div className="p-8 text-center text-slate-400">Pengaturan situs belum ada / gagal dimuat.</div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-64 flex flex-col gap-2 bg-slate-900 rounded-2xl p-4 border border-white/10 shrink-0 h-fit">
        <h2 className="font-bold mb-2 px-2 text-sm uppercase tracking-wider text-slate-500">Detail Produk (POS F&amp;B)</h2>

        {MENUS.map((m) => (
          <button
            key={m.key}
            onClick={() => setActiveMenu(m.key)}
            className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeMenu === m.key ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {m.label}
          </button>
        ))}

        <p className="px-2 pt-2 text-[11px] leading-relaxed text-slate-500">
          Video demo diatur di tab 🎬 Video (placement <code>produk:pos-fnb</code>), paket harga di tab 💰 Paket Harga.
        </p>

        <div className="mt-2 pt-4 border-t border-white/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold disabled:opacity-50 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            <Save size={16} /> {saving ? "Menyimpan…" : "Simpan"}
          </button>
          {message && (
            <p className={`mt-2 text-xs ${message.ok ? "text-emerald-400" : "text-red-400"}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden min-h-[400px]">
        {activeMenu === "dp_hero" && <HeroCMSContent settings={settings} setSettings={setSettings} />}
        {activeMenu === "dp_fitur" && <FiturCMSContent settings={settings} setSettings={setSettings} />}
        {activeMenu === "dp_dapur" && <DapurCMSContent settings={settings} setSettings={setSettings} />}
        {activeMenu === "dp_margin" && <MarginCMSContent settings={settings} setSettings={setSettings} />}
      </div>
    </div>
  )
}
