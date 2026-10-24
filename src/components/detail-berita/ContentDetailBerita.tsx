import React from 'react';
import type { BlogPost } from '../../types/cms';

interface ContentDetailBeritaProps {
  post?: BlogPost | null;
  allPosts?: BlogPost[];
}

export default function ContentDetailBerita({ post, allPosts = [] }: ContentDetailBeritaProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const postTitle = post?.title || 'Artikel Spontan Jualan';

  // Dynamic unique topics from existing posts
  const topics = React.useMemo(() => {
    const defaultTopics = ["Strategi Bisnis", "Tips Jualan", "Ide Promosi", "Digital Marketing", "Bisnis UMKM", "Manajemen Bisnis"];
    const safePosts = Array.isArray(allPosts) ? allPosts : [];
    const fromPosts = safePosts.map((p) => p?.category).filter(Boolean) as string[];
    const combined = Array.from(new Set([...fromPosts, ...defaultTopics]));
    return combined.slice(0, 6);
  }, [allPosts]);

  // Social share handlers
  const handleShare = (platform: 'ig' | 'fb' | 'tw') => {
    if (typeof window === 'undefined') return;
    if (platform === 'ig') {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl);
      }
      alert('Tautan artikel berhasil disalin!');
    } else if (platform === 'fb') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    } else if (platform === 'tw') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(postTitle)}`, '_blank');
    }
  };

  const publishedDate = post?.published_date || "29 September 2026";

  // Check if content is HTML from RichTextEditor (contains tags like <p>, <h2>, <div>, etc.)
  const isHtml = post?.content && /<[a-z][\s\S]*>/i.test(post.content);

  return (
    <div className="flex flex-col xl:flex-row justify-between gap-10">
      
      {/* Kiri: Topik Artikel */}
      <div className="w-full xl:w-[220px] shrink-0 order-3 xl:order-1">
        <h3 className="text-[16px] font-bold text-black mb-[20px]">Topik artikel</h3>
        <div className="bg-[#0CAD31] rounded-[5px] px-[20px] py-[5px] flex flex-col">
          {topics.map((item, index, arr) => (
            <div key={index} className={`py-[15px] ${index !== arr.length - 1 ? 'border-b border-white/50' : ''}`}>
              <a href="/berita" className="text-white text-[12px] font-medium hover:underline block">
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Tengah: Konten Artikel */}
      <div className="flex-1 max-w-[700px] xl:mx-auto order-2 xl:order-2">
        {post?.content ? (
          isHtml ? (
            <div
              className="rich-content font-poppins text-base leading-6 text-black"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="space-y-[20px] text-[16px] font-normal text-black leading-relaxed">
              {post.content.split(/\n\s*\n/).map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          )
        ) : (
          <>
            <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nunc vestibulum lorem, vitae facilisis justo erat sed nisi.
            </p>
            <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nunc vestibulum lorem, vitae facilisis justo erat sed nisi.
            </p>
            <p className="text-[16px] font-normal text-black leading-relaxed mb-[30px]">
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </>
        )}
      </div>

      {/* Kanan: Share & Written By */}
      <div className="w-full xl:w-[250px] shrink-0 order-1 xl:order-3">
        <h3 className="text-[14px] font-bold text-black mb-[15px]">Share Artikel</h3>
        <div className="flex gap-[10px] mb-[40px]">
          <button
            type="button"
            onClick={() => handleShare('ig')}
            title="Bagikan ke Instagram / Salin Tautan"
            className="w-[30px] h-[30px] rounded-full bg-[#0CAD31] flex items-center justify-center text-white hover:bg-green-700 transition-colors cursor-pointer"
          >
            <i className="fa-brands fa-instagram text-[14px]"></i>
          </button>
          <button
            type="button"
            onClick={() => handleShare('fb')}
            title="Bagikan ke Facebook"
            className="w-[30px] h-[30px] rounded-full bg-[#0CAD31] flex items-center justify-center text-white hover:bg-green-700 transition-colors cursor-pointer"
          >
            <i className="fa-brands fa-facebook-f text-[14px]"></i>
          </button>
          <button
            type="button"
            onClick={() => handleShare('tw')}
            title="Bagikan ke X / Twitter"
            className="w-[30px] h-[30px] rounded-full bg-[#0CAD31] flex items-center justify-center text-white hover:bg-green-700 transition-colors cursor-pointer"
          >
            <i className="fa-brands fa-x-twitter text-[14px]"></i>
          </button>
        </div>

        <h3 className="text-[14px] font-bold text-black mb-[15px]">Written by</h3>
        <div className="flex items-center gap-[15px] mb-[15px]">
          <div className="w-[40px] h-[40px] rounded-full bg-emerald-100 text-[#0CAD31] flex items-center justify-center shrink-0">
            <i className="fa-solid fa-user text-[18px]"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-black">Admin</span>
            <span className="text-[12px] font-normal text-gray-500">{publishedDate}</span>
          </div>
        </div>
        <p className="text-[12px] font-normal text-gray-600 leading-relaxed italic">
          "{post?.author_quote || "Spontan Jualan berkomitmen memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia."}"
        </p>
      </div>
      
    </div>
  );
}
