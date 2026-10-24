import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import { mediaUrl, pbFileUrl } from "../../lib/media";
import type { SiteSettings } from "../../types/cms";

interface BlogProps {
  siteSettings?: SiteSettings | null;
}

const Card = ({ 
  img, 
  category, 
  title, 
  date, 
  href = "/berita/1",
  isMain = false,
  className = "",
  stateProps
}: { 
  img: string, 
  category: string, 
  title: string, 
  date: string, 
  href?: string,
  isMain?: boolean,
  className?: string,
  stateProps?: any
}) => {
  const cardClass = isMain 
    ? "shrink-0 w-[280px] md:w-[320px] xl:w-[568px] h-[250px] xl:h-[473px]" 
    : "shrink-0 w-[280px] md:w-[320px] xl:w-[346px] h-[250px] xl:h-[232px]";

  return (
    <Link to={href} state={stateProps} className={`relative rounded-[5px] overflow-hidden group cursor-pointer ${cardClass} flex-shrink-0 block snap-start scroll-ml-4 lg:scroll-ml-[71px] xl:scroll-ml-0 ${className}`}>
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      
      <div className="absolute bottom-[15px] right-[15px] flex flex-col items-end text-right z-10">
        <div className="h-[22px] px-[15px] bg-white rounded-[3px] flex items-center justify-center mb-2">
          <span className="text-[10px] font-bold text-black uppercase">{category}</span>
        </div>
        <h3 className="text-white text-[16px] font-bold leading-snug mb-1 drop-shadow-md max-w-[280px] sm:max-w-[80%] group-hover:text-[#0CAD31] transition-colors">{title}</h3>
        <p className="text-gray-200 text-[12px] font-medium drop-shadow-md">{date}</p>
      </div>
    </Link>
  );
};

const DEFAULT_POSTS = [
  {
    isMain: true,
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    category: "Bisnis",
    title: "Tren UMKM Indonesia di 2026",
    date: "29 September 2026",
    slug: "tren-umkm-indonesia-2026",
    gridClass: "xl:col-start-2 xl:row-start-1 xl:row-span-2"
  },
  {
    isMain: false,
    img: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=600&auto=format&fit=crop",
    category: "AI",
    title: "AI Jadi Senjata Baru UMKM di 2026",
    date: "29 September 2026",
    slug: "ai-jadi-senjata-baru-umkm-2026",
    gridClass: "xl:col-start-1 xl:row-start-1"
  },
  {
    isMain: false,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    category: "Manajemen",
    title: "Kelola UMKM Lebih Efisien dengan Sistem Digital",
    date: "29 September 2026",
    slug: "kelola-umkm-lebih-efisien-sistem-digital",
    gridClass: "xl:col-start-1 xl:row-start-2"
  },
  {
    isMain: false,
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
    category: "Keuangan",
    title: "Strategi Keuangan UMKM untuk Bisnis Berkelanjutan",
    date: "29 September 2026",
    slug: "strategi-keuangan-umkm-bisnis-berkelanjutan",
    gridClass: "xl:col-start-3 xl:row-start-1"
  },
  {
    isMain: false,
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    category: "Teknologi",
    title: "Teknologi Digital yang Wajib Dipahami UMKM",
    date: "29 September 2026",
    slug: "teknologi-digital-wajib-dipahami-umkm",
    gridClass: "xl:col-start-3 xl:row-start-2"
  }
];

export default function Blog({ siteSettings }: BlogProps) {
  const location = useLocation();
  const isFromTentangKami = location.pathname === "/tentang-kami";
  const stateProps = isFromTentangKami ? { from: "tentang-kami" } : undefined;

  const [localSettings, setLocalSettings] = useState<SiteSettings | null>(null);
  const [dbPosts, setDbPosts] = useState<any[]>([]);

  const loadLocalSettings = () => {
    if (!siteSettings) {
      pb.collection("site_settings")
        .getFirstListItem("", { sort: "-updated", requestKey: null })
        .then((record) => {
          setLocalSettings(record as unknown as SiteSettings);
        })
        .catch((err) => {
          console.error("Gagal memuat site_settings di Blog:", err);
        });
    }
  };

  const loadBlogPosts = () => {
    pb.collection("blog_posts")
      .getList(1, 5, {
        sort: "-created",
        filter: "active = true",
        requestKey: null
      })
      .then((res) => {
        if (res.items && res.items.length > 0) {
          setDbPosts(res.items);
        }
      })
      .catch((err) => {
        console.warn("Gagal memuat blog_posts:", err);
      });
  };

  useEffect(() => {
    loadLocalSettings();
    loadBlogPosts();

    const handleFocus = () => {
      loadLocalSettings();
      loadBlogPosts();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [siteSettings]);

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

  const activeSettings = siteSettings || localSettings;
  const isHidden = Boolean(activeSettings?.nav_blog_hide || activeSettings?.blog_hide);
  if (isHidden) {
    return null;
  }

  const blogTitle = activeSettings?.blog_title || "Insight & Tren Bisnis Terkini";
  const blogDesc = activeSettings?.blog_desc || "Temukan berbagai informasi, strategi, dan tren terbaru seputar AI, manajemen, bisnis, keuangan, dan teknologi untuk membantu bisnis Anda berkembang.";

  // Dynamic posts merged with grid slot configurations
  const posts = DEFAULT_POSTS.map((slot, idx) => {
    const dbPost = dbPosts[idx];
    if (!dbPost) return slot;

    let imgSrc = slot.img;
    if (dbPost.cover_image) {
      if (/^https?:\/\//i.test(dbPost.cover_image) || dbPost.cover_image.startsWith("data:")) {
        imgSrc = dbPost.cover_image;
      } else {
        const pbUrl = pbFileUrl(dbPost, dbPost.cover_image);
        imgSrc = pbUrl || mediaUrl(dbPost.cover_image) || slot.img;
      }
    } else if (dbPost.cover_image_path) {
      imgSrc = mediaUrl(dbPost.cover_image_path);
    }

    return {
      isMain: slot.isMain,
      img: imgSrc,
      category: dbPost.category || slot.category,
      title: dbPost.title || slot.title,
      date: dbPost.published_date || slot.date,
      slug: dbPost.slug || dbPost.id || slot.slug,
      gridClass: slot.gridClass
    };
  });

  return (
    <section id="blog" className="w-full bg-[#F5FFF6] py-[50px] font-sans overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center xl:px-[71px]">
        
        {/* Header Text */}
        <div className="text-center mb-[30px] flex flex-col items-center px-4 lg:px-[71px] xl:px-0">
          <h2 className="text-[40px] font-bold text-[#0CAD31] mb-2">{blogTitle}</h2>
          <p className="text-[16px] font-normal text-slate-800 max-w-[800px] whitespace-pre-line">
            {blogDesc}
          </p>
        </div>

        {/* Masonry-like Grid Cards */}
        <div ref={scrollRef} onScroll={handleScroll} className="flex xl:grid xl:grid-cols-[346px_568px_346px] xl:grid-rows-[232px_232px] gap-[20px] lg:gap-[30px] xl:gap-[10px] xl:gap-x-[19px] overflow-x-auto xl:overflow-x-visible snap-x snap-mandatory scrollbar-none px-0 pb-4 xl:pb-0 w-full xl:w-auto xl:mx-auto">
          {posts.map((post, idx) => (
             <Card 
               key={idx}
               isMain={post.isMain}
               img={post.img}
               category={post.category}
               title={post.title}
               date={post.date}
               href={`/berita/${post.slug || (idx + 1)}`}
               className={`${post.gridClass} ${idx === 0 ? "ml-4 lg:ml-[71px] xl:ml-0" : ""} ${idx === posts.length - 1 ? "mr-4 lg:mr-[71px] xl:mr-0" : ""}`}
               stateProps={stateProps}
             />
          ))}
        </div>

        {/* Navigation Buttons (Mobile/Tablet Only) - Moved to bottom */}
        <div className="w-full flex justify-end gap-3 px-4 lg:px-[71px] mt-1 xl:hidden">
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

        {/* Button Lihat Semua */}
        <div className="mt-[30px] flex justify-center">
          <Link 
            to="/berita"
            state={stateProps}
            className="w-[247px] h-[44px] bg-[#0CAD31] text-white font-bold text-[16px] rounded-full transition-all duration-300 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer flex items-center justify-center"
          >
            Lihat Semua Artikel
          </Link>
        </div>

      </div>
    </section>
  );
}
