import { Link } from "react-router-dom";
import ContentProdukOne from "../../assets/Content_Produk_One.webp";
import ContentProdukTwo from "../../assets/Content_Produk_Two.webp";

export default function Produk() {
  return (
    <section id="produk" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">

        {/* Judul Bagian */}
        <div className="text-center mb-[50px]">
          <h4 className="text-[16px] font-bold text-[#0CAD31] mb-2">Produk Kami</h4>
          <h2 className="text-[40px] font-bold text-black leading-tight">
            Satu Platform,<br />
            Untuk Kebutuhan Usaha
          </h2>
        </div>

        {/* Produk Pertama (POS F&B) */}
        {/* Produk Pertama (POS F&B) */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-[100px] items-start mb-[50px]">
          {/* Kiri: Gambar Produk */}
          <div className="w-full max-w-[585px] shrink-0 flex justify-center lg:justify-start">
            <div className="w-full h-[300px] md:h-[450px] lg:h-[613px] rounded-[30px] overflow-hidden shadow-[0_4px_50px_rgba(0,0,0,0.25)]">
              <img src={ContentProdukOne} alt="Satu Platform Spontan Jualan" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Kanan: Penjelasan Produk */}
          <div className="flex flex-col items-start text-left w-full">
            <p className="text-[16px] font-normal text-black mb-12 max-w-[480px] leading-relaxed">
              Kami siap tumbuh bersama bisnis Anda. Temukan berbagai kebutuhan operasional dan pengelolaan usaha di dalam satu ekosistem Spontan Jualan yang terintegrasi secara utuh.
            </p>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center text-[#0CAD31]">
                    <i className="fa-solid fa-burger text-2xl"></i>
                  </div>
                  <h3 className="text-[32px] font-bold text-black">POS F&B</h3>
                </div>
                <p className="text-[16px] font-normal text-gray-800 max-w-[400px] mb-4">
                  Kasir dan operasional untuk restoran, coffee shop, kedai, dan bisnis kuliner.
                </p>

                <Link 
                  to="/produk-baru/pos-fnb"
                  className="bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold rounded-[100px] w-[202px] h-[28px] flex items-center justify-center text-[12px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer"
                >
                  Detail & Spesifikasi Produk
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ekosistem Selanjutnya (Laundry, Retail, Digital) */}
        <div className="hidden w-full max-w-[1200px] mx-auto mb-[60px]">
          <h3 className="text-[24px] md:text-[28px] font-bold text-black text-center mb-10">Solusi Bisnis Lainnya yang Akan Datang</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Laundry */}
            <div className="bg-white p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-start h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 font-bold px-4 py-1.5 rounded-bl-[16px] text-[10px] uppercase tracking-wider z-10">
                 Coming Soon
              </div>
              <div className="w-14 h-14 rounded-[14px] bg-gray-50 border border-gray-100 text-gray-400 flex items-center justify-center mb-5 group-hover:text-[#0CAD31] group-hover:bg-[#F5FFF6] transition-colors duration-300">
                <i className="fa-solid fa-shirt text-[28px]"></i>
              </div>
              <h3 className="text-[22px] font-bold text-black mb-3">Laundry</h3>
              <p className="text-[14px] font-normal text-gray-500 leading-relaxed">
                Kelola transaksi, operasional cuci-setrika, dan status pesanan laundry pelanggan dengan lebih praktis dan otomatis.
              </p>
            </div>

            {/* Retail */}
            <div className="bg-white p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-start h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 font-bold px-4 py-1.5 rounded-bl-[16px] text-[10px] uppercase tracking-wider z-10">
                 Coming Soon
              </div>
              <div className="w-14 h-14 rounded-[14px] bg-gray-50 border border-gray-100 text-gray-400 flex items-center justify-center mb-5 group-hover:text-[#0CAD31] group-hover:bg-[#F5FFF6] transition-colors duration-300">
                <i className="fa-solid fa-store text-[28px]"></i>
              </div>
              <h3 className="text-[22px] font-bold text-black mb-3">Retail</h3>
              <p className="text-[14px] font-normal text-gray-500 leading-relaxed">
                Bantu minimarket, toko kelontong, dan bisnis retail mengelola kasir, stok inventaris, dan riwayat penjualan akurat.
              </p>
            </div>

            {/* Produk Digital */}
            <div className="bg-white p-8 rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-start h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gray-200 text-gray-600 font-bold px-4 py-1.5 rounded-bl-[16px] text-[10px] uppercase tracking-wider z-10">
                 Coming Soon
              </div>
              <div className="w-14 h-14 rounded-[14px] bg-gray-50 border border-gray-100 text-gray-400 flex items-center justify-center mb-5 group-hover:text-[#0CAD31] group-hover:bg-[#F5FFF6] transition-colors duration-300">
                <i className="fa-solid fa-mobile-screen-button text-[28px]"></i>
              </div>
              <h3 className="text-[22px] font-bold text-black mb-3">Produk Digital</h3>
              <p className="text-[14px] font-normal text-gray-500 leading-relaxed">
                Berbagai solusi digital, pulsa, token, dan tagihan terpadu untuk melengkapi potensi keuntungan bisnis Anda.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
             <div className="bg-white border border-[#0CAD31]/20 shadow-md shadow-[#0CAD31]/5 text-[#012708] font-medium py-3 px-6 md:px-8 rounded-full flex items-center gap-3 text-[14px] md:text-[15px] transform transition-transform hover:-translate-y-1">
                <div className="w-8 h-8 rounded-full bg-[#E7F7E9] flex items-center justify-center text-[#0CAD31]">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <span>Lebih banyak solusi sedang kami kembangkan untuk membangun ekosistem bisnis Anda.</span>
             </div>
          </div>
        </div>

        {/* Card CTA Bawah */}
        <div className="w-full max-w-[1247px] mx-auto bg-[#012708] rounded-[20px] min-h-[262px] flex flex-col md:flex-row items-center justify-between p-8 md:px-[60px] gap-8">

          {/* Teks Card */}
          <div className="flex-1 text-white">
            <h3 className="text-[20px] font-bold mb-4">
              Ekosistem Lengkap Bisnis Anda
            </h3>
            <p className="text-[16px] font-normal leading-relaxed text-gray-200 max-w-[500px]">
              Bertransformasi dan melangkah lebih jauh bersama Spontan Jualan. Sebuah ekosistem terintegrasi yang dirancang untuk merangkul dan mendukung seluruh kebutuhan operasional bisnis Anda.
            </p>
          </div>

          {/* Gambar Card */}
          <div className="w-full md:w-[342px] h-[162px] rounded-[10px] overflow-hidden shrink-0">
            <img src={ContentProdukTwo} alt="Prioritas Kami" className="w-full h-full object-cover" />
          </div>

        </div>

      </div>
    </section>
  );
}
