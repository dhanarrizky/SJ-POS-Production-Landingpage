/**
 * Convert a YouTube watch / youtu.be / embed URL into an embed URL.
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url)
    let id = ""
    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1)
    } else if (u.pathname.startsWith("/embed/")) {
      return url
    } else {
      id = u.searchParams.get("v") || ""
    }
    return id ? `https://www.youtube.com/embed/${id}` : null
  } catch {
    return null
  }
}

/**
 * Parse browser and OS name from a User-Agent string.
 */
export type DeviceType = "mobile" | "tablet" | "desktop"

export function getDeviceType(ua: string): DeviceType {
  if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) return "tablet"
  if (/mobi|iphone|ipod|android/i.test(ua)) return "mobile"
  return "desktop"
}

function randomId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function getStoredId(storage: "localStorage" | "sessionStorage", key: string) {
  try {
    const store = window[storage]
    let id = store.getItem(key)
    if (!id) {
      id = randomId()
      store.setItem(key, id)
    }
    return id
  } catch {
    return ""
  }
}

/** ID anonim per browser (untuk menghitung pengunjung unik). */
export const getVisitorId = () => getStoredId("localStorage", "sj_visitor_id")

/** ID anonim per sesi tab (untuk menghitung sesi). */
export const getSessionId = () => getStoredId("sessionStorage", "sj_session_id")

/** Host referrer eksternal; kosong jika direct atau dari situs sendiri. */
export function getExternalReferrer(): string {
  try {
    if (!document.referrer) return ""
    const url = new URL(document.referrer)
    return url.host === window.location.host ? "" : url.host
  } catch {
    return ""
  }
}

export function parseUserAgent(ua: string): { browser: string; os: string } {
  let browser = "Lainnya"
  let os = "Lainnya"

  if (
    /chrome|crios/i.test(ua) &&
    !/edge|edg/i.test(ua) &&
    !/opr|opios/i.test(ua)
  )
    browser = "Chrome"
  else if (/firefox|fxios/i.test(ua)) browser = "Firefox"
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = "Safari"
  else if (/edge|edg/i.test(ua)) browser = "Edge"
  else if (/opr|opios/i.test(ua)) browser = "Opera"

  if (/windows/i.test(ua)) os = "Windows"
  else if (/android/i.test(ua)) os = "Android"
  else if (/ipad|iphone|ipod/i.test(ua)) os = "iOS"
  else if (/macintosh/i.test(ua)) os = "macOS"
  else if (/linux/i.test(ua)) os = "Linux"

  return { browser, os }
}
