export interface SiteSettings {
  id: string
  site_name: string
  site_title?: string
  site_description?: string
  cta_title?: string
  cta_sub?: string
  social_twitter?: string
  social_instagram?: string
  social_whatsapp?: string
  social_youtube?: string
  brands?: string[]
  header_menu?: NavLink[]
  hero_pill?: string
  hero_title?: string
  hero_title_highlight?: string
  hero_subtitle?: string
  hero_benefits?: string[]
  hero_cta_label?: string
  hero_cta_link?: string
  about_title?: string
  about_desc?: string
  about_checklist?: { title: string; desc: string }[]
  demo_title?: string
  demo_subtitle?: string
  video_demo_url?: string
  produk_title?: string
  produk_desc?: string
  produk_banner_title?: string
  produk_banner_desc?: string
  pricing_title?: string
  pricing_title2?: string
  pricing_desc?: string
  pricing_badges?: string[]
  pricing_disclaimer?: string
  cara_mulai_title?: string
  cara_mulai_steps?: { title: string; desc: string }[]
  feedback_title?: string
  feedback_subtitle?: string
  blog_title?: string
  blog_desc?: string
  footer_desc?: string
  footer_tagline?: string
  footer_columns?: FooterColumn[]
  header_cta_label?: string
  header_cta_link?: string
  header_login_label?: string
  header_login_link?: string
  header_register_label?: string
  header_register_link?: string
  contact_email?: string
  footer_copyright?: string
  footer_bottom_links?: NavLink[]
  footer_status_text?: string
  footer_app_links?: { app_store?: string; google_play?: string }
  cta_whatsapp_url?: string
  show_trust_marquee?: boolean
  show_about_stats?: boolean
  about_mitra_aktif?: string
  about_pengguna_aktif?: string
  about_lama_kemitraan?: string
  about_rating?: string
  show_compare_plans?: boolean
  compare_plans_link?: string
  support_phone?: string
  footer_location?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  desc?: string
  icon?: string
  badge?: string
  badge_class?: string
  icon_bg?: string
  span2?: boolean
  features?: string[]
  detail_desc?: string
  specs?: Record<string, string>
  seo_title?: string
  seo_description?: string
  active?: boolean
  login_url?: string
  accent_color?: string
  emoji?: string
}

export interface PricingPlan {
  id: string
  tier: string
  sub?: string
  monthly?: number
  annual?: number
  label?: string
  period?: string
  featured?: boolean
  cta?: string
  checkout_link?: string
  access_note?: string
  upgrade_note?: string
  badge?: string
  perks?: string[]
  active?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  loc?: string
  initials?: string
  bg?: string
  quote?: string
  active?: boolean
}

export interface Suggestion {
  id: string
  name?: string
  email?: string
  message: string
  created: string
}

export interface PageView {
  id: string
  path: string
  user_agent?: string
  ip?: string
  country?: string
  region?: string
  city?: string
  browser?: string
  os?: string
  referrer?: string
  device?: "mobile" | "tablet" | "desktop"
  visitor_id?: string
  session_id?: string
  created: string
}

export interface NavLink {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export interface VideoItem {
  id: string
  /** Kunci penempatan, mis. "home", "produk:<slug>", "fitur:<slug>" */
  placement: string
  title?: string
  subtitle?: string
  youtube_url?: string
  active?: boolean
}

/** Kartu "Spesifikasi dan Fitur" di halaman detail produk */
export interface ProductHighlight {
  id: string
  collectionId?: string
  collectionName?: string
  label?: string
  title: string
  description?: string
  /** Teks tombol hijau */
  button_label?: string
  /** Tujuan tombol: /fitur/<feature_slug> (kosong → /fitur) */
  feature_slug?: string
  /** Nama file gambar yang diunggah dari dashboard (relatif; utama bila ada) */
  image?: string
  /** Path RELATIF gambar di SeaweedFS, mis. "detail-produk/feature-satset.webp" (cadangan) */
  image_path?: string
  sort_order?: number
  active?: boolean
}

export interface FeaturePage {
  id: string
  /** Label di sidebar "Keunggulan Fitur" */
  name: string
  /** Bagian URL: /fitur/<slug> */
  slug: string
  sort_order?: number
  active?: boolean
  /** Teks biasa (data lama mungkin HTML, dibersihkan lewat htmlToText) */
  title?: string
  /** Teks biasa, boleh multi-baris */
  description?: string
  /** HTML dari editor Tiptap */
  content?: string
  author_name?: string
  published_date?: string
  quote?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  sort_order?: number
  active?: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  cover_image?: string
  published_date?: string
  content?: string
  active?: boolean
  created?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  initial?: string
  color?: string
  sort_order?: number
}
