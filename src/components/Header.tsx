import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import logoUrl from "../assets/logo.png"
import { TwitterIcon, InstagramIcon, WhatsAppIcon, YoutubeIcon } from "./Icons"

export interface HeaderProps {
  navLinks: { label: string; href: string }[]
  siteName?: string
  siteSettings?: any
}

export default function Header({
  navLinks,
  siteName = "SpontanJualan",
  siteSettings,
}: HeaderProps) {
  const [navOpen, setNavOpen] = useState(false)

  const ctaLabel = siteSettings?.header_cta_label || "Coba Gratis"
  const ctaLink = siteSettings?.header_cta_link || "#harga"
  const loginLabel = siteSettings?.header_login_label || "Log in"
  const loginLink = siteSettings?.header_login_link || "#"
  const registerLabel = siteSettings?.header_register_label || "Daftar"
  const registerLink = siteSettings?.header_register_link || "#"
  const contactEmail = siteSettings?.contact_email || "spontan.jualan@spontan.com"

  const socialLinks = [
    { Icon: TwitterIcon, href: siteSettings?.social_twitter, label: "Twitter" },
    { Icon: InstagramIcon, href: siteSettings?.social_instagram, label: "Instagram" },
    { Icon: WhatsAppIcon, href: siteSettings?.social_whatsapp, label: "WhatsApp" },
    { Icon: YoutubeIcon, href: siteSettings?.social_youtube, label: "YouTube" },
  ]

  const getHref = (href: string) => {
    const isHome = window.location.pathname === "/"
    if (!isHome && href.startsWith("#")) {
      return "/" + href
    }
    return href
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-card">
      {/* Row 1: logo + contact email + social media */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <img
              src={logoUrl}
              alt="Spontan Jualan Logo"
              className="w-9 h-9 object-contain"
            />
            <span className="text-slate-900 font-bold text-[17px] tracking-tight">
              {siteName}
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="text-xs text-slate-500 hover:text-brand transition-colors"
            >
              {contactEmail}
            </a>
            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href || "#"}
                  aria-label={label}
                  className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: nav links + login/daftar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Desktop links */}
          <nav role="navigation" aria-label="Navigasi Utama" className="hidden lg:flex items-center">
            <ul className="flex items-center gap-0.5 m-0 p-0 list-none">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={getHref(l.href)}
                    className="text-slate-600 hover:text-brand text-sm font-medium px-3 py-2 rounded-lg hover:bg-brand-lightest transition-all"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={getHref(ctaLink)}
                  className="ml-1 inline-block text-brand hover:text-white border border-brand hover:bg-brand text-sm font-semibold px-3.5 py-1.5 rounded-full transition-all"
                >
                  {ctaLabel}
                </a>
              </li>
            </ul>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href={getHref(loginLink)}
              className="text-slate-600 hover:text-brand text-sm font-semibold px-3 py-2 transition-all"
            >
              {loginLabel}
            </a>
            <a
              href={getHref(registerLink)}
              className="text-white text-sm font-bold px-5 py-2.5 rounded-xl btn-shimmer cursor-pointer"
            >
              {registerLabel}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setNavOpen((v) => !v)}
            aria-expanded={navOpen}
            aria-label="Toggle menu navigasi"
            className="lg:hidden ml-auto p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {navOpen && (
          <nav role="navigation" aria-label="Navigasi Seluler" className="lg:hidden border-t border-slate-100 py-4">
            <ul className="space-y-1 m-0 p-0 list-none">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={getHref(l.href)}
                    onClick={() => setNavOpen(false)}
                    className="block text-slate-600 hover:text-brand text-sm font-medium px-3 py-2.5 rounded-xl hover:bg-brand-lightest transition-all"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={getHref(ctaLink)}
                  onClick={() => setNavOpen(false)}
                  className="block text-brand text-sm font-semibold px-3 py-2.5 rounded-xl border border-brand"
                >
                  {ctaLabel}
                </a>
              </li>
            </ul>
            <div className="flex gap-2 pt-3 border-t border-slate-100 mt-2">
              <a
                href={getHref(loginLink)}
                className="flex-1 text-center text-slate-700 text-sm font-semibold py-2.5 rounded-xl border border-slate-200"
              >
                {loginLabel}
              </a>
              <a
                href={getHref(registerLink)}
                className="flex-1 text-center text-white text-sm font-bold py-2.5 rounded-xl btn-shimmer"
              >
                {registerLabel}
              </a>
            </div>
            <a
              href={`mailto:${contactEmail}`}
              className="block text-center text-xs text-slate-400 mt-4 sm:hidden"
            >
              {contactEmail}
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
