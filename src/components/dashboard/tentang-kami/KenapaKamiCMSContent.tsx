import React from "react"
import type { SiteSettings, KenapaKamiCardItem } from "../../../types/cms"
import { Eye, EyeOff, Info } from "lucide-react"

interface KenapaKamiCMSContentProps {
  settings: SiteSettings | null
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export const DEFAULT_KENAPA_KAMI_CARDS: KenapaKamiCardItem[] = [
  {
    id: 1,
    title: "Solusi Nyata",
    desc: "Kami fokus pada kebutuhan pengguna bukan hanya fitur",
  },
  {
    id: 2,
    title: "Kolaborasi",
    desc: "Setiap ide masukan sangat berarti",
  },
  {
    id: 3,
    title: "Berkembang Bersama",
    desc: "Kami ingin tumbuh bersama para pengguna",
  },
]

export default function KenapaKamiCMSContent({
  settings,
  setSettings,
  onSave: _onSave,
  isSaving: _isSaving = false,
}: KenapaKamiCMSContentProps) {
  if (!settings) {
    return (
      <div className="p-8 text-center text-slate-400">
        Memuat data pengaturan Kenapa Kami...
      </div>
    )
  }

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const badgeValue = settings.kenapa_kami_badge ?? "Kenapa Kami?"
  const titleValue =
    settings.kenapa_kami_title ?? "Lebih dari sekedar Tim, Kami Partner untuk UMKM"
  const descValue =
    settings.kenapa_kami_desc ??
    `Di balik ${settings.site_name || "SpontanJualan"}, kami terus berkolaborasi untuk menciptakan solusi digital yang memudahkan UMKM dalam menjalankan dan mengembangkan usahanya.`
  // Pastikan selalu ada tepat 3 cards
  let currentCards: KenapaKamiCardItem[] = DEFAULT_KENAPA_KAMI_CARDS
  if (Array.isArray(settings.kenapa_kami_cards) && settings.kenapa_kami_cards.length >= 3) {
    currentCards = settings.kenapa_kami_cards.slice(0, 3)
  } else if (typeof settings.kenapa_kami_cards === "string") {
    try {
      const parsed = JSON.parse(settings.kenapa_kami_cards)
      if (Array.isArray(parsed) && parsed.length >= 3) {
        currentCards = parsed.slice(0, 3)
      }
    } catch {
      currentCards = DEFAULT_KENAPA_KAMI_CARDS
    }
  }

  const handleUpdateCard = (
    index: number,
    field: keyof KenapaKamiCardItem,
    val: string
  ) => {
    const updated = [...currentCards]
    updated[index] = { ...updated[index], [field]: val }
    handleChange("kenapa_kami_cards", updated)
  }

  const showPartners = settings.show_partners !== false

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Kenapa Kami</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola teks pengantar, 3 kartu keunggulan, serta keterlihatan mitra &amp; partner di halaman Tentang Kami.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* SECTION 1: TEKS PENGANTAR (KIRI) */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">Teks Pengantar Kenapa Kami</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Teks yang muncul di sebelah kiri pada halaman Tentang Kami.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Badge / Label Hijau
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={badgeValue}
                onChange={(e) => handleChange("kenapa_kami_badge", e.target.value)}
                placeholder="Contoh: Kenapa Kami?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Judul Utama
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium leading-relaxed"
                value={titleValue}
                onChange={(e) => handleChange("kenapa_kami_title", e.target.value)}
                placeholder="Contoh: Lebih dari sekedar Tim, Kami Partner untuk UMKM"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Deskripsi Paragraf
              </label>
              <textarea
                rows={3}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium leading-relaxed"
                value={descValue}
                onChange={(e) => handleChange("kenapa_kami_desc", e.target.value)}
                placeholder="Tuliskan deskripsi paragraf..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: 3 KARTU KEUNGGULAN (FIXED 3 CARDS - HANYA BISA DIEDIT) */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="pb-3 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">3 Kartu Keunggulan Hijau</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Format kartu tetap 3 item sesuai layout grid. Anda dapat mengedit judul dan deskripsi masing-masing kartu.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Tepat 3 Kartu
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentCards.map((card, idx) => (
              <div
                key={card.id ?? idx}
                className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-4 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Kartu {idx + 1}: {card.title}
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Judul Kartu
                    </label>
                    <input
                      type="text"
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm font-bold focus:outline-none focus:border-emerald-500"
                      value={card.title}
                      onChange={(e) => handleUpdateCard(idx, "title", e.target.value)}
                      placeholder="Contoh: Solusi Nyata"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Deskripsi Kartu
                    </label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs leading-relaxed focus:outline-none focus:border-emerald-500"
                      value={card.desc}
                      onChange={(e) => handleUpdateCard(idx, "desc", e.target.value)}
                      placeholder="Contoh: Kami fokus pada kebutuhan pengguna bukan hanya fitur"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: MITRA & PARTNER ("BEKERJA SAMA DENGAN...") */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">
                Mitra &amp; Partner (&quot;Bekerja sama dengan...&quot;)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pengaturan keterlihatan teks dan logo partner di bagian bawah halaman Tentang Kami.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleChange("show_partners", !showPartners)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showPartners
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {showPartners ? (
                <>
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Ditampilkan</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-slate-400" />
                  <span>Disembunyikan</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>
                Bagian <strong>&quot;bekerja sama dengan {settings.site_name || "SpontanJualan"}&quot;</strong> dan deretan logo partner di Tentang Kami tersinkronisasi dengan pengaturan <strong>General &gt; Mitra</strong>.
              </p>
              <p className="text-slate-400 text-[11px]">
                Jika tombol di atas disetel <em>Disembunyikan</em>, seluruh bagian tersebut tidak akan tampil di halaman Tentang Kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
