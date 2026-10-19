export default function KontakSaran() {
  return (
    <section id="kontak" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-center gap-[50px] lg:gap-[100px]">
          
          {/* Kiri: Form Card */}
          <div className="w-full lg:w-1/2 max-w-[556px] bg-[#012708] rounded-[20px] p-[40px] lg:p-[50px] flex flex-col shadow-2xl mx-auto lg:mx-0">
            <form className="flex flex-col gap-[20px] w-full" onSubmit={(e) => e.preventDefault()}>
              
              {/* Nama Anda */}
              <div className="flex flex-col gap-2">
                <label className="text-white">
                  <span className="text-[16px] font-bold">Nama Anda</span>{" "}
                  <span className="text-[12px] font-normal text-gray-300">(Opsional)</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Masukan Nama Anda" 
                  className="w-full h-[50px] bg-white rounded-[8px] px-4 text-[12px] font-normal text-black outline-none focus:ring-2 focus:ring-[#0CAD31]" 
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-white">
                  <span className="text-[16px] font-bold">Email</span>{" "}
                  <span className="text-[12px] font-normal text-gray-300">(Opsional)</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Masukan Email Aktif" 
                  className="w-full h-[50px] bg-white rounded-[8px] px-4 text-[12px] font-normal text-black outline-none focus:ring-2 focus:ring-[#0CAD31]" 
                />
              </div>

              {/* Saran / Pesan */}
              <div className="flex flex-col gap-2">
                <label className="text-white">
                  <span className="text-[16px] font-bold">Saran / Pesan <span className="text-red-500">*</span></span>
                </label>
                <textarea 
                  placeholder="Tuliskan masukan Anda disini..." 
                  className="w-full min-h-[160px] bg-white rounded-[8px] p-4 text-[12px] font-normal text-black outline-none focus:ring-2 focus:ring-[#0CAD31] resize-none"
                  required
                ></textarea>
              </div>

              {/* Button */}
              <div className="flex justify-end w-full mt-4">
                <button 
                  type="submit"
                  className="w-[219px] h-[44px] bg-[#0CAD31] text-white font-bold text-[16px] rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer"
                >
                  Kirim Masukan 
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>

            </form>
          </div>

          {/* Kanan: Teks & Info Card */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-start">
            
            <h4 className="text-[16px] font-bold text-[#0CAD31] mb-2">
              Hubungi & Berikan Masukan
            </h4>
            
            <h2 className="text-[40px] font-bold text-black mb-6 leading-tight">
              Kontak Saran & Kritik
            </h2>
            
            <p className="text-[16px] font-normal text-black mb-[50px] leading-relaxed max-w-[600px]">
              Kami selalu terbuka untuk mendengarkan saran, kritik, dan masukan dari Anda. Karena setiap pesan dari Anda, membantu kami untuk terus berkembang dan memberikan yang terbaik.
            </p>

            {/* Info Card */}
            <div className="border border-[#0CAD31] rounded-[10px] py-[20px] px-4 md:px-[30px] flex items-center gap-4 md:gap-6 bg-[#F5FFF6] w-full max-w-[550px] shadow-sm">
              
              {/* Icon */}
              <div className="text-[#0CAD31] text-[40px] flex-shrink-0">
                <i className="fa-solid fa-headset"></i>
              </div>
              
              {/* Garis Lurus (Divider) */}
              <div className="h-[60px] w-[1px] bg-[#0CAD31] flex-shrink-0"></div>
              
              {/* Text Info */}
              <div className="flex flex-col justify-center">
                <h5 className="text-[16px] font-bold text-[#0CAD31] mb-1">
                  Buka 24 Jam / 7 Hari
                </h5>
                <p className="text-[12px] font-normal text-black leading-relaxed">
                  Anda bisa mengirimkan saran, kritik, atau pertanyaan kapan saja. Kami siap membantu
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
