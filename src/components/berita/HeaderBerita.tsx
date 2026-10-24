import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import { mediaUrl } from "../../lib/media";
import type { BlogPost } from "../../types/cms";

interface HeaderBeritaProps {
  posts?: BlogPost[];
}

export default function HeaderBerita({ posts: propPosts }: HeaderBeritaProps) {
  const location = useLocation();
  const [internalPosts, setInternalPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (propPosts && propPosts.length > 0) return;
    pb.collection("blog_posts")
      .getList(1, 4, {
        sort: "-created",
        filter: "active = true",
        requestKey: null,
      })
      .then((res) => {
        setInternalPosts(res.items as unknown as BlogPost[]);
      })
      .catch((err) => {
        console.warn("Gagal memuat berita header:", err);
      });
  }, [propPosts]);

  const posts = propPosts && propPosts.length > 0 ? propPosts : internalPosts;

  const resolveImage = (p?: BlogPost, fallback = "") => {
    if (!p) return fallback;
    if (p.cover_image) return p.cover_image;
    if (p.cover_image_path) return mediaUrl(p.cover_image_path);
    return fallback;
  };

  const featured = posts[0] || {
    id: "tren-umkm-2026",
    slug: "tren-umkm-2026",
    title: "Tren UMKM Indonesia di 2026",
    category: "Bisnis",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cover_image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop",
  };

  const fallbackArticles = [
    {
      id: "kelola-umkm-efisien",
      slug: "kelola-umkm-efisien",
      title: "Kelola UMKM Lebih Efisien dengan sistem Digital",
      published_date: "9 September 2026",
      cover_image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "ai-senjata-baru",
      slug: "ai-senjata-baru",
      title: "AI jadi Senjata Baru UMKM di 2026",
      published_date: "9 September 2026",
      cover_image:
        "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "strategi-keuangan",
      slug: "strategi-keuangan",
      title: "Strategi Keuangan UMKM untuk Bisnis Berkelanjutan",
      published_date: "9 September 2026",
      cover_image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const sideArticles =
    posts.length > 1
      ? posts.slice(1, 4)
      : fallbackArticles;

  return (
    <div className="flex flex-col xl:flex-row gap-8 xl:gap-[70px]">
      {/* Kiri: Featured Article */}
      <Link
        to={`/berita/${featured.slug || featured.id}`}
        state={location.state}
        className="w-full xl:w-[60%] shrink-0 group relative rounded-[10px] overflow-hidden cursor-pointer shadow-lg block h-[400px] xl:h-[438px]"
      >
        <img
          src={resolveImage(
            featured,
            "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop"
          )}
          alt={featured.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* Content Kiri */}
        <div className="absolute bottom-0 left-0 w-full p-6 xl:p-8 flex flex-col items-start z-10">
          <div className="bg-white px-4 py-1.5 rounded-[5px] mb-4">
            <span className="text-[12px] font-bold text-black">
              {featured.category || "Bisnis"}
            </span>
          </div>
          <h2 className="text-white text-[16px] font-bold leading-tight mb-3 drop-shadow-md">
            {featured.title}
          </h2>
          <p className="text-gray-200 text-[16px] font-normal max-w-[600px] drop-shadow-md leading-relaxed">
            {featured.excerpt ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </p>
        </div>
      </Link>

      {/* Kanan: List Articles */}
      <div className="hidden md:grid md:grid-cols-3 xl:flex w-full xl:w-[40%] xl:flex-col gap-6 xl:gap-[30px]">
        {sideArticles.map((article, idx) => {
          const fallbackImages = [
            "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
          ];
          const img = resolveImage(article, fallbackImages[idx % fallbackImages.length]);

          return (
            <Link
              key={article.id || idx}
              to={`/berita/${article.slug || article.id}`}
              state={location.state}
              className="flex flex-col xl:flex-row items-start gap-4 lg:gap-6 group cursor-pointer"
            >
              <div className="w-full xl:w-[181px] h-[200px] md:h-[160px] xl:h-[126px] rounded-[5px] overflow-hidden shrink-0 shadow-md">
                <img
                  src={img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-start w-full">
                <span className="text-[16px] font-normal text-gray-600 mb-2">
                  {article.published_date || "9 September 2026"}
                </span>
                <h3 className="text-[20px] lg:text-[18px] xl:text-[20px] font-bold text-black leading-snug group-hover:text-[#0CAD31] transition-colors">
                  {article.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
