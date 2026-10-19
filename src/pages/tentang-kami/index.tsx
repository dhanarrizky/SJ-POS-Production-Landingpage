import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/Footer";
import MyTim from "../../components/tentang-kami/MyTim";
import KenapaKami from "../../components/tentang-kami/KenapaKami";
import DariKami from "../../components/tentang-kami/DariKami";
import Blog from "../../components/landing-page-utama/Blog";

export default function TentangKami() {
  return (
    <div className="w-full bg-[#F5FFF6] min-h-screen font-sans">
      <Navbar />
      <main>
        <MyTim />
        <KenapaKami />
        <DariKami />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
