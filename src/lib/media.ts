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
export function mediaUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  return `${MEDIA_BASE_URL}/${path.replace(/^\/+/, "")}`
}
