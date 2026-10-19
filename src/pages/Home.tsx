import { useEffect, useState, lazy, Suspense } from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import AboutUs from "../components/AboutUs"
import VideoDemo from "../components/VideoDemo"
import Features from "../components/Features"
import { pb } from "../lib/pocketbase"
import { useSEO } from "../hooks/useSEO"
import type {
  SiteSettings,
  Product,
  PricingPlan,
  FAQItem,
  Testimonial,
  BlogPost,
} from "../types/cms"

// Below-fold components: lazy loaded to reduce initial bundle
const EarlyPartner = lazy(() => import("../components/EarlyPartner"))
const Testimonials = lazy(() => import("../components/Testimonials"))
const HowItWorks = lazy(() => import("../components/HowItWorks"))
const FAQ = lazy(() => import("../components/FAQ"))
const Blog = lazy(() => import("../components/Blog"))
const Footer = lazy(() => import("../components/Footer"))

function SectionLoader() {
  return (
    <div className="py-20 flex justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin" />
    </div>
  )
}

export default function Home() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [faqs, setFaqs] = useState<FAQItem[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [
          settingsRecord,
          productsList,
          pricingPlansList,
          testimonialsList,
          faqsList,
          blogPostsList,
        ] = await Promise.all([
          pb
            .collection("site_settings")
            .getFirstListItem("")
            .catch(() => null),
          pb
            .collection("products")
            .getFullList({ filter: "active = true" })
            .catch(() => []),
          pb
            .collection("pricing_plans")
            .getFullList({ filter: "active = true", sort: "created" })
            .catch(() => []),
          pb
            .collection("testimonials")
            .getFullList({ filter: "active = true" })
            .catch(() => []),
          pb
            .collection("faqs")
            .getFullList({ filter: "active = true", sort: "sort_order" })
            .catch(() => []),
          pb
            .collection("blog_posts")
            .getFullList({ filter: "active = true", sort: "-created" })
            .catch(() => []),
        ])

        if (settingsRecord)
          setSiteSettings(settingsRecord as unknown as SiteSettings)
        setProducts(productsList as unknown as Product[])
        setPricingPlans(pricingPlansList as unknown as PricingPlan[])
        setTestimonials(testimonialsList as unknown as Testimonial[])
        setFaqs(faqsList as unknown as FAQItem[])
        setBlogPosts(blogPostsList as unknown as BlogPost[])
      } catch (err) {
        console.error("Failed to load CMS data, using local fallback", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useSEO({
    title:
      siteSettings?.site_title ||
      "Spontan Jualan — Kelola Usaha Lebih Mudah. Jualan Lebih Spontan.",
    description:
      siteSettings?.site_description ||
      "Satu ekosistem digital untuk membantu UMKM mengelola kasir, transaksi, pesanan, laundry, dan operasional usaha. Gratis 6 bulan pertama.",
  })

  const displaySettings: SiteSettings = siteSettings || {
    id: "default",
    site_name: "Spontan Jualan",
    brands: [
      "Toko Kelontong Berkah 🛒",
      "Warung Makan Barokah 🍜",
      "Laundry Express ⚡",
      "Kedai Kopi Nusantara ☕",
      "Distro Urban Style 👕",
      "Bakery Rumahan 🍞",
      "Mie Ayam Pak Andi 🍜",
    ],
    header_menu: [
      { label: "Tentang Kami", href: "#tentang" },
      { label: "Produk", href: "#produk" },
      { label: "Cara Mulai", href: "#cara-mulai" },
      { label: "Harga", href: "#harga" },
      { label: "FAQ", href: "#faq" },
      { label: "Blog", href: "#blog" },
    ],
    header_register_label: "Daftar",
    header_register_link: "#harga",
    contact_email: "spontan.jualan@spontan.com",
    show_trust_marquee: false,
  }

  const navLinks = displaySettings.header_menu || [
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Produk", href: "#produk" },
    { label: "Cara Mulai", href: "#cara-mulai" },
    { label: "Harga", href: "#harga" },
    { label: "FAQ", href: "#faq" },
    { label: "Blog", href: "#blog" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a1628] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
          <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
            Memuat Spontan Jualan...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800">
      <Header
        navLinks={navLinks}
        siteName={displaySettings.site_name}
        siteSettings={displaySettings}
      />
      <main>
        {/* Section 1: Hero */}
        <Hero siteSettings={displaySettings} />

        {/* Section 2: Tentang Kami */}
        <AboutUs siteSettings={displaySettings} />

        {/* Section 2b: Video Demo */}
        <VideoDemo siteSettings={displaySettings} />

        {/* Section 3: Produk (POS Retail, F&B, Laundry) */}
        <Features products={products} siteSettings={displaySettings} />

        {/* Below-fold: lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          {/* Section 4: Paket Harga */}
          <EarlyPartner
            pricingPlans={pricingPlans}
            siteSettings={displaySettings}
          />

          {/* Section 5: Cara Mulai */}
          <HowItWorks siteSettings={displaySettings} />

          {/* Section 6: Kisah Sukses / Testimonials */}
          <Testimonials
            testimonials={testimonials}
            siteSettings={displaySettings}
          />

          {/* Section 7: FAQ */}
          <FAQ faqs={faqs} />

          {/* Section 8: Blog */}
          <Blog posts={blogPosts} siteSettings={displaySettings} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer siteSettings={displaySettings} />
      </Suspense>
    </div>
  )
}
