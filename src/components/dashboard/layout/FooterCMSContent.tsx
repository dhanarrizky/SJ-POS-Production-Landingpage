import React from "react"
import type { SiteSettings } from "../../../types/cms"
import { Plus, Trash2 } from "lucide-react"

interface Props {
  activeMenu: string
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
}

export default function FooterCMSContent({ activeMenu, settings, setSettings }: Props) {
  const descWordCount = (settings.footer_desc || "").trim().split(/\s+/).filter(Boolean).length

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setSettings((prev) => {
      if (!prev) return prev
      return { ...prev, [name]: type === "checkbox" ? checked : value }
    })
  }

  const handleAddBottomLink = () => {
    setSettings(prev => {
      if (!prev) return prev
      return {
        ...prev,
        footer_bottom_links: [...(prev.footer_bottom_links || []), { label: "Link Baru", href: "#" }]
      }
    })
  }

  const handleUpdateBottomLink = (index: number, field: "label" | "href", value: string) => {
    const newLinks = [...(settings.footer_bottom_links || [])]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setSettings(prev => prev ? { ...prev, footer_bottom_links: newLinks } : prev)
  }

  const handleRemoveBottomLink = (index: number) => {
    const newLinks = [...(settings.footer_bottom_links || [])]
    newLinks.splice(index, 1)
    setSettings(prev => prev ? { ...prev, footer_bottom_links: newLinks } : prev)
  }

  return (
    <>
      {activeMenu === "foot_deskripsi" && (
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-white mb-4">Deskripsi Footer</h3>
          <p className="text-sm text-slate-400 mb-6">Ubah tagline dan deskripsi singkat tentang usaha Anda.</p>
          
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Tagline Atas Footer</label>
              <input
                type="text"
                name="footer_tagline"
                value={settings.footer_tagline || ""}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
                placeholder="Contoh: Kelola Usaha Lebih Mudah..."
              />
            </div>
            <div>
              <label className="flex items-center justify-between text-sm font-semibold text-slate-300 mb-2">
                <span>Deskripsi Singkat</span>
                <span className={`text-xs ${descWordCount > 40 ? 'text-red-400' : 'text-slate-500'}`}>
                  {descWordCount}/40 kata
                </span>
              </label>
              <textarea
                name="footer_desc"
                value={settings.footer_desc || ""}
                onChange={handleChange}
                rows={4}
                className={`w-full bg-slate-800 border ${descWordCount > 40 ? 'border-red-500' : 'border-slate-700 focus:border-emerald-500'} focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all resize-none`}
                placeholder="Spontan Jualan adalah solusi digital..."
              />
              {descWordCount > 40 && (
                <p className="text-red-400 text-xs mt-1">Maksimal 40 kata disarankan agar tampilan tetap rapi.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeMenu === "foot_navigasi" && (
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Kolom Navigasi Footer</h3>
              <p className="text-sm text-slate-400">Atur link navigasi untuk bagian Produk, Perusahaan, dan Bantuan.</p>
            </div>
          </div>

          <div className="space-y-6">
            {(() => {
              // Safety parse for footer_columns
              let parsedColumns = settings.footer_columns;
              if (parsedColumns && Array.isArray(parsedColumns)) {
                if (parsedColumns.length > 0 && typeof parsedColumns[0] === "number") {
                  parsedColumns = undefined;
                } else if (parsedColumns.length > 0 && typeof parsedColumns[0] === "object" && !parsedColumns[0].links) {
                  parsedColumns = undefined;
                }
              } else if (typeof parsedColumns === "string") {
                try {
                  parsedColumns = JSON.parse(parsedColumns);
                } catch {
                  parsedColumns = undefined;
                }
              }

              const defaultCols = [
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

              const totalLinks = parsedColumns && Array.isArray(parsedColumns)
                ? parsedColumns.reduce((acc: number, c: any) => acc + (Array.isArray(c?.links) ? c.links.length : 0), 0)
                : 0;

              const safeColumns =
                parsedColumns && Array.isArray(parsedColumns) && totalLinks > 0
                  ? parsedColumns
                  : defaultCols;

              const sections = ["Produk", "Perusahaan", "Bantuan"];

              return sections.map((sectionTitle) => {
                let colIdx = safeColumns.findIndex((c: any) => c.title === sectionTitle);
                // If the column doesn't exist yet, we will just pass a mock and handle its creation on the fly if user adds a link.
                const col = colIdx !== -1 ? safeColumns[colIdx] : { title: sectionTitle, links: [] };

                const onAddLink = () => {
                  setSettings(prev => {
                    if (!prev) return prev;
                    let cols = [...safeColumns];
                    let idx = cols.findIndex((c: any) => c.title === sectionTitle);
                    if (idx === -1) {
                      idx = cols.length;
                      cols.push({ title: sectionTitle, links: [] });
                    }
                    cols[idx] = { ...cols[idx], links: [...(cols[idx].links || []), { label: "Link Baru", href: "#" }] };
                    return { ...prev, footer_columns: cols };
                  });
                };

                const onUpdateLink = (linkIdx: number, field: "label" | "href", value: string) => {
                  setSettings(prev => {
                    if (!prev) return prev;
                    let cols = [...safeColumns];
                    let idx = cols.findIndex((c: any) => c.title === sectionTitle);
                    if (idx !== -1 && cols[idx].links) {
                      const newLinks = [...cols[idx].links];
                      newLinks[linkIdx] = { ...newLinks[linkIdx], [field]: value };
                      cols[idx] = { ...cols[idx], links: newLinks };
                    }
                    return { ...prev, footer_columns: cols };
                  });
                };

                const onRemoveLink = (linkIdx: number) => {
                  setSettings(prev => {
                    if (!prev) return prev;
                    let cols = [...safeColumns];
                    let idx = cols.findIndex((c: any) => c.title === sectionTitle);
                    if (idx !== -1 && cols[idx].links) {
                      const newLinks = [...cols[idx].links];
                      newLinks.splice(linkIdx, 1);
                      cols[idx] = { ...cols[idx], links: newLinks };
                    }
                    return { ...prev, footer_columns: cols };
                  });
                };

                return (
                  <div key={sectionTitle} className="bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-hidden">
                    <div className="bg-slate-800/80 p-4 border-b border-slate-700">
                      <h4 className="text-white font-bold">{sectionTitle}</h4>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      {(!col.links || col.links.length === 0) ? (
                        <p className="text-sm text-slate-500 italic">Belum ada link di bagian {sectionTitle}.</p>
                      ) : (
                        col.links.map((link: any, linkIdx: number) => (
                          <div key={linkIdx} className="flex flex-col sm:flex-row gap-3">
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => onUpdateLink(linkIdx, "label", e.target.value)}
                              placeholder="Label (Cth: Tentang Kami)"
                              className="w-full sm:w-1/3 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                            />
                            <input
                              type="text"
                              value={link.href}
                              onChange={(e) => onUpdateLink(linkIdx, "href", e.target.value)}
                              placeholder="URL / Link (Cth: /tentang-kami atau #faq)"
                              className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                            />
                            <button 
                              onClick={() => onRemoveLink(linkIdx)}
                              className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0 self-start cursor-pointer"
                              title="Hapus Link"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))
                      )}
                      
                      <button
                        onClick={onAddLink}
                        className="text-emerald-500 hover:text-emerald-400 text-sm font-semibold flex items-center gap-1 mt-2 transition-colors cursor-pointer"
                      >
                        <Plus size={16} /> Tambah Link
                      </button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {activeMenu === "foot_kontak" && (
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-white mb-4">Informasi Kontak</h3>
          <p className="text-sm text-slate-400 mb-6">Kontak yang ditampilkan pada kotak informasi di bagian bawah footer.</p>
          
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Telepon / WhatsApp</label>
              <input
                type="text"
                name="support_phone"
                value={settings.support_phone || ""}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
                placeholder="Contoh: +62 822-6127-4176"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Lokasi / Alamat</label>
              <textarea
                name="footer_location"
                value={settings.footer_location || ""}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all resize-none"
                placeholder="Contoh: Brubuh, Selatan makam brubuh..."
              />
            </div>
          </div>
        </div>
      )}

      {activeMenu === "foot_copyright" && (
        <div className="p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-4">Hak Cipta & Link Bawah</h3>
          <p className="text-sm text-slate-400 mb-6">Ubah teks copyright dan tambahkan tautan legal (Kebijakan Privasi, dsb).</p>
          
          <div className="space-y-6">
            <div className="max-w-xl">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Teks Hak Cipta</label>
              <input
                type="text"
                name="footer_copyright"
                value={settings.footer_copyright || ""}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
                placeholder="Contoh: © 2026 Spontan Jualan. Semua hak dilindungi."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-slate-300">Tautan Legal</label>
                <button 
                  onClick={handleAddBottomLink}
                  className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Plus size={16} /> Tambah Link
                </button>
              </div>
              
              <div className="space-y-3">
                {(!settings.footer_bottom_links || settings.footer_bottom_links.length === 0) ? (
                  <div className="text-center py-6 bg-slate-800/30 rounded-xl border border-slate-700/50 border-dashed">
                    <p className="text-slate-400 text-sm">Belum ada tautan legal.</p>
                  </div>
                ) : (
                  settings.footer_bottom_links.map((link, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-3 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleUpdateBottomLink(idx, "label", e.target.value)}
                        placeholder="Label (Cth: Syarat & Ketentuan)"
                        className="w-full sm:w-1/3 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => handleUpdateBottomLink(idx, "href", e.target.value)}
                        placeholder="URL (Cth: /syarat-ketentuan)"
                        className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white outline-none"
                      />
                      <button 
                        onClick={() => handleRemoveBottomLink(idx)}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0 self-start sm:self-auto cursor-pointer"
                        title="Hapus Link"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
