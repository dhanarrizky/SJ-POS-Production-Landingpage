import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/Footer";
import ComingSoonTable from "../../components/bandingkan-paket/ComingSoonTable";

export default function BandingkanPaket() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5FFF6]">
      <Navbar />
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] pt-[30px] pb-[80px]">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] font-bold text-black mb-8">
          <Link to="/" className="hover:text-[#0CAD31] transition-colors">Beranda</Link>
          <i className="fa-solid fa-chevron-right text-[10px]"></i>
          <span>Produk & Paket</span>
        </div>

        <ComingSoonTable />
      </main>
      
      <Footer />
    </div>
  );
}
