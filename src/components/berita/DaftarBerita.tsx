import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import { mediaUrl } from "../../lib/media";
import type { BlogPost } from "../../types/cms";

interface DaftarBeritaProps {
  posts?: BlogPost[];
}

export default function DaftarBerita({ posts: propPosts }: DaftarBeritaProps) {
  const location = useLocation();
  const [internalPosts, setInternalPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (propPosts && propPosts.length > 0) {
      return;
    }
    pb.collection("blog_posts")
      .getFullList({
        sort: "-created",
        filter: "active = true",
        requestKey: null,
      })
      .then((records) => {
        setInternalPosts(records as unknown as BlogPost[]);
      })
      .catch((err) => {
        console.warn("Gagal memuat berita di DaftarBerita:", err);
      });
  }, [propPosts]);

  const rawPosts = propPosts && propPosts.length > 0 ? propPosts : internalPosts;

  const defaultDummyNews = [
    {
      id: "tren-umkm-2026",
      category: "Bisnis",
      title: "Tren UMKM Indonesia di 2026",
      date: "29 September 2026",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "kelola-umkm-efisien",
      category: "Bisnis",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      date: "9 September 2026",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "ai-senjata-baru",
      category: "AI",
      title: "AI jadi Senjata Baru UMKM di 2026",
      date: "9 September 2026",
      image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "strategi-keuangan",
      category: "Keuangan",
      title: "Strategi Keuangan UMKM untuk Bisnis Berkelanjutan",
      date: "9 September 2026",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const defaultDummyTerbaru = [
    {
      id: "tren-umkm-2026",
      time: "1 Jam lalu",
      title: "Tren UMKM Indonesia di 2026",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "kelola-umkm-efisien",
      time: "1 Jam lalu",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "ai-senjata-baru",
      time: "1 Jam lalu",
      title: "AI jadi Senjata Baru UMKM di 2026",
      image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "strategi-keuangan",
      time: "1 Jam lalu",
      title: "Strategi Keuangan UMKM untuk Bisnis Berkelanjutan",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=300&auto=format&fit=crop",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Semua", "AI", "Bisnis", "Keuangan", "Manajemen", "Teknologi"];

  // Helper resolve cover
  const resolveCover = (post: any) => {
    if (post.image) return post.image;
    if (post.cover_image) return post.cover_image;
    if (post.cover_image_path) return mediaUrl(post.cover_image_path);
    return "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop";
  };

  // Convert rawPosts or fallback
  const newsList = useMemo(() => {
    if (rawPosts && rawPosts.length > 0) {
      return rawPosts.map((p) => ({
        id: p.slug || p.id,
        category: p.category || "Bisnis",
        title: p.title,
        date: p.published_date || "Terbaru",
        image: resolveCover(p),
      }));
    }
    return defaultDummyNews;
  }, [rawPosts]);

  const terbaruList = useMemo(() => {
    if (rawPosts && rawPosts.length > 0) {
      return rawPosts.slice(0, 4).map((p) => ({
        id: p.slug || p.id,
        title: p.title,
        time: p.published_date || "Terbaru",
        image: resolveCover(p),
      }));
    }
    return defaultDummyTerbaru;
  }, [rawPosts]);

  const filteredNews = newsList.filter((news) => {
    const matchCategory =
      activeCategory === "Semua" ||
      news.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

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
                className={`shrink-0 text-[16px] font-bold h-[30px] min-w-[113px] px-[20px] flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
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
                <Link
                  to={`/berita/${news.id}`}
                  state={location.state}
                  key={news.id}
                  className="flex flex-col md:flex-row items-center md:items-start gap-[20px] pb-[30px] mb-[30px] border-b border-gray-300 last:border-b-0 group cursor-pointer"
                >
                  <div className="w-[262px] h-[156px] shrink-0 overflow-hidden rounded-[5px] bg-gray-100">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
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
                <h3 className="text-[20px] font-bold text-black mb-[10px]">
                  Berita tidak ditemukan
                </h3>
                <p className="text-[16px] font-normal text-gray-500">
                  Maaf, kami tidak dapat menemukan berita dengan kata kunci "{searchQuery}".
                </p>
              </div>
            )}

            {/* Pagination Placeholder */}
            {filteredNews.length > 0 && (
              <div className="flex justify-center items-center gap-3 mt-[10px] mb-[30px] xl:mb-0">
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] transition-all duration-300 active:scale-90">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-white bg-[#0CAD31] rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90 cursor-default">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">
                  4
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">
                  5
                </button>
                <span className="text-[#0CAD31] font-bold px-2">...</span>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] font-bold text-[14px] transition-all duration-300 active:scale-90">
                  100
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-[#0CAD31] hover:bg-[#0CAD31] hover:text-white rounded-[5px] transition-all duration-300 active:scale-90">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
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
                {terbaruList.map((item) => (
                  <Link
                    to={`/berita/${item.id}`}
                    state={location.state}
                    key={item.id}
                    className="flex justify-between items-start gap-[20px] group cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <h4 className="text-[16px] font-bold text-black leading-tight mb-[10px] transition-colors group-hover:text-[#0CAD31]">
                        {item.title}
                      </h4>
                      <p className="text-[12px] font-normal text-gray-500">{item.time}</p>
                    </div>
                    <div className="w-[133px] h-[100px] shrink-0 overflow-hidden rounded-[5px] bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
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
