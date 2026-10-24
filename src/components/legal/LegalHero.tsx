import type { LegalDoc } from "./fallbackLegal"

export interface LegalHeroProps {
  /** Dokumen yang sedang dibuka (Kebijakan Privasi / Syarat & Ketentuan) */
  doc: LegalDoc
  /** Teks biasa, mis. "16 Oktober 2026" */
  effectiveDate?: string
}

export default function LegalHero({ doc, effectiveDate }: LegalHeroProps) {
  const heading = doc.group
  return (
    // Tinggi dikunci (292px = tinggi awal hero) agar tidak berubah walau isinya diubah.
    <section className="bg-[#012708] w-full h-[292px]">
      <div className="w-full h-full max-w-[1440px] mx-auto px-4 lg:px-[71px] flex items-center">
        <div className="flex flex-col max-w-[700px]">
          <h1 className="text-white text-[32px] font-bold leading-tight mb-4">
            {heading}
          </h1>
          {effectiveDate && (
            <p className="text-white/70 text-[12px] font-normal">
              Berlaku sejak: {effectiveDate}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
