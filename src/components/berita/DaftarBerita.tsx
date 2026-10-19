import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DaftarBerita() {
  const location = useLocation();
  const categories = ["Semua", "AI", "Bisnis", "Keuangan", "Manajemen", "Teknologi"];
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const dummyNews = [
    {
      id: 1,
      date: "9 September 2026",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm1/262/156",
      category: "Manajemen"
    },
    {
      id: 2,
      date: "9 September 2026",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm2/262/156",
      category: "Manajemen"
    },
    {
      id: 3,
      date: "9 September 2026",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm3/262/156",
      category: "Manajemen"
    },
    {
      id: 4,
      date: "9 September 2026",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm4/262/156",
      category: "Manajemen"
    }
  ];

  const dummyTerbaru = [
    {
      id: 1,
      time: "1 Jam lalu",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm1/133/100",
    },
    {
      id: 2,
      time: "1 Jam lalu",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm2/133/100",
    },
    {
      id: 3,
      time: "1 Jam lalu",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm3/133/100",
    },
    {
      id: 4,
      time: "1 Jam lalu",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://picsum.photos/seed/umkm4/133/100",
    }
  ];

  const filteredNews = dummyNews.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full pt-[50px] pb-[50px] font-sans relative bg-[#F5FFF6] mt-[10px]">
      <div className="max-w-[1200px] mx-auto px-4 xl:px-0">

        {/* Container for menu & search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-[20px] pt-[20px] border-b border-gray-300 mb-[50px]">

          {/* Categories */}
          <div className="flex flex-nowrap items-center gap-[10px] w-full lg:max-w-[calc(100%-380px)] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-[16px] font-bold h-[30px] min-w-[113px] px-[20px] flex items-center justify-center rounded-full transition-all duration-300 ${activeCategory === cat
                  ? "bg-[#0CAD31] text-white"
                  : "text-black hover:bg-[#F5FFF6] hover:text-[#0CAD31]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[356px] h-[48px] shrink-0">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-black text-[14px]"></i>
            <input
              type="text"
              placeholder="Cari Blog"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-[40px] pr-4 rounded-[10px] border border-gray-300 bg-transparent outline-none focus:border-[#0CAD31] text-[12px] font-normal text-black placeholder-gray-500"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col xl:flex-row gap-[50px] w-full">

          {/* Left Column - Article List */}
          <div className="flex-1 flex flex-col">
            {filteredNews.length > 0 ? (
              filteredNews.map((news) => (
                <Link to={`/berita/${news.id}`} state={location.state} key={news.id} className="flex flex-col md:flex-row items-center md:items-start gap-[20px] pb-[30px] mb-[30px] border-b border-gray-300 last:border-b-0 group cursor-pointer">
                  <div className="w-[262px] h-[156px] shrink-0 overflow-hidden rounded-[5px] bg-gray-100">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col items-start justify-center py-2">
                    <span className="px-[20px] py-[4px] bg-[#0CAD31] text-white text-[8px] font-bold rounded-full mb-[10px]">
                      {news.category}
                    </span>
                    <h3 className="text-[24px] font-bold text-black leading-tight mb-[5px] transition-colors group-hover:text-[#0CAD31]">
                      {news.title}
                    </h3>
                    <p className="text-[12px] font-normal text-gray-500 mb-[15px]">
                      {news.date}
                    </p>
                    <span className="text-[#0CAD31] text-[12px] font-bold flex items-center gap-2 group-hover:underline">
                      Baca Artikel <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-[50px] text-center">
                <i className="fa-regular fa-folder-open text-[60px] text-gray-300 mb-[20px]"></i>
                <h3 className="text-[20px] font-bold text-black mb-[10px]">Berita tidak ditemukan</h3>
                <p className="text-[16px] font-normal text-gray-500">
                  Maaf, kami tidak dapat menemukan berita dengan kata kunci "{searchQuery}".
                </p>
              </div>
            )}

            {/* Pagination Placeholder */}
            {filteredNews.length > 0 && (
              <div className="flex justify-center items-center gap-3 mt-[10px] mb-[30px] xl:mb-0">
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] transition-all duration-300 active:scale-90"><i className="fa-solid fa-chevron-left"></i></button>
                <button className="w-8 h-8 flex items-center justify-center text-white bg-[#0CAD31] rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90 cursor-default">1</button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">2</button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">3</button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">4</button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">5</button>
                <span className="text-[#0CAD31] font-bold px-2">...</span>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">100</button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] transition-all duration-300 active:scale-90"><i className="fa-solid fa-chevron-right"></i></button>
              </div>
            )}
          </div>

          {/* Right Column - Terbaru */}
          <div className="hidden xl:block w-full xl:w-[400px] shrink-0">
            <div className="w-full p-[30px_20px] border border-[#0CAD31] rounded-[10px] bg-transparent">
              {/* Title */}
              <div className="flex items-center gap-[10px] mb-[30px]">
                <div className="w-[4px] h-[24px] bg-[#0CAD31] rounded-full"></div>
                <h3 className="text-[20px] font-bold text-black">Terbaru</h3>
              </div>

              <div className="flex flex-col gap-[30px]">
                {dummyTerbaru.map((item) => (
                  <Link to={`/berita/${item.id}`} state={location.state} key={item.id} className="flex justify-between items-start gap-[20px] group cursor-pointer">
                    <div className="flex flex-col">
                      <h4 className="text-[16px] font-bold text-black leading-tight mb-[10px] transition-colors group-hover:text-[#0CAD31]">
                        {item.title}
                      </h4>
                      <p className="text-[12px] font-normal text-gray-500">
                        {item.time}
                      </p>
                    </div>
                    <div className="w-[133px] h-[100px] shrink-0 overflow-hidden rounded-[5px] bg-gray-100">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
