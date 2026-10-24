import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import { mediaUrl } from "../../lib/media";
import type { SiteSettings, DariKamiItem } from "../../types/cms";

// Fallback assets
import dariDhanar from "../../assets/team/dari-dhanar.webp";
import dariRian from "../../assets/team/dari-rian.webp";
import dariRicardo from "../../assets/team/dari-ricardo.webp";
import dariBagus from "../../assets/team/dari-bagus.webp";

const DEFAULT_ITEMS: DariKamiItem[] = [
  {
    id: 1,
    name: "Dhanar Rizky",
    role: "Lead",
    image: "",
    image_path: "",
    tag: "Opsi utama",
    title: "Kami Membangun Spontan\nJualan untuk Membantu Bisnis\nAnda Tumbuh",
    description:
      "Kami percaya teknologi seharusnya membantu, bukan membuat pengelolaan usaha menjadi lebih rumit. Spontan Jualan hadir untuk memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia.",
  },
  {
    id: 2,
    name: "Rian Alfatian",
    role: "QA Engineer",
    image: "",
    image_path: "",
    tag: "Fokus Kualitas",
    title: "Kualitas adalah Prioritas\nKami untuk Pengalaman\nTerbaik",
    description:
      "Sebagai QA Engineer, tugas saya memastikan setiap fitur berjalan dengan lancar tanpa hambatan. Kami melakukan pengujian ketat agar Anda bisa menjalankan bisnis tanpa khawatir akan kendala teknis pada aplikasi.",
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    role: "Full stack Developer",
    image: "",
    image_path: "",
    tag: "Inovasi Berkelanjutan",
    title: "Sistem yang Tangguh\nuntuk Pertumbuhan\nJangka Panjang",
    description:
      "Kami mengembangkan infrastruktur yang tidak hanya cepat hari ini, tapi juga siap menghadapi skala bisnis Anda di masa depan. Teknologi yang kami bangun dirancang untuk stabil dan mudah diadaptasi.",
  },
  {
    id: 4,
    name: "Bagus Wikan",
    role: "Full stack Developer",
    image: "",
    image_path: "",
    tag: "Performa Optimal",
    title: "Kecepatan dan Keamanan\nuntuk Kenyamanan\nAnda",
    description:
      "Sebagai pengembang, fokus saya adalah memastikan sistem berjalan dengan cepat, aman, dan tanpa hambatan. Kami merancang arsitektur Spontan Jualan agar data Anda selalu terlindungi dan aplikasi merespons secara instan.",
  },
];

interface DariKamiProps {
  siteSettings?: SiteSettings | null;
}

export default function DariKami({ siteSettings: propSettings }: DariKamiProps = {}) {
  const [internalSettings, setInternalSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (propSettings) return;
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((res) => setInternalSettings(res as unknown as SiteSettings))
      .catch((err) => console.error("Gagal memuat site_settings di DariKami:", err));
  }, [propSettings]);

  const siteSettings = propSettings || internalSettings;

  // Resolve items list from CMS or default
  let itemsList: DariKamiItem[] = DEFAULT_ITEMS;
  if (siteSettings?.dari_kami_items) {
    if (Array.isArray(siteSettings.dari_kami_items) && siteSettings.dari_kami_items.length > 0) {
      itemsList = siteSettings.dari_kami_items;
    } else if (typeof siteSettings.dari_kami_items === "string") {
      try {
        const parsed = JSON.parse(siteSettings.dari_kami_items);
        if (Array.isArray(parsed) && parsed.length > 0) {
          itemsList = parsed;
        }
      } catch {
        itemsList = DEFAULT_ITEMS;
      }
    }
  }

  const [activeId, setActiveId] = useState<number | string>(() => itemsList[0]?.id || 1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper resolusi foto anggota
  const getMemberImage = (member: DariKamiItem, index: number) => {
    if (member.image) return member.image;
    if (member.image_path) return mediaUrl(member.image_path);
    if (index === 0) return dariDhanar;
    if (index === 1) return dariRian;
    if (index === 2) return dariRicardo;
    if (index === 3) return dariBagus;
    return dariDhanar;
  };

  const activeMember =
    itemsList.find((m, i) => (m.id ?? i) === activeId) || itemsList[0] || DEFAULT_ITEMS[0];
  const activeIndex = Math.max(
    0,
    itemsList.findIndex((m, i) => (m.id ?? i) === (activeMember.id ?? activeId))
  );
  const activeImage = getMemberImage(activeMember, activeIndex);

  return (
    <section className="w-full bg-[#F5FFF6] py-[50px] font-sans overflow-hidden">
      <style>{`
        .bleed-right {
          margin-right: -16px;
          padding-right: 16px;
        }
        @media (min-width: 1024px) {
          .bleed-right {
            margin-right: min(-71px, calc(-1 * ((100vw - 1440px) / 2 + 71px)));
            padding-right: max(71px, calc((100vw - 1440px) / 2 + 71px));
          }
        }
      `}</style>
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[94px] items-center lg:items-start justify-center w-full">
          
          {/* Left: Big Image */}
          <div className="flex-shrink-0">
            <img 
              src={activeImage} 
              alt={activeMember.name} 
              className="w-[415px] h-[589px] flex-shrink-0 object-cover rounded-[20px] shadow-[0_4px_50px_rgba(0,0,0,0.25)] transition-all duration-500"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col flex-1 w-full min-w-0 mt-6 lg:mt-0">
            
            {/* Top: Team Slider Cards */}
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-none pb-6 snap-x snap-mandatory bleed-right"
            >
              {itemsList.map((member, idx) => {
                const memberId = member.id ?? idx;
                const isActive = (activeMember.id ?? activeIndex) === memberId;
                const memberAvatar = getMemberImage(member, idx);

                return (
                  <div
                    key={memberId}
                    onClick={() => setActiveId(memberId)}
                    className={`flex items-center gap-[10px] flex-shrink-0 w-max h-[60px] px-[40px] rounded-[10px] cursor-pointer snap-start transition-all duration-300 ${
                      isActive 
                        ? 'border-[#0CAD31] border-[1px] bg-[#F5FFF6] shadow-sm' 
                        : 'border-[#E0E0E0] border-[1px] bg-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={memberAvatar} 
                      alt={member.name} 
                      className="w-[40px] h-[40px] min-w-[40px] flex-shrink-0 rounded-full object-cover"
                    />
                    <div className="flex flex-col whitespace-nowrap">
                      <span className="text-black text-[16px] font-bold leading-tight">{member.name}</span>
                      <span className="text-gray-800 text-[12px] font-normal leading-tight">{member.role}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle: Dynamic Story Text */}
            <div className="flex flex-col mt-4 max-w-[650px]">
              <h4 className="text-[#0CAD31] text-[14px] lg:text-[16px] font-bold mb-2 lg:mb-4">
                {activeMember.tag}
              </h4>
              <h2 className="text-black text-[28px] lg:text-[40px] font-bold leading-tight mb-2 lg:mb-4 whitespace-pre-line">
                {activeMember.title}
              </h2>
              <p className="text-gray-800 text-[14px] lg:text-[16px] font-normal mb-6 lg:mb-8 whitespace-pre-line">
                {activeMember.description}
              </p>
              
              <Link 
                to="/"
                className="w-max px-[30px] h-[40px] lg:h-[44px] bg-[#0CAD31] text-white font-bold text-[14px] lg:text-[16px] rounded-full transition-all duration-300 shadow-[0px_4px_10px_rgba(12,173,49,0.3)] hover:-translate-y-1 hover:shadow-[0px_6px_15px_rgba(12,173,49,0.4)] flex items-center justify-center"
              >
                Kenali Spontan Jualan
              </Link>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
