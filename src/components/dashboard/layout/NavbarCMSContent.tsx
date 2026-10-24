import React from "react"
import type { SiteSettings } from "../../../types/cms"
import { Plus, Trash2 } from "lucide-react"

interface Props {
  activeMenu: string
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
}

export default function NavbarCMSContent({ activeMenu, settings, setSettings }: Props) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => {
      if (!prev) return prev
      return { ...prev, [name]: type === "checkbox" ? checked : value }
    })
  }

  const handleAddSocial = () => {
    setSettings(prev => {
      if (!prev) return prev
      return {
        ...prev,
        social_links: [...(prev.social_links || []), { platform: "facebook", url: "https://facebook.com/" }]
      }
    })
  }

  const handleUpdateSocial = (index: number, field: "platform" | "url", value: string) => {
    const newLinks = [...(settings.social_links || [])]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setSettings(prev => prev ? { ...prev, social_links: newLinks } : prev)
  }

  const handleRemoveSocial = (index: number) => {
    const newLinks = [...(settings.social_links || [])]
    newLinks.splice(index, 1)
    setSettings(prev => prev ? { ...prev, social_links: newLinks } : prev)
  }

  return (
    <>
      {activeMenu === "nav_navigasi" && (
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Edit Menu Navigasi</h3>
          <p className="text-sm text-slate-400 mb-6">Ubah teks dari menu navigasi atau sembunyikan jika tidak diperlukan.</p>
          
          <div className="space-y-3">
            {[
              { key: "nav_tentang_kami_text", hideKey: "nav_tentang_kami_hide", defaultText: "Tentang Kami" },
              { key: "nav_produk_text", hideKey: "nav_produk_hide", defaultText: "Produk" },
              { key: "nav_harga_text", hideKey: "nav_harga_hide", defaultText: "Harga" },
              { key: "nav_cara_mulai_text", hideKey: "nav_cara_mulai_hide", defaultText: "Cara Mulai" },
              { key: "nav_faq_text", hideKey: "nav_faq_hide", defaultText: "FAQ" },
              { key: "nav_blog_text", hideKey: "nav_blog_hide", defaultText: "Blog" },
              { key: "nav_coba_gratis_text", hideKey: "nav_coba_gratis_hide", defaultText: "[Coba Gratis]" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Teks Menu</label>
                  <input
                    type="text"
                    name={item.key}
                    // @ts-ignore
                    value={settings[item.key] || ""}
                    onChange={handleChange}
                    placeholder={item.defaultText}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex flex-col items-center justify-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name={item.hideKey}
                      // @ts-ignore
                      checked={settings[item.hideKey] || false}
                      onChange={handleChange}
                      className="w-5 h-5 rounded bg-slate-900 border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-800 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Sembunyikan</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMenu === "nav_sosmed" && (
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Sosial Media</h3>
              <p className="text-sm text-slate-400">Pilih sosial media untuk diedit atau klik "Tambah" untuk membuat yang baru.</p>
            </div>
            <button 
              onClick={handleAddSocial}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer"
            >
              <Plus size={16} /> Tambah
            </button>
          </div>

          <div className="space-y-4">
            {(!settings.social_links || settings.social_links.length === 0) ? (
              <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700/50 border-dashed">
                <p className="text-slate-400 mb-2">Belum ada link sosial media.</p>
                <button onClick={handleAddSocial} className="text-emerald-500 text-sm font-semibold hover:underline cursor-pointer">Tambah Sekarang</button>
              </div>
            ) : (
              settings.social_links.map((social, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 group">
                  <div className="w-full sm:w-1/3">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Platform (Nama Ikon)</label>
                    <input
                      type="text"
                      value={social.platform}
                      onChange={(e) => handleUpdateSocial(index, "platform", e.target.value.toLowerCase())}
                      placeholder="Cth: facebook, instagram, tiktok"
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Otomatis ubah ikon sesuai nama (misal: facebook = ikon fb)</p>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">URL / Link</label>
                    <input
                      type="text"
                      value={social.url}
                      onChange={(e) => handleUpdateSocial(index, "url", e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                    />
                  </div>
                  <div className="pt-5 flex items-center">
                    <button 
                      onClick={() => handleRemoveSocial(index)}
                      className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
