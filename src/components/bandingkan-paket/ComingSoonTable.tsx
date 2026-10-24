export default function ComingSoonTable() {
  return (
    <>
      {/* Coming Soon Section */}
      <div className="flex flex-col items-center justify-center text-center mt-[40px] mb-[60px]">
        <div className="w-[80px] h-[80px] bg-[#0CAD31]/10 rounded-full flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(12,173,49,0.15)]">
          <i className="fa-solid fa-layer-group text-[#0CAD31] text-[36px]"></i>
        </div>
        <h2 className="text-[32px] md:text-[40px] font-bold text-black leading-tight mb-4">
          Produk dan Paket<br />
          <span className="text-[#0CAD31]">Coming Soon!</span>
        </h2>
        <p className="text-[16px] font-normal text-gray-700 max-w-[600px] leading-relaxed">
          Kami sedang menyiapkan berbagai solusi digital serta rincian paket komprehensif untuk mendongkrak bisnis Anda. Nantikan pembaruan kami selanjutnya!
        </p>
      </div>

      {/* Dummy Table Skeleton/Preview */}
      <div className="w-full max-w-[1000px] mx-auto bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#D9D9D9] overflow-hidden opacity-60 pointer-events-none relative">
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10 flex items-end justify-center pb-20">
          <span className="text-[#0CAD31] font-bold text-lg bg-[#F5FFF6] px-6 py-2 rounded-full shadow-md border border-[#0CAD31]">Coming Soon</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#012708] text-white">
                <th className="p-5 font-bold border-b border-gray-700 w-1/3">Fitur</th>
                <th className="p-5 font-bold border-b border-gray-700 text-center">Basic</th>
                <th className="p-5 font-bold border-b border-gray-700 text-center">Growth</th>
                <th className="p-5 font-bold border-b border-gray-700 text-center text-[#0CAD31]">Premium</th>
                <th className="p-5 font-bold border-b border-gray-700 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100">
                <td className="p-5 font-semibold text-black">Unlimited Transaksi</td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
              </tr>
              <tr className="border-b border-gray-100 bg-[#F9F9F9]">
                <td className="p-5 font-semibold text-black">Unlimited Produk & Meja</td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-5 font-semibold text-black">Manajemen Resep & Stok</td>
                <td className="p-5 text-center"><i className="fa-solid fa-minus text-gray-300"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
              </tr>
              <tr className="border-b border-gray-100 bg-[#F9F9F9]">
                <td className="p-5 font-semibold text-black">Analisis Laba Rugi (Profit)</td>
                <td className="p-5 text-center"><i className="fa-solid fa-minus text-gray-300"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-minus text-gray-300"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="p-5 font-semibold text-black">Multi Outlet & API</td>
                <td className="p-5 text-center"><i className="fa-solid fa-minus text-gray-300"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-minus text-gray-300"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-minus text-gray-300"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-check text-[#0CAD31]"></i></td>
              </tr>
              <tr className="bg-[#F9F9F9]">
                <td className="p-5 font-semibold text-black">Dll...</td>
                <td className="p-5 text-center"><i className="fa-solid fa-ellipsis text-gray-400"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-ellipsis text-gray-400"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-ellipsis text-gray-400"></i></td>
                <td className="p-5 text-center"><i className="fa-solid fa-ellipsis text-gray-400"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
