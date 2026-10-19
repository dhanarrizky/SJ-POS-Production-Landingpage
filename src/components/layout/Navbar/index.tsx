import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoUrl from "../../../assets/logo.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white flex flex-col font-sans sticky top-0 md:top-[-64px] z-50">
      {/* Baris Atas: Logo & Kontak (Hidden on mobile) */}
      <div className="w-full border-b border-gray-200 bg-white hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px] h-16 flex justify-between items-center">
          {/* Kiri: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="Spontan Jualan" className="h-10" />
            <span className="font-bold text-black text-[16px] tracking-tight">SpontanJualan</span>
          </Link>

          {/* Kanan: Email & Sosial Media */}
          <div className="flex items-center gap-6 text-[16px] font-bold text-black">
            <span>spontanjualan@gmail.com</span>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:text-[#0CAD31] hover:border-[#0CAD31] transition-colors">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:text-[#0CAD31] hover:border-[#0CAD31] transition-colors">
                <i className="fa-brands fa-whatsapp text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:text-[#0CAD31] hover:border-[#0CAD31] transition-colors">
                <i className="fa-brands fa-youtube text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Baris Bawah: Navigasi & Tombol Aksi */}
      <div className="w-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px] h-16 flex justify-between items-center">
          
          {/* Mobile Logo (Visible only on mobile since top bar is hidden) */}
          <div className="md:hidden flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoUrl} alt="Spontan Jualan" className="h-10" />
              <span className="font-bold text-black text-[16px] tracking-tight">SpontanJualan</span>
            </Link>
          </div>

          {/* Link Navigasi Kiri (Desktop) */}
          <ul className="hidden md:flex flex-wrap items-center gap-4 lg:gap-7 text-[14px] lg:text-[16px] font-bold text-black">
            <li><Link to="/#tentang" className="hover:text-[#0CAD31] transition-colors">Tentang Kami</Link></li>
            <li><Link to="/#produk" className="hover:text-[#0CAD31] transition-colors">Produk</Link></li>
            <li><Link to="/#harga" className="hover:text-[#0CAD31] transition-colors">Harga</Link></li>
            <li><Link to="/#caramulai" className="hover:text-[#0CAD31] transition-colors">Cara Mulai</Link></li>
            <li><Link to="/#faq" className="hover:text-[#0CAD31] transition-colors">FAQ</Link></li>
            <li className="hidden"><Link to="/#blog" className="hover:text-[#0CAD31] transition-colors">Blog</Link></li>
            <li><Link to="/#harga" className="text-[#0CAD31] hover:text-green-700 transition-colors">[Coba Gratis]</Link></li>
          </ul>

          {/* Tombol Kanan (Desktop) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link to="/bandingkan-paket" className="font-bold text-black hover:text-[#0CAD31] transition-colors text-[14px] lg:text-[16px]">Log in</Link>
            <Link to="/bandingkan-paket" className="bg-[#0CAD31] hover:bg-[#0a962a] text-white font-bold px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg transition-colors text-[14px] lg:text-[16px]">
              Daftar
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button 
            className="md:hidden flex items-center justify-center text-black hover:text-[#0CAD31] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col z-40">
          <ul className="flex flex-col px-4 py-4 gap-4 text-[16px] font-bold text-black">
            <li><Link to="/#tentang" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#0CAD31] transition-colors">Tentang Kami</Link></li>
            <li><Link to="/#produk" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#0CAD31] transition-colors">Produk</Link></li>
            <li><Link to="/#harga" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#0CAD31] transition-colors">Harga</Link></li>
            <li><Link to="/#caramulai" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#0CAD31] transition-colors">Cara Mulai</Link></li>
            <li><Link to="/#faq" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#0CAD31] transition-colors">FAQ</Link></li>
            <li className="hidden"><Link to="/#blog" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-[#0CAD31] transition-colors">Blog</Link></li>
            <li><Link to="/#harga" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#0CAD31] hover:text-green-700 transition-colors">[Coba Gratis]</Link></li>
          </ul>
          <div className="flex flex-col gap-3 px-4 py-6 border-t border-gray-200">
            <Link to="/bandingkan-paket" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center font-bold text-black hover:text-[#0CAD31] transition-colors py-2 border border-gray-300 rounded-lg">Log in</Link>
            <Link to="/bandingkan-paket" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-[#0CAD31] hover:bg-[#0a962a] text-white font-bold py-3 rounded-lg transition-colors">
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
