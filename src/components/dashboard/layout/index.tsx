import { useState, useEffect } from "react"
import { pb } from "../../../lib/pocketbase"
import type { SiteSettings } from "../../../types/cms"
import GeneralCMSContent from "./GeneralCMSContent"
import NavbarCMSContent from "./NavbarCMSContent"
import FooterCMSContent from "./FooterCMSContent"
import MitraCMSContent from "./MitraCMSContent"

export type LayoutActiveMenu = 
  | "gen_identitas" 
  | "gen_mitra"
  | "nav_navigasi" 
  | "nav_sosmed" 
  | "foot_deskripsi" 
  | "foot_navigasi" 
  | "foot_kontak" 
  | "foot_copyright"

export default function LayoutCMS() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeMenu, setActiveMenu] = useState<LayoutActiveMenu>("gen_identitas")
  
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const parseJSON = (field: any, fallback: any[]) => {
    if (!field) return fallback;
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch {
        return fallback;
      }
    }
    return field;
  }

  const loadSettings = async () => {
    setLoading(true)
    try {
      let record;
      try {
        record = await pb.collection("site_settings").getFirstListItem("", { sort: "-updated", requestKey: null })
      } catch (err: any) {
        if (err.status === 404) {
          // Jika belum ada data sama sekali (404), buat data default
          console.log("Data site_settings belum ada, membuat data baru...");
          record = await pb.collection("site_settings").create({
            site_name: "Spontan Jualan",
            contact_email: "hello@spontanjualan.com",
            footer_tagline: "Kelola Usaha Lebih Mudah. Jualan Lebih Spontan.",
            footer_desc: "Spontan Jualan adalah solusi digital yang dirancang untuk membantu UMKM mengelola usaha dengan lebih mudah dan terorganisir.",
            footer_copyright: "© 2026 Spontan Jualan. Semua hak dilindungi."
          })
        } else {
          throw err;
        }
      }
      
      const data = record as unknown as SiteSettings
      
      data.social_links = parseJSON(data.social_links, []);
      const defaultFooterCols = [
        {
          title: "Produk",
          links: [{ label: "POS F&B", href: "/produk-baru/pos-fnb" }],
        },
        {
          title: "Perusahaan",
          links: [
            { label: "Tentang Kami", href: "/tentang-kami" },
            { label: "Coba Gratis", href: "#harga" },
            { label: "Hubungi Kami", href: "#kontak" },
          ],
        },
        {
          title: "Bantuan",
          links: [
            { label: "FAQ", href: "#faq" },
            { label: "Pusat Bantuan", href: "#" },
            { label: "Syarat & Ketentuan", href: "#" },
            { label: "Kebijakan Privasi", href: "#" },
          ],
        },
      ];
      const rawCols = parseJSON(data.footer_columns, []);
      const totalColLinks = Array.isArray(rawCols)
        ? rawCols.reduce((acc: number, c: any) => acc + (Array.isArray(c?.links) ? c.links.length : 0), 0)
        : 0;
      data.footer_columns = totalColLinks > 0 ? rawCols : defaultFooterCols;
      data.footer_bottom_links = parseJSON(data.footer_bottom_links, [
        { label: "Kebijakan Privasi", href: "#" },
        { label: "Syarat & Ketentuan", href: "#" }
      ]);
      
      setSettings(data)
      if (data.logo) {
        setPreviewLogo(pb.files.getUrl(record, data.logo))
      }
    } catch (err) {
      console.error("Gagal memuat atau membuat pengaturan:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    try {
      const formData = new FormData()
      
      // Append all string/boolean/number fields
      Object.entries(settings).forEach(([key, value]) => {
        if (
          key === 'id' ||
          key === 'logo' || 
          key === 'partner_logos' || 
          key === 'about_image' || 
          key === 'collectionId' || 
          key === 'collectionName' || 
          key === 'created' || 
          key === 'updated' || 
          key === 'expand'
        ) return;
        
        if (value === null) {
          // PocketBase API ignores missing keys or you can send an empty string for text fields.
          // We'll skip sending nulls.
          return;
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else if (value !== undefined) {
          formData.append(key, String(value))
        }
      })

      if (selectedLogoFile) {
        formData.append("logo", selectedLogoFile)
      } else if (!previewLogo && settings.logo === "") {
        formData.append("logo", "")
      }

      const record = await pb.collection("site_settings").update(settings.id, formData)
      
      const updatedData = record as unknown as SiteSettings
      updatedData.social_links = parseJSON(updatedData.social_links, []);
      updatedData.footer_columns = parseJSON(updatedData.footer_columns, []);
      updatedData.footer_bottom_links = parseJSON(updatedData.footer_bottom_links, []);

      setSettings(updatedData)
      setSelectedLogoFile(null)
      if (updatedData.logo) {
        setPreviewLogo(pb.files.getUrl(record, updatedData.logo))
      } else {
        setPreviewLogo(null)
      }

      alert("Berhasil menyimpan perubahan!")
    } catch (err) {
      console.error(err)
      alert("Gagal menyimpan perubahan.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6 text-white">Memuat data...</div>
  if (!settings) return <div className="p-6 text-white">Data tidak ditemukan.</div>

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* KIRI: Unified Sidebar */}
      <div className="w-full md:w-64 flex flex-col gap-2 bg-slate-900 rounded-2xl p-4 border border-white/10 shrink-0 h-fit">
        
        <h2 className="text-white font-bold mb-2 px-2 text-sm uppercase tracking-wider text-slate-500">General</h2>
        <button
          onClick={() => setActiveMenu("gen_identitas")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "gen_identitas" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Identitas & Kontak Utama
        </button>
        <button
          onClick={() => setActiveMenu("gen_mitra")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "gen_mitra" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Mitra & Partner (Logo)
        </button>

        <h2 className="text-white font-bold mb-2 px-2 mt-4 text-sm uppercase tracking-wider text-slate-500">Navbar</h2>
        <button
          onClick={() => setActiveMenu("nav_navigasi")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "nav_navigasi" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Menu Navigasi
        </button>
        <button
          onClick={() => setActiveMenu("nav_sosmed")}
          className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "nav_sosmed" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span>Sosial Media</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
            {(settings.social_links || []).length}
          </span>
        </button>

        <h2 className="text-white font-bold mb-2 px-2 mt-4 text-sm uppercase tracking-wider text-slate-500">Footer</h2>
        <button
          onClick={() => setActiveMenu("foot_deskripsi")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "foot_deskripsi" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Deskripsi
        </button>
        <button
          onClick={() => setActiveMenu("foot_navigasi")}
          className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "foot_navigasi" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <span>Kolom Navigasi</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
            {(settings.footer_columns || []).length}
          </span>
        </button>
        <button
          onClick={() => setActiveMenu("foot_kontak")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "foot_kontak" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Info Kontak
        </button>
        <button
          onClick={() => setActiveMenu("foot_copyright")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "foot_copyright" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Hak Cipta & Link
        </button>

        <div className="mt-4 pt-4 border-t border-white/10">
           <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-bold transition-colors disabled:opacity-50 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] transition-all"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      {/* KANAN: Detail Content */}
      <div className="flex-1 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden min-h-[400px]">
        {activeMenu === "gen_identitas" && (
          <GeneralCMSContent 
            settings={settings} 
            setSettings={setSettings} 
            previewLogo={previewLogo}
            setPreviewLogo={setPreviewLogo}
            selectedLogoFile={selectedLogoFile}
            setSelectedLogoFile={setSelectedLogoFile}
          />
        )}
        {activeMenu === "gen_mitra" && (
          <MitraCMSContent settings={settings} setSettings={setSettings} />
        )}
        {(activeMenu === "nav_navigasi" || activeMenu === "nav_sosmed") && (
          <NavbarCMSContent activeMenu={activeMenu} settings={settings} setSettings={setSettings} />
        )}
        {(activeMenu.startsWith("foot_")) && (
          <FooterCMSContent activeMenu={activeMenu} settings={settings} setSettings={setSettings} />
        )}
      </div>
    </div>
  )
}
