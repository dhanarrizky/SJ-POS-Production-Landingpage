import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/Footer";
import { Link, useLocation } from "react-router-dom";
import HeaderBerita from "../../components/berita/HeaderBerita";
import DaftarBerita from "../../components/berita/DaftarBerita";

export default function Berita() {
  const location = useLocation();
  const isFromTentangKami = location.state?.from === "tentang-kami";

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5FFF6]">
      <Navbar />
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] pt-[30px] pb-[50px]">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] font-bold text-black mb-8">
          <Link to="/" className="hover:text-[#0CAD31] transition-colors">Beranda</Link>
          <i className="fa-solid fa-chevron-right text-[10px]"></i>
          {isFromTentangKami ? (
            <>
              <Link to="/tentang-kami" className="hover:text-[#0CAD31] transition-colors">Tentang Kami</Link>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </>
          ) : null}
          <span>Blog</span>
        </div>

        {/* Hero Blog Section */}
        <HeaderBerita />

      </main>

      {/* Daftar Semua Berita - moved outside main to allow full width background */}
      <DaftarBerita />
      
      <Footer />
    </div>
  );
}
