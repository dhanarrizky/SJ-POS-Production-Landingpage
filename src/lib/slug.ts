/** "Fitur Kasir!" → "fitur-kasir" */
export const toSlug = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
