import React from "react"
import type { SiteSettings } from "../../../types/cms"

interface HeaderCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
}

export default function HeaderCMSContent({ settings, setSettings }: HeaderCMSContentProps) {
  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => prev ? { ...prev, [field]: value } : null)
  }

  const benefits = Array.isArray(settings.hero_benefits) 
    ? settings.hero_benefits 
    : []

  const handleAddBenefit = () => {
    handleChange("hero_benefits", [...benefits, ""])
  }
  
  const handleUpdateBenefit = (index: number, val: string) => {
    const newBenefits = [...benefits]
    newBenefits[index] = val
    handleChange("hero_benefits", newBenefits)
  }

  const handleRemoveBenefit = (index: number) => {
    handleChange("hero_benefits", benefits.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
        Header / Hero
      </h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Judul Utama
          </label>
          <textarea
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all min-h-[80px]"
            value={settings.hero_title || ""}
            onChange={(e) => handleChange("hero_title", e.target.value)}
            placeholder="Contoh: Bantu Bisnis Anda Tumbuh Lebih Mudah"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Deskripsi (Subtitle)
          </label>
          <textarea
            className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all min-h-[120px]"
            value={settings.hero_subtitle || ""}
            onChange={(e) => handleChange("hero_subtitle", e.target.value)}
          />
        </div>


        <div className="pt-4 border-t border-white/10">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Poin Pendukung (Muncul di bawah tombol)
          </label>
          <div className="space-y-3">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex gap-3">
                <input
                  type="text"
                  className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                  value={b}
                  onChange={(e) => handleUpdateBenefit(idx, e.target.value)}
                />
                <button
                  onClick={() => handleRemoveBenefit(idx)}
                  className="bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 border border-white/10 hover:border-rose-500/50 px-4 rounded-xl transition-all flex items-center justify-center"
                  title="Hapus poin"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddBenefit}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-brand text-sm font-semibold transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            Tambah Poin
          </button>
        </div>
      </div>
    </div>
  )
}
