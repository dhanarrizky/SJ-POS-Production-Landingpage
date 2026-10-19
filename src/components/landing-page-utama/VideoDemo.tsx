export default function VideoDemo() {
  return (
    <section className="hidden w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        {/* Top Text Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-[50px]">
          <div>
            <h2 className="text-[40px] font-bold text-[#0CAD31] leading-tight">
              Lihat Spontan Jualan<br />Beraksi
            </h2>
          </div>
          <div>
            <p className="text-[20px] font-normal text-black leading-relaxed">
              Kenali cara Spontan Jualan membantu pemilik usaha mengelola bisnis dengan lebih mudah. 
              Dari mencatat transaksi hingga memantau operasional, semuanya dirancang sederhana 
              dan praktis untuk kebutuhan usaha sehari-hari.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="flex justify-center">
          <div className="w-full max-w-[916px] aspect-video rounded-[20px] overflow-hidden shadow-[0_4px_50px_rgba(0,0,0,0.25)] bg-gray-200">
            {/* Embed YouTube Video */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/BJxfee8_Q4k?si=TR19zEbsUgioPslX"
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
