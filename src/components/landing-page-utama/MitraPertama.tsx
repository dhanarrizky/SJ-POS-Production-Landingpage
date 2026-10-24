import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { pb } from "../../lib/pocketbase";
import type { SiteSettings } from "../../types/cms";

interface MitraPertamaProps {
  siteSettings?: SiteSettings | null;
}

export default function MitraPertama({ siteSettings: propSettings }: MitraPertamaProps = {}) {
  const [internalSettings, setInternalSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (propSettings) return;
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => {
        setInternalSettings(record as unknown as SiteSettings);
      })
      .catch(() => {});
  }, [propSettings]);

  const siteSettings = propSettings || internalSettings;

  const badge = siteSettings?.mitra_pertama_badge || "100 Bisnis Pertama";
  const title = siteSettings?.mitra_pertama_title || "Bukan Sekadar Menggunakan.\nIkut Membentuk.";
  const desc =
    siteSettings?.mitra_pertama_desc ||
    "Spontan Jualan membangun solusi untuk bisnis Indonesia, dimulai dari kebutuhan sehari-hari yang praktis. Pengalaman dan kebutuhan Anda akan menjadi bagian dari perjalanan kami.";

  return (
    <section className="w-full bg-[#F5FFF6] py-[60px] md:py-[100px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        <div className="bg-[#012708] rounded-[20px] p-8 md:p-[60px] flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
          
          {/* Ornamen Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
          
          {/* Kiri: Teks */}
          <div className="flex-1 text-white z-10 text-center lg:text-left">
            {badge && (
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
                <h4 className="text-[12px] md:text-[14px] font-bold text-white uppercase tracking-wider">
                  {badge}
                </h4>
              </div>
            )}
            <h2 className="text-[32px] md:text-[40px] font-bold leading-tight mb-4 whitespace-pre-line">
              {title}
            </h2>
            <p className="text-[16px] md:text-[18px] font-normal mb-0 text-emerald-50 leading-relaxed max-w-[550px] mx-auto lg:mx-0 whitespace-pre-line">
              {desc}
            </p>
          </div>
          
          {/* Kanan: CTA */}
          <div className="z-10 shrink-0 w-full md:w-auto flex justify-center">
            <Link 
              to="#harga"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#0CAD31] font-bold px-8 py-4 rounded-[100px] hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl active:scale-95 text-[16px] w-full sm:w-auto"
            >
              Gabung sebagai Mitra Awal
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}

