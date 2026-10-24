import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import defaultLogo from "../../assets/logo.png";
import { pb } from "../../lib/pocketbase";
import { resolveSiteLogo, resolvePartnerLogos } from "../../lib/media";
import type { SiteSettings, KenapaKamiCardItem } from "../../types/cms";

const DEFAULT_CARDS: KenapaKamiCardItem[] = [
  {
    title: "Solusi Nyata",
    desc: "Kami fokus pada kebutuhan pengguna bukan hanya fitur",
  },
  {
    title: "Kolaborasi",
    desc: "Setiap ide masukan sangat berarti",
  },
  {
    title: "Berkembang Bersama",
    desc: "Kami ingin tumbuh bersama para pengguna",
  },
];

const Partners = ({ siteSettings }: { siteSettings: any }) => {
  if (siteSettings && siteSettings.show_partners === false) return null;

  const partnerLogos = resolvePartnerLogos(siteSettings);

  return (
    <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mt-[50px]">
      {partnerLogos.length > 0 ? (
        <div className="flex w-max animate-marquee space-x-[30px] md:space-x-[50px] whitespace-nowrap px-[15px] md:px-[25px]">
          {partnerLogos.map((url: string, i: number) => (
            <div key={`logo-1-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
              <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
          {partnerLogos.map((url: string, i: number) => (
            <div key={`logo-2-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
              <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
          {partnerLogos.map((url: string, i: number) => (
            <div key={`logo-3-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
              <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
          {partnerLogos.map((url: string, i: number) => (
            <div key={`logo-4-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
              <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full items-center justify-center h-[70px]"></div>
      )}
    </div>
  );
};

interface KenapaKamiProps {
  siteSettings?: SiteSettings | null;
}

export default function KenapaKami({ siteSettings: propSettings }: KenapaKamiProps = {}) {
  const [internalSettings, setInternalSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (propSettings) return;
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((res) => setInternalSettings(res as unknown as SiteSettings))
      .catch((err) => console.error("Failed to fetch site settings:", err));
  }, [propSettings]);

  const siteSettings = propSettings || internalSettings;

  const logoImage = resolveSiteLogo(siteSettings, defaultLogo);
  const brandName = siteSettings?.site_name || "SpontanJualan";

  // Dynamic Texts
  const badgeText = siteSettings?.kenapa_kami_badge || "Kenapa Kami?";
  const titleText =
    siteSettings?.kenapa_kami_title || "Lebih dari sekedar Tim, Kami Partner untuk UMKM";
  const descText =
    siteSettings?.kenapa_kami_desc ||
    `Di balik ${brandName}, kami terus berkolaborasi untuk menciptakan solusi digital yang memudahkan UMKM dalam menjalankan dan mengembangkan usahanya.`;

  // Dynamic 3 Cards
  let cardsList: KenapaKamiCardItem[] = DEFAULT_CARDS;
  if (siteSettings?.kenapa_kami_cards) {
    if (Array.isArray(siteSettings.kenapa_kami_cards) && siteSettings.kenapa_kami_cards.length >= 3) {
      cardsList = siteSettings.kenapa_kami_cards.slice(0, 3);
    } else if (typeof siteSettings.kenapa_kami_cards === "string") {
      try {
        const parsed = JSON.parse(siteSettings.kenapa_kami_cards);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          cardsList = parsed.slice(0, 3);
        }
      } catch {
        cardsList = DEFAULT_CARDS;
      }
    }
  }

  const card1 = cardsList[0] || DEFAULT_CARDS[0];
  const card2 = cardsList[1] || DEFAULT_CARDS[1];
  const card3 = cardsList[2] || DEFAULT_CARDS[2];

  // Follows show_partners from General/SiteSettings
  const shouldShowPartners = siteSettings?.show_partners !== false;

  return (
    <section className="w-full bg-[#F5FFF6] py-[50px] font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        {/* Top Content: Text & Cards */}
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-[94px] items-center xl:items-start justify-center w-full">
          {/* Left: Text Content */}
          <div className="flex flex-col items-start text-left max-w-[600px] xl:mt-8">
            <h4 className="text-[#0CAD31] text-[16px] font-bold mb-[10px]">{badgeText}</h4>
            <h2 className="text-black text-[40px] font-bold leading-tight mb-4 whitespace-pre-line">
              {titleText}
            </h2>
            <p className="text-gray-800 text-[16px] font-normal mb-8 leading-relaxed">
              {descText}
            </p>
            <Link
              to="/"
              className="w-max px-[30px] h-[44px] bg-[#0CAD31] text-white font-bold text-[16px] rounded-full transition-all duration-300 shadow-[0px_4px_10px_rgba(12,173,49,0.3)] hover:-translate-y-1 hover:shadow-[0px_6px_15px_rgba(12,173,49,0.4)] flex items-center justify-center cursor-pointer"
            >
              Lihat Beranda
            </Link>
          </div>

          {/* Right: 3 Cards */}
          <div className="hidden lg:flex flex-col gap-[20px] w-full max-w-[614px]">
            {/* Top Row: 2 Cards */}
            <div className="flex flex-col sm:flex-row gap-[20px] justify-center xl:justify-start">
              {/* Card 1 */}
              <div className="w-full sm:w-[297px] min-h-[141px] bg-[#0CAD31] rounded-[10px] shadow-lg flex flex-col items-center justify-center p-4 text-center transition-all hover:scale-[1.02]">
                <h3 className="text-white text-[16px] font-bold mb-2 leading-tight">
                  {card1.title}
                </h3>
                <p className="text-white text-[15px] font-normal leading-snug">
                  {card1.desc}
                </p>
              </div>

              {/* Card 2 */}
              <div className="w-full sm:w-[297px] min-h-[141px] bg-[#0CAD31] rounded-[10px] shadow-lg flex flex-col items-center justify-center p-4 text-center transition-all hover:scale-[1.02]">
                <h3 className="text-white text-[16px] font-bold mb-2 leading-tight">
                  {card2.title}
                </h3>
                <p className="text-white text-[15px] font-normal leading-snug">
                  {card2.desc}
                </p>
              </div>
            </div>

            {/* Bottom Row: 1 Card Centered */}
            <div className="flex justify-center">
              <div className="w-full sm:w-[297px] min-h-[141px] bg-[#0CAD31] rounded-[10px] shadow-lg flex flex-col items-center justify-center p-4 text-center transition-all hover:scale-[1.02]">
                <h3 className="text-white text-[16px] font-bold mb-2 leading-tight">
                  {card3.title}
                </h3>
                <p className="text-white text-[15px] font-normal leading-snug">
                  {card3.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Content: Logos Marquee (Follows show_partners from General/SiteSettings) */}
      {shouldShowPartners && (
        <div className="mt-[50px] w-full animate-in fade-in duration-300">
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <span className="text-black text-[20px] font-bold text-center">
              bekerja sama dengan
            </span>
            <div className="flex items-center gap-2">
              <img src={logoImage} alt={brandName} className="h-[25px] sm:h-[30px] object-contain" />
              <span className="text-black font-bold text-[12px]">{brandName}</span>
            </div>
          </div>
          <Partners siteSettings={siteSettings} />
        </div>
      )}
    </section>
  );
}
