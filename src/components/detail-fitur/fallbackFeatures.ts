import type { FeaturePage } from "../../types/cms"

// Dipakai hanya bila PocketBase tidak bisa dijangkau / collection kosong,
// supaya halaman /fitur tetap tampil. Wording asli ada di CMS (feature_pages).
const names: [string, string][] = [
  ["customer-ui", "Fitur Customer UI"],
  ["bayar-dari-meja", "Fitur Bayar dari Meja"],
  ["kasir", "Fitur Kasir"],
  ["display-kitchen", "Fitur Display Kitchen"],
  ["owner", "Fitur Owner"],
  ["laporan-penjualan", "Fitur Laporan Penjualan"],
  ["laporan-bisnis", "Fitur Laporan Bisnis"],
  ["manajemen-pengguna", "Fitur Manajemen Pengguna"],
  ["poin-bisnis", "Fitur Poin Bisnis"],
  ["manajemen-meja", "Fitur Manajemen Meja"],
  ["shift-kasir", "Fitur Shift Kasir"],
  ["deteksi-inventori", "Fitur Deteksi Inventori"],
  ["resep", "Fitur Resep"],
]

export const fallbackFeatures: FeaturePage[] = names.map(([slug, name], i) => ({
  id: `fallback-${slug}`,
  name,
  slug,
  sort_order: i + 1,
  active: true,
  title: `${name} Spontan Jualan`,
  description:
    "Kenali fitur-fitur unggulan Spontan Jualan yang membantu UMKM mengelola usaha lebih mudah dan terorganisir.",
  content: "",
  author_name: "Admin",
  published_date: "",
  quote: "",
}))
