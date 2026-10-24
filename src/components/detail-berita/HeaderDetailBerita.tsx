import { mediaUrl } from "../../lib/media";
import type { BlogPost } from "../../types/cms";

interface HeaderDetailBeritaProps {
  post?: BlogPost | null;
}

export default function HeaderDetailBerita({ post }: HeaderDetailBeritaProps) {
  const category = post?.category || "Bisnis";
  const title = post?.title || "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit";
  const excerpt =
    post?.excerpt ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const publishedDate = post?.published_date || "29 September 2026";

  const coverImage =
    post?.cover_image ||
    (post?.cover_image_path ? mediaUrl(post.cover_image_path) : "") ||
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-[70px]">
      {/* Kiri: Teks */}
      <div className="flex flex-col w-full md:w-1/2 max-w-[600px]">
        <span className="text-[#0CAD31] text-[12px] font-bold mb-4">{category}</span>
        <h1 className="text-black text-[32px] font-bold leading-tight mb-6">
          {title}
        </h1>
        <p className="text-black text-[12px] font-normal leading-relaxed mb-8">
          {excerpt}
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-[20px]">
          <div className="w-[40px] h-[40px] rounded-full bg-emerald-100 text-[#0CAD31] flex items-center justify-center shrink-0">
            <i className="fa-solid fa-user text-[18px]"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-black text-[12px] font-bold">Admin</span>
            <span className="text-black text-[12px] font-normal">{publishedDate}</span>
          </div>
        </div>
      </div>

      {/* Kanan: Gambar */}
      <div className="w-full md:w-1/2 xl:w-[514px] shrink-0 md:shrink">
        <div className="w-full aspect-[514/311] rounded-[10px] shadow-[4px_0_50px_rgba(0,0,0,0.25)] overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
