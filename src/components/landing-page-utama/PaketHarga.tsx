import React, { useRef, useState, useEffect } from "react";

export default function PaketHarga() {
  const packages = [
    {
      label: "BASIC",
      title: "Semua Kebutuhan Kasir",
      currency: "Rp",
      price: "0",
      period: "/Bln",
      access: "Sempurna untuk mulai usaha",
      subText: "Gunakan Spontan Jualan selamanya tanpa biaya langganan bulanan.",
      isPopular: false,
      features: [
        "Unlimited transaksi",
        "Unlimited produk",
        "Unlimited meja",
        "Order by table",
        "Payment",
        "Receipt",
        "Basic inventory",
        "Sales report"
      ]
    },
    {
      label: "GROWTH",
      title: "Operasional Terorganisir",
      currency: "Rp",
      price: "25.000",
      period: "/Bln",
      access: "Untuk bisnis yang berkembang",
      subText: "Cocok untuk tingkatkan kecepatan pelayanan dan operasional dapur.",
      isPopular: true,
      features: [
        "Semua fitur Basic",
        "Kitchen Display",
        "Recipe & bahan baku",
        "Stock management",
        "Customer management",
        "Multi-user",
        "Custom roles",
        "Promotion"
      ]
    },
    {
      label: "PREMIUM",
      title: "Insight & Pengembangan",
      currency: "Rp",
      price: "50.000",
      period: "/Bln",
      access: "Analisis bisnis mendalam",
      subText: "Untuk bisnis yang ingin mengoptimalkan margin dan loyalitas pelanggan.",
      isPopular: false,
      features: [
        "Semua fitur Growth",
        "Profit & COGS",
        "Advanced analytics",
        "Advanced reports",
        "Loyalty",
        "Customer insights",
        "Advanced promotion",
        "Automation"
      ]
    },
    {
      label: "ENTERPRISE",
      title: "Operasional Kompleks",
      currency: "Rp",
      price: "75.000",
      period: "/Bln",
      access: "Skala bisnis besar & kompleks",
      subText: "Hubungi kami untuk penyesuaian khusus dan integrasi eksternal.",
      isPopular: false,
      features: [
        "Semua fitur Premium",
        "Multi-outlet",
        "Centralized management",
        "API",
        "Integration",
        "Custom permission",
        "Custom workflow",
        "Dedicated support"
      ]
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section id="harga" className="w-full bg-[#F5FFF6] py-[50px] font-sans overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center xl:px-[71px]">

        {/* Header Texts */}
        <div className="flex flex-col items-center text-center gap-[20px] mb-[40px] px-4 lg:px-[71px] xl:px-0">
          <h2 className="text-[32px] md:text-[40px] font-bold text-black leading-tight">
            Mulai GRATIS Tanpa Batas<br />
            Pilih Paket Sesuai Pertumbuhan Anda
          </h2>
          <p className="text-[16px] font-normal text-black max-w-[700px] leading-relaxed">
            Spontan Jualan (F&B) tidak membatasi jumlah meja dan transaksi. Fitur pencetak omzet selalu gratis, Anda hanya bayar untuk alat operasional yang lebih canggih.
          </p>

          {/* Bullet points */}
          <div className="flex flex-wrap justify-center gap-[30px] items-center">
            <div className="flex items-center gap-[10px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#0CAD31]"></div>
              <span className="text-[16px] font-normal text-black">Unlimited Transaksi</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#0CAD31]"></div>
              <span className="text-[16px] font-normal text-black">Unlimited Meja & Produk</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="w-[10px] h-[10px] rounded-full bg-[#0CAD31]"></div>
              <span className="text-[16px] font-normal text-black">Batalkan Kapan Saja</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div ref={scrollRef} onScroll={handleScroll} className="flex xl:grid xl:grid-cols-4 gap-[20px] lg:gap-[30px] xl:gap-[40px] overflow-x-auto xl:overflow-x-visible snap-x snap-mandatory scrollbar-none px-0 pt-[20px] xl:pt-[24px] pb-10 xl:pb-0 w-full items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`snap-start scroll-ml-4 lg:scroll-ml-[71px] xl:scroll-ml-0 shrink-0 w-[280px] md:w-[290px] xl:w-full max-w-[290px] h-full rounded-xl flex flex-col relative transition-all duration-300
                ${pkg.isPopular ? 'bg-[#012708] shadow-2xl xl:-translate-y-4' : 'bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] border border-[#D9D9D9]'} 
                ${idx === 0 ? "ml-4 lg:ml-[71px] xl:ml-0" : ""} 
                ${idx === packages.length - 1 ? "mr-4 lg:mr-[71px] xl:mr-0" : ""}`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0CAD31] text-white text-[12px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md z-10 uppercase tracking-widest">
                  REKOMENDASI
                </div>
              )}

              <div className="flex flex-col h-full px-[20px] py-[30px]">
                
                {/* Upper Section - Fixed height to align buttons */}
                <div className="flex flex-col min-h-[180px]">
                  <span className={`text-[14px] font-bold mb-[5px] ${pkg.isPopular ? 'text-emerald-400' : 'text-[#0CAD31]'}`}>
                    {pkg.label}
                  </span>
                  <h3 className={`text-[18px] md:text-[20px] font-bold mb-[5px] line-clamp-2 min-h-[56px] ${pkg.isPopular ? 'text-white' : 'text-black'}`}>
                    {pkg.title}
                  </h3>

                  <div className={`flex items-baseline mb-[10px] ${pkg.isPopular ? 'text-white' : 'text-black'}`}>
                    <span className="text-[20px] font-bold">{pkg.currency}</span>
                    <span className="text-[28px] md:text-[32px] font-bold tracking-tight">{pkg.price}</span>
                    <span className="text-[14px] font-normal ml-1">{pkg.period}</span>
                  </div>
                  <p className={`text-[13px] font-normal mb-[15px] line-clamp-2 min-h-[40px] ${pkg.isPopular ? 'text-gray-300' : 'text-black'}`}>
                    {pkg.access}
                  </p>
                </div>

                {/* Button */}
                <button className={`w-full max-w-[247px] py-[10px] rounded-[5px] mx-auto flex items-center justify-center font-bold text-[16px] transition-all duration-300 shadow-lg active:scale-95 active:translate-y-0 cursor-pointer mb-[15px]
                  ${pkg.isPopular ? 'bg-[#0CAD31] hover:bg-[#09992b] text-white shadow-[#0CAD31]/30' : 'bg-[#0CAD31] hover:bg-[#09992b] text-white shadow-[#0CAD31]/30 hover:shadow-[#0CAD31]/50 hover:-translate-y-1'}`}>
                  Pilih Paket
                </button>

                {/* Subtext */}
                <p className={`text-[11px] font-normal leading-snug mb-[15px] min-h-[34px] ${pkg.isPopular ? 'text-emerald-100/70' : 'text-gray-700'}`}>
                  {pkg.subText}
                </p>

                {/* Divider */}
                <div className={`w-full h-0 border-t mx-auto mb-[20px] ${pkg.isPopular ? 'border-gray-700' : 'border-gray-300'}`}></div>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="flex items-center mt-[2px]">
                        <i className={`fa-solid fa-circle-check text-[14px] ${pkg.isPopular ? 'text-emerald-400' : 'text-[#0CAD31]'}`}></i>
                      </div>
                      <span className={`text-[12px] font-normal leading-tight ${pkg.isPopular ? 'text-gray-200' : 'text-black'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons (Mobile/Tablet Only) - Moved to bottom */}
        <div className="w-full flex justify-end gap-3 px-4 lg:px-[71px] mt-6 xl:hidden">
          <button
            onClick={scrollLeft}
            disabled={isAtStart}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtStart ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            onClick={scrollRight}
            disabled={isAtEnd}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all shadow-md active:scale-90 ${isAtEnd ? 'bg-[#0CAD31]/50 cursor-not-allowed' : 'bg-[#0CAD31] hover:bg-[#0a8c27] cursor-pointer'}`}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="mt-[30px] flex flex-col items-center text-center gap-[20px]">
          <div className="text-[16px] font-normal text-black leading-relaxed">
            Fitur unlimited mengikuti <span className="font-bold text-[#0CAD31]">Ketentuan Pengunaan</span> kami.<br />
            Paket harus lunas dibayar di awal. Harga bulanan yang di tampilkan adalah paket F&B produk dibagi durasi paket
          </div>

          <button className="hidden bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold text-[16px] w-[247px] h-[44px] rounded-[20px] flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer">
            Bandingkan Paket
          </button>
        </div>

      </div>
    </section>
  );
}
