import { useState } from "react";

const faqs = [
  {
    question: "Apa itu Spontan Jualan dan siapa saja yang bisa menggunakannya?",
    answer: "Spontan Jualan adalah platform Point of Sales (POS) dan manajemen toko yang dirancang khusus untuk membantu UMKM, kedai kopi, restoran, hingga ritel dalam mencatat transaksi dan mengelola stok barang dengan mudah."
  },
  {
    question: "Apakah saya harus berlangganan untuk menggunakan fitur kasir?",
    answer: "Tidak. Anda bisa memulai dengan paket Gratis yang mencakup fitur kasir dasar. Untuk kebutuhan manajemen lanjutan dan laporan lengkap, Anda dapat beralih ke paket Premium kami."
  },
  {
    question: "Apa bedanya paket gratis dan paket berbayar?",
    answer: "Paket gratis memberikan akses fitur transaksi dengan batas tertentu, sedangkan paket berbayar memberikan akses fitur tak terbatas, manajemen multi-cabang, serta laporan keuangan yang mendetail."
  },
  {
    question: "Bagaimana cara mengecek laporan harian?",
    answer: "Laporan harian dapat dilihat secara real-time langsung melalui menu Dashboard atau Laporan di dalam aplikasi Anda, dan dapat diunduh (eksport) kapan saja."
  },
  {
    question: "Apakah data toko saya aman tersimpan di cloud?",
    answer: "Sangat aman. Spontan Jualan menggunakan enkripsi standar industri dan pencadangan otomatis. Jika perangkat Anda rusak atau hilang, data Anda tetap aman di cloud dan bisa diakses dari perangkat lain."
  },
  {
    question: "Bagaimana jika ada kendala atau pertanyaan lain?",
    answer: "Tim dukungan pelanggan kami siap membantu Anda. Anda dapat menghubungi kami melalui fitur Bantuan di aplikasi, email, atau layanan WhatsApp resmi yang tersedia 24/7."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-[50px]">
          
          {/* Kiri: Title */}
          <div className="w-full lg:w-auto shrink-0 mt-2">
            <h2 className="text-[60px] font-bold text-[#0CAD31] leading-none">
              FAQs
            </h2>
          </div>

          {/* Kanan: FAQ List */}
          <div className="w-full max-w-[854px] flex flex-col border-t border-black">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-black">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-[20px] flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-[16px] font-semibold text-black pr-4">
                    {faq.question}
                  </span>
                  <i 
                    className={`fa-solid fa-chevron-down text-black transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
                
                {/* Answer / Accordion Content */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-[500px] opacity-100 pb-[20px]" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[16px] font-normal text-gray-700 leading-relaxed pr-[30px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
