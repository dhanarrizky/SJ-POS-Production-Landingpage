import { useState, useEffect } from "react";
import { pb } from "../../lib/pocketbase";
import { mediaUrl } from "../../lib/media";
import type { SiteSettings, FeedbackCustomerItem } from "../../types/cms";

import imgDhanar from "../../assets/team/Dhanar rizki.webp";
import imgRian from "../../assets/team/Rian alfatian.webp";
import imgRicardo from "../../assets/team/Ricardo augusto.webp";
import imgBagus from "../../assets/team/Bagus wikan.webp";

interface FeedbackCustomerProps {
  siteSettings?: SiteSettings | null;
}

const DEFAULT_FEEDBACKS: FeedbackCustomerItem[] = [
  {
    id: 1,
    name: "Dhanar Rizky",
    title: "Lead",
    quote: '"Kami membangun SpontanJualan untuk memastikan setiap transaksi berjalan mulus tanpa hambatan. Fokus utama kami adalah menciptakan ekosistem yang dapat diandalkan oleh para pemilik usaha dalam mengembangkan bisnis mereka."',
    location: "Yogyakarta",
    image: imgDhanar,
    rating: 5,
  },
  {
    id: 2,
    name: "Rian Alfatian",
    title: "QA Engineer",
    quote: '"Kualitas adalah prioritas utama. Setiap fitur yang rilis telah melewati pengujian ketat agar pengguna tidak mengalami kendala dan bisa menjalankan operasional bisnis dengan tenang dan nyaman."',
    location: "Yogyakarta",
    image: imgRian,
    rating: 5,
  },
  {
    id: 3,
    name: "Ricardo Augusto",
    title: "Full stack Developer",
    quote: '"Dari sisi teknis, kami merancang sistem POS yang sangat ringan dan mudah di-scale up. Harapannya, aplikasi ini tidak hanya cepat tapi juga bisa beradaptasi dengan kebutuhan masa depan yang semakin kompleks."',
    location: "Yogyakarta",
    image: imgRicardo,
    rating: 5,
  },
  {
    id: 4,
    name: "Bagus Wikan",
    title: "Full stack Developer",
    quote: '"Tujuan kami adalah menghadirkan antarmuka dan fungsi yang intuitif. Membantu UMKM untuk beralih ke digital seharusnya tidak sulit, karena itulah kami membuat SpontanJualan senyaman mungkin."',
    location: "Yogyakarta",
    image: imgBagus,
    rating: 5,
  }
];

export default function FeedbackCustomer({ siteSettings: propSettings }: FeedbackCustomerProps = {}) {
  const [internalSettings, setInternalSettings] = useState<SiteSettings | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("opacity-100 translate-x-0");

  useEffect(() => {
    if (propSettings) return;
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => {
        setInternalSettings(record as unknown as SiteSettings);
      })
      .catch(() => {});
  }, [propSettings]);

  const siteSettings = propSettings || internalSettings;

  const title = siteSettings?.feedback_title || "Pesan Dari\nPengembang";
  const subtitle = siteSettings?.feedback_subtitle || "Dibalik Layar\nSpontan Jualan";

  let feedbacks: FeedbackCustomerItem[] = DEFAULT_FEEDBACKS;
  if (siteSettings?.feedback_items) {
    if (Array.isArray(siteSettings.feedback_items) && siteSettings.feedback_items.length > 0) {
      feedbacks = siteSettings.feedback_items;
    } else if (typeof siteSettings.feedback_items === "string") {
      try {
        const parsed = JSON.parse(siteSettings.feedback_items);
        if (Array.isArray(parsed) && parsed.length > 0) feedbacks = parsed;
      } catch {}
    }
  }

  const changeFeedback = (newIndex: number, direction: 'left' | 'right') => {
    setAnimationClass(`opacity-0 ${direction === 'left' ? '-translate-x-12' : 'translate-x-12'} transition-all duration-300`);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimationClass(`opacity-0 ${direction === 'left' ? 'translate-x-12' : '-translate-x-12'} transition-none`);
      
      setTimeout(() => {
        setAnimationClass("opacity-100 translate-x-0 transition-all duration-500 ease-out");
      }, 50);
    }, 300);
  };

  // Auto slide setiap 5 detik bila ada lebih dari 1 feedback
  useEffect(() => {
    if (feedbacks.length <= 1) return;
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % feedbacks.length;
      changeFeedback(nextIndex, 'left');
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, feedbacks.length]);

  const handleNext = () => {
    if (feedbacks.length <= 1) return;
    const nextIndex = (currentIndex + 1) % feedbacks.length;
    changeFeedback(nextIndex, 'left');
  };

  const handlePrev = () => {
    if (feedbacks.length <= 1) return;
    const prevIndex = currentIndex === 0 ? feedbacks.length - 1 : currentIndex - 1;
    changeFeedback(prevIndex, 'right');
  };

  const safeIndex = feedbacks.length > 0 ? currentIndex % feedbacks.length : 0;
  const currentFeedback = feedbacks[safeIndex] || DEFAULT_FEEDBACKS[0];

  // Helper resolusi foto profil atau fallback
  const getAvatarUrl = (item: FeedbackCustomerItem) => {
    if (item.image) {
      if (item.image.includes("Dhanar")) return imgDhanar;
      if (item.image.includes("Rian")) return imgRian;
      if (item.image.includes("Ricardo")) return imgRicardo;
      if (item.image.includes("Bagus")) return imgBagus;
      return item.image;
    }
    if (item.image_path) {
      return mediaUrl(item.image_path);
    }
    return null;
  };

  const avatarUrl = getAvatarUrl(currentFeedback);

  return (
    <section id="feedback" className="w-full bg-[#012708] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-[50px] lg:gap-[240px]">
          
          {/* Kiri: Teks & Navigasi */}
          <div className="flex flex-col items-center lg:items-start text-white max-w-[400px]">
            <span className="text-[16px] font-normal mb-[20px]">
              {safeIndex + 1}/{feedbacks.length}
            </span>
            <h2 className="text-[40px] font-bold mb-[20px] leading-tight text-center lg:text-left whitespace-pre-line">
              {title}
            </h2>
            <p className="text-[16px] font-normal text-gray-200 mb-[60px] lg:mb-[100px] text-center lg:text-left leading-relaxed whitespace-pre-line">
              {subtitle}
            </p>

            {/* Navigasi Buttons (Desktop Only) */}
            {feedbacks.length > 1 && (
              <div className="hidden lg:flex items-center gap-[20px]">
                <button 
                  onClick={handlePrev}
                  className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
                  aria-label="Previous feedback"
                >
                  <i className="fa-solid fa-chevron-left text-xl"></i>
                </button>
                <button 
                  onClick={handleNext}
                  className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
                  aria-label="Next feedback"
                >
                  <i className="fa-solid fa-chevron-right text-xl"></i>
                </button>
              </div>
            )}
          </div>

          {/* Kanan: Card Testimoni (Tinggi Tetap & Statis agar tidak goyang/berubah ukuran) */}
          <div className="w-full max-w-[550px] h-[580px] bg-[#F5FFF6] rounded-[20px] px-6 sm:px-10 lg:px-[60px] py-9 sm:py-[42px] flex flex-col items-center text-center relative overflow-hidden shadow-lg">
            
            {/* Konten yang Bergeser */}
            <div className={`w-full h-full flex flex-col items-center justify-between ${animationClass}`}>
              
              {/* Bagian Atas: Avatar, Bintang, Nama & Pekerjaan */}
              <div className="w-full flex flex-col items-center shrink-0">
                {/* Foto Profil atau Icon People Otomatis */}
                <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden mb-[16px] shrink-0 border-4 border-white shadow-md bg-emerald-50 flex items-center justify-center">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt={currentFeedback.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0CAD31]/10 flex items-center justify-center text-[#0CAD31]">
                      <i className="fa-solid fa-user text-[40px] sm:text-[46px]"></i>
                    </div>
                  )}
                </div>

                {/* Bintang Dinamis */}
                <div className="flex items-center gap-[8px] mb-[14px] shrink-0">
                  {[...Array(5)].map((_, i) => {
                    const ratingCount = typeof currentFeedback.rating === "number" ? currentFeedback.rating : 5
                    const isFilled = i < ratingCount
                    return (
                      <i
                        key={i}
                        className={`fa-solid fa-star text-[17px] sm:text-[18px] ${
                          isFilled ? "text-[#FADB14]" : "text-gray-300"
                        }`}
                      ></i>
                    )
                  })}
                </div>

                {/* Nama & Pekerjaan */}
                <div className="flex flex-col items-center shrink-0">
                  <h4 className="text-[18px] font-bold text-black mb-1">
                    {currentFeedback.name}
                  </h4>
                  <p className="text-[14px] sm:text-[15px] font-normal text-gray-700">
                    {currentFeedback.title}
                  </p>
                </div>
              </div>

              {/* Bagian Tengah: Quote (Fleksibel & Terpusat, tidak merubah tinggi card) */}
              <div className="flex-1 w-full flex items-center justify-center my-2 px-2 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <p className="text-[15px] sm:text-[16px] font-normal text-black leading-relaxed italic whitespace-pre-line">
                  {currentFeedback.quote}
                </p>
              </div>

              {/* Bagian Bawah: Lokasi (Tinggi tetap agar posisi stabil) */}
              <div className="w-full shrink-0 min-h-[46px] flex flex-col items-center justify-center">
                {currentFeedback.location ? (
                  <>
                    <span className="text-[13px] font-normal text-gray-500 mb-0.5">
                      Location
                    </span>
                    <span className="text-[15px] font-bold text-black">
                      {currentFeedback.location}
                    </span>
                  </>
                ) : (
                  <div className="h-[46px]" />
                )}
              </div>
              
            </div>
            
          </div>

          {/* Navigasi Buttons (Mobile/Tablet Only) */}
          {feedbacks.length > 1 && (
            <div className="flex lg:hidden items-center justify-center gap-[20px] mt-1">
              <button 
                onClick={handlePrev}
                className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
                aria-label="Previous feedback"
              >
                <i className="fa-solid fa-chevron-left text-xl"></i>
              </button>
              <button 
                onClick={handleNext}
                className="w-[81px] h-[72px] bg-[#F5FFF6] text-[#0CAD31] flex items-center justify-center hover:bg-white rounded-[10px] transition-all duration-300 shadow-lg shadow-[#0CAD31]/10 hover:-translate-y-1 hover:shadow-[#0CAD31]/30 active:scale-95 active:translate-y-0 cursor-pointer"
                aria-label="Next feedback"
              >
                <i className="fa-solid fa-chevron-right text-xl"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
