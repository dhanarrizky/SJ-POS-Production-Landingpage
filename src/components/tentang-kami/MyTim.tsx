import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Imports
import dhanarImage from "../../assets/team/Dhanar rizki.webp";
import rianImage from "../../assets/team/Rian alfatian.webp";
import ricardoImage from "../../assets/team/Ricardo augusto.webp";
import bagusImage from "../../assets/team/Bagus wikan.webp";

const teamData = [
  {
    id: 1,
    name: "Dhanar Rizky",
    role: "Lead",
    image: dhanarImage,
    bgColor: "bg-[#E62E2D]",
  },
  {
    id: 2,
    name: "Rian Alfatian",
    role: "QA Engineer",
    image: rianImage,
    bgColor: "bg-[#00A63F]",
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    role: "Full stack Developer",
    image: ricardoImage,
    bgColor: "bg-[#F7A800]",
  },
  {
    id: 4,
    name: "Bagus Wikan",
    role: "Full stack Developer",
    image: bagusImage,
    bgColor: "bg-[#1FB2FF]",
  },
];

export default function MyTim() {
  const [activeId, setActiveId] = useState(1);

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
    if (teamScrollRef.current) teamScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollTeamRight = () => {
    if (teamScrollRef.current) teamScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const scrollStatsLeft = () => {
    if (statsScrollRef.current) statsScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollStatsRight = () => {
    if (statsScrollRef.current) statsScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col items-center pt-[30px] bg-[#F5FFF6] overflow-hidden">

      {/* Breadcrumb */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] mb-[30px]">
        <div className="text-[12px] font-bold text-black flex items-center gap-2">
          <Link to="/" className="hover:text-[#0CAD31] transition-colors">Beranda</Link>
          <i className="fa-solid fa-chevron-right text-[10px]"></i>
          <span className="text-black">Tentang Kami</span>
        </div>
      </div>

      {/* Header Text */}
      <div className="text-center mb-[30px] px-4 max-w-[800px]">
        <h4 className="text-[#0CAD31] text-[16px] font-bold mb-[10px]">My Tim</h4>
        <h1 className="text-black text-[40px] font-bold mb-[10px] leading-tight">
          Kenalan dengan Tim Spontan Jualan
        </h1>
        <p className="text-gray-800 text-[16px] font-normal">
          Di balik Spontan Jualan, ada tim yang terus berusaha membuat pengelolaan bisnis menjadi lebih sederhana.
        </p>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-[1440px] mx-auto mb-[50px]">
        <div
          ref={teamScrollRef}
          onScroll={handleTeamScroll}
          className="flex gap-[20px] px-4 lg:px-[71px] overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-4 w-full xl:justify-center"
        >
          {teamData.map((member, idx) => {
            const isActive = activeId === member.id;
            return (
              <div
                key={member.id}
                onClick={() => setActiveId(member.id)}
                className={`relative h-[267px] rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 shadow-[10px_5px_10px_rgba(0,0,0,0.25)] shrink-0 flex snap-center ${isActive ? 'w-[367px]' : 'w-[227px]'} ${member.bgColor}`}
              >
                {/* White Social Media Bar (Only when active) */}
                {isActive && (
                  <div className="absolute left-0 bottom-0 bg-white rounded-tr-[20px] py-4 px-2 flex flex-col gap-3 z-20">
                    <a href="#" className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center">
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                    <a href="#" className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="text-black hover:text-[#0CAD31] text-lg flex items-center justify-center">
                      <i className="fa-brands fa-github"></i>
                    </a>
                  </div>
                )}

                {/* Text Info */}
                <div className={`absolute z-20 transition-all duration-500 flex flex-col top-[30px] ${isActive ? 'left-[60px] items-start' : 'left-1/2 -translate-x-1/2 items-center w-full px-2 text-center'}`}>
                  <h3 className="text-white text-[20px] font-bold leading-tight">{member.name}</h3>
                  {isActive && (
                    <p className="text-white text-[20px] font-normal leading-tight mt-1">{member.role}</p>
                  )}
                </div>

                {/* Person Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className={`absolute bottom-0 h-[85%] object-contain object-bottom transition-all duration-500 z-10 ${isActive ? 'right-0 translate-x-0' : 'right-1/2 translate-x-1/2'}`}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons for Team (Mobile/Tablet Only) */}
        <div className="w-full flex justify-end gap-3 px-4 lg:px-[71px] mt-2 xl:hidden">
          <button
            onClick={scrollTeamLeft}
            disabled={isTeamAtStart}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isTeamAtStart ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={scrollTeamRight}
            disabled={isTeamAtEnd}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isTeamAtEnd ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
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
            <div className="flex flex-col items-center text-center shrink-0 snap-center">
              <span className="text-[#0CAD31] text-[40px] font-bold">4+</span>
              <span className="text-white text-[20px] font-normal w-max max-w-[200px]">Team Members</span>
            </div>
            <div className="flex flex-col items-center text-center shrink-0 snap-center">
              <span className="text-[#0CAD31] text-[40px] font-bold">3</span>
              <span className="text-white text-[20px] font-normal w-max max-w-[200px]">Business Solutions</span>
            </div>
            <div className="flex flex-col items-center text-center shrink-0 snap-center">
              <span className="text-[#0CAD31] text-[40px] font-bold">1</span>
              <span className="text-white text-[20px] font-normal w-max max-w-[200px]">Integrated Platform</span>
            </div>
            <div className="flex flex-col items-center text-center shrink-0 snap-center">
              <span className="text-[#0CAD31] text-[40px] font-bold">100%</span>
              <span className="text-white text-[20px] font-normal w-max max-w-[200px]">Team Commitment</span>
            </div>
          </div>

          {/* Navigation Buttons for Stats (Mobile/Tablet Only) */}
          <div className="w-full flex justify-end gap-3 px-4 lg:px-[71px] mt-4 md:hidden">
            <button
              onClick={scrollStatsLeft}
              disabled={isStatsAtStart}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isStatsAtStart ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={scrollStatsRight}
              disabled={isStatsAtEnd}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isStatsAtEnd ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

