import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ContentTentangKami from "../../assets/Content_TentangKami.webp";
import { resolveAboutImage, resolvePartnerLogos } from "../../lib/media";
function Partners({ siteSettings }: { siteSettings: any }) {
  if (siteSettings && siteSettings.show_partners === false) return null;

  const partnerLogos = resolvePartnerLogos(siteSettings);

  return (
    <section className="w-full bg-[#F5FFF6] py-[30px] md:py-[50px] font-sans overflow-hidden">
      {/* Marquee Container - full width screen with edge fade */}
      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {partnerLogos.length > 0 ? (
          <div className="flex w-max animate-marquee space-x-[30px] md:space-x-[50px] whitespace-nowrap px-[15px] md:px-[25px]">
            {partnerLogos.map((url: string, i: number) => {
              return (
                <div key={`logo-1-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
                  <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
                </div>
              );
            })}
            {partnerLogos.map((url: string, i: number) => {
              return (
                <div key={`logo-2-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
                  <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
                </div>
              );
            })}
            {/* Duplicates for ultra-wide screens to prevent clipping */}
            {partnerLogos.map((url: string, i: number) => {
              return (
                <div key={`logo-3-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
                  <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
                </div>
              );
            })}
            {partnerLogos.map((url: string, i: number) => {
              return (
                <div key={`logo-4-${i}`} className="h-[50px] md:h-[70px] flex items-center justify-center min-w-[150px] md:min-w-[200px]">
                  <img src={url} alt={`Partner ${i}`} className="max-h-full max-w-full object-contain" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center h-[70px]">
            {/* Fallback space when no logos uploaded but section is enabled */}
          </div>
        )}
      </div>
    </section>
  );
}

function TentangKamiMain({ siteSettings }: { siteSettings: any }) {
  const title = siteSettings?.about_title || "Membangun Ekosistem,\nMenghubungkan Bisnis";
  const desc = siteSettings?.about_desc || "Hadir membangun ekosistem digital untuk membantu bisnis Indonesia tumbuh, berkembang, dan terhubung dengan lebih mudah.";
  
  let checklist = [
    { title: "Teknologi Sederhana", desc: "Intuitif dan mudah digunakan untuk operasional harian." },
    { title: "Solusi Kebutuhan Nyata", desc: "Dirancang langsung dari permasalahan asli pelaku usaha." },
    { title: "Adaptasi Tanpa Rumit", desc: "Go-digital dengan mulus tanpa proses yang membingungkan." },
    { title: "Terhubung dengan Peluang", desc: "Membuka akses ke berbagai solusi untuk akselerasi bisnis." },
    { title: "Ekosistem Terintegrasi", desc: "Menyatukan bisnis, operasional, dan pelanggan dalam satu wadah." },
  ];

  if (siteSettings?.about_checklist) {
    if (Array.isArray(siteSettings.about_checklist)) {
      checklist = siteSettings.about_checklist;
    } else if (typeof siteSettings.about_checklist === "string") {
      try {
        const parsed = JSON.parse(siteSettings.about_checklist);
        if (Array.isArray(parsed) && parsed.length > 0) checklist = parsed;
      } catch (e) {}
    }
  }

  const subtitle = siteSettings?.about_subtitle || "Komitmen Kami";
  const imageUrl = resolveAboutImage(siteSettings, ContentTentangKami);

  return (
    <section id="tentang" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px] items-center">

          {/* Kiri: Teks */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-[16px] font-bold text-[#0CAD31] mb-4">{subtitle}</h4>
            <h2 className="text-[40px] font-bold text-black leading-[1.2] mb-6 whitespace-pre-line">
              {title}
            </h2>
            <p className="text-[16px] font-normal text-gray-800 mb-8 max-w-[480px] whitespace-pre-line">
              {desc}
            </p>

            <div className="flex flex-col gap-6 mb-8 w-full max-w-[480px] mx-auto lg:mx-0 text-left">
              {checklist.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#0CAD31] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <div>
                    <h5 className="text-[14px] font-bold text-black mb-1">{item.title}</h5>
                    <p className="text-[12px] font-normal text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/tentang-kami" className="inline-block bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 text-[16px] shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer">
              Tentang Kami
            </Link>
          </div>

          {/* Kanan: Gambar */}
          <div className="hidden md:flex justify-center lg:justify-end mt-10 lg:mt-0 w-full">
            <div className="w-full max-w-[561px] h-auto rounded-[40px] overflow-hidden flex items-center justify-center shadow-[0_4px_50px_rgba(0,0,0,0.25)]">
              <img src={imageUrl} alt="Solusi Digital untuk Bisnis UMKM" className="w-full h-auto object-contain" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Stats({ siteSettings }: { siteSettings: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scrollLeftBtn = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRightBtn = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[#012708] py-[50px] font-sans overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto xl:px-[71px]">
        {/* Card Container */}
        <div ref={scrollRef} onScroll={handleScroll} className="flex xl:grid xl:grid-cols-4 gap-[20px] overflow-x-auto xl:overflow-x-visible snap-x snap-mandatory scrollbar-none px-0 pb-4 xl:pb-0 w-full">

          <div className="ml-4 lg:ml-[71px] xl:ml-0 snap-start scroll-ml-4 lg:scroll-ml-[71px] xl:scroll-ml-0 shrink-0 w-[280px] md:w-[320px] xl:w-full max-w-[299px] h-[120px] md:h-[160px] bg-white rounded-xl shadow-lg flex items-center p-4 md:p-6 gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 flex items-center justify-center">
              <i className="fa-solid fa-users text-[#0CAD31] text-[30px] md:text-[40px]"></i>
            </div>
            <div>
              <div className="text-[24px] md:text-[32px] font-bold text-black leading-tight">{siteSettings?.about_mitra_aktif || "120+"}</div>
              <div className="text-[14px] md:text-[16px] font-bold text-black mt-1">Mitra Aktif</div>
              <div className="text-[10px] md:text-[12px] font-normal text-gray-600 mt-1">Bekerja sama dengan kami</div>
            </div>
          </div>

          <div className="snap-start scroll-ml-4 lg:scroll-ml-[71px] xl:scroll-ml-0 shrink-0 w-[280px] md:w-[320px] xl:w-full max-w-[299px] h-[120px] md:h-[160px] bg-white rounded-xl shadow-lg flex items-center p-4 md:p-6 gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 flex items-center justify-center">
              <i className="fa-solid fa-mobile-screen text-[#0CAD31] text-[30px] md:text-[40px]"></i>
            </div>
            <div>
              <div className="text-[24px] md:text-[32px] font-bold text-black leading-tight">{siteSettings?.about_pengguna_aktif || "1.000+"}</div>
              <div className="text-[14px] md:text-[16px] font-bold text-black mt-1">Pengguna Aktif</div>
              <div className="text-[10px] md:text-[12px] font-normal text-gray-600 mt-1">Menggunakan setiap hari</div>
            </div>
          </div>

          <div className="snap-start scroll-ml-4 lg:scroll-ml-[71px] xl:scroll-ml-0 shrink-0 w-[280px] md:w-[320px] xl:w-full max-w-[299px] h-[120px] md:h-[160px] bg-white rounded-xl shadow-lg flex items-center p-4 md:p-6 gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 flex items-center justify-center">
              <i className="fa-regular fa-calendar-check text-[#0CAD31] text-[30px] md:text-[40px]"></i>
            </div>
            <div>
              <div className="text-[24px] md:text-[32px] font-bold text-black leading-tight">{siteSettings?.about_lama_kemitraan || "1 Tahun"}</div>
              <div className="text-[14px] md:text-[16px] font-bold text-black mt-1">Bersama Mitra</div>
              <div className="text-[10px] md:text-[12px] font-normal text-gray-600 mt-1">Tumbuh dan berkembang</div>
            </div>
          </div>

          <div className="mr-4 lg:mr-[71px] xl:mr-0 snap-start scroll-ml-4 lg:scroll-ml-[71px] xl:scroll-ml-0 shrink-0 w-[280px] md:w-[320px] xl:w-full max-w-[299px] h-[120px] md:h-[160px] bg-white rounded-xl shadow-lg flex items-center p-4 md:p-6 gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 flex items-center justify-center">
              <i className="fa-regular fa-star text-[#0CAD31] text-[30px] md:text-[40px]"></i>
            </div>
            <div>
              <div className="text-[24px] md:text-[32px] font-bold text-black leading-tight">{siteSettings?.about_rating || "4.9/5"}</div>
              <div className="text-[14px] md:text-[16px] font-bold text-black mt-1">Rating Kepuasan</div>
              <div className="text-[10px] md:text-[12px] font-normal text-gray-600 mt-1">Dari para mitra kami</div>
            </div>
          </div>

        </div>

        {/* Navigation Buttons (Mobile/Tablet Only) - Moved to bottom */}
        <div className="flex justify-end gap-3 px-4 lg:px-[71px] mt-1 xl:hidden">
          <button
            onClick={scrollLeftBtn}
            disabled={isAtStart}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtStart ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={scrollRightBtn}
            disabled={isAtEnd}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtEnd ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

      </div>
    </section>
  );
}

interface TentangKamiProps {
  siteSettings?: any;
}

export default function TentangKami({ siteSettings: propSettings }: TentangKamiProps = {}) {
  const [internalSettings, setInternalSettings] = useState<any>(null);

  useEffect(() => {
    if (propSettings) return;
    import("../../lib/pocketbase").then(({ pb }) => {
      pb.collection("site_settings")
        .getFirstListItem("", { sort: "-updated", requestKey: null })
        .then((record) => setInternalSettings(record))
        .catch(() => {});
    });
  }, [propSettings]);

  const siteSettings = propSettings || internalSettings;

  return (
    <>
      <Partners siteSettings={siteSettings} />
      <TentangKamiMain siteSettings={siteSettings} />
      <Stats siteSettings={siteSettings} />
    </>
  );
}
