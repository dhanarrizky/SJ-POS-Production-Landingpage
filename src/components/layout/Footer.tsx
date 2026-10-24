import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Mail, Phone, MapPin } from "lucide-react"
import logoUrl from "../../assets/logo.png"
import { pb } from "../../lib/pocketbase"
import { resolveSiteLogo } from "../../lib/media"
import type { SiteSettings } from "../../types/cms"

export interface FooterProps {
  siteSettings?: SiteSettings | null
}

export default function Footer({ siteSettings: propSettings }: FooterProps) {
  const [fetchedSettings, setFetchedSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    // Jika prop sudah dikirim, tidak perlu fetch lagi
    if (propSettings) return
    pb.collection("site_settings").getFirstListItem("", { sort: "-updated", requestKey: null }).then((record) => {
      setFetchedSettings(record as unknown as SiteSettings)
    }).catch(() => {})
  }, [propSettings])

  const siteSettings = propSettings || fetchedSettings
  const brandName = siteSettings?.site_name || "SpontanJualan"
  const logoImage = resolveSiteLogo(siteSettings, logoUrl)
  const tagline =
    siteSettings?.footer_tagline ||
    "Kelola Usaha Lebih Mudah. Jualan Lebih Spontan."
  const footerDesc =
    siteSettings?.footer_desc ||
    "Spontan Jualan adalah solusi digital yang dirancang untuk membantu UMKM mengelola usaha dengan lebih mudah dan terorganisir. Mulai dari transaksi, produk, stok, hingga pesanan, semuanya dibuat sederhana agar Anda bisa lebih fokus mengembangkan bisnis."
  const ctaLabel = siteSettings?.header_cta_label || "Coba Gratis"
  const ctaLink = siteSettings?.header_cta_link || "#harga"

  const contactEmail =
    siteSettings?.contact_email || "spontan.jualan@spontan.com"
  const supportPhone = siteSettings?.support_phone || "+62 822-6127-4176"
  const footerLocation =
    siteSettings?.footer_location || "Brubuh, Selatan makam brubuh rt 03/01, Ngadirojolor, Ngadirojo, Wonogiri, Jawa Tengah, Indonesia"

  const getHref = (href: string, label: string = "") => {
    const l = (label || "").toLowerCase().trim()
    if (l.includes("kebijakan privasi") && (!href || href === "#" || href.startsWith("/legal/"))) {
      return "/kebijakan-privasi"
    }
    if (l.includes("syarat") && (!href || href === "#" || href.startsWith("/legal/"))) {
      return "/syarat-ketentuan"
    }
    const isHome = window.location.pathname === "/"
    if (!isHome && href && href.startsWith("#")) {
      return "/" + href
    }
    return href || "#"
  }

  const copyright =
    siteSettings?.footer_copyright ||
    "© 2026 Spontan Jualan. Semua hak dilindungi."
  const bottomLinks =
    siteSettings?.footer_bottom_links && siteSettings.footer_bottom_links.length > 0
      ? siteSettings.footer_bottom_links
      : [
          { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
          { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
        ]

  let parsedColumns = siteSettings?.footer_columns;
  if (typeof parsedColumns === "string") {
    try {
      parsedColumns = JSON.parse(parsedColumns);
    } catch {
      parsedColumns = undefined;
    }
  }

  const defaultColumns = [
    {
      title: "Produk",
      links: [{ label: "POS F&B", href: "/produk-baru/pos-fnb" }],
    },
    {
      title: "Perusahaan",
      links: [
        { label: "Tentang Kami", href: "/tentang-kami" },
        { label: "Coba Gratis", href: "#harga" },
        { label: "Hubungi Kami", href: "#kontak" },
      ],
    },
    {
      title: "Bantuan",
      links: [
        { label: "FAQ", href: "#faq" },
        { label: "Pusat Bantuan", href: "#" },
        { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
        { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
      ],
    },
  ];

  const linkColumns = (() => {
    if (!parsedColumns || !Array.isArray(parsedColumns) || parsedColumns.length === 0) {
      return defaultColumns;
    }
    const totalLinks = parsedColumns.reduce(
      (acc: number, c: any) => acc + (Array.isArray(c?.links) ? c.links.length : 0),
      0
    );
    if (totalLinks === 0) {
      return defaultColumns;
    }
    return parsedColumns.map((c: any) => {
      if (Array.isArray(c?.links) && c.links.length > 0) {
        return c;
      }
      const matchDefault = defaultColumns.find(
        (d) => d.title.toLowerCase() === (c?.title || "").toLowerCase()
      );
      return matchDefault || c;
    });
  })();

  const contactItems = [
    { Icon: Mail, label: "Email", value: contactEmail },
    { Icon: Phone, label: "Support 24/7", value: supportPhone },
    { Icon: MapPin, label: "Lokasi", value: footerLocation },
  ]

  return (
    <footer
      id="footer"
      className="font-poppins scroll-mt-40 lg:scroll-mt-44"
    >
      {/* Top strip */}
      <div className="bg-[#12544F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-[71px] py-4 sm:py-[30px] flex flex-row items-center justify-between sm:justify-center gap-4 sm:gap-[100px]">
          <div className="flex items-center gap-3 sm:gap-6 text-left">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <img
                src={logoImage}
                alt="Spontan Jualan Logo"
                className="w-9 h-9 object-contain"
              />
              <span className="font-bold text-white text-base">
                {brandName}
              </span>
            </Link>
            <span className="hidden sm:block w-px h-8 bg-white/30" />
            <p className="hidden sm:block text-base text-white max-w-xs">
              {tagline}
            </p>
          </div>
          <a
            href={getHref("#produk")}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-[5px] bg-white hover:bg-slate-100 text-xs font-semibold text-brand transition-colors"
          >
            Produk
          </a>
        </div>
      </div>

      {/* Main body */}
      <div className="bg-[#012708]">
        <div className="max-w-7xl mx-auto px-4 sm:px-[71px] py-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            <div className="flex flex-col gap-[30px]">
              <p className="text-white text-xs leading-5 max-w-[361px]">
                {footerDesc}
              </p>
              <a
                href={getHref(ctaLink)}
                className="inline-block self-start px-[42px] py-2.5 rounded-[5px] text-xs font-semibold text-brand bg-white hover:bg-slate-100 transition-colors"
              >
                {ctaLabel}
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {linkColumns.map((col: { title: string, links: { label: string, href: string }[] }) => (
                <div key={col.title} className="flex flex-col gap-5">
                  <div className="font-bold text-white text-base">
                    {col.title}
                  </div>
                  <ul className="flex flex-col gap-5">
                    {col.links.map((l: { label: string, href: string }, idx: number) => {
                      const targetHref = getHref(l.href, l.label)
                      const isInternal = targetHref.startsWith("/") && !targetHref.includes("#")
                      return (
                        <li key={idx}>
                          {isInternal ? (
                            <Link
                              to={targetHref}
                              className="text-white hover:text-brand-light text-xs transition-colors"
                            >
                              {l.label}
                            </Link>
                          ) : (
                            <a
                              href={targetHref}
                              className="text-white hover:text-brand-light text-xs transition-colors"
                            >
                              {l.label}
                            </a>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact box */}
          <div className="bg-white rounded-[20px] py-6 px-6 sm:px-[50px] grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {contactItems.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 min-w-0">
                <span className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={20} />
                </span>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="font-bold text-slate-900 text-[14px]">
                    {label}
                  </div>
                  <div className="text-slate-800 text-[13px] leading-relaxed break-words">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full pt-8 border-t-2 border-[#D9D9D9]/30">
            <p className="text-xs font-semibold text-white">{copyright}</p>
            <div className="flex flex-wrap justify-start sm:justify-end gap-4 sm:gap-[50px]">
              {bottomLinks.map((l: { label: string; href: string }, idx: number) => {
                const targetHref = getHref(l.href, l.label)
                const isInternal = targetHref.startsWith("/") && !targetHref.includes("#")
                return isInternal ? (
                  <Link
                    key={idx}
                    to={targetHref}
                    className="text-white hover:text-brand-light text-xs transition-colors"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={idx}
                    href={targetHref}
                    className="text-white hover:text-brand-light text-xs transition-colors"
                  >
                    {l.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
