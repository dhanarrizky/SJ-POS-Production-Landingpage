import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MyTim from "../components/tentang-kami/MyTim";
import KenapaKami from "../components/tentang-kami/KenapaKami";
import DariKami from "../components/tentang-kami/DariKami";
import Blog from "../components/landing-page-utama/Blog";
import { useSEO, pageTitle } from "../hooks/useSEO";
import { pb } from "../lib/pocketbase";
import type { SiteSettings } from "../types/cms";

export default function TentangKami() {
  useSEO({
    title: pageTitle("Tentang Kami"),
    description: "Mengenal lebih dekat tim dan perjalanan Spontan Jualan.",
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  const loadSettings = () => {
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => {
        setSiteSettings(record as unknown as SiteSettings);
      })
      .catch((err) => {
        console.error("Gagal memuat site_settings di TentangKami:", err);
      });
  };

  useEffect(() => {
    loadSettings();
    window.addEventListener("focus", loadSettings);
    return () => window.removeEventListener("focus", loadSettings);
  }, []);

  return (
    <div className="w-full bg-[#F5FFF6] min-h-screen font-sans">
      <Navbar />
      <main>
        <MyTim siteSettings={siteSettings} />
        <KenapaKami siteSettings={siteSettings} />
        <DariKami siteSettings={siteSettings} />
        <Blog siteSettings={siteSettings} />
      </main>
      <Footer />
    </div>
  );
}
