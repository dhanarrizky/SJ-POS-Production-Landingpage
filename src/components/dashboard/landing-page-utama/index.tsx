import { useState, useEffect } from "react"
import { pb } from "../../../lib/pocketbase"
import type { SiteSettings } from "../../../types/cms"

import HeaderCMSContent from "./HeaderCMSContent"
import TentangKamiCMSContent from "./TentangKamiCMSContent"
import VideoDemoCMSContent from "./VideoDemoCMSContent"
import ProdukCMSContent from "./ProdukCMSContent"
import PaketHargaCMSContent from "./PaketHargaCMSContent"
import MitraPertamaCMSContent from "./MitraPertamaCMSContent"
import CaraMulaiCMSContent from "./CaraMulaiCMSContent"
import FeedbackCustomerCMSContent from "./FeedbackCustomerCMSContent"
import FAQCMSContent, { DEFAULT_FAQS } from "./FAQCMSContent"
import KontakSaranCMSContent from "./KontakSaranCMSContent"
import BeritaCMSContent from "./BeritaCMSContent"

export type LandingPageActiveMenu = 
  | "lp_header" 
  | "lp_about"
  | "lp_video"
  | "lp_produk"
  | "lp_pricing"
  | "lp_mitra_pertama"
  | "lp_cara_mulai"
  | "lp_feedback"
  | "lp_faq"
  | "lp_kontak"
  | "lp_berita"

export default function LandingPageUtamaCMS() {
  const [activeMenu, setActiveMenu] = useState<LandingPageActiveMenu>("lp_header")
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true
    const fetchData = async () => {
      try {
        const record = await pb.collection("site_settings").getFirstListItem("", { sort: "-updated", requestKey: null })
        
        // Parse JSON fields if needed
        const data = record as unknown as SiteSettings
        
        // hero_benefits
        if (typeof data.hero_benefits === "string") {
          try {
            data.hero_benefits = JSON.parse(data.hero_benefits as any)
          } catch {
            data.hero_benefits = []
          }
        }
        
        // about_checklist
        if (typeof data.about_checklist === "string") {
          try {
            data.about_checklist = JSON.parse(data.about_checklist as any)
          } catch {
            data.about_checklist = []
          }
        }

        // produk_coming_soon_items
        if (typeof data.produk_coming_soon_items === "string") {
          try {
            data.produk_coming_soon_items = JSON.parse(data.produk_coming_soon_items as any)
          } catch {
            data.produk_coming_soon_items = []
          }
        }

        // pricing_badges
        if (typeof data.pricing_badges === "string") {
          try {
            data.pricing_badges = JSON.parse(data.pricing_badges as any)
          } catch {
            data.pricing_badges = []
          }
        }

        // pricing_packages
        if (typeof data.pricing_packages === "string") {
          try {
            data.pricing_packages = JSON.parse(data.pricing_packages as any)
          } catch {
            data.pricing_packages = []
          }
        }

        const rawShowCompare = data.show_compare_plans
        data.show_compare_plans = Boolean(
          rawShowCompare === true ||
          rawShowCompare === "true" ||
          rawShowCompare === 1 ||
          rawShowCompare === "1"
        )

        const rawShow = data.show_produk_coming_soon
        data.show_produk_coming_soon = Boolean(
          rawShow === true ||
          rawShow === "true" ||
          rawShow === 1 ||
          rawShow === "1"
        )

        data.mitra_pertama_badge = data.mitra_pertama_badge || "100 Bisnis Pertama"
        data.mitra_pertama_title = data.mitra_pertama_title || "Bukan Sekadar Menggunakan.\nIkut Membentuk."
        data.mitra_pertama_desc = data.mitra_pertama_desc || "Spontan Jualan membangun solusi untuk bisnis Indonesia, dimulai dari kebutuhan sehari-hari yang praktis. Pengalaman dan kebutuhan Anda akan menjadi bagian dari perjalanan kami."
        
        // cara_mulai_steps
        if (typeof data.cara_mulai_steps === "string") {
          try {
            data.cara_mulai_steps = JSON.parse(data.cara_mulai_steps as any)
          } catch {
            data.cara_mulai_steps = []
          }
        }
        data.cara_mulai_badge = data.cara_mulai_badge || "Cara Mulai"
        data.cara_mulai_title = data.cara_mulai_title || "Siap Jualan dalam 3 Langkah Sederhana"
        if (!Array.isArray(data.cara_mulai_steps) || data.cara_mulai_steps.length === 0) {
          data.cara_mulai_steps = [
            {
              title: "Daftar",
              description: "Buat akun Spontan Jualan dengan cepat dan mudah. Lengkapi data dasar usaha Anda untuk memulai."
            },
            {
              title: "Verifikasi",
              description: "Pastikan data usaha Anda sesuai dan lakukan proses verifikasi agar akun siap digunakan."
            },
            {
              title: "Pakai",
              description: "Akun siap digunakan. Kelola produk, transaksi, dan kebutuhan usaha Anda dengan lebih praktis bersama Spontan Jualan."
            }
          ]
        }
        
        // feedback_items
        if (typeof data.feedback_items === "string") {
          try {
            data.feedback_items = JSON.parse(data.feedback_items as any)
          } catch {
            data.feedback_items = []
          }
        }
        data.feedback_title = data.feedback_title || "Pesan Dari\nPengembang"
        data.feedback_subtitle = data.feedback_subtitle || "Dibalik Layar\nSpontan Jualan"

        // faq_items
        if (typeof data.faq_items === "string") {
          try {
            data.faq_items = JSON.parse(data.faq_items as any)
          } catch {
            data.faq_items = []
          }
        }
        data.faq_title = data.faq_title || "FAQs"
        if (!Array.isArray(data.faq_items) || data.faq_items.length === 0) {
          data.faq_items = DEFAULT_FAQS
        }

        // kontak_saran
        data.kontak_saran_badge = data.kontak_saran_badge || "Hubungi & Berikan Masukan"
        data.kontak_saran_title = data.kontak_saran_title || "Kontak Saran & Kritik"
        data.kontak_saran_desc = data.kontak_saran_desc || "Kami selalu terbuka untuk mendengarkan saran, kritik, dan masukan dari Anda. Karena setiap pesan dari Anda, membantu kami untuk terus berkembang dan memberikan yang terbaik."
        data.kontak_saran_info_title = data.kontak_saran_info_title || "Buka 24 Jam / 7 Hari"
        data.kontak_saran_info_desc = data.kontak_saran_info_desc || "Anda bisa mengirimkan saran, kritik, atau pertanyaan kapan saja. Kami siap membantu"

        // blog
        data.blog_title = data.blog_title || "Insight & Tren Bisnis Terkini"
        data.blog_desc = data.blog_desc || "Temukan berbagai informasi, strategi, dan tren terbaru seputar AI, manajemen, bisnis, keuangan, dan teknologi untuk membantu bisnis Anda berkembang."
        const rawNavBlogHide: any = data.nav_blog_hide ?? data.blog_hide
        data.nav_blog_hide = Boolean(
          rawNavBlogHide === true ||
          rawNavBlogHide === "true" ||
          rawNavBlogHide === 1 ||
          rawNavBlogHide === "1"
        )
        data.blog_hide = data.nav_blog_hide

        if (active) setSettings(data)
      } catch (err: any) {
        if (active && err.status === 404) {
          // If no record, create one
          try {
            const record = await pb.collection("site_settings").create({
              site_name: "SpontanJualan",
            })
            if (active) setSettings(record as unknown as SiteSettings)
          } catch (createErr) {
            console.error("Gagal membuat data site_settings:", createErr)
          }
        } else {
          console.error("Gagal memuat pengaturan landing page", err)
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchData()
    return () => { active = false }
  }, [])

  const handleSave = async () => {
    if (!settings?.id) return
    setSaving(true)
    try {
      const formData = new FormData()
      
      // Header Fields
      if (settings.hero_title !== undefined) formData.append("hero_title", settings.hero_title)
      if (settings.hero_subtitle !== undefined) formData.append("hero_subtitle", settings.hero_subtitle)
      if (settings.hero_benefits !== undefined) formData.append("hero_benefits", JSON.stringify(settings.hero_benefits))

      // About Fields
      if (settings.about_title !== undefined) formData.append("about_title", settings.about_title)
      if (settings.about_subtitle !== undefined) formData.append("about_subtitle", settings.about_subtitle)
      if (settings.about_desc !== undefined) formData.append("about_desc", settings.about_desc)
      if (settings.about_checklist !== undefined) formData.append("about_checklist", JSON.stringify(settings.about_checklist))
      if (settings.about_mitra_aktif !== undefined) formData.append("about_mitra_aktif", settings.about_mitra_aktif)
      if (settings.about_pengguna_aktif !== undefined) formData.append("about_pengguna_aktif", settings.about_pengguna_aktif)
      if (settings.about_lama_kemitraan !== undefined) formData.append("about_lama_kemitraan", settings.about_lama_kemitraan)
      if (settings.about_rating !== undefined) formData.append("about_rating", settings.about_rating)
      
      if (settings.about_image instanceof File) {
        formData.append("about_image", settings.about_image)
      } else if (settings.about_image === "") {
        formData.append("about_image", "")
      }

      if (settings.about_image_path !== undefined) {
        formData.append("about_image_path", settings.about_image_path || "")
      }

      // Video Demo Fields
      if (settings.demo_title !== undefined) formData.append("demo_title", settings.demo_title)
      if (settings.demo_subtitle !== undefined) formData.append("demo_subtitle", settings.demo_subtitle)
      if (settings.video_demo_url !== undefined) formData.append("video_demo_url", settings.video_demo_url || "")

      // Produk Fields
      if (settings.produk_kicker !== undefined) formData.append("produk_kicker", settings.produk_kicker)
      if (settings.produk_title !== undefined) formData.append("produk_title", settings.produk_title)
      if (settings.produk_desc !== undefined) formData.append("produk_desc", settings.produk_desc)

      if (settings.produk_image_1 instanceof File) {
        formData.append("produk_image_1", settings.produk_image_1)
      } else if (settings.produk_image_1 === "") {
        formData.append("produk_image_1", "")
      }
      if (settings.produk_image_1_path !== undefined) {
        formData.append("produk_image_1_path", settings.produk_image_1_path || "")
      }

      if (settings.produk_fnb_title !== undefined) formData.append("produk_fnb_title", settings.produk_fnb_title)
      if (settings.produk_fnb_desc !== undefined) formData.append("produk_fnb_desc", settings.produk_fnb_desc)
      if (settings.produk_fnb_btn_label !== undefined) formData.append("produk_fnb_btn_label", settings.produk_fnb_btn_label)
      if (settings.produk_fnb_btn_link !== undefined) formData.append("produk_fnb_btn_link", settings.produk_fnb_btn_link)

      if (settings.show_produk_coming_soon !== undefined) {
        formData.append("show_produk_coming_soon", String(settings.show_produk_coming_soon))
      }
      if (settings.produk_coming_soon_title !== undefined) {
        formData.append("produk_coming_soon_title", settings.produk_coming_soon_title)
      }
      if (settings.produk_coming_soon_footer_text !== undefined) {
        formData.append("produk_coming_soon_footer_text", settings.produk_coming_soon_footer_text)
      }
      if (settings.produk_coming_soon_items !== undefined) {
        formData.append("produk_coming_soon_items", JSON.stringify(settings.produk_coming_soon_items))
      }

      if (settings.produk_banner_title !== undefined) formData.append("produk_banner_title", settings.produk_banner_title)
      if (settings.produk_banner_desc !== undefined) formData.append("produk_banner_desc", settings.produk_banner_desc)

      if (settings.produk_banner_image instanceof File) {
        formData.append("produk_banner_image", settings.produk_banner_image)
      } else if (settings.produk_banner_image === "") {
        formData.append("produk_banner_image", "")
      }
      if (settings.produk_banner_image_path !== undefined) {
        formData.append("produk_banner_image_path", settings.produk_banner_image_path || "")
      }

      // Paket Harga Fields
      if (settings.pricing_title !== undefined) formData.append("pricing_title", settings.pricing_title)
      if (settings.pricing_title2 !== undefined) formData.append("pricing_title2", settings.pricing_title2)
      if (settings.pricing_desc !== undefined) formData.append("pricing_desc", settings.pricing_desc)
      if (settings.pricing_badges !== undefined) formData.append("pricing_badges", JSON.stringify(settings.pricing_badges))
      if (settings.pricing_disclaimer !== undefined) formData.append("pricing_disclaimer", settings.pricing_disclaimer)
      if (settings.show_compare_plans !== undefined) formData.append("show_compare_plans", String(settings.show_compare_plans))
      if (settings.compare_plans_link !== undefined) formData.append("compare_plans_link", settings.compare_plans_link)
      if (settings.compare_plans_label !== undefined) formData.append("compare_plans_label", settings.compare_plans_label)
      if (settings.pricing_active_category !== undefined) formData.append("pricing_active_category", settings.pricing_active_category)
      if (settings.pricing_packages !== undefined) formData.append("pricing_packages", JSON.stringify(settings.pricing_packages))

      // Mitra Pertama Fields
      formData.append("mitra_pertama_badge", settings.mitra_pertama_badge || "100 Bisnis Pertama")
      formData.append("mitra_pertama_title", settings.mitra_pertama_title || "Bukan Sekadar Menggunakan.\nIkut Membentuk.")
      formData.append("mitra_pertama_desc", settings.mitra_pertama_desc || "Spontan Jualan membangun solusi untuk bisnis Indonesia, dimulai dari kebutuhan sehari-hari yang praktis. Pengalaman dan kebutuhan Anda akan menjadi bagian dari perjalanan kami.")

      // Cara Mulai Fields
      formData.append("cara_mulai_badge", settings.cara_mulai_badge ?? "Cara Mulai")
      formData.append("cara_mulai_title", settings.cara_mulai_title ?? "Siap Jualan dalam 3 Langkah Sederhana")
      if (settings.cara_mulai_steps !== undefined) {
        formData.append("cara_mulai_steps", JSON.stringify(settings.cara_mulai_steps))
      }

      // Feedback Customer Fields
      formData.append("feedback_title", settings.feedback_title ?? "Pesan Dari\nPengembang")
      formData.append("feedback_subtitle", settings.feedback_subtitle ?? "Dibalik Layar\nSpontan Jualan")
      if (settings.feedback_items !== undefined) {
        formData.append("feedback_items", JSON.stringify(settings.feedback_items))
      }

      // FAQ Fields
      formData.append("faq_title", settings.faq_title ?? "FAQs")
      if (settings.faq_items !== undefined) {
        formData.append("faq_items", JSON.stringify(settings.faq_items))
      }

      // Kontak & Saran Fields
      formData.append("kontak_saran_badge", settings.kontak_saran_badge || "Hubungi & Berikan Masukan")
      formData.append("kontak_saran_title", settings.kontak_saran_title || "Kontak Saran & Kritik")
      formData.append("kontak_saran_desc", settings.kontak_saran_desc || "Kami selalu terbuka untuk mendengarkan saran, kritik, dan masukan dari Anda. Karena setiap pesan dari Anda, membantu kami untuk terus berkembang dan memberikan yang terbaik.")
      formData.append("kontak_saran_info_title", settings.kontak_saran_info_title || "Buka 24 Jam / 7 Hari")
      formData.append("kontak_saran_info_desc", settings.kontak_saran_info_desc || "Anda bisa mengirimkan saran, kritik, atau pertanyaan kapan saja. Kami siap membantu")

      // Blog Fields
      formData.append("blog_title", settings.blog_title || "Insight & Tren Bisnis Terkini")
      formData.append("blog_desc", settings.blog_desc || "Temukan berbagai informasi, strategi, dan tren terbaru seputar AI, manajemen, bisnis, keuangan, dan teknologi untuk membantu bisnis Anda berkembang.")
      formData.append("nav_blog_hide", String(Boolean(settings.nav_blog_hide ?? settings.blog_hide)))

      const updatedRecord = await pb.collection("site_settings").update(settings.id, formData)
      const data = updatedRecord as unknown as SiteSettings
      if (typeof data.hero_benefits === "string") {
        try { data.hero_benefits = JSON.parse(data.hero_benefits as any) } catch { data.hero_benefits = [] }
      }
      if (typeof data.about_checklist === "string") {
        try { data.about_checklist = JSON.parse(data.about_checklist as any) } catch { data.about_checklist = [] }
      }
      if (typeof data.produk_coming_soon_items === "string") {
        try { data.produk_coming_soon_items = JSON.parse(data.produk_coming_soon_items as any) } catch { data.produk_coming_soon_items = [] }
      }
      if (typeof data.pricing_badges === "string") {
        try { data.pricing_badges = JSON.parse(data.pricing_badges as any) } catch { data.pricing_badges = [] }
      }
      if (typeof data.pricing_packages === "string") {
        try { data.pricing_packages = JSON.parse(data.pricing_packages as any) } catch { data.pricing_packages = [] }
      }
      if (typeof data.cara_mulai_steps === "string") {
        try { data.cara_mulai_steps = JSON.parse(data.cara_mulai_steps as any) } catch { data.cara_mulai_steps = [] }
      }
      if (typeof data.feedback_items === "string") {
        try { data.feedback_items = JSON.parse(data.feedback_items as any) } catch { data.feedback_items = [] }
      }
      if (typeof data.faq_items === "string") {
        try { data.faq_items = JSON.parse(data.faq_items as any) } catch { data.faq_items = [] }
      }
      const rawUpdatedShowCompare = data.show_compare_plans
      data.show_compare_plans = Boolean(
        rawUpdatedShowCompare === true ||
        rawUpdatedShowCompare === "true" ||
        rawUpdatedShowCompare === 1 ||
        rawUpdatedShowCompare === "1"
      )
      const rawUpdatedShow = data.show_produk_coming_soon
      data.show_produk_coming_soon = Boolean(
        rawUpdatedShow === true ||
        rawUpdatedShow === "true" ||
        rawUpdatedShow === 1 ||
        rawUpdatedShow === "1"
      )
      const rawUpdatedNavBlogHide: any = data.nav_blog_hide ?? data.blog_hide
      data.nav_blog_hide = Boolean(
        rawUpdatedNavBlogHide === true ||
        rawUpdatedNavBlogHide === "true" ||
        rawUpdatedNavBlogHide === 1 ||
        rawUpdatedNavBlogHide === "1"
      )
      data.blog_hide = data.nav_blog_hide
      setSettings(data)
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
        
        <h2 className="text-white font-bold mb-2 px-2 text-sm uppercase tracking-wider text-slate-500">Landing Page Utama</h2>
        
        <button
          onClick={() => setActiveMenu("lp_header")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_header" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Header / Hero
        </button>
        
        <button
          onClick={() => setActiveMenu("lp_about")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_about" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Tentang Kami
        </button>

        <button
          onClick={() => setActiveMenu("lp_video")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_video" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Video Demo
        </button>

        <button
          onClick={() => setActiveMenu("lp_produk")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_produk" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Produk Kami
        </button>

        <button
          onClick={() => setActiveMenu("lp_pricing")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_pricing" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Paket Harga
        </button>

        <button
          onClick={() => setActiveMenu("lp_mitra_pertama")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_mitra_pertama" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Mitra Pertama
        </button>

        <button
          onClick={() => setActiveMenu("lp_cara_mulai")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_cara_mulai" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Cara Mulai
        </button>

        <button
          onClick={() => setActiveMenu("lp_feedback")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_feedback" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Feedback Customer
        </button>

        <button
          onClick={() => setActiveMenu("lp_faq")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_faq" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          FAQ (Tanya Jawab)
        </button>

        <button
          onClick={() => setActiveMenu("lp_kontak")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_kontak" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Kontak & Saran
        </button>

        <button
          onClick={() => setActiveMenu("lp_berita")}
          className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
            activeMenu === "lp_berita" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Berita
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
        {activeMenu === "lp_header" && (
          <HeaderCMSContent settings={settings} setSettings={setSettings} />
        )}
        
        {activeMenu === "lp_about" && (
          <TentangKamiCMSContent settings={settings} setSettings={setSettings} />
        )}

        {activeMenu === "lp_video" && (
          <VideoDemoCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_produk" && (
          <ProdukCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_pricing" && (
          <PaketHargaCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_mitra_pertama" && (
          <MitraPertamaCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_cara_mulai" && (
          <CaraMulaiCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_feedback" && (
          <FeedbackCustomerCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_faq" && (
          <FAQCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_kontak" && (
          <KontakSaranCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}

        {activeMenu === "lp_berita" && (
          <BeritaCMSContent settings={settings} setSettings={setSettings} onSave={handleSave} isSaving={saving} />
        )}
      </div>
    </div>
  )
}

