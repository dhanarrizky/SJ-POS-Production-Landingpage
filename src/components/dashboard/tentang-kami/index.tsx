import { useState, useEffect } from "react"
import { pb } from "../../../lib/pocketbase"
import type { SiteSettings } from "../../../types/cms"

import MyTimCMSContent, { DEFAULT_TEAM_MEMBERS, DEFAULT_TEAM_STATS } from "./MyTimCMSContent"
import DariKamiCMSContent, { DEFAULT_DARI_KAMI_ITEMS } from "./DariKamiCMSContent"
import KenapaKamiCMSContent, { DEFAULT_KENAPA_KAMI_CARDS } from "./KenapaKamiCMSContent"

export type TentangKamiActiveMenu = "tk_mytim" | "tk_darikami" | "tk_kenapakami"

export default function TentangKamiCMS() {
  const [activeMenu, setActiveMenu] = useState<TentangKamiActiveMenu>("tk_mytim")
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true
    const fetchData = async () => {
      try {
        const record = await pb.collection("site_settings").getFirstListItem("", {
          sort: "-updated",
          requestKey: null,
        })
        const data = record as unknown as SiteSettings

        // Parse JSON for my_tim_members
        if (typeof data.my_tim_members === "string") {
          try {
            data.my_tim_members = JSON.parse(data.my_tim_members as any)
          } catch {
            data.my_tim_members = DEFAULT_TEAM_MEMBERS
          }
        }
        if (!Array.isArray(data.my_tim_members) || data.my_tim_members.length === 0) {
          data.my_tim_members = DEFAULT_TEAM_MEMBERS
        }

        // Parse JSON for my_tim_stats
        if (typeof data.my_tim_stats === "string") {
          try {
            data.my_tim_stats = JSON.parse(data.my_tim_stats as any)
          } catch {
            data.my_tim_stats = DEFAULT_TEAM_STATS
          }
        }
        if (!Array.isArray(data.my_tim_stats) || data.my_tim_stats.length === 0) {
          data.my_tim_stats = DEFAULT_TEAM_STATS
        }

        // Parse JSON for kenapa_kami_cards
        if (typeof data.kenapa_kami_cards === "string") {
          try {
            data.kenapa_kami_cards = JSON.parse(data.kenapa_kami_cards as any)
          } catch {
            data.kenapa_kami_cards = DEFAULT_KENAPA_KAMI_CARDS
          }
        }
        if (!Array.isArray(data.kenapa_kami_cards) || data.kenapa_kami_cards.length < 3) {
          data.kenapa_kami_cards = DEFAULT_KENAPA_KAMI_CARDS
        }

        // Parse JSON for dari_kami_items
        if (typeof data.dari_kami_items === "string") {
          try {
            data.dari_kami_items = JSON.parse(data.dari_kami_items as any)
          } catch {
            data.dari_kami_items = DEFAULT_DARI_KAMI_ITEMS
          }
        }
        if (!Array.isArray(data.dari_kami_items) || data.dari_kami_items.length === 0) {
          data.dari_kami_items = DEFAULT_DARI_KAMI_ITEMS
        }

        // Default text fallbacks - My Tim
        data.my_tim_badge = data.my_tim_badge || "My Tim"
        data.my_tim_title = data.my_tim_title || "Kenalan dengan Tim Spontan Jualan"
        data.my_tim_desc =
          data.my_tim_desc ||
          "Di balik Spontan Jualan, ada tim yang terus berusaha membuat pengelolaan bisnis menjadi lebih sederhana."

        // Default text fallbacks - Kenapa Kami
        data.kenapa_kami_badge = data.kenapa_kami_badge || "Kenapa Kami?"
        data.kenapa_kami_title =
          data.kenapa_kami_title || "Lebih dari sekedar Tim, Kami Partner untuk UMKM"
        data.kenapa_kami_desc =
          data.kenapa_kami_desc ||
          `Di balik ${data.site_name || "SpontanJualan"}, kami terus berkolaborasi untuk menciptakan solusi digital yang memudahkan UMKM dalam menjalankan dan mengembangkan usahanya.`
        data.kenapa_kami_btn_label = data.kenapa_kami_btn_label || "Lihat Beranda"
        data.kenapa_kami_btn_link = data.kenapa_kami_btn_link || "/"

        if (active) {
          setSettings(data)
          setLoading(false)
        }
      } catch (err: any) {
        console.error("Gagal load site_settings di TentangKamiCMS:", err)
        if (active) {
          // Fallback settings object if none exists yet
          setSettings({
            id: "",
            my_tim_badge: "My Tim",
            my_tim_title: "Kenalan dengan Tim Spontan Jualan",
            my_tim_desc:
              "Di balik Spontan Jualan, ada tim yang terus berusaha membuat pengelolaan bisnis menjadi lebih sederhana.",
            my_tim_members: DEFAULT_TEAM_MEMBERS,
            my_tim_stats: DEFAULT_TEAM_STATS,
            kenapa_kami_badge: "Kenapa Kami?",
            kenapa_kami_title: "Lebih dari sekedar Tim, Kami Partner untuk UMKM",
            kenapa_kami_desc:
              "Di balik SpontanJualan, kami terus berkolaborasi untuk menciptakan solusi digital yang memudahkan UMKM dalam menjalankan dan mengembangkan usahanya.",
            kenapa_kami_btn_label: "Lihat Beranda",
            kenapa_kami_btn_link: "/",
            kenapa_kami_cards: DEFAULT_KENAPA_KAMI_CARDS,
            show_partners: true,
          } as unknown as SiteSettings)
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      active = false
    }
  }, [])

  const handleSave = async () => {
    if (!settings?.id) return
    setSaving(true)

    try {
      const payload: Record<string, any> = {
        my_tim_badge: settings.my_tim_badge || "My Tim",
        my_tim_title: settings.my_tim_title || "Kenalan dengan Tim Spontan Jualan",
        my_tim_desc:
          settings.my_tim_desc ||
          "Di balik Spontan Jualan, ada tim yang terus berusaha membuat pengelolaan bisnis menjadi lebih sederhana.",
        kenapa_kami_badge: settings.kenapa_kami_badge || "Kenapa Kami?",
        kenapa_kami_title:
          settings.kenapa_kami_title || "Lebih dari sekedar Tim, Kami Partner untuk UMKM",
        kenapa_kami_desc:
          settings.kenapa_kami_desc ||
          `Di balik ${settings.site_name || "SpontanJualan"}, kami terus berkolaborasi untuk menciptakan solusi digital yang memudahkan UMKM dalam menjalankan dan mengembangkan usahanya.`,
      }

      if (settings.my_tim_members !== undefined) {
        payload.my_tim_members = settings.my_tim_members
      }

      if (settings.my_tim_stats !== undefined) {
        payload.my_tim_stats = settings.my_tim_stats
      }

      if (settings.kenapa_kami_cards !== undefined) {
        payload.kenapa_kami_cards = settings.kenapa_kami_cards
      }

      if (settings.dari_kami_items !== undefined) {
        payload.dari_kami_items = settings.dari_kami_items
      }

      if (settings.show_partners !== undefined) {
        payload.show_partners = settings.show_partners !== false
      }

      const updatedRecord = await pb
        .collection("site_settings")
        .update(settings.id, payload, { requestKey: null })

      const data = updatedRecord as unknown as SiteSettings

      if (typeof data.my_tim_members === "string") {
        try {
          data.my_tim_members = JSON.parse(data.my_tim_members as any)
        } catch {
          data.my_tim_members = settings.my_tim_members || DEFAULT_TEAM_MEMBERS
        }
      }

      if (typeof data.my_tim_stats === "string") {
        try {
          data.my_tim_stats = JSON.parse(data.my_tim_stats as any)
        } catch {
          data.my_tim_stats = settings.my_tim_stats || DEFAULT_TEAM_STATS
        }
      }

      if (typeof data.kenapa_kami_cards === "string") {
        try {
          data.kenapa_kami_cards = JSON.parse(data.kenapa_kami_cards as any)
        } catch {
          data.kenapa_kami_cards = settings.kenapa_kami_cards || DEFAULT_KENAPA_KAMI_CARDS
        }
      }

      if (typeof data.dari_kami_items === "string") {
        try {
          data.dari_kami_items = JSON.parse(data.dari_kami_items as any)
        } catch {
          data.dari_kami_items = settings.dari_kami_items || DEFAULT_DARI_KAMI_ITEMS
        }
      }

      setSettings(data)
      alert("Berhasil menyimpan perubahan!")
    } catch (err: any) {
      console.error("Gagal simpan site_settings Tentang Kami:", err)
      alert("Gagal menyimpan perubahan.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-3" />
        Memuat konten Tentang Kami CMS...
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* KIRI: Unified Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-2 bg-slate-900 rounded-2xl p-4 border border-white/10 shrink-0 h-fit">
        <h2 className="text-white font-bold mb-2 px-2 text-sm uppercase tracking-wider text-slate-500">Tentang Kami</h2>

        <button
          onClick={() => setActiveMenu("tk_mytim")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            activeMenu === "tk_mytim" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          My Tim
        </button>

        <button
          onClick={() => setActiveMenu("tk_darikami")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            activeMenu === "tk_darikami" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Dari Kami
        </button>

        <button
          onClick={() => setActiveMenu("tk_kenapakami")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            activeMenu === "tk_kenapakami" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Kenapa Kami
        </button>

        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      {/* KANAN: Detail Content */}
      <div className="flex-1 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden min-h-[400px]">
        {activeMenu === "tk_mytim" && settings && (
          <MyTimCMSContent
            settings={settings}
            setSettings={setSettings}
            onSave={handleSave}
            isSaving={saving}
          />
        )}

        {activeMenu === "tk_darikami" && (
          <DariKamiCMSContent
            settings={settings}
            setSettings={setSettings}
            onSave={handleSave}
            isSaving={saving}
          />
        )}

        {activeMenu === "tk_kenapakami" && (
          <KenapaKamiCMSContent
            settings={settings}
            setSettings={setSettings}
            onSave={handleSave}
            isSaving={saving}
          />
        )}
      </div>
    </div>
  )
}
