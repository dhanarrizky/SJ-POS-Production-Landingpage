import { useState, useRef, useEffect } from "react";
import type { SiteSettings, TeamMemberItem, TeamStatItem } from "../../types/cms";

// Default Images
import dhanarImage from "../../assets/team/Dhanar rizki.webp";
import rianImage from "../../assets/team/Rian alfatian.webp";
import ricardoImage from "../../assets/team/Ricardo augusto.webp";
import bagusImage from "../../assets/team/Bagus wikan.webp";

const DEFAULT_TEAM_DATA: TeamMemberItem[] = [
  {
    id: 1,
    name: "Dhanar Rizky",
    role: "Lead",
    image: dhanarImage,
    bgColor: "bg-[#E62E2D]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 2,
    name: "Rian Alfatian",
    role: "QA Engineer",
    image: rianImage,
    bgColor: "bg-[#00A63F]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    role: "Full stack Developer",
    image: ricardoImage,
    bgColor: "bg-[#F7A800]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 4,
    name: "Bagus Wikan",
    role: "Full stack Developer",
    image: bagusImage,
    bgColor: "bg-[#1FB2FF]",
    socials: {
      instagram: "https://instagram.com",
      tiktok: "https://tiktok.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

const DEFAULT_STATS: TeamStatItem[] = [
  { value: "4+", label: "Team Members" },
  { value: "3", label: "Business Solutions" },
  { value: "1", label: "Integrated Platform" },
  { value: "100%", label: "Team Commitment" },
];

const DEFAULT_IMAGES_BY_ID: { [key: number]: string } = {
  1: dhanarImage,
  2: rianImage,
  3: ricardoImage,
  4: bagusImage,
};

interface MyTimProps {
  siteSettings?: SiteSettings | null;
}

export default function MyTim({ siteSettings }: MyTimProps) {
  // Parsing dynamic team members
  let teamList: TeamMemberItem[] = DEFAULT_TEAM_DATA;
  if (siteSettings?.my_tim_members) {
    if (Array.isArray(siteSettings.my_tim_members) && siteSettings.my_tim_members.length > 0) {
      teamList = siteSettings.my_tim_members;
    } else if (typeof siteSettings.my_tim_members === "string") {
      try {
        const parsed = JSON.parse(siteSettings.my_tim_members);
        if (Array.isArray(parsed) && parsed.length > 0) {
          teamList = parsed;
        }
      } catch {
        teamList = DEFAULT_TEAM_DATA;
      }
    }
  }

  // Parsing dynamic team stats
  let statList: TeamStatItem[] = DEFAULT_STATS;
  if (siteSettings?.my_tim_stats) {
    if (Array.isArray(siteSettings.my_tim_stats) && siteSettings.my_tim_stats.length > 0) {
      statList = siteSettings.my_tim_stats;
    } else if (typeof siteSettings.my_tim_stats === "string") {
      try {
        const parsed = JSON.parse(siteSettings.my_tim_stats);
        if (Array.isArray(parsed) && parsed.length > 0) {
          statList = parsed;
        }
      } catch {
        statList = DEFAULT_STATS;
      }
    }
  }

  const badgeText = siteSettings?.my_tim_badge || "My Tim";
  const titleText = siteSettings?.my_tim_title || "Kenalan dengan Tim Spontan Jualan";
  const descText =
    siteSettings?.my_tim_desc ||
    "Di balik Spontan Jualan, ada tim yang terus berusaha membuat pengelolaan bisnis menjadi lebih sederhana.";

  const [activeId, setActiveId] = useState<number | string>(teamList[0]?.id || 1);

  // Slider for Team Cards
  const teamScrollRef = useRef<HTMLDivElement>(null);
  const [isTeamAtStart, setIsTeamAtStart] = useState(true);
  const [isTeamAtEnd, setIsTeamAtEnd] = useState(false);

  // Slider for Stats
  const statsScrollRef = useRef<HTMLDivElement>(null);
  const [isStatsAtStart, setIsStatsAtStart] = useState(true);
  const [isStatsAtEnd, setIsStatsAtEnd] = useState(false);

  const handleTeamScroll = () => {
    if (!teamScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
    setIsTeamAtStart(scrollLeft <= 0);
    setIsTeamAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1);
  };

  const handleStatsScroll = () => {
    if (!statsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = statsScrollRef.current;
    setIsStatsAtStart(scrollLeft <= 0);
    setIsStatsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1);
  };

  useEffect(() => {
    handleTeamScroll();
    handleStatsScroll();
    window.addEventListener("resize", handleTeamScroll);
    window.addEventListener("resize", handleStatsScroll);
    return () => {
      window.removeEventListener("resize", handleTeamScroll);
      window.removeEventListener("resize", handleStatsScroll);
    };
  }, []);

  const scrollTeamLeft = () => {
    if (teamScrollRef.current) teamScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollTeamRight = () => {
    if (teamScrollRef.current) teamScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollStatsLeft = () => {
    if (statsScrollRef.current) statsScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollStatsRight = () => {
    if (statsScrollRef.current) statsScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col items-center pt-[50px] bg-[#F5FFF6] overflow-hidden">
      {/* Header Text */}
      <div className="text-center mb-[30px] px-4 max-w-[800px]">
        <h4 className="text-[#0CAD31] text-[16px] font-bold mb-[10px]">{badgeText}</h4>
        <h1 className="text-black text-[40px] font-bold mb-[10px] leading-tight">
          {titleText}
        </h1>
        <p className="text-gray-800 text-[16px] font-normal leading-relaxed">
          {descText}
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-[1440px] mx-auto mb-[50px]">
        <div
          ref={teamScrollRef}
          onScroll={handleTeamScroll}
          className="flex gap-[20px] px-4 lg:px-[71px] overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-4 w-full xl:justify-center"
        >
          {teamList.map((member, idx) => {
            const memberId = member.id ?? idx + 1;
            const isActive = activeId === memberId;
            const memberImage =
              member.image ||
              (typeof member.id === "number" ? DEFAULT_IMAGES_BY_ID[member.id] : "") ||
              "";

            const socials = member.socials || {
              instagram: "#",
              tiktok: "#",
              linkedin: "#",
              github: "#",
            };

            return (
              <div
                key={memberId}
                onClick={() => setActiveId(memberId)}
                className={`relative h-[267px] rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 shadow-[10px_5px_10px_rgba(0,0,0,0.25)] shrink-0 flex snap-center ${
                  isActive ? "w-[367px]" : "w-[227px]"
                } ${member.bgColor || "bg-[#00A63F]"}`}
              >
                {/* White Social Media Bar (Only when active) */}
                {isActive && (
                  <div
                    className="absolute left-0 bottom-0 bg-white rounded-tr-[20px] py-4 px-2 flex flex-col gap-3 z-20 shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={socials.instagram || "#"}
                      target={socials.instagram && socials.instagram !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center transition-colors"
                      title="Instagram"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a
                      href={socials.tiktok || "#"}
                      target={socials.tiktok && socials.tiktok !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center transition-colors"
                      title="TikTok"
                    >
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                    <a
                      href={socials.linkedin || "#"}
                      target={socials.linkedin && socials.linkedin !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center transition-colors"
                      title="LinkedIn"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a
                      href={socials.github || "#"}
                      target={socials.github && socials.github !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center transition-colors"
                      title="GitHub"
                    >
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                )}

                {/* Text Info */}
                <div
                  className={`absolute z-20 transition-all duration-500 flex flex-col top-[30px] ${
                    isActive
                      ? "left-[60px] items-start"
                      : "left-1/2 -translate-x-1/2 items-center w-full px-2 text-center"
                  }`}
                >
                  <h3 className="text-white text-[20px] font-bold leading-tight drop-shadow-sm">
                    {member.name}
                  </h3>
                  {isActive && (
                    <p className="text-white text-[20px] font-normal leading-tight mt-1 drop-shadow-sm">
                      {member.role}
                    </p>
                  )}
                </div>

                {/* Person Image / Icon People Otomatis */}
                {memberImage ? (
                  <img
                    src={memberImage}
                    alt={member.name}
                    className={`absolute bottom-0 h-[85%] object-contain object-bottom transition-all duration-500 z-10 ${
                      isActive ? "right-0 translate-x-0" : "right-1/2 translate-x-1/2"
                    }`}
                  />
                ) : (
                  <div
                    className={`absolute bottom-6 flex items-center justify-center transition-all duration-500 z-10 ${
                      isActive ? "right-12" : "right-1/2 translate-x-1/2"
                    }`}
                  >
                    <div className="w-24 h-24 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-4xl shadow-md">
                      <i className="fa-solid fa-user"></i>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons for Team (Mobile/Tablet Only) */}
        <div className="w-full flex justify-end gap-3 px-4 lg:px-[71px] mt-1 xl:hidden">
          <button
            onClick={scrollTeamLeft}
            disabled={isTeamAtStart}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${
              isTeamAtStart
                ? "bg-[#0CAD31]/50 cursor-not-allowed"
                : "bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer"
            }`}
            aria-label="Scroll Team Left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={scrollTeamRight}
            disabled={isTeamAtEnd}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${
              isTeamAtEnd
                ? "bg-[#0CAD31]/50 cursor-not-allowed"
                : "bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer"
            }`}
            aria-label="Scroll Team Right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-[#042D0E] py-[50px]">
        <div className="max-w-[1440px] mx-auto">
          <div
            ref={statsScrollRef}
            onScroll={handleStatsScroll}
            className="flex px-4 lg:px-[71px] md:flex-wrap md:justify-center items-center gap-[30px] overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 md:pb-0"
          >
            {statList.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center shrink-0 snap-center min-w-[140px]"
              >
                <span className="text-[#0CAD31] text-[40px] font-bold">{stat.value}</span>
                <span className="text-white text-[20px] font-normal w-max max-w-[200px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Buttons for Stats (Mobile/Tablet Only) */}
          <div className="w-full flex justify-end gap-3 px-4 lg:px-[71px] mt-1 md:hidden">
            <button
              onClick={scrollStatsLeft}
              disabled={isStatsAtStart}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${
                isStatsAtStart
                  ? "bg-[#0CAD31]/50 cursor-not-allowed"
                  : "bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer"
              }`}
              aria-label="Scroll Stats Left"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={scrollStatsRight}
              disabled={isStatsAtEnd}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${
                isStatsAtEnd
                  ? "bg-[#0CAD31]/50 cursor-not-allowed"
                  : "bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer"
              }`}
              aria-label="Scroll Stats Right"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
