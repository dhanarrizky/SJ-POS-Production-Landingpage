import React, { useRef, useMemo, useEffect, type ChangeEvent } from "react"
import { Trash2, Image as ImageIcon, Plus, Save, Loader2, Sparkles, Layers, Eye, EyeOff, Link as LinkIcon } from "lucide-react"
import type { SiteSettings, ProdukEkosistemItem } from "../../../types/cms"
import { mediaUrl, pbFileUrl } from "../../../lib/media"

interface ProdukCMSContentProps {
  settings: SiteSettings
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings | null>>
  onSave?: () => void
  isSaving?: boolean
}

export default function ProdukCMSContent({
  settings,
  setSettings,
  onSave,
  isSaving = false,
}: ProdukCMSContentProps) {
  const fileInput1Ref = useRef<HTMLInputElement>(null)
  const fileInputBannerRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  // --- Image 1 (Produk Utama) ---
  const handleFile1Change = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleChange("produk_image_1", file)
  }

  const handleRemoveImage1 = () => {
    handleChange("produk_image_1", "")
    if (fileInput1Ref.current) {
      fileInput1Ref.current.value = ""
    }
  }

  const preview1Url = useMemo(() => {
    if (settings.produk_image_1 instanceof File) {
      return URL.createObjectURL(settings.produk_image_1)
    }
    if (typeof settings.produk_image_1 === "string" && settings.produk_image_1) {
      return pbFileUrl(settings, settings.produk_image_1) || `http://127.0.0.1:8090/api/files/site_settings/${settings.id}/${settings.produk_image_1}`
    }
    return ""
  }, [settings.produk_image_1, settings.id])

  useEffect(() => {
    return () => {
      if (preview1Url.startsWith("blob:")) URL.revokeObjectURL(preview1Url)
    }
  }, [preview1Url])

  const fallback1Preview = settings.produk_image_1_path ? mediaUrl(settings.produk_image_1_path) : ""
  const display1Preview = preview1Url || fallback1Preview

  // --- Banner Image ---
  const handleBannerFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleChange("produk_banner_image", file)
  }

  const handleRemoveBannerImage = () => {
    handleChange("produk_banner_image", "")
    if (fileInputBannerRef.current) {
      fileInputBannerRef.current.value = ""
    }
  }

  const previewBannerUrl = useMemo(() => {
    if (settings.produk_banner_image instanceof File) {
      return URL.createObjectURL(settings.produk_banner_image)
    }
    if (typeof settings.produk_banner_image === "string" && settings.produk_banner_image) {
      return pbFileUrl(settings, settings.produk_banner_image) || `http://127.0.0.1:8090/api/files/site_settings/${settings.id}/${settings.produk_banner_image}`
    }
    return ""
  }, [settings.produk_banner_image, settings.id])

  useEffect(() => {
    return () => {
      if (previewBannerUrl.startsWith("blob:")) URL.revokeObjectURL(previewBannerUrl)
    }
  }, [previewBannerUrl])

  const fallbackBannerPreview = settings.produk_banner_image_path ? mediaUrl(settings.produk_banner_image_path) : ""
  const displayBannerPreview = previewBannerUrl || fallbackBannerPreview

  // --- Ekosistem Produk Items ---
  const defaultComingSoonItems: ProdukEkosistemItem[] = [
    {
      icon: "fa-shirt",
      title: "Laundry",
      desc: "Kelola transaksi kasir, operasional cuci-setrika, dan pelacakan status pesanan pelanggan dengan lebih praktis dan otomatis.",
      badge: "Tahap Pengembangan",
      link: "/produk-baru/laundry",
      show: true,
    },
    {
      icon: "fa-store",
      title: "Retail",
      desc: "Bantu minimarket, toko kelontong, dan bisnis retail mengelola kasir, stok inventaris barcode, dan riwayat penjualan akurat.",
      badge: "Tahap Pengembangan",
      link: "/produk-baru/retail",
      show: true,
    },
    {
      icon: "fa-mobile-screen-button",
      title: "Produk Digital",
      desc: "Berbagai solusi transaksi digital, pulsa, token listrik, dan tagihan PPOB terpadu untuk melengkapi potensi omzet bisnis Anda.",
      badge: "Tahap Pengembangan",
      link: "/produk-baru/produk-digital",
      show: true,
    },
  ]

  const comingSoonItems: ProdukEkosistemItem[] = useMemo(() => {
    const raw = Array.isArray(settings.produk_coming_soon_items) && settings.produk_coming_soon_items.length > 0
      ? settings.produk_coming_soon_items
      : defaultComingSoonItems

    return raw.map((it) => {
      const isVisible = it.show !== false && (it.show as any) !== "false" && (it.show as any) !== 0 && (it.show as any) !== "0"
      const defaultLink = it.title?.toLowerCase().includes("laundry") ? "/produk-baru/laundry" :
        it.title?.toLowerCase().includes("retail") ? "/produk-baru/retail" :
        it.title?.toLowerCase().includes("digital") ? "/produk-baru/produk-digital" :
        "/produk-baru/pos-fnb"
      return {
        ...it,
        show: isVisible,
        link: it.link || defaultLink,
        badge: it.badge === "Coming Soon" ? "Tahap Pengembangan" : (it.badge || "Tahap Pengembangan"),
      }
    })
  }, [settings.produk_coming_soon_items])

  const handleUpdateItem = (index: number, field: keyof ProdukEkosistemItem, val: any) => {
    const next = [...comingSoonItems]
    next[index] = { ...next[index], [field]: val }
    handleChange("produk_coming_soon_items", next)
  }

  const handleAddItem = () => {
    handleChange("produk_coming_soon_items", [
      ...comingSoonItems,
      {
        icon: "fa-box",
        title: "Produk Baru",
        desc: "Deskripsi solusi bisnis baru...",
        badge: "Tahap Pengembangan",
        link: "/produk-baru/pos-fnb",
        show: true,
      },
    ])
  }

  const handleRemoveItem = (index: number) => {
    handleChange("produk_coming_soon_items", comingSoonItems.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white">Produk Kami</h2>
          <p className="text-sm text-slate-400 mt-1">
            Kelola teks judul, produk POS F&B, banner bawah, dan opsi menampilkan ekosistem produk lainnya.
          </p>
        </div>
      </div>

      <div className="space-y-8 max-w-3xl">
        {/* BAGIAN 1: HEADER PRODUK */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            1. Header Bagian Produk
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Subjudul (Kicker Text)
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                value={settings.produk_kicker !== undefined ? settings.produk_kicker : "Produk Kami"}
                onChange={(e) => handleChange("produk_kicker", e.target.value)}
                placeholder="Contoh: Produk Kami"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Judul Utama
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm font-medium"
                value={settings.produk_title !== undefined ? settings.produk_title : "Satu Platform,\nUntuk Kebutuhan Usaha"}
                onChange={(e) => handleChange("produk_title", e.target.value)}
                placeholder={"Satu Platform,\nUntuk Kebutuhan Usaha"}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Deskripsi Pengantar (Kolom Kanan)
            </label>
            <textarea
              rows={3}
              className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm leading-relaxed"
              value={
                settings.produk_desc !== undefined
                  ? settings.produk_desc
                  : "Kami siap tumbuh bersama bisnis Anda. Temukan berbagai kebutuhan operasional dan pengelolaan usaha di dalam satu ekosistem Spontan Jualan yang terintegrasi secara utuh."
              }
              onChange={(e) => handleChange("produk_desc", e.target.value)}
              placeholder="Deskripsi pengantar..."
            />
          </div>
        </div>

        {/* BAGIAN 2: GAMBAR PRODUK UTAMA (POS F&B) */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            2. Gambar Produk Utama
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kolom Kiri: Unggah Gambar */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Unggah gambar</label>
              <div className="flex items-center gap-3">
                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 flex items-center justify-center p-1.5">
                  {display1Preview ? (
                    <img src={display1Preview} alt="Produk 1" className="max-h-full max-w-full object-cover rounded-lg" />
                  ) : (
                    <ImageIcon size={22} className="text-slate-500" />
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      className="hidden"
                      ref={fileInput1Ref}
                      onChange={handleFile1Change}
                    />
                    <button
                      type="button"
                      onClick={() => fileInput1Ref.current?.click()}
                      className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-white/10 hover:border-white/20 cursor-pointer"
                    >
                      {preview1Url ? "Ganti gambar" : "Pilih gambar"}
                    </button>
                    {preview1Url && (
                      <button
                        type="button"
                        onClick={handleRemoveImage1}
                        className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} /> Hapus
                      </button>
                    )}
                  </div>
                  {settings.produk_image_1 instanceof File && (
                    <span className="text-[10px] text-amber-300">
                      {settings.produk_image_1.name} ({Math.round(settings.produk_image_1.size / 1024)} KB) — belum diunggah, klik Simpan.
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                JPG/PNG/WebP, maks. 5 MB. Diunggah saat klik Simpan dan menggantikan Path gambar di bawah.
              </p>
            </div>

            {/* Kolom Kanan: Path Gambar Cadangan */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Path gambar (cadangan)</label>
              <input
                type="text"
                name="produk_image_1_path"
                value={settings.produk_image_1_path || ""}
                onChange={(e) => handleChange("produk_image_1_path", e.target.value)}
                placeholder="detail-produk/feature-satset.webp"
                className="w-full bg-slate-800/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all text-sm font-mono placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-500 mt-2">
                Path RELATIF di bucket SeaweedFS, bukan URL penuh. Dipakai hanya jika tidak ada gambar yang diunggah.
              </p>
            </div>
          </div>
        </div>

        {/* BAGIAN 3: KONTEN PRODUK POS F&B */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            3. Detail Produk POS F&B
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                value={settings.produk_fnb_title !== undefined ? settings.produk_fnb_title : "POS F&B"}
                onChange={(e) => handleChange("produk_fnb_title", e.target.value)}
                placeholder="POS F&B"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Teks Tombol
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                value={settings.produk_fnb_btn_label !== undefined ? settings.produk_fnb_btn_label : "Detail & Spesifikasi Produk"}
                onChange={(e) => handleChange("produk_fnb_btn_label", e.target.value)}
                placeholder="Detail & Spesifikasi Produk"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Deskripsi Singkat
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                value={settings.produk_fnb_desc !== undefined ? settings.produk_fnb_desc : "Kasir dan operasional untuk restoran, coffee shop, kedai, dan bisnis kuliner."}
                onChange={(e) => handleChange("produk_fnb_desc", e.target.value)}
                placeholder="Kasir dan operasional untuk restoran, coffee shop, kedai, dan bisnis kuliner."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Link Tombol
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm font-mono"
                value={settings.produk_fnb_btn_link !== undefined ? settings.produk_fnb_btn_link : "/produk-baru/pos-fnb"}
                onChange={(e) => handleChange("produk_fnb_btn_link", e.target.value)}
                placeholder="/produk-baru/pos-fnb"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 4: EKOSISTEM PRODUK LAINNYA */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers size={16} />
              4. Ekosistem Produk Lainnya (Tahap Pengembangan)
            </h3>
          </div>

          {/* Toggle Switch Utama */}
          {(() => {
            const isComingSoonVal = settings.show_produk_coming_soon
            const isComingSoonActive = Boolean(
              isComingSoonVal === true ||
              isComingSoonVal === "true" ||
              isComingSoonVal === 1 ||
              isComingSoonVal === "1"
            )
            return (
              <div className="glass p-5 rounded-xl border border-white/10">
                <label className="flex items-center cursor-pointer mb-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isComingSoonActive}
                      onChange={(e) => handleChange("show_produk_coming_soon", e.target.checked)}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${isComingSoonActive ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isComingSoonActive ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <div className="ml-3 font-semibold text-white">Tampilkan Bagian Ekosistem Produk Lainnya</div>
                </label>
                <p className="text-xs text-slate-400 mt-2">
                  Aktifkan untuk memunculkan seksi ekosistem produk ini di landing page. Anda juga dapat mengatur tampilan per produk (tampilkan atau sembunyikan) satu per satu di bawah.
                </p>
              </div>
            )
          })()}

          {/* Opsi Form Ekosistem Produk */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Judul Bagian Ekosistem Produk
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm font-medium"
                value={settings.produk_coming_soon_title !== undefined ? settings.produk_coming_soon_title : "Ekosistem Produk Spontan Jualan"}
                onChange={(e) => handleChange("produk_coming_soon_title", e.target.value)}
                placeholder="Ekosistem Produk Spontan Jualan"
              />
            </div>


            {/* Daftar Kartu Produk Ekosistem */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-semibold text-slate-200">
                    Daftar Produk Ekosistem ({comingSoonItems.length})
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Atur nama, icon (tanpa emoji), status visibilitas per produk, dan tautan URL detail produk.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  <Plus size={14} /> Tambah Produk
                </button>
              </div>

              <div className="space-y-4">
                {comingSoonItems.map((item, idx) => {
                  const isItemVisible = item.show !== false
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border transition-all duration-200 ${
                        isItemVisible
                          ? "bg-slate-800/80 border-white/10"
                          : "bg-slate-900/60 border-white/5 opacity-75"
                      }`}
                    >
                      {/* Baris Atas: Icon, Judul & Toggle Tampilkan/Sembunyikan */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border ${
                              isItemVisible
                                ? "bg-white/10 text-white border-white/20"
                                : "bg-slate-800 text-slate-500 border-white/5"
                            }`}
                          >
                            <i className={`fa-solid ${item.icon || "fa-box"}`}></i>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                              <span className="text-sm font-bold text-white">
                                {item.title || "Produk Tanpa Nama"}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              Status:{" "}
                              <strong className={isItemVisible ? "text-white" : "text-amber-400"}>
                                {isItemVisible ? "Tampil di Landing Page" : "Disembunyikan"}
                              </strong>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Tombol Toggle Tampil/Sembunyi per item */}
                          <button
                            type="button"
                            onClick={() => handleUpdateItem(idx, "show", !isItemVisible)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              isItemVisible
                                ? "bg-white/15 text-white border-white/30 hover:bg-white/25"
                                : "bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700 hover:text-white"
                            }`}
                            title={
                              isItemVisible
                                ? "Klik untuk sembunyikan produk ini dari landing page"
                                : "Klik untuk tampilkan produk ini di landing page"
                            }
                          >
                            {isItemVisible ? (
                              <>
                                <Eye size={13} className="text-white" />
                                <span>Tampil</span>
                              </>
                            ) : (
                              <>
                                <EyeOff size={13} className="text-slate-400" />
                                <span>Sembunyikan</span>
                              </>
                            )}
                          </button>

                          {/* Tombol Hapus */}
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/15 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                            title="Hapus Produk"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Input Detail Produk */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {/* Nama Produk */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Nama Produk
                          </label>
                          <input
                            type="text"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                            value={item.title || ""}
                            onChange={(e) => handleUpdateItem(idx, "title", e.target.value)}
                            placeholder="Contoh: Retail"
                          />
                        </div>

                        {/* Icon FontAwesome */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Icon FontAwesome (tanpa emoji)
                          </label>
                          <div className="relative flex items-center">
                            <div className="absolute left-3 text-white text-sm">
                              <i className={`fa-solid ${item.icon || "fa-box"}`}></i>
                            </div>
                            <input
                              type="text"
                              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-3.5 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                              value={item.icon || ""}
                              onChange={(e) => handleUpdateItem(idx, "icon", e.target.value)}
                              placeholder="fa-shirt, fa-store, dll"
                            />
                          </div>
                          {/* Preset Icon Cepat */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            {[
                              { icon: "fa-shirt", label: "Laundry" },
                              { icon: "fa-store", label: "Retail" },
                              { icon: "fa-mobile-screen-button", label: "Digital" },
                              { icon: "fa-cash-register", label: "Kasir" },
                              { icon: "fa-boxes-stacked", label: "Stok" },
                            ].map((preset) => (
                              <button
                                key={preset.icon}
                                type="button"
                                onClick={() => handleUpdateItem(idx, "icon", preset.icon)}
                                className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                                  item.icon === preset.icon
                                    ? "bg-white/20 text-white border-white/30 font-bold"
                                    : "bg-slate-900 text-slate-400 border-white/5 hover:text-white"
                                }`}
                              >
                                <i className={`fa-solid ${preset.icon} mr-1`}></i>
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Badge Status */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Label Badge (Status)
                          </label>
                          <input
                            type="text"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                            value={item.badge || ""}
                            onChange={(e) => handleUpdateItem(idx, "badge", e.target.value)}
                            placeholder="Contoh: Tahap Pengembangan"
                          />
                        </div>

                        {/* URL Detail Produk */}
                        <div className="md:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <LinkIcon size={13} className="text-white" />
                              URL Detail Produk
                            </span>
                            <span className="text-[11px] text-slate-400">
                              Tautan yang dituju saat tombol "Lihat Detail Produk" diklik
                            </span>
                          </label>
                          <input
                            type="text"
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs font-mono focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                            value={item.link || ""}
                            onChange={(e) => handleUpdateItem(idx, "link", e.target.value)}
                            placeholder="/produk-baru/retail atau /detail-produk/retail"
                          />
                        </div>

                        {/* Deskripsi Produk */}
                        <div className="md:col-span-2 lg:col-span-3">
                          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            Deskripsi Produk
                          </label>
                          <textarea
                            rows={2}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all leading-relaxed"
                            value={item.desc || ""}
                            onChange={(e) => handleUpdateItem(idx, "desc", e.target.value)}
                            placeholder="Deskripsi ringkas mengenai solusi produk ini..."
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 5: BANNER CTA BAWAH */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={16} />
            5. Banner CTA Bawah
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Judul Banner
              </label>
              <input
                type="text"
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm font-medium"
                value={settings.produk_banner_title !== undefined ? settings.produk_banner_title : "Ekosistem Lengkap Bisnis Anda"}
                onChange={(e) => handleChange("produk_banner_title", e.target.value)}
                placeholder="Ekosistem Lengkap Bisnis Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Deskripsi Banner
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm leading-relaxed"
                value={
                  settings.produk_banner_desc !== undefined
                    ? settings.produk_banner_desc
                    : "Bertransformasi dan melangkah lebih jauh bersama Spontan Jualan. Sebuah ekosistem terintegrasi yang dirancang untuk merangkul dan mendukung seluruh kebutuhan operasional bisnis Anda."
                }
                onChange={(e) => handleChange("produk_banner_desc", e.target.value)}
                placeholder="Deskripsi banner..."
              />
            </div>
          </div>

          {/* DUA KOLOM GAMBAR BANNER */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-3">
              Gambar Banner Bawah
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Kolom Kiri: Unggah Gambar */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Unggah gambar</label>
                <div className="flex items-center gap-3">
                  <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 flex items-center justify-center p-1.5">
                    {displayBannerPreview ? (
                      <img src={displayBannerPreview} alt="Banner Produk" className="max-h-full max-w-full object-cover rounded-lg" />
                    ) : (
                      <ImageIcon size={22} className="text-slate-500" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/svg+xml"
                        className="hidden"
                        ref={fileInputBannerRef}
                        onChange={handleBannerFileChange}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputBannerRef.current?.click()}
                        className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-white/10 hover:border-white/20 cursor-pointer"
                      >
                        {previewBannerUrl ? "Ganti gambar" : "Pilih gambar"}
                      </button>
                      {previewBannerUrl && (
                        <button
                          type="button"
                          onClick={handleRemoveBannerImage}
                          className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} /> Hapus
                        </button>
                      )}
                    </div>
                    {settings.produk_banner_image instanceof File && (
                      <span className="text-[10px] text-amber-300">
                        {settings.produk_banner_image.name} ({Math.round(settings.produk_banner_image.size / 1024)} KB) — belum diunggah, klik Simpan.
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  JPG/PNG/WebP, maks. 5 MB. Diunggah saat klik Simpan dan menggantikan Path gambar di bawah.
                </p>
              </div>

              {/* Kolom Kanan: Path Gambar Cadangan */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Path gambar (cadangan)</label>
                <input
                  type="text"
                  name="produk_banner_image_path"
                  value={settings.produk_banner_image_path || ""}
                  onChange={(e) => handleChange("produk_banner_image_path", e.target.value)}
                  placeholder="detail-produk/feature-satset.webp"
                  className="w-full bg-slate-800/80 border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-white outline-none transition-all text-sm font-mono placeholder:text-slate-500"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Path RELATIF di bucket SeaweedFS, bukan URL penuh. Dipakai hanya jika tidak ada gambar yang diunggah.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TOMBOL SIMPAN */}
        {onSave && (
          <div className="pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Simpan Produk Kami
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
