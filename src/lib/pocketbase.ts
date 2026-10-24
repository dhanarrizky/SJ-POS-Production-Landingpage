import PocketBase from "pocketbase"

// During development, default to local PocketBase port.
// In production, connect to the origin host serving the static files.
const pbUrl =
  import.meta.env.VITE_POCKETBASE_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:8090" : window.location.origin)

export const pb = new PocketBase(pbUrl)
