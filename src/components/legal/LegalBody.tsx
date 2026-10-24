import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { LegalPage } from "../../types/cms"
import { htmlToText, sanitizeHtml } from "../../lib/sanitize"
import { LEGAL_DOCS, legalItemPath, type LegalDoc } from "./fallbackLegal"

export interface LegalBodyProps {
  /** Dokumen yang sedang dibuka */
  doc: LegalDoc
  /** Item aktif milik dokumen ini, sudah terurut */
  pages: LegalPage[]
  /** Item yang sedang dibuka */
  active?: LegalPage
}

export default function LegalBody({ doc, pages, active }: LegalBodyProps) {
  const [tocOpen, setTocOpen] = useState(false)
  const hrefOf = (i: number) => legalItemPath(doc, pages[i].slug, i === 0)
  const index = pages.findIndex((p) => p.slug === active?.slug)
  const prev = index > 0 ? { page: pages[index - 1], href: hrefOf(index - 1) } : undefined
  const next =
    index >= 0 && index < pages.length - 1
      ? { page: pages[index + 1], href: hrefOf(index + 1) }
      : undefined
  // Dokumen lainnya, untuk tautan "Baca juga" di bawah konten
  const other =
    doc.group === LEGAL_DOCS.privasi.group ? LEGAL_DOCS.syarat : LEGAL_DOCS.privasi

  // Daftar isi mobile menutup sendiri setelah pindah item
  useEffect(() => {
    setTocOpen(false)
  }, [active?.slug])

  return (
    <section className="bg-[#F5FFF6] w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] py-[30px] xl:py-[50px] flex flex-col xl:flex-row gap-6 xl:gap-[60px]">
        {/* Daftar isi mobile/tablet: tombol yang membuka daftar di dalam halaman */}
        <div className="xl:hidden">
          <span className="block text-[14px] font-bold text-black mb-2">
            Daftar Isi
          </span>
          <button
            type="button"
            aria-expanded={tocOpen}
            aria-controls="legal-toc"
            onClick={() => setTocOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 rounded-[5px] bg-[#0CAD31] px-4 py-3 text-left text-white cursor-pointer"
          >
            <span className="min-w-0 flex flex-col">
              <span className="text-[11px] font-normal text-white/80">
                {index >= 0 ? `${index + 1} dari ${pages.length}` : doc.group}
              </span>
              <span className="text-[14px] font-semibold leading-snug">
                {active?.name ?? doc.group}
              </span>
            </span>
            <i
              className={`fa-solid fa-chevron-down text-[12px] shrink-0 transition-transform ${
                tocOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            ></i>
          </button>
          {tocOpen && (
            <ul
              id="legal-toc"
              className="mt-2 max-h-[60vh] overflow-y-auto rounded-[5px] bg-[#0CAD31] px-4 py-1"
            >
              {pages.map((page, i) => {
                const isActive = page.slug === active?.slug
                return (
                  <li
                    key={page.id}
                    className={i !== pages.length - 1 ? "border-b border-white/40" : ""}
                  >
                    <Link
                      to={hrefOf(i)}
                      onClick={() => setTocOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block py-3 text-[14px] leading-snug ${
                        isActive
                          ? "font-bold text-[#E6F7E9] underline"
                          : "font-medium text-white"
                      }`}
                    >
                      {page.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Sidebar desktop: tetap terlihat saat membaca teks panjang */}
        <nav
          aria-label={`Daftar isi ${doc.group}`}
          className="hidden xl:block w-[260px] shrink-0 xl:sticky xl:top-24 xl:self-start xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto"
        >
          <h3 className="text-[14px] font-bold text-black mb-[15px] uppercase tracking-wide">
            {doc.group}
          </h3>
          <div className="bg-[#0CAD31] rounded-[5px] px-[20px] py-[5px] flex flex-col">
            {pages.map((page, i) => {
              const isActive = page.slug === active?.slug
              return (
                <div
                  key={page.id}
                  className={`py-[13px] ${
                    i !== pages.length - 1 ? "border-b border-white/50" : ""
                  }`}
                >
                  <Link
                    to={hrefOf(i)}
                    aria-current={isActive ? "page" : undefined}
                    className={`block text-[12px] hover:underline transition-colors ${
                      isActive
                        ? "text-[#E6F7E9] font-bold underline"
                        : "text-white font-medium"
                    }`}
                  >
                    {page.name}
                  </Link>
                </div>
              )
            })}
          </div>
        </nav>

        {/* Konten */}
        <article className="flex-1 min-w-0 max-w-[760px]">
          <h2 className="text-[24px] font-bold text-black leading-tight mb-[20px]">
            {htmlToText(active?.title) || active?.name}
          </h2>
          <div
            className="rich-content font-poppins text-[14px] leading-relaxed text-slate-700 mb-[40px]"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(active?.content) }}
          />

          {(prev || next) && (
            <div className="flex flex-col sm:flex-row justify-between gap-3 border-t border-[#0CAD31]/30 pt-[20px]">
              {prev ? (
                <Link
                  to={prev.href}
                  className="group flex flex-col self-start text-left max-w-full sm:max-w-[48%]"
                >
                  <span className="text-[11px] text-gray-500">Sebelumnya</span>
                  <span className="text-[13px] font-semibold text-[#0CAD31] group-hover:underline">
                    ← {prev.page.name}
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next && (
                <Link
                  to={next.href}
                  className="group flex flex-col self-end text-right max-w-full sm:max-w-[48%]"
                >
                  <span className="text-[11px] text-gray-500">Berikutnya</span>
                  <span className="text-[13px] font-semibold text-[#0CAD31] group-hover:underline">
                    {next.page.name} →
                  </span>
                </Link>
              )}
            </div>
          )}

          <p className="mt-[30px] text-[12px] text-gray-500">
            Baca juga:{" "}
            <Link
              to={other.path}
              className="font-semibold text-[#0CAD31] hover:underline"
            >
              {other.group}
            </Link>
          </p>
        </article>
      </div>
    </section>
  )
}
