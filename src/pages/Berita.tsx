import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderBerita from "../components/berita/HeaderBerita";
import DaftarBerita from "../components/berita/DaftarBerita";
import { useSEO, pageTitle } from "../hooks/useSEO";
import { pb } from "../lib/pocketbase";
import type { BlogPost } from "../types/cms";

export default function Berita() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useSEO({
    title: pageTitle("Blog"),
    description: "Kumpulan artikel, tips, dan trik seputar bisnis dan UMKM.",
  });

  const loadPosts = () => {
    pb.collection("blog_posts")
      .getFullList({
        sort: "-created",
        filter: "active = true",
        requestKey: null,
      })
      .then((records) => {
        setPosts(records as unknown as BlogPost[]);
      })
      .catch((err) => {
        console.warn("Gagal memuat blog_posts:", err);
      });
  };

  useEffect(() => {
    loadPosts();
    window.addEventListener("focus", loadPosts);
    return () => window.removeEventListener("focus", loadPosts);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5FFF6]">
      <Navbar />

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] pt-[50px] pb-[50px]">
        {/* Hero Blog Section */}
        <HeaderBerita posts={posts} />
      </main>

      {/* Daftar Semua Berita */}
      <DaftarBerita posts={posts} />

      <Footer />
    </div>
  );
}
