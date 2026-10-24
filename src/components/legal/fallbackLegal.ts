import type { LegalPage } from "../../types/cms"

export const PRIVACY_GROUP = "Kebijakan Privasi"
export const TERMS_GROUP = "Syarat & Ketentuan"

/** Dua dokumen legal, masing-masing punya URL sendiri. `group` = nilai doc_group di CMS. */
export interface LegalDoc {
  group: string
  /** URL dasar; item pertama di grup membuka path ini, item lain path/<slug> */
  path: string
  description: string
}

export const LEGAL_DOCS: Record<"privasi" | "syarat", LegalDoc> = {
  privasi: {
    group: PRIVACY_GROUP,
    path: "/kebijakan-privasi",
    description:
      "Kami menghargai privasi Anda. Halaman ini menjelaskan bagaimana Spontan Jualan mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
  },
  syarat: {
    group: TERMS_GROUP,
    path: "/syarat-ketentuan",
    description:
      "Ketentuan yang berlaku saat Anda mendaftar dan menggunakan layanan Spontan Jualan.",
  },
}

/** URL satu item: item pertama di dokumen = path dasar, selebihnya path/<slug>. */
export function legalItemPath(doc: LegalDoc, slug: string, isFirst: boolean) {
  return isFirst ? doc.path : `${doc.path}/${slug}`
}

// Dipakai hanya bila PocketBase tidak bisa dijangkau / collection kosong,
// supaya halaman tetap tampil. Isi asli ada di CMS (legal_pages).

const items: [string, string, string][] = [
  ["kebijakan-privasi", PRIVACY_GROUP, "Pendahuluan & Ruang Lingkup"],
  ["data-yang-dikumpulkan", PRIVACY_GROUP, "Data Pribadi yang Kami Kumpulkan"],
  ["cara-pengumpulan-data", PRIVACY_GROUP, "Cara Kami Mengumpulkan Data"],
  ["tujuan-penggunaan-data", PRIVACY_GROUP, "Tujuan Penggunaan Data"],
  ["pengungkapan-data", PRIVACY_GROUP, "Pengungkapan & Berbagi Data"],
  ["penyimpanan-data", PRIVACY_GROUP, "Penyimpanan & Retensi Data"],
  ["keamanan-data", PRIVACY_GROUP, "Keamanan Data"],
  ["cookie", PRIVACY_GROUP, "Cookie & Teknologi Pelacakan"],
  ["hak-subjek-data", PRIVACY_GROUP, "Hak Anda sebagai Subjek Data"],
  ["data-anak", PRIVACY_GROUP, "Data Anak"],
  ["tautan-pihak-ketiga", PRIVACY_GROUP, "Tautan Pihak Ketiga"],
  ["perubahan-kebijakan", PRIVACY_GROUP, "Perubahan Kebijakan"],
  ["hubungi-kami-privasi", PRIVACY_GROUP, "Hubungi Kami"],
  ["syarat-ketentuan", TERMS_GROUP, "Ketentuan Umum & Definisi"],
  ["penerimaan-akun", TERMS_GROUP, "Penerimaan & Akun"],
  ["layanan-paket", TERMS_GROUP, "Layanan & Paket Langganan"],
  ["pembayaran-masa-gratis", TERMS_GROUP, "Pembayaran, Masa Gratis & Early Partner"],
  ["kewajiban-larangan", TERMS_GROUP, "Kewajiban & Larangan Pengguna"],
  ["data-merchant", TERMS_GROUP, "Data Merchant & Pelanggan Merchant"],
  ["kekayaan-intelektual", TERMS_GROUP, "Hak Kekayaan Intelektual"],
  ["batasan-tanggung-jawab", TERMS_GROUP, "Ketersediaan Layanan & Batasan Tanggung Jawab"],
  ["penangguhan-pengakhiran", TERMS_GROUP, "Penangguhan & Pengakhiran"],
  ["perubahan-syarat", TERMS_GROUP, "Perubahan Syarat"],
  ["hukum-sengketa", TERMS_GROUP, "Hukum yang Berlaku & Penyelesaian Sengketa"],
  ["hubungi-kami-syarat", TERMS_GROUP, "Hubungi Kami"],
]

export const fallbackLegal: LegalPage[] = items.map(
  ([slug, doc_group, name], i) => ({
    id: `fallback-${slug}`,
    name,
    slug,
    doc_group,
    sort_order: i + 1,
    active: true,
    title: name,
    content:
      "<p>Isi halaman ini sedang dimuat atau belum tersedia. Silakan coba lagi beberapa saat lagi atau hubungi kami.</p>",
    effective_date: "",
  }),
)
