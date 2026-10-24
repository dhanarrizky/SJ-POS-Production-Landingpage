// Gambar statis (hero, ilustrasi, dll.) disimpan di SeaweedFS, bukan di repo.
// Kode hanya menyimpan path RELATIF di dalam bucket; base URL dari env,
// jadi pindah domain/CDN cukup mengganti VITE_MEDIA_BASE_URL.

import { pb } from "./pocketbase"

const MEDIA_BASE_URL = (import.meta.env.VITE_MEDIA_BASE_URL || "").replace(
  /\/+$/,
  "",
)

/**
 * URL file yang diunggah lewat PocketBase (field bertipe file). Record hanya
 * menyimpan nama file; URL penuh dibangun dari storage aktif (SeaweedFS bila S3 diaktifkan).
 */
export function pbFileUrl(
  record: { id?: string; collectionId?: string; collectionName?: string } | null | undefined,
  filename?: string,
  thumb?: string,
): string {
  if (!record?.id || !record.collectionId || !filename) return ""
  return pb.files.getUrl(record as never, filename, thumb ? { thumb } : undefined)
}

/** Ubah path relatif ("detail-produk/hero-bg.webp") menjadi URL penuh. */
export function mediaUrl(path?: string | null): string {
  if (!path) return ""
  if (/^https?:\/\//i.test(path)) return path
  return `${MEDIA_BASE_URL}/${path.replace(/^\/+/, "")}`
}

/**
 * Resolusi gambar logo:
 * 1. File yang diunggah ke PocketBase/object storage (record.logo)
 * 2. Path relatif di bucket SeaweedFS (record.logo_path)
 * 3. Gambar default (fallback)
 */
export function resolveSiteLogo(
  settings: { id?: string; collectionId?: string; collectionName?: string; logo?: string; logo_path?: string } | null | undefined,
  fallback: string,
): string {
  if (!settings) return fallback
  if (settings.logo) {
    const url = pbFileUrl(settings, settings.logo)
    if (url) return url
  }
  if (settings.logo_path) {
    return mediaUrl(settings.logo_path)
  }
  return fallback
}

/**
 * Resolusi gambar Tentang Kami:
 * 1. File yang diunggah ke PocketBase/object storage (record.about_image)
 * 2. Path relatif di bucket SeaweedFS (record.about_image_path)
 * 3. Gambar default (fallback)
 */
export function resolveAboutImage(
  settings: { id?: string; collectionId?: string; collectionName?: string; about_image?: any; about_image_path?: string } | null | undefined,
  fallback: string,
): string {
  if (!settings) return fallback
  if (settings.about_image) {
    if (typeof settings.about_image === "string") {
      const url = pbFileUrl(settings, settings.about_image)
      if (url) return url
    }
  }
  if (settings.about_image_path) {
    return mediaUrl(settings.about_image_path)
  }
  return fallback
}

/**
 * Resolusi daftar logo mitra / partner:
 * 1. File yang diunggah ke PocketBase/object storage (record.partner_logos)
 * 2. Path relatif di bucket SeaweedFS (record.partner_logos_path, bisa satu path atau dipisah baris/koma)
 * 3. Array kosong jika tidak ada logo
 */
export function resolvePartnerLogos(
  settings: { id?: string; collectionId?: string; collectionName?: string; partner_logos?: string[]; partner_logos_path?: string } | null | undefined,
): string[] {
  if (!settings) return []
  
  if (Array.isArray(settings.partner_logos) && settings.partner_logos.length > 0) {
    return settings.partner_logos
      .map(filename => {
        try {
          return pb.files.getUrl(settings as any, filename)
        } catch {
          return settings.id ? `http://127.0.0.1:8090/api/files/site_settings/${settings.id}/${filename}` : ""
        }
      })
      .filter(Boolean)
  }

  if (settings.partner_logos_path) {
    return settings.partner_logos_path
      .split(/[\r\n,]+/)
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => mediaUrl(p))
  }

  return []
}

/**
 * Konversi berbagai format URL YouTube ke URL embed yang valid.
 * Contoh input:
 * - https://www.youtube.com/watch?v=BJxfee8_Q4k
 * - https://youtu.be/BJxfee8_Q4k
 * - https://www.youtube.com/embed/BJxfee8_Q4k
 * - https://www.youtube.com/shorts/BJxfee8_Q4k
 * - BJxfee8_Q4k
 */
export function getYouTubeEmbedUrl(
  url?: string,
  defaultUrl = "https://www.youtube.com/embed/BJxfee8_Q4k",
): string {
  if (!url) return defaultUrl
  const trimmed = url.trim()
  if (!trimmed) return defaultUrl

  // Sudah berupa URL embed
  if (trimmed.includes("youtube.com/embed/")) {
    return trimmed
  }

  // youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }

  // youtube.com/watch?v=<id>
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }

  // youtube.com/shorts/<id>
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`
  }

  // Jika user hanya memasukkan ID (11 karakter)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`
  }

  return trimmed
}

/**
 * Resolusi gambar Produk Utama (POS F&B):
 * 1. File yang diunggah ke PocketBase/object storage (record.produk_image_1)
 * 2. Path relatif di bucket SeaweedFS (record.produk_image_1_path)
 * 3. Gambar default (fallback)
 */
export function resolveProdukImage1(
  settings: { id?: string; collectionId?: string; collectionName?: string; produk_image_1?: any; produk_image_1_path?: string } | null | undefined,
  fallback: string,
): string {
  if (!settings) return fallback
  if (settings.produk_image_1) {
    if (typeof settings.produk_image_1 === "string") {
      const url = pbFileUrl(settings, settings.produk_image_1)
      if (url) return url
    }
  }
  if (settings.produk_image_1_path) {
    return mediaUrl(settings.produk_image_1_path)
  }
  return fallback
}

/**
 * Resolusi gambar Banner Produk Bawah:
 * 1. File yang diunggah ke PocketBase/object storage (record.produk_banner_image)
 * 2. Path relatif di bucket SeaweedFS (record.produk_banner_image_path)
 * 3. Gambar default (fallback)
 */
export function resolveProdukBannerImage(
  settings: { id?: string; collectionId?: string; collectionName?: string; produk_banner_image?: any; produk_banner_image_path?: string } | null | undefined,
  fallback: string,
): string {
  if (!settings) return fallback
  if (settings.produk_banner_image) {
    if (typeof settings.produk_banner_image === "string") {
      const url = pbFileUrl(settings, settings.produk_banner_image)
      if (url) return url
    }
  }
  if (settings.produk_banner_image_path) {
    return mediaUrl(settings.produk_banner_image_path)
  }
  return fallback
}




