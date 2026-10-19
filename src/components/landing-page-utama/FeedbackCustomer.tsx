import { useState, useEffect } from "react";

import imgDhanar from "../../assets/team/Dhanar rizki.webp";
import imgRian from "../../assets/team/Rian alfatian.webp";
import imgRicardo from "../../assets/team/Ricardo augusto.webp";
import imgBagus from "../../assets/team/Bagus wikan.webp";

const feedbacks = [
  {
    id: 1,
    name: "Dhanar Rizky",
    title: "Lead",
    quote: '"Kami membangun SpontanJualan untuk memastikan setiap transaksi berjalan mulus tanpa hambatan. Fokus utama kami adalah menciptakan ekosistem yang dapat diandalkan oleh para pemilik usaha dalam mengembangkan bisnis mereka."',
    location: "Yogyakarta",
    image: imgDhanar
  },
  {
    id: 2,
    name: "Rian Alfatian",
    title: "QA Engineer",
    quote: '"Kualitas adalah prioritas utama. Setiap fitur yang rilis telah melewati pengujian ketat agar pengguna tidak mengalami kendala dan bisa menjalankan operasional bisnis dengan tenang dan nyaman."',
    location: "Yogyakarta",
    image: imgRian
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    title: "Full stack Developer",
    quote: '"Dari sisi teknis, kami merancang sistem POS yang sangat ringan dan mudah di-scale up. Harapannya, aplikasi ini tidak hanya cepat tapi juga bisa beradaptasi dengan kebutuhan masa depan yang semakin kompleks."',
    location: "Yogyakarta",
    image: imgRicardo
  },
  {
    id: 4,
    name: "Bagus Wikan",
    title: "Full stack Developer",
    quote: '"Tujuan kami adalah menghadirkan antarmuka dan fungsi yang intuitif. Membantu UMKM untuk beralih ke digital seharusnya tidak sulit, karena itulah kami membuat SpontanJualan senyaman mungkin."',
    location: "Yogyakarta",
    image: imgBagus
  }
];

export default function FeedbackCustomer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("opacity-100 translate-x-0");

  const changeFeedback = (newIndex: number, direction: 'left' | 'right') => {
    // Fade out dan geser ke arah yang sesuai
    setAnimationClass(`opacity-0 ${direction === 'left' ? '-translate-x-12' : 'translate-x-12'} transition-all duration-300`);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      // Pindahkan ke sisi berlawanan secara instan (tanpa animasi) agar siap masuk
      setAnimationClass(`opacity-0 ${direction === 'left' ? 'translate-x-12' : '-translate-x-12'} transition-none`);
      
      // Munculkan dan geser ke tengah dengan animasi mulus
      setTimeout(() => {
        setAnimationClass("opacity-100 translate-x-0 transition-all duration-500 ease-out");
      }, 50);
    }, 300);
  };

  // Auto slide setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % feedbacks.length;
      changeFeedback(nextIndex, 'left');
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % feedbacks.length;
    changeFeedback(nextIndex, 'left');
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? feedbacks.length - 1 : currentIndex - 1;
    changeFeedback(prevIndex, 'right');
  };

  const currentFeedback = feedbacks[currentIndex];

  return (
    <section id="feedback" className="w-full bg-[#012708] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-[50px] lg:gap-[240px]">
          
          {/* Kiri: Teks & Navigasi */}
          <div className="flex flex-col items-center lg:items-start text-white max-w-[400px]">
            <span className="text-[16px] font-normal mb-[20px]">
              {currentIndex + 1}/{feedbacks.length}
            </span>
            <h2 className="text-[40px] font-bold mb-[20px] leading-tight text-center lg:text-left">
              Pesan Dari<br />
              Pengembang
            </h2>
            <p className="text-[16px] font-normal text-gray-200 mb-[100px] text-center lg:text-left leading-relaxed">
              Dibalik Layar<br />
              Spontan Jualan
            </p>

            {/* Navigasi Buttons (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-[20px]">
              <button 
                onClick={handlePrev}
                className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-xl"></i>
              </button>
              <button 
                onClick={handleNext}
                className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-xl"></i>
              </button>
            </div>
          </div>

          {/* Kanan: Card Testimoni */}
          <div className="w-full max-w-[550px] bg-[#F5FFF6] rounded-[20px] px-8 lg:px-[60px] py-[50px] flex flex-col items-center text-center relative overflow-hidden shadow-lg">
            
            {/* Konten yang Bergeser */}
            <div className={`w-full flex flex-col items-center ${animationClass}`}>
              
              {/* Foto Profil */}
              <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-[50px] shrink-0 border-4 border-white shadow-md">
                <img 
                  src={currentFeedback.image} 
                  alt={currentFeedback.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bintang */}
              <div className="flex items-center gap-[10px] mb-[20px]">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-[#FADB14] text-[18px]"></i>
                ))}
              </div>

              {/* Nama & Pekerjaan */}
              <div className="flex flex-col items-center mb-[50px]">
                <h4 className="text-[16px] font-bold text-black mb-1">
                  {currentFeedback.name}
                </h4>
                <p className="text-[16px] font-normal text-gray-700">
                  {currentFeedback.title}
                </p>
              </div>

              {/* Quote (Fixed Height Container agar tinggi card stabil) */}
              <div className="min-h-[140px] flex items-center justify-center mb-[50px] w-full">
                <p className="text-[16px] font-normal text-black leading-relaxed italic">
                  {currentFeedback.quote}
                </p>
              </div>

              {/* Lokasi */}
              <div className="flex flex-col items-center">
                <span className="text-[16px] font-normal text-gray-700 mb-1">
                  Location
                </span>
                <span className="text-[16px] font-bold text-black">
                  {currentFeedback.location}
                </span>
              </div>
              
            </div>
            
          </div>

          {/* Navigasi Buttons (Mobile/Tablet Only) - Moved to bottom */}
          <div className="flex lg:hidden items-center justify-center gap-[20px] mt-2">
            <button 
              onClick={handlePrev}
              className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-left text-xl"></i>
            </button>
            <button 
              onClick={handleNext}
              className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
            >
              <i className="fa-solid fa-chevron-right text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
