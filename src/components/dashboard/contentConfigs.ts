import type { CollectionManagerProps } from "./CollectionManager"
import type { FieldDef } from "./ui/types"

type ManagerConfig = CollectionManagerProps

const linkCols = [
  { key: "label", label: "Teks" },
  { key: "href", label: "Alamat (mis. /#faq)" },
]

// ------------------------------------------------------------ Paket Harga
export const pricingConfig: ManagerConfig = {
  collection: "pricing_plans",
  title: "Paket Harga",
  noun: "paket",
  sort: "created",
  defaults: { active: true, monthly: 0 },
  listLabel: (r) => r.tier,
  listSub: (r) =>
    `Rp${Number(r.monthly || 0).toLocaleString("id-ID")} ${r.period || ""}`.trim(),
  description:
    "Perubahan di sini tampil di Home dan halaman detail produk. Urutan tampil mengikuti waktu pembuatan.",
  fields: [
    { key: "tier", label: "Nama paket", type: "text", required: true, half: true, placeholder: "Premium" },
    { key: "sub", label: "Sub-judul", type: "text", half: true },
    { key: "monthly", label: "Harga (Rp)", type: "number", half: true },
    { key: "period", label: "Periode", type: "text", half: true, placeholder: "/3 Bln" },
    { key: "cta", label: "Teks tombol", type: "text", half: true, placeholder: "Pilih Paket" },
    { key: "checkout_link", label: "Link checkout", type: "url", half: true, placeholder: "https://…" },
    { key: "access_note", label: "Catatan akses", type: "textarea" },
    { key: "upgrade_note", label: "Catatan upgrade", type: "textarea" },
    { key: "perks", label: "Keuntungan paket", type: "stringList", placeholder: "Mis. Hingga 3 kasir" },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// -------------------------------------------------------------------- FAQ
export const faqConfig: ManagerConfig = {
  collection: "faqs",
  title: "FAQ",
  noun: "pertanyaan",
  sort: "sort_order",
  defaults: { active: true },
  listLabel: (r) => r.question,
  listSub: (r) => `Urutan ${r.sort_order ?? "-"}`,
  fields: [
    { key: "question", label: "Pertanyaan", type: "text", required: true },
    { key: "answer", label: "Jawaban", type: "textarea", required: true, rows: 8, hint: "Pisahkan paragraf dengan baris kosong." },
    { key: "sort_order", label: "Urutan", type: "number", half: true },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// -------------------------------------------------------------- Testimoni
export const testimonialsConfig: ManagerConfig = {
  collection: "testimonials",
  title: "Testimoni",
  noun: "testimoni",
  sort: "created",
  defaults: { active: true },
  listLabel: (r) => r.name,
  listSub: (r) => [r.role, r.loc].filter(Boolean).join(" • "),
  fields: [
    { key: "name", label: "Nama", type: "text", required: true, half: true },
    { key: "role", label: "Jabatan / usaha", type: "text", half: true },
    { key: "loc", label: "Lokasi", type: "text", half: true },
    { key: "initials", label: "Inisial", type: "text", half: true, placeholder: "AB" },
    { key: "bg", label: "Warna latar avatar", type: "color", half: true },
    { key: "quote", label: "Kutipan", type: "textarea", rows: 5 },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// ------------------------------------------------------------------ Video
export const videosConfig: ManagerConfig = {
  collection: "videos",
  title: "Video",
  noun: "video",
  sort: "placement",
  defaults: { active: true },
  listLabel: (r) => r.placement,
  listSub: (r) => r.title || "",
  description:
    "Placement menentukan di mana video tampil: produk:<slug> untuk detail produk, fitur:<slug> untuk detail fitur (juga bisa diatur dari menu Konten Fitur), home untuk cadangan.",
  fields: [
    { key: "placement", label: "Placement", type: "text", required: true, placeholder: "produk:pos-fnb" },
    { key: "title", label: "Judul", type: "text", half: true },
    { key: "youtube_url", label: "Link YouTube", type: "url", half: true, placeholder: "https://www.youtube.com/watch?v=…" },
    { key: "subtitle", label: "Deskripsi", type: "textarea", rows: 4 },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// ---------------------------------------------- Sorotan Produk (kartu fitur)
export const highlightsConfig: ManagerConfig = {
  collection: "product_highlights",
  title: "Sorotan Produk",
  noun: "kartu",
  sort: "sort_order,created",
  defaults: { active: true, sort_order: 1 },
  listLabel: (r) => r.title,
  listSub: (r) => (r.feature_slug ? `→ /fitur/${r.feature_slug}` : "→ /fitur"),
  description:
    "Kartu \"Spesifikasi dan Fitur\" di halaman detail produk. Tombol hijau pada kartu menuju halaman fitur sesuai slug.",
  fields: [
    { key: "label", label: "Label kecil", type: "text", half: true, placeholder: "Fitur Utama" },
    { key: "title", label: "Judul kartu", type: "text", required: true, half: true, placeholder: "Sat Set" },
    { key: "description", label: "Deskripsi", type: "textarea", rows: 4 },
    { key: "button_label", label: "Teks tombol", type: "text", half: true, placeholder: "Kasir siap melayani tanpa antrean" },
    { key: "feature_slug", label: "Slug halaman fitur tujuan", type: "slug", half: true, placeholder: "kasir", hint: "Harus sama dengan slug di menu Konten Fitur (mis. kasir, resep). Tombol menuju /fitur/<slug>; kosong = daftar fitur." },
    { key: "image", label: "Unggah gambar", type: "image", half: true, hint: "JPG/PNG/WebP, maks. 5 MB. Diunggah saat klik Simpan dan menggantikan Path gambar di bawah." },
    { key: "image_path", label: "Path gambar (cadangan)", type: "text", half: true, placeholder: "detail-produk/feature-satset.webp", hint: "Path RELATIF di bucket SeaweedFS, bukan URL penuh. Dipakai hanya jika tidak ada gambar yang diunggah." },
    { key: "sort_order", label: "Urutan", type: "number", half: true },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// ------------------------------------------------------------------- Blog
export const blogConfig: ManagerConfig = {
  collection: "blog_posts",
  title: "Blog",
  noun: "artikel",
  sort: "-created",
  defaults: { active: true },
  listLabel: (r) => r.title,
  listSub: (r) => r.category || "",
  fields: [
    { key: "title", label: "Judul", type: "text", required: true },
    { key: "slug", label: "Slug (URL: /blog/…)", type: "slug", required: true, half: true },
    { key: "category", label: "Kategori", type: "text", half: true },
    { key: "published_date", label: "Tanggal terbit", type: "text", half: true, placeholder: "29 September 2026" },
    { key: "cover_image", label: "Gambar sampul (URL)", type: "url", half: true, hint: "Halaman blog saat ini belum menampilkan gambar sampul." },
    { key: "excerpt", label: "Ringkasan", type: "textarea", rows: 3 },
    { key: "content", label: "Isi artikel (markdown)", type: "markdown", rows: 16 },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// ------------------------------------------------------------------ Legal
export const legalConfig: ManagerConfig = {
  collection: "legal_pages",
  title: "Halaman Legal",
  noun: "bagian",
  sort: "sort_order,created",
  defaults: { active: true, doc_group: "Kebijakan Privasi" },
  description:
    "Satu baris = satu item di sidebar. Grup \"Kebijakan Privasi\" tampil di /kebijakan-privasi, grup \"Syarat & Ketentuan\" di /syarat-ketentuan; item dengan urutan terkecil di tiap grup adalah halaman utamanya. Teks bertanda [ISI: …] wajib dilengkapi, dan seluruh isi sebaiknya ditinjau pihak yang memahami hukum sebelum dipublikasikan.",
  listLabel: (r) => r.name,
  listSub: (r) => `${r.doc_group || "-"} · ${r.slug}`,
  fields: [
    { key: "name", label: "Nama di sidebar", type: "text", required: true, half: true },
    { key: "slug", label: "Slug (URL: /kebijakan-privasi/… atau /syarat-ketentuan/…)", type: "slug", required: true, half: true, hint: "Item pertama tiap grup dibuka lewat alamat dasarnya (tanpa slug), jadi link footer tidak bergantung pada slug." },
    { key: "doc_group", label: "Grup di sidebar", type: "text", required: true, half: true, hint: "Tulis persis: Kebijakan Privasi atau Syarat & Ketentuan. Nama lain tidak akan tampil di halaman mana pun." },
    { key: "sort_order", label: "Urutan", type: "number", half: true, hint: "Kecil tampil lebih dulu di sidebar masing-masing grup." },
    { key: "title", label: "Judul di atas isi", type: "text", hint: "Kosong = memakai nama di sidebar." },
    { key: "effective_date", label: "Tanggal berlaku", type: "text", placeholder: "16 Oktober 2026", hint: "Ditampilkan di hero sebagai “Berlaku sejak”." },
    { key: "content", label: "Isi (editor)", type: "richtext" },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// ----------------------------------------------------------------- Produk
export const productsConfig: ManagerConfig = {
  collection: "products",
  title: "Produk",
  noun: "produk",
  sort: "created",
  defaults: { active: true },
  listLabel: (r) => r.name,
  listSub: (r) => `/product/${r.slug}`,
  fields: [
    { key: "name", label: "Nama produk", type: "text", required: true, half: true },
    { key: "slug", label: "Slug (URL: /product/…)", type: "slug", required: true, half: true, hint: "Beranda mengharapkan slug pos-retail, pos-fnb, pos-laundry untuk kartu produk utama." },
    { key: "desc", label: "Deskripsi singkat", type: "textarea", rows: 3 },
    { key: "emoji", label: "Emoji", type: "text", half: true },
    { key: "icon", label: "Ikon (cadangan bila emoji kosong)", type: "text", half: true, placeholder: "Zap" },
    { key: "accent_color", label: "Warna aksen", type: "color", half: true },
    { key: "login_url", label: "Link login produk", type: "url", half: true, placeholder: "https://…" },
    { key: "detail_desc", label: "Deskripsi detail (markdown)", type: "markdown", rows: 12 },
    {
      key: "specs",
      label: "Spesifikasi",
      type: "keyValue",
      suggestions: ["paket", "produk_limit", "transaksi_limit", "kasir_limit", "super_admin", "paket_lain", "subtitle", "benefit"],
      hint: "Kunci subtitle dan benefit dipakai sebagai teks pendamping, bukan kartu spesifikasi.",
    },
    { key: "seo_title", label: "Judul SEO", type: "text", half: true },
    { key: "seo_description", label: "Deskripsi SEO", type: "textarea", rows: 3 },
    { key: "active", label: "Aktif (tampil di halaman publik)", type: "bool" },
  ] as FieldDef[],
}

// ------------------------------------------------------ Pengaturan Situs
export interface SiteSection {
  id: string
  title: string
  fields: FieldDef[]
}

export const siteSections: SiteSection[] = [
  {
    id: "meta",
    title: "Umum & SEO",
    fields: [
      { key: "site_name", label: "Nama situs", type: "text", required: true, half: true },
      { key: "site_title", label: "Judul halaman (SEO)", type: "text", half: true },
      { key: "site_description", label: "Deskripsi (SEO)", type: "textarea" },
    ],
  },
  {
    id: "header",
    title: "Header & Kontak",
    fields: [
      { key: "header_menu", label: "Menu navigasi", type: "objectList", columns: linkCols },
      { key: "header_cta_label", label: "Tombol utama: teks", type: "text", half: true },
      { key: "header_cta_link", label: "Tombol utama: link", type: "text", half: true },
      { key: "header_login_label", label: "Login: teks", type: "text", half: true },
      { key: "header_login_link", label: "Login: link", type: "text", half: true },
      { key: "header_register_label", label: "Daftar: teks", type: "text", half: true },
      { key: "header_register_link", label: "Daftar: link", type: "text", half: true },
      { key: "contact_email", label: "Email kontak", type: "text", half: true },
      { key: "social_twitter", label: "Link Twitter/X", type: "url", half: true },
      { key: "social_instagram", label: "Link Instagram", type: "url", half: true },
      { key: "social_whatsapp", label: "Link WhatsApp", type: "url", half: true },
      { key: "social_youtube", label: "Link YouTube", type: "url", half: true },
      { key: "cta_whatsapp_url", label: "Link WhatsApp untuk tombol CTA (detail produk)", type: "url" },
    ],
  },
  {
    id: "hero",
    title: "Hero",
    fields: [
      { key: "hero_title", label: "Judul", type: "text", half: true },
      { key: "hero_title_highlight", label: "Judul (bagian berwarna)", type: "text", half: true },
      { key: "hero_subtitle", label: "Sub-judul", type: "textarea" },
      { key: "hero_benefits", label: "Poin keuntungan", type: "stringList" },
      { key: "hero_cta_label", label: "Tombol: teks", type: "text", half: true },
      { key: "hero_cta_link", label: "Tombol: link", type: "text", half: true },
    ],
  },
  {
    id: "about",
    title: "Tentang Kami & Mitra",
    fields: [
      { key: "about_title", label: "Judul", type: "text" },
      { key: "about_desc", label: "Deskripsi", type: "textarea", rows: 4 },
      {
        key: "about_checklist",
        label: "Daftar keunggulan",
        type: "objectList",
        columns: [
          { key: "title", label: "Judul" },
          { key: "desc", label: "Deskripsi", multiline: true },
        ],
      },
      { key: "show_trust_marquee", label: "Tampilkan baris logo mitra", type: "bool" },
      { key: "brands", label: "Nama mitra / brand", type: "stringList" },
      { key: "show_about_stats", label: "Tampilkan angka statistik", type: "bool" },
      { key: "about_mitra_aktif", label: "Mitra aktif", type: "text", half: true, placeholder: "120+" },
      { key: "about_pengguna_aktif", label: "Pengguna aktif", type: "text", half: true, placeholder: "1.000+" },
      { key: "about_lama_kemitraan", label: "Lama kemitraan", type: "text", half: true, placeholder: "1 Tahun" },
      { key: "about_rating", label: "Rating", type: "text", half: true, placeholder: "4.9/5" },
    ],
  },
  {
    id: "video",
    title: "Video Demo (Beranda)",
    fields: [
      { key: "demo_title", label: "Judul", type: "text" },
      { key: "demo_subtitle", label: "Deskripsi", type: "textarea", rows: 4 },
      { key: "video_demo_url", label: "Link YouTube", type: "url", placeholder: "https://www.youtube.com/watch?v=…" },
    ],
  },
  {
    id: "produk",
    title: "Bagian Produk",
    fields: [
      { key: "produk_title", label: "Judul", type: "text" },
      { key: "produk_desc", label: "Deskripsi", type: "textarea" },
      { key: "produk_banner_title", label: "Judul banner", type: "text" },
      { key: "produk_banner_desc", label: "Deskripsi banner", type: "textarea" },
    ],
  },
  {
    id: "pricing",
    title: "Bagian Harga (teks)",
    fields: [
      { key: "pricing_title", label: "Judul", type: "text", half: true },
      { key: "pricing_title2", label: "Judul baris kedua", type: "text", half: true },
      { key: "pricing_desc", label: "Deskripsi", type: "textarea" },
      { key: "pricing_disclaimer", label: "Catatan kaki", type: "textarea" },
      { key: "pricing_badges", label: "Lencana jaminan", type: "stringList" },
      { key: "show_compare_plans", label: "Tampilkan link bandingkan paket", type: "bool" },
      { key: "compare_plans_link", label: "Link bandingkan paket", type: "text" },
    ],
  },
  {
    id: "steps",
    title: "Cara Mulai",
    fields: [
      { key: "cara_mulai_title", label: "Judul", type: "text" },
      {
        key: "cara_mulai_steps",
        label: "Langkah",
        type: "objectList",
        columns: [
          { key: "title", label: "Judul langkah" },
          { key: "desc", label: "Deskripsi", multiline: true },
        ],
      },
    ],
  },
  {
    id: "feedback",
    title: "Testimoni & Blog (teks bagian)",
    fields: [
      { key: "feedback_title", label: "Testimoni: judul", type: "text", half: true },
      { key: "feedback_subtitle", label: "Testimoni: sub-judul", type: "text", half: true },
      { key: "blog_title", label: "Blog: judul", type: "text", half: true },
      { key: "blog_desc", label: "Blog: deskripsi", type: "textarea" },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    fields: [
      { key: "footer_tagline", label: "Tagline", type: "text" },
      { key: "footer_desc", label: "Deskripsi", type: "textarea" },
      { key: "footer_columns", label: "Kolom link", type: "footerColumns" },
      { key: "footer_bottom_links", label: "Link bawah", type: "objectList", columns: linkCols },
      { key: "footer_copyright", label: "Hak cipta", type: "text" },
      { key: "support_phone", label: "Telepon bantuan", type: "text", half: true },
      { key: "footer_location", label: "Lokasi", type: "text", half: true },
    ],
  },
]
