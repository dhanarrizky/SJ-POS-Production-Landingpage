export default function CaraMulai() {
  const steps = [
    {
      id: 1,
      title: "Daftar",
      description: "Buat akun Spontan Jualan dengan cepat dan mudah. Lengkapi data dasar usaha Anda untuk memulai."
    },
    {
      id: 2,
      title: "Verifikasi",
      description: "Pastikan data usaha Anda sesuai dan lakukan proses verifikasi agar akun siap digunakan."
    },
    {
      id: 3,
      title: "Pakai",
      description: "Akun siap digunakan. Kelola produk, transaksi, dan kebutuhan usaha Anda dengan lebih praktis bersama Spontan Jualan."
    }
  ];

  return (
    <section id="caramulai" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px] flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center">
          <h4 className="text-[16px] font-bold text-[#0CAD31] mb-2">Cara Mulai</h4>
          <h2 className="text-[40px] font-bold text-black leading-tight">
            Siap Jualan dalam 3 Langkah Sederhana
          </h2>
        </div>

        {/* Steps Content */}
        <div className="flex flex-col md:flex-row justify-center items-start text-center mt-[50px] gap-[30px] w-full">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center w-[210px] h-[350px] mx-auto">
              
              {/* Circle Number */}
              <div className="w-[110px] h-[110px] rounded-full bg-[#0CAD31] flex items-center justify-center mb-[30px] shadow-sm">
                <span className="text-[48px] font-bold text-white leading-none">
                  {step.id}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-[20px] font-bold text-black mb-[15px]">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-[16px] font-normal text-black leading-relaxed">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
