import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeaderDetailBerita from "../components/detail-berita/HeaderDetailBerita";
import ContentDetailBerita from "../components/detail-berita/ContentDetailBerita";
import { useSEO, pageTitle } from "../hooks/useSEO";
import { pb } from "../lib/pocketbase";
import type { BlogPost } from "../types/cms";

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "sjzytd9s364vzqn",
    slug: "tren-umkm-indonesia-2026",
    title: "Tren UMKM Indonesia di 2026",
    category: "Bisnis",
    published_date: "29 September 2026",
    excerpt: "Rangkuman tren dan strategi terkini yang membentuk arah pertumbuhan bisnis UMKM di era digital.",
    content: `# Tren UMKM Indonesia di 2026\n\nPerkembangan ekonomi digital di Indonesia membuka peluang luar biasa bagi para pelaku usaha mikro, kecil, dan menengah (UMKM). Di tahun 2026, adopsi teknologi bukan lagi sekadar pilihan alternatif, melainkan kebutuhan mendasar untuk bertahan dan bertumbuh secara berkelanjutan.\n\n## 1. Digitalisasi Pencatatan Kasir & Keuangan\n\nBanyak pelaku usaha yang sebelumnya bergantung pada pembukuan kertas mulai beralih menggunakan aplikasi kasir pintar berbasis cloud. Dengan sistem digital, pemilik usaha dapat memantau transaksi harian, mengontrol stok barang secara real-time, dan meminimalisir risiko selisih kas.\n\n## 2. Pemanfaatan Artificial Intelligence (AI) untuk Operasional\n\nPenerapan kecerdasan buatan kini semakin terjangkau dan ramah pengguna. UMKM dapat menggunakan AI untuk menganalisis kebiasaan belanja pelanggan, memprediksi kebutuhan stok menjelang periode puncak belanja, hingga membuat konten promosi menarik secara otomatis.\n\n> "Kunci keberhasilan UMKM di era modern adalah kemampuan beradaptasi cepat dengan teknologi tanpa meninggalkan sentuhan pelayanan personal kepada pelanggan."\n\n## 3. Strategi Pembayaran Digital Terpadu\n\nMetode pembayaran digital seperti QRIS, e-wallet, dan transfer bank instan semakin diminati oleh konsumen. Menyediakan beragam pilihan pembayaran yang cepat dan aman terbukti mampu meningkatkan volume penjualan serta memberikan kenyamanan maksimal bagi para pembeli.`,
    cover_image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop",
    author_name: "Admin",
    author_role: "Spontan Jualan Team",
    author_avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    author_quote: "Spontan Jualan berkomitmen memberikan solusi digital yang sederhana, praktis, dan sesuai dengan kebutuhan UMKM Indonesia.",
    active: true,
  },
  {
    id: "q6k9nkm6oynq2ho",
    slug: "ai-jadi-senjata-baru-umkm-2026",
    title: "AI Jadi Senjata Baru UMKM di 2026",
    category: "AI",
    published_date: "29 September 2026",
    excerpt: "Bagaimana pelaku UMKM mulai memanfaatkan AI untuk mempercepat operasional dan pengambilan keputusan.",
    content: `# AI Jadi Senjata Baru UMKM di 2026\n\nKecerdasan Buatan (AI) kini bukan lagi konsumsi perusahaan teknologi raksasa saja. Pelaku UMKM di berbagai sektor mulai merasakan efisiensi nyata berkat pemanfaatan teknologi cerdas ini dalam aktivitas bisnis sehari-hari.\n\n## Otomasi Percakapan & Pelayanan Konsumen\n\nDengan chatbot cerdas dan balasan otomatis, pertanyaan pelanggan seputar ketersediaan produk, jam operasional, dan info harga dapat dijawab dalam hitungan detik 24/7 tanpa henti.\n\n## Prediksi Pembelian & Analisis Data\n\nAI membantu membedah riwayat transaksi penjualan untuk mengetahui produk apa yang paling laris, jam-jam sibuk toko, hingga pola belanja pelanggan setia.`,
    cover_image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=800&auto=format&fit=crop",
    author_name: "Admin",
    author_role: "Spontan Jualan Team",
    author_avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    author_quote: "Kecerdasan buatan dirancang bukan untuk menggantikan manusia, melainkan untuk melipatgandakan kecepatan dan efisiensi usaha Anda.",
    active: true,
  },
  {
    id: "9lomm7ygcs1s3o8",
    slug: "kelola-umkm-lebih-efisien-sistem-digital",
    title: "Kelola UMKM Lebih Efisien dengan Sistem Digital",
    category: "Manajemen",
    published_date: "29 September 2026",
    excerpt: "Sistem digital membantu pemilik usaha mengelola operasional harian dengan lebih rapi dan efisien.",
    content: `# Kelola UMKM Lebih Efisien dengan Sistem Digital\n\nManajemen operasional yang rapi adalah fondasi utama bagi bisnis yang ingin membuka cabang baru atau memperluas skala usaha.\n\n## Monitoring dari Mana Saja\n\nSistem kasir berbasis cloud memungkinkan pemilik usaha memantau kinerja toko langsung dari ponsel secara real-time, baik saat sedang bepergian maupun beristirahat di rumah.\n\n## Pengelolaan Inventaris Akurat\n\nStok barang masuk dan keluar langsung terpotong otomatis setiap kali terjadi transaksi penjualan, mencegah kehabisan barang maupun kerugian akibat selisih stok.`,
    cover_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    author_name: "Admin",
    author_role: "Spontan Jualan Team",
    author_avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    author_quote: "Pengelolaan yang tertib dan transparan adalah kunci utama agar bisnis kecil dapat berkembang menjadi bisnis besar.",
    active: true,
  },
  {
    id: "z1hovcuxtqs8ots",
    slug: "strategi-keuangan-umkm-bisnis-berkelanjutan",
    title: "Strategi Keuangan UMKM untuk Bisnis Berkelanjutan",
    category: "Keuangan",
    published_date: "29 September 2026",
    excerpt: "Langkah-langkah pengelolaan keuangan yang membantu usaha bertahan dan berkembang jangka panjang.",
    content: `# Strategi Keuangan UMKM untuk Bisnis Berkelanjutan\n\nBanyak usaha yang memiliki omzet besar namun mengalami masalah likuiditas karena pengelolaan arus kas yang kurang disiplin.\n\n## Pisahkan Rekening Usaha dan Pribadi\n\nLangkah pertama yang wajib dilakukan adalah memisahkan uang pribadi dengan uang kas operasional usaha agar perhitungan laba bersih menjadi akurat.\n\n## Siapkan Dana Darurat Usaha\n\nSisihkan 10-15% dari keuntungan bulanan sebagai dana cadangan darurat untuk mengantisipasi penurunan penjualan mendadak atau perbaikan mesin operasional.`,
    cover_image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
    author_name: "Admin",
    author_role: "Spontan Jualan Team",
    author_avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    author_quote: "Disiplin finansial hari ini adalah jaminan ketahanan dan kemakmuran usaha Anda di masa depan.",
    active: true,
  },
  {
    id: "5u3vjl3ehsdd889",
    slug: "teknologi-digital-wajib-dipahami-umkm",
    title: "Teknologi Digital yang Wajib Dipahami UMKM",
    category: "Teknologi",
    published_date: "29 September 2026",
    excerpt: "Beberapa teknologi digital dasar yang sebaiknya dipahami pemilik usaha di era sekarang.",
    content: `# Teknologi Digital yang Wajib Dipahami UMKM\n\nMemahami teknologi tepat guna akan memberikan keunggulan kompetitif bagi usaha Anda di tengah persaingan pasar yang kian ketat.\n\n## Point of Sale (POS) Modern\n\nAplikasi POS modern tidak hanya mencetak struk belanja, tetapi juga terhubung langsung dengan laporan laba rugi, manajemen meja, dan sistem pesanan dapur.\n\n## Integrasi Saluran Penjualan (Omnichannel)\n\nMenghubungkan toko fisik dengan penjualan online di marketplace dan media sosial mempermudah pelanggan menemukan dan membeli produk Anda.`,
    cover_image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
    author_name: "Admin",
    author_role: "Spontan Jualan Team",
    author_avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    author_quote: "Jangan takut mencoba teknologi baru. Mulailah dari langkah kecil yang langsung berdampak nyata pada toko Anda.",
    active: true,
  },
];

export default function DetailBerita() {
  const { slug } = useParams<{ slug: string }>();

  // Match initial fallback post synchronously based on slug or numeric index
  const initialFallback = useMemo(() => {
    if (!slug) return DEFAULT_POSTS[0];

    // Check if slug is a number (e.g. "1", "2", "3")
    const numIdx = parseInt(slug, 10);
    if (!isNaN(numIdx) && numIdx >= 1 && numIdx <= DEFAULT_POSTS.length) {
      return DEFAULT_POSTS[numIdx - 1];
    }

    // Match exact slug or ID in default list
    const found = DEFAULT_POSTS.find(
      (p) => p.slug === slug || p.id === slug || (slug.includes(p.slug || "") && p.slug)
    );
    return found || DEFAULT_POSTS[0];
  }, [slug]);

  const [post, setPost] = useState<BlogPost>(initialFallback);
  const [allPosts, setAllPosts] = useState<BlogPost[]>(DEFAULT_POSTS);

  useSEO({
    title: pageTitle(post?.title || "Detail Blog"),
    description: post?.excerpt || "Baca artikel menarik seputar bisnis, UMKM, dan teknologi kasir.",
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        // 1. Load all active posts for the sidebar/topic navigation
        const allRecords = await pb
          .collection("blog_posts")
          .getFullList({
            sort: "-created",
            filter: "active = true",
            requestKey: null,
          })
          .catch(() => []);

        if (isMounted && allRecords.length > 0) {
          setAllPosts(allRecords as unknown as BlogPost[]);
        }

        // 2. Resolve target post
        let resolved: BlogPost | null = null;

        if (slug) {
          const num = parseInt(slug, 10);
          if (!isNaN(num) && num >= 1) {
            // Numeric index lookup
            if (allRecords.length >= num) {
              resolved = allRecords[num - 1] as unknown as BlogPost;
            } else if (DEFAULT_POSTS.length >= num) {
              resolved = DEFAULT_POSTS[num - 1];
            }
          }

          if (!resolved) {
            // Try slug lookup in loaded records first
            const inLoaded = (allRecords as unknown as BlogPost[]).find(
              (p) => p.slug === slug || p.id === slug
            );
            if (inLoaded) resolved = inLoaded;
          }

          if (!resolved) {
            // Direct PB query by slug
            try {
              const bySlug = await pb
                .collection("blog_posts")
                .getFirstListItem(`slug = "${slug}"`, { requestKey: null });
              if (bySlug) resolved = bySlug as unknown as BlogPost;
            } catch {
              // Direct PB query by ID
              try {
                const byId = await pb
                  .collection("blog_posts")
                  .getOne(slug, { requestKey: null });
                if (byId) resolved = byId as unknown as BlogPost;
              } catch {
                resolved = null;
              }
            }
          }
        }

        if (isMounted) {
          if (resolved) {
            setPost(resolved);
          } else {
            // Fallback gracefully to matching default or first post
            setPost(initialFallback);
          }
        }
      } catch (err) {
        console.warn("Gagal memuat artikel detail dari database, menggunakan fallback:", err);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [slug, initialFallback]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />

      {/* Bagian Atas: Background hijau muda */}
      <div className="bg-[#F5FFF6] w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] pt-[50px] pb-[50px]">
          {/* Header Artikel Judul */}
          <HeaderDetailBerita post={post} />
        </div>
      </div>

      {/* Bagian Bawah: Background putih */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] py-[50px]">
        {/* Konten Artikel */}
        <ContentDetailBerita post={post} allPosts={allPosts} />
      </main>

      <Footer />
    </div>
  );
}
