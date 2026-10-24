const CODE_MESSAGES: Record<string, string> = {
  validation_required: "wajib diisi",
  validation_not_unique: "sudah dipakai, gunakan nilai lain",
  validation_json_size_limit: "terlalu besar",
  validation_min_text_constraint: "terlalu pendek",
  validation_max_text_constraint: "terlalu panjang",
}

/** Ubah error dari PocketBase SDK jadi pesan yang terbaca per field. */
export function formatPbError(err: any, fallback = "Gagal menyimpan."): string {
  const data = err?.response?.data
  if (data && typeof data === "object") {
    const parts = Object.entries(data).map(([field, v]: [string, any]) => {
      const text = CODE_MESSAGES[v?.code] || v?.message || "tidak valid"
      return `${field}: ${text}`
    })
    if (parts.length) return parts.join("; ")
  }
  return err?.response?.message || fallback
}
