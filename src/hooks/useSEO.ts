import { useEffect } from "react"

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  robots?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

export const SITE_NAME = "Spontan Jualan"

/** Format judul halaman: "Spontan Jualan — {nama halaman}" */
export function pageTitle(name?: string) {
  return name ? `${SITE_NAME} — ${name}` : SITE_NAME
}

export function useSEO({
  title,
  description,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title
    }

    // Helpers
    const setMetaTag = (name: string, content: string | undefined, isProperty = false) => {
      const attrName = isProperty ? "property" : "name"
      if (!content) {
        const existing = document.querySelector(`meta[${attrName}="${name}"]`)
        if (existing) existing.remove()
        return
      }
      let meta = document.querySelector(`meta[${attrName}="${name}"]`)
      if (!meta) {
        meta = document.createElement("meta")
        meta.setAttribute(attrName, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute("content", content)
    }

    const setLinkTag = (rel: string, href: string | undefined) => {
      if (!href) {
        const existing = document.querySelector(`link[rel="${rel}"]`)
        if (existing) existing.remove()
        return
      }
      let link = document.querySelector(`link[rel="${rel}"]`)
      if (!link) {
        link = document.createElement("link")
        link.setAttribute("rel", rel)
        document.head.appendChild(link)
      }
      link.setAttribute("href", href)
    }

    // 2. Primary Meta Tags
    setMetaTag("description", description)
    setMetaTag("robots", robots)
    setLinkTag("canonical", canonical)

    // 3. OpenGraph
    setMetaTag("og:title", ogTitle || title, true)
    setMetaTag("og:description", ogDescription || description, true)
    setMetaTag("og:image", ogImage, true)
    setMetaTag("og:url", ogUrl || (canonical || window.location.href), true)
    setMetaTag("og:type", ogType, true)

    // 4. Twitter
    setMetaTag("twitter:card", twitterCard)
    setMetaTag("twitter:title", twitterTitle || ogTitle || title)
    setMetaTag("twitter:description", twitterDescription || ogDescription || description)
    setMetaTag("twitter:image", twitterImage || ogImage)

    // Cleanup: we don't necessarily want to purge general metadata, but we should make sure
    // page-specific details like custom robots or product OG details are cleaned up or updated next time.
  }, [
    title,
    description,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
  ])
}

