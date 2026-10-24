import React, { useRef } from "react"
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import type { SiteSettings, TeamMemberItem, TeamStatItem } from "../../../types/cms"
import dhanarImage from "../../../assets/team/Dhanar rizki.webp"
import rianImage from "../../../assets/team/Rian alfatian.webp"
import ricardoImage from "../../../assets/team/Ricardo augusto.webp"
import bagusImage from "../../../assets/team/Bagus wikan.webp"

interface MyTimCMSContentProps {
  settings: SiteSettings | null
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: 1,
    name: "Dhanar Rizky",
    role: "Lead",
    image: dhanarImage,
    bgColor: "bg-[#E62E2D]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 2,
    name: "Rian Alfatian",
    role: "QA Engineer",
    image: rianImage,
    bgColor: "bg-[#00A63F]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    role: "Full stack Developer",
    image: ricardoImage,
    bgColor: "bg-[#F7A800]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 4,
    name: "Bagus Wikan",
    role: "Full stack Developer",
    image: bagusImage,
    bgColor: "bg-[#1FB2FF]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
]

export const DEFAULT_TEAM_STATS: TeamStatItem[] = [
  { value: "4+", label: "Team Members" },
  { value: "3", label: "Business Solutions" },
  { value: "1", label: "Integrated Platform" },
  { value: "100%", label: "Team Commitment" },
]

const BG_COLOR_OPTIONS = [
  { label: "Merah", value: "bg-[#E62E2D]", hex: "#E62E2D" },
  { label: "Hijau", value: "bg-[#00A63F]", hex: "#00A63F" },
  { label: "Kuning/Oren", value: "bg-[#F7A800]", hex: "#F7A800" },
  { label: "Biru", value: "bg-[#1FB2FF]", hex: "#1FB2FF" },
  { label: "Ungu", value: "bg-[#8B5CF6]", hex: "#8B5CF6" },
  { label: "Emerald", value: "bg-[#0CAD31]", hex: "#0CAD31" },
  { label: "Dark Slate", value: "bg-[#1E293B]", hex: "#1E293B" },
]

export default function MyTimCMSContent({
  settings,
  setSettings,
  onSave: _onSave,
  isSaving: _isSaving = false,
}: MyTimCMSContentProps) {
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  if (!settings) {
    return (
      <div className="p-8 text-center text-slate-400">
        Memuat data pengaturan tim...
      </div>
    )
  }

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const badgeValue = settings.my_tim_badge ?? "My Tim"
  const titleValue = settings.my_tim_title ?? "Kenalan dengan Tim Spontan Jualan"
  const descValue =
    settings.my_tim_desc ??
    "Di balik Spontan Jualan, ada tim yang terus berusaha membuat pengelolaan bisnis menjadi lebih sederhana."

  const currentMembers: TeamMemberItem[] =
    Array.isArray(settings.my_tim_members) && settings.my_tim_members.length > 0
      ? settings.my_tim_members
      : DEFAULT_TEAM_MEMBERS

  const currentStats: TeamStatItem[] =
    Array.isArray(settings.my_tim_stats) && settings.my_tim_stats.length > 0
      ? settings.my_tim_stats
      : DEFAULT_TEAM_STATS

  // --- Handlers for Team Members ---
  const handleUpdateMember = (index: number, field: keyof TeamMemberItem, val: any) => {
    const updated = [...currentMembers]
    updated[index] = { ...updated[index], [field]: val }
    setSettings((prev) => (prev ? { ...prev, my_tim_members: updated } : null))
  }

  const handleUpdateSocial = (index: number, network: "instagram" | "tiktok" | "linkedin" | "github", val: string) => {
    const updated = [...currentMembers]
    const member = updated[index]
    const socials = { ...(member.socials || {}), [network]: val }
    updated[index] = { ...member, socials }
    setSettings((prev) => (prev ? { ...prev, my_tim_members: updated } : null))
  }

  const handleAddMember = () => {
    const newMember: TeamMemberItem = {
      id: Date.now(),
      name: "Nama Anggota Baru",
      role: "Peran / Posisi",
      image: "",
      bgColor: "bg-[#0CAD31]",
      socials: {
        instagram: "",
        tiktok: "",
        linkedin: "",
        github: "",
      },
    }
    const updated = [...currentMembers, newMember]
    setSettings((prev) => (prev ? { ...prev, my_tim_members: updated } : null))
  }

  const handleRemoveMember = (index: number) => {
    if (currentMembers.length <= 1) {
      alert("Minimal harus ada 1 anggota tim.")
      return
    }
    const updated = currentMembers.filter((_, i) => i !== index)
    setSettings((prev) => (prev ? { ...prev, my_tim_members: updated } : null))
  }

  const handleMoveMember = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= currentMembers.length) return
    const updated = [...currentMembers]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setSettings((prev) => (prev ? { ...prev, my_tim_members: updated } : null))
  }

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        handleUpdateMember(index, "image", result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = (index: number) => {
    handleUpdateMember(index, "image", "")
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ""
    }
  }

  // --- Handlers for Stats ---
  const handleUpdateStat = (index: number, field: keyof TeamStatItem, val: string) => {
    const updated = [...currentStats]
    updated[index] = { ...updated[index], [field]: val }
    setSettings((prev) => (prev ? { ...prev, my_tim_stats: updated } : null))
  }

  const handleAddStat = () => {
    const newStat: TeamStatItem = {
      value: "1+",
      label: "Statistik Baru",
    }
    const updated = [...currentStats, newStat]
    setSettings((prev) => (prev ? { ...prev, my_tim_stats: updated } : null))
  }

  const handleRemoveStat = (index: number) => {
    if (currentStats.length <= 1) {
      alert("Minimal harus ada 1 item statistik.")
      return
    }
    const updated = currentStats.filter((_, i) => i !== index)
    setSettings((prev) => (prev ? { ...prev, my_tim_stats: updated } : null))
  }

  // Helper preview image
  const getMemberPreview = (member: TeamMemberItem, idx: number) => {
    if (member.image) return member.image
    if (idx === 0) return dhanarImage
    if (idx === 1) return rianImage
    if (idx === 2) return ricardoImage
    if (idx === 3) return bagusImage
    return ""
  }

  return (
    <div className="p-6">
      {/* Header Halaman CMS */}
      <div className="mb-6 pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">My Tim</h2>
        <p className="text-sm text-slate-400 mt-1">
          Kelola teks header, anggota tim, foto, peran, warna latar kartu, link sosial media, dan angka statistik pada halaman Tentang Kami.
        </p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* SECTION 1: HEADER TEXT */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white">Teks Header Bagian My Tim</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sesuaikan badge label, judul utama, dan kalimat deskripsi.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Badge / Label
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={badgeValue}
                onChange={(e) => handleChange("my_tim_badge", e.target.value)}
                placeholder="Contoh: My Tim"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Judul Utama
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium"
                value={titleValue}
                onChange={(e) => handleChange("my_tim_title", e.target.value)}
                placeholder="Contoh: Kenalan dengan Tim Spontan Jualan"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                Deskripsi
              </label>
              <textarea
                rows={3}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-white/40 text-sm font-medium leading-relaxed"
                value={descValue}
                onChange={(e) => handleChange("my_tim_desc", e.target.value)}
                placeholder="Tuliskan deskripsi tim..."
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: DAFTAR ANGGOTA TIM */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">Daftar Anggota Tim</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Total {currentMembers.length} anggota tim. Anda dapat mengedit nama, jabatan, warna kartu, foto, dan tautan sosial media.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer"
            >
              <Plus size={15} />
              Tambah Anggota
            </button>
          </div>

          <div className="space-y-6">
            {currentMembers.map((member, idx) => {
              const previewImg = getMemberPreview(member, idx)
              return (
                <div
                  key={member.id ?? idx}
                  className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-5 transition-all hover:border-white/20"
                >
                  {/* Bar Atas Item */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {member.name || `Anggota #${idx + 1}`}
                      </h4>
                      <span className="text-xs text-slate-400">({member.role || "Peran"})</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveMember(idx, "up")}
                        disabled={idx === 0}
                        title="Geser ke Atas"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveMember(idx, "down")}
                        disabled={idx === currentMembers.length - 1}
                        title="Geser ke Bawah"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        <ArrowDown size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        title="Hapus Anggota"
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 cursor-pointer ml-2"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Field Nama & Peran */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-white/40"
                        value={member.name}
                        onChange={(e) => handleUpdateMember(idx, "name", e.target.value)}
                        placeholder="Contoh: Dhanar Rizky"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Peran / Posisi
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-white/40"
                        value={member.role}
                        onChange={(e) => handleUpdateMember(idx, "role", e.target.value)}
                        placeholder="Contoh: Lead / Full stack Developer"
                      />
                    </div>
                  </div>

                  {/* Warna Latar Kartu */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">
                      Warna Latar Kartu
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      {BG_COLOR_OPTIONS.map((opt) => {
                        const isSelected = member.bgColor === opt.value
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleUpdateMember(idx, "bgColor", opt.value)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? "border-white text-white bg-white/10 shadow-sm"
                                : "border-white/10 text-slate-300 hover:border-white/30"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: opt.hex }}
                            />
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Foto Anggota Tim */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Foto Anggota Tim
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-white/5">
                      {/* Kolom Kiri: Unggah Gambar */}
                      <div>
                        <span className="block text-[11px] font-medium text-slate-400 mb-2">
                          Unggah File Foto
                        </span>

                        <div className="flex items-center gap-3">
                          {/* Thumbnail Preview atau Icon People Otomatis */}
                          <div className="w-14 h-16 rounded-xl border border-white/10 bg-slate-900 flex items-center justify-center shrink-0 overflow-hidden">
                            {previewImg ? (
                              <img
                                src={previewImg}
                                alt={member.name}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                <i className="fa-solid fa-user text-xl"></i>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/svg+xml"
                              className="hidden"
                              ref={(el) => {
                                fileInputRefs.current[idx] = el
                              }}
                              onChange={(e) => handleFileUpload(idx, e)}
                            />

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRefs.current[idx]?.click()}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                              >
                                {previewImg ? "Ganti foto" : "Pilih foto"}
                              </button>

                              {member.image && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                                >
                                  Hapus
                                </button>
                              )}
                            </div>

                            <span className="text-[11px] text-slate-400">
                              {member.image
                                ? "Foto aktif"
                                : previewImg
                                ? "Foto bawaan (default)"
                                : "Tanpa foto (Otomatis icon people)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Kolom Kanan: Path Cadangan / URL Gambar */}
                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                          Path Cadangan / URL Gambar (Opsional)
                        </label>
                        <input
                          type="text"
                          value={member.image || ""}
                          onChange={(e) => handleUpdateMember(idx, "image", e.target.value)}
                          placeholder="team/dhanar.webp atau https://..."
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                        <p className="text-[10px] text-slate-500 mt-1.5">
                          Bisa berupa URL gambar eksternal atau path aset internal.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="p-4 bg-slate-800/40 rounded-xl border border-white/5 space-y-3">
                    <label className="block text-xs font-semibold text-slate-300">
                      Tautan Media Sosial (Tampil saat kartu dipilih/aktif)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] text-slate-400 mb-1">
                          Instagram URL
                        </span>
                        <input
                          type="text"
                          placeholder="https://instagram.com/username"
                          value={member.socials?.instagram ?? ""}
                          onChange={(e) => handleUpdateSocial(idx, "instagram", e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] text-slate-400 mb-1">
                          TikTok URL
                        </span>
                        <input
                          type="text"
                          placeholder="https://tiktok.com/@username"
                          value={member.socials?.tiktok ?? ""}
                          onChange={(e) => handleUpdateSocial(idx, "tiktok", e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] text-slate-400 mb-1">
                          LinkedIn URL
                        </span>
                        <input
                          type="text"
                          placeholder="https://linkedin.com/in/username"
                          value={member.socials?.linkedin ?? ""}
                          onChange={(e) => handleUpdateSocial(idx, "linkedin", e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/40"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] text-slate-400 mb-1">
                          GitHub URL
                        </span>
                        <input
                          type="text"
                          placeholder="https://github.com/username"
                          value={member.socials?.github ?? ""}
                          onChange={(e) => handleUpdateSocial(idx, "github", e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SECTION 3: STATISTIK DI BAGIAN BAWAH */}
        <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white">Angka Statistik (Bagian Bawah My Tim)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Nilai dan keterangan statistik hijau tua di bawah kartu anggota tim.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddStat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Plus size={14} />
              Tambah Statistik
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-white/10 rounded-xl p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">Stat #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(idx)}
                    title="Hapus Statistik"
                    className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Angka / Nilai
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleUpdateStat(idx, "value", e.target.value)}
                      placeholder="Contoh: 4+, 100%, 3"
                      className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-white font-bold text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Label Keterangan
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleUpdateStat(idx, "label", e.target.value)}
                      placeholder="Contoh: Team Members"
                      className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
