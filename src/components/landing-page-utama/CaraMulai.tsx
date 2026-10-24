import { useState, useEffect } from "react";
import { pb } from "../../lib/pocketbase";
import type { SiteSettings, CaraMulaiStep } from "../../types/cms";

interface CaraMulaiProps {
  siteSettings?: SiteSettings | null;
}

const DEFAULT_STEPS: CaraMulaiStep[] = [
  {
    title: "Daftar",
    description: "Buat akun Spontan Jualan dengan cepat dan mudah. Lengkapi data dasar usaha Anda untuk memulai."
  },
  {
    title: "Verifikasi",
    description: "Pastikan data usaha Anda sesuai dan lakukan proses verifikasi agar akun siap digunakan."
  },
  {
    title: "Pakai",
    description: "Akun siap digunakan. Kelola produk, transaksi, dan kebutuhan usaha Anda dengan lebih praktis bersama Spontan Jualan."
  }
];

export default function CaraMulai({ siteSettings: propSettings }: CaraMulaiProps = {}) {
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

  const badge = siteSettings?.cara_mulai_badge || "Cara Mulai";
  const title = siteSettings?.cara_mulai_title || "Siap Jualan dalam 3 Langkah Sederhana";

  let steps: CaraMulaiStep[] = DEFAULT_STEPS;
  if (siteSettings?.cara_mulai_steps) {
    if (Array.isArray(siteSettings.cara_mulai_steps) && siteSettings.cara_mulai_steps.length > 0) {
      steps = siteSettings.cara_mulai_steps;
    } else if (typeof siteSettings.cara_mulai_steps === "string") {
      try {
        const parsed = JSON.parse(siteSettings.cara_mulai_steps);
        if (Array.isArray(parsed) && parsed.length > 0) steps = parsed;
      } catch {}
    }
  }

  return (
    <section id="caramulai" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px] flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center">
          <h4 className="text-[16px] font-bold text-[#0CAD31] mb-2">{badge}</h4>
          <h2 className="text-[40px] font-bold text-black leading-tight whitespace-pre-line">
            {title}
          </h2>
        </div>

        {/* Steps Content */}
        <div className="flex flex-col md:flex-row justify-center items-start text-center mt-[50px] gap-[30px] w-full flex-wrap">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center w-full max-w-[280px] min-h-[300px] mx-auto">
              
              {/* Circle Number: Otomatis 1, 2, 3... */}
              <div className="w-[110px] h-[110px] rounded-full bg-[#0CAD31] flex items-center justify-center mb-[30px] shadow-sm shrink-0">
                <span className="text-[48px] font-bold text-white leading-none select-none">
                  {index + 1}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-[20px] font-bold text-black mb-[15px]">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-[16px] font-normal text-black leading-relaxed whitespace-pre-line">
                {step.description || step.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
