export interface ProdukEkosistemItem {
  icon?: string
  title: string
  desc: string
  badge?: string
  link?: string
  show?: boolean | string | number
}

export interface PricingPackageItem {
  id?: string
  label: string
  title: string
  currency?: string
  price: string
  period?: string
  access?: string
  subText?: string
  isPopular?: boolean
  btnLabel?: string
  btnLink?: string
  features: string[]
  show?: boolean | string | number
  productCategory?: string
}

export interface SiteSettings {
  id: string
  collectionId?: string
  collectionName?: string
  site_name: string
  logo?: string
  logo_path?: string
  site_title?: string
  site_description?: string
  cta_title?: string
  cta_sub?: string
  social_twitter?: string
  social_instagram?: string
  social_whatsapp?: string
  social_youtube?: string
  social_links?: { platform: string; url: string }[]
  brands?: string[]
  partner_logos?: string[] // Used for multi-file upload
  partner_logos_path?: string // Relative SeaweedFS path (fallback if no uploaded files)
  show_partners?: boolean
  header_menu?: NavLink[]
  hero_pill?: string
  hero_title?: string
  hero_title_highlight?: string
  hero_subtitle?: string
  hero_benefits?: string[]
  hero_cta_label?: string
  hero_cta_link?: string
  about_title?: string
  about_subtitle?: string
  about_desc?: string
  about_image?: string | File | null
  about_image_path?: string
  about_checklist?: { title: string; desc: string }[]
  demo_title?: string
  demo_subtitle?: string
  video_demo_url?: string
  produk_kicker?: string
  produk_title?: string
  produk_desc?: string
  produk_image_1?: string | File | null
  produk_image_1_path?: string
  produk_fnb_title?: string
  produk_fnb_desc?: string

  produk_fnb_btn_label?: string
  produk_fnb_btn_link?: string
  show_produk_coming_soon?: boolean | string | number
  produk_coming_soon_title?: string
  produk_coming_soon_footer_text?: string
  produk_coming_soon_items?: ProdukEkosistemItem[]
  produk_banner_title?: string
  produk_banner_desc?: string
  produk_banner_image?: string | File | null
  produk_banner_image_path?: string
  pricing_title?: string
  pricing_title2?: string
  pricing_desc?: string
  pricing_badges?: string[]
  pricing_disclaimer?: string
  show_compare_plans?: boolean | string | number
  compare_plans_link?: string
  compare_plans_label?: string
  pricing_active_category?: string
  pricing_packages?: PricingPackageItem[]
  mitra_pertama_badge?: string
  mitra_pertama_title?: string
  mitra_pertama_desc?: string
  cara_mulai_badge?: string
  cara_mulai_title?: string
  cara_mulai_steps?: CaraMulaiStep[]
  feedback_title?: string
  feedback_subtitle?: string
  feedback_items?: FeedbackCustomerItem[]
  faq_title?: string
  faq_items?: FAQItem[]
  kontak_saran_badge?: string
  kontak_saran_title?: string
  kontak_saran_desc?: string
  kontak_saran_info_title?: string
  kontak_saran_info_desc?: string
  blog_title?: string
  blog_desc?: string
  blog_hide?: boolean

  footer_desc?: string
  footer_tagline?: string
  footer_columns?: FooterColumn[]
  header_cta_label?: string
  header_cta_link?: string
  header_login_label?: string
  header_login_link?: string
  header_register_label?: string
  header_register_link?: string
  
  // Navbar specific CMS
  nav_tentang_kami_text?: string
  nav_tentang_kami_hide?: boolean
  nav_produk_text?: string
  nav_produk_hide?: boolean
  nav_harga_text?: string
  nav_harga_hide?: boolean
  nav_cara_mulai_text?: string
  nav_cara_mulai_hide?: boolean
  nav_faq_text?: string
  nav_faq_hide?: boolean
  nav_blog_text?: string
  nav_blog_hide?: boolean
  nav_coba_gratis_text?: string
  nav_coba_gratis_hide?: boolean
  
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
  support_phone?: string
  footer_location?: string

  // My Tim CMS
  my_tim_badge?: string
  my_tim_title?: string
  my_tim_desc?: string
  my_tim_members?: TeamMemberItem[] | string
  my_tim_stats?: TeamStatItem[] | string

  // Kenapa Kami CMS
  kenapa_kami_badge?: string
  kenapa_kami_title?: string
  kenapa_kami_desc?: string
  kenapa_kami_btn_label?: string
  kenapa_kami_btn_link?: string
  kenapa_kami_cards?: KenapaKamiCardItem[] | string

  // Dari Kami CMS
  dari_kami_items?: DariKamiItem[] | string

  // Detail Produk CMS (bentuk: lib/detailProduk.ts)
  dp_hero?: unknown
  dp_fitur?: unknown
  dp_dapur?: unknown
  dp_margin?: unknown
  dp_hero_image?: string | File | null
  dp_dapur_image?: string | File | null
  dp_margin_image?: string | File | null
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

/** Satu item sidebar di halaman /kebijakan-privasi atau /syarat-ketentuan (menurut doc_group) */
export interface LegalPage {
  id: string
  /** Label di sidebar */
  name: string
  /** Bagian URL: /<halaman>/<slug>; item pertama tiap grup dibuka lewat alamat dasar halaman */
  slug: string
  /** Judul grup di sidebar, mis. "Kebijakan Privasi" */
  doc_group: string
  sort_order?: number
  active?: boolean
  /** Judul di atas isi (teks biasa) */
  title?: string
  /** HTML dari editor Tiptap */
  content?: string
  /** Teks biasa, mis. "16 Oktober 2026" */
  effective_date?: string
}

export interface FAQItem {
  id?: string | number
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
  cover_image_path?: string
  published_date?: string
  content?: string
  author_name?: string
  author_role?: string
  author_avatar?: string
  author_quote?: string
  active?: boolean
  created?: string
  updated?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  initial?: string
  color?: string
  sort_order?: number
}

export interface CaraMulaiStep {
  title: string
  description?: string
  desc?: string
}

export interface FeedbackCustomerItem {
  id?: number | string
  name: string
  title: string
  quote: string
  location?: string
  image?: string
  image_path?: string
  rating?: number
}

export interface TeamSocialLinks {
  instagram?: string
  tiktok?: string
  linkedin?: string
  github?: string
}

export interface TeamMemberItem {
  id?: string | number
  name: string
  role: string
  image?: string
  image_path?: string
  bgColor?: string
  socials?: TeamSocialLinks
}

export interface TeamStatItem {
  value: string
  label: string
}

export interface KenapaKamiCardItem {
  id?: number | string
  title: string
  desc: string
}

export interface DariKamiItem {
  id?: number | string
  name: string
  role: string
  image?: string
  image_path?: string
  tag?: string
  title?: string
  description?: string
}


