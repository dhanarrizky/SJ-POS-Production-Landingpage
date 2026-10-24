// Konten halaman detail produk (/produk-baru/pos-fnb) yang bisa diedit dari
// dashboard. Disimpan di `site_settings` (field JSON dp_*). Nilai bawaan di
// bawah = teks asli halaman, dipakai bila CMS belum diisi.

import { mediaUrl, pbFileUrl } from "./media"
import type { SiteSettings } from "../types/cms"

export interface DpHero {
  badge: string
  title: string
  desc: string
  btn_label: string
  btn_link: string
}

export interface DpFitur {
  badge: string
  title: string
  btn_label: string
  btn_link: string
}

export interface DpDapur {
  badge: string
  title: string
  desc: string
  // Tepat 3 kartu (ikon tetap: Monitor, Timer, BarChart3)
  kds_items: { title: string; desc: string }[]
  seating_title: string
  seating_desc: string
  // Tepat 2 kartu statistik
  seating_stats: { value: string; label: string; desc: string }[]
}

export interface DpMargin {
  badge: string
  title: string
  desc: string
  tags: string[]
}

export interface DpSections {
  dp_hero: DpHero
  dp_fitur: DpFitur
  dp_dapur: DpDapur
  dp_margin: DpMargin
}

export type DpKey = keyof DpSections
export type DpImageField = "dp_hero_image" | "dp_dapur_image" | "dp_margin_image"

export const DP_DEFAULTS: DpSections = {
  dp_hero: {
    badge: "POS F&B",
    title: "Operasional Restoran & Kafe Jadi Lebih Cepat, Akurat, dan Rapi",
    desc: "Dirancang Khusus untuk bisnis kuliner agar pelayanan lebih cepat dan operasional lebih rapih",
    btn_label: "Jelajahi Paket",
    btn_link: "/bandingkan-paket",
  },
  dp_fitur: {
    badge: "Spesifikasi dan Fitur",
    title: "Fitur Spesifikasi Bisnis Restoran, Kafe, dan Food Court",
    btn_label: "Lihat Semua Fitur",
    btn_link: "/fitur",
  },
  dp_dapur: {
    badge: "Fasilitas Dapur Modern",
    title: "Modernisasi Dapur Anda",
    desc: "Tingkatkan performa dengan sistem Tampilan Dapur (Kitchen Display System) ramping. Ganti tiket kertas yang beranatakan",
    kds_items: [
      { title: "Tanpa Kertas", desc: "Layar tahan air dan panas untuk tiket" },
      {
        title: "Alur Lebih Baik",
        desc: "Pewaktu waktu nyata (real-time timers) melacak kecepatan memasak",
      },
      { title: "Wawasan & Data", desc: "Metrik kinerja dalam sekejap" },
    ],
    seating_title: "Optimalkan Tempat Duduk Tamu",
    seating_desc: "Kelola meja secara dinamis dan cegah konflik pemesanan",
    seating_stats: [
      {
        value: "0 Menit",
        label: "Antrean Minimal",
        desc: "Waktu tunggu kasir mengecek ketersediaan meja",
      },
      {
        value: "100%",
        label: "Sinkronisasi Penuh",
        desc: "Reservasi selalu disinkronkan",
      },
    ],
  },
  dp_margin: {
    badge: "Akurasi Finansial & Margin Laba",
    title: "Bahan Baku Terkunci, Margin Keuntungan Transparan",
    desc: "Ketahui persis berapa biaya modal tiap porsi menu dengan fitur Recipe Engineering. Sistem Spontan Jualan otomatis menghitung perubahan HPP saat harga telur, minyak, atau daging di pasar naik.",
    tags: ["Peringatan Menipis Otomatis", "Pencatatan Waste & Bahan Kadaluarsa"],
  },
}

// Gambar bawaan (path relatif di bucket SeaweedFS) bila belum ada unggahan.
export const DP_DEFAULT_IMAGES: Record<DpImageField, string> = {
  dp_hero_image: "detail-produk/hero-bg.webp",
  dp_dapur_image: "detail-produk/kitchen-modernization.webp",
  dp_margin_image: "detail-produk/value-coins.webp",
}

type SettingsLike = Partial<SiteSettings> | null | undefined

function parseJson(v: unknown): Record<string, unknown> {
  if (typeof v === "string") {
    try {
      v = JSON.parse(v)
    } catch {
      return {}
    }
  }
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {}
}

/** Gabungkan data CMS dengan nilai bawaan; field yang belum ada memakai bawaan. */
export function dpSection<K extends DpKey>(
  settings: SettingsLike,
  key: K,
): DpSections[K] {
  const d = DP_DEFAULTS[key] as unknown as Record<string, unknown>
  const v = parseJson(settings?.[key])
  const out: Record<string, unknown> = { ...d, ...v }
  // Daftar berukuran tetap: gabung per indeks supaya kartu tidak pernah hilang.
  for (const k of ["kds_items", "seating_stats"]) {
    if (Array.isArray(d[k])) {
      const given = Array.isArray(v[k]) ? (v[k] as Record<string, unknown>[]) : []
      out[k] = (d[k] as Record<string, unknown>[]).map((item, i) => ({
        ...item,
        ...given[i],
      }))
    }
  }
  if (Array.isArray(d.tags) && !Array.isArray(v.tags)) out.tags = d.tags
  return out as unknown as DpSections[K]
}

/** URL gambar: file unggahan dari dashboard, lalu gambar bawaan. */
export function dpImage(settings: SettingsLike, field: DpImageField): string {
  const file = settings?.[field]
  const uploaded =
    typeof file === "string" && file ? pbFileUrl(settings as SiteSettings, file) : ""
  return uploaded || mediaUrl(DP_DEFAULT_IMAGES[field])
}
