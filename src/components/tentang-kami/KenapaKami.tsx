import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Assuming logo exists here

const Partners = () => {
  const logos = [
    <div key="bca" className="h-[50px] md:h-[70px] flex items-center justify-center font-bold text-[#0066AE] text-xl md:text-3xl italic min-w-[150px] md:min-w-[200px]">BCA</div>,
    <div key="jnt" className="h-[50px] md:h-[70px] flex items-center justify-center font-bold text-[#E31E24] text-xl md:text-3xl italic min-w-[180px] md:min-w-[250px]">J&T EXPRESS</div>,
    <div key="tokopedia" className="h-[50px] md:h-[70px] flex items-center justify-center font-bold text-[#42B549] text-xl md:text-3xl min-w-[150px] md:min-w-[200px]">tokopedia</div>,
    <div key="tiket" className="h-[50px] md:h-[70px] flex items-center justify-center font-bold text-[#0064D2] text-xl md:text-3xl min-w-[150px] md:min-w-[200px]">tiket<span className="text-[#FFD100] px-1">●</span>com</div>,
    <div key="kawanlama" className="h-[50px] md:h-[70px] flex items-center justify-center font-bold text-gray-800 text-lg md:text-xl text-center leading-tight min-w-[150px] md:min-w-[200px]">Kawan Lama<br />GROUP</div>,
    <div key="traveloka" className="h-[50px] md:h-[70px] flex items-center justify-center font-bold text-[#1BA0E2] text-xl md:text-3xl min-w-[150px] md:min-w-[200px]">traveloka</div>
  ];

  return (
    <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mt-[50px]">
      <div className="flex w-max animate-marquee space-x-[30px] md:space-x-[50px] whitespace-nowrap px-[15px] md:px-[25px]">
        {logos.map((logo, i) => <div key={`logo-1-${i}`}>{logo}</div>)}
        {logos.map((logo, i) => <div key={`logo-2-${i}`}>{logo}</div>)}
        {logos.map((logo, i) => <div key={`logo-3-${i}`}>{logo}</div>)}
        {logos.map((logo, i) => <div key={`logo-4-${i}`}>{logo}</div>)}
      </div>
    </div>
  );
};

export default function KenapaKami() {
  return (
    <section className="w-full bg-[#F5FFF6] py-[50px] font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">

        {/* Top Content: Text & Cards */}
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-[94px] items-center xl:items-start justify-center w-full">

          {/* Left: Text Content */}
          <div className="flex flex-col items-start text-left max-w-[600px] xl:mt-8">
            <h4 className="text-[#0CAD31] text-[16px] font-bold mb-[10px]">Kenapa Kami?</h4>
            <h2 className="text-black text-[40px] font-bold leading-tight mb-4 whitespace-pre-line">
              Lebih dari sekedar Tim, Kami Partner untuk UMKM
            </h2>
            <p className="text-gray-800 text-[16px] font-normal mb-8">
              Di balik Spontan Jualan, kami terus berkolaborasi untuk menciptakan solusi digital yang memudahkan UMKM dalam menjalankan dan mengembangkan usahanya.
            </p>
            <Link
              to="/"
              className="w-max px-[30px] h-[44px] bg-[#0CAD31] text-white font-bold text-[16px] rounded-full transition-all duration-300 shadow-[0px_4px_10px_rgba(12,173,49,0.3)] hover:-translate-y-1 hover:shadow-[0px_6px_15px_rgba(12,173,49,0.4)] flex items-center justify-center"
            >
              Lihat Beranda
            </Link>
          </div>

          {/* Right: Cards */}
          <div className="hidden lg:flex flex-col gap-[20px] w-full max-w-[614px]">
            {/* Top Row: 2 Cards */}
            <div className="flex flex-col sm:flex-row gap-[20px] justify-center xl:justify-start">
              {/* Card 1 */}
              <div className="w-full sm:w-[297px] h-[141px] bg-[#0CAD31] rounded-[10px] shadow-lg flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white text-[16px] font-bold mb-2">Solusi Nyata</h3>
                <p className="text-white text-[16px] font-normal leading-tight">Kami fokus pada kebutuhan pengguna bukan hanya fitur</p>
              </div>

              {/* Card 2 */}
              <div className="w-full sm:w-[297px] h-[141px] bg-[#0CAD31] rounded-[10px] shadow-lg flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white text-[16px] font-bold mb-2">Kolaborasi</h3>
                <p className="text-white text-[16px] font-normal leading-tight">Setiap ide masukan sangat berarti</p>
              </div>
            </div>

            {/* Bottom Row: 1 Card Centered */}
            <div className="flex justify-center">
              <div className="w-full sm:w-[297px] h-[141px] bg-[#0CAD31] rounded-[10px] shadow-lg flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white text-[16px] font-bold mb-2">Berkembang Bersama</h3>
                <p className="text-white text-[16px] font-normal leading-tight">Kami ingin tumbuh bersama para pengguna</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Content: Logos Marquee */}
      <div className="mt-[50px] w-full">
        <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <span className="text-black text-[20px] font-bold text-center">bekerja sama dengan</span>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Spontan Jualan" className="h-[25px] sm:h-[30px] object-contain" />
            <span className="text-black font-bold text-[12px]">SpontanJualan</span>
          </div>
        </div>
        <Partners />
      </div>
    </section>
  );
}
