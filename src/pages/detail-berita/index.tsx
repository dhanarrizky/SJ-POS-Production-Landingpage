import { useParams, Link, useLocation } from "react-router-dom"
import Navbar from "../../components/layout/Navbar"
import Footer from "../../components/Footer"
import HeaderDetailBerita from "../../components/detail-berita/HeaderDetailBerita"
import ContentDetailBerita from "../../components/detail-berita/ContentDetailBerita"

export default function DetailBerita() {
  const { slug } = useParams()
  const location = useLocation();
  const isFromTentangKami = location.state?.from === "tentang-kami";

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />
      {/* Bagian Atas: Background hijau muda */}
      <div className="bg-[#F5FFF6] w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] pt-[30px] pb-[50px]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px] font-bold text-black mb-[30px]">
            <Link to="/" className="hover:text-[#0CAD31] transition-colors">Beranda</Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            {isFromTentangKami ? (
              <>
                <Link to="/tentang-kami" className="hover:text-[#0CAD31] transition-colors">Tentang Kami</Link>
                <i className="fa-solid fa-chevron-right text-[10px]"></i>
              </>
            ) : null}
            <Link to="/berita" state={location.state} className="hover:text-[#0CAD31] transition-colors">Blog</Link>
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
            <span>Detail Blog</span>
          </div>

          {/* Header Artikel Judul */}
          <HeaderDetailBerita />
        </div>
      </div>
      
      {/* Bagian Bawah: Background putih */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] py-[50px]">
        {/* Konten Artikel */}
        <ContentDetailBerita />
      </main>

      <Footer />
    </div>
  )
}
