import { Link, useLocation } from "react-router-dom";

export default function HeaderBerita() {
  const location = useLocation();
  return (
    <div className="flex flex-col xl:flex-row gap-8 xl:gap-[70px]">
      
      {/* Kiri: Featured Article */}
      <Link to="/berita/tren-umkm-2026" state={location.state} className="w-full xl:w-[60%] shrink-0 group relative rounded-[10px] overflow-hidden cursor-pointer shadow-lg block h-[400px] xl:h-[438px]">
        <img 
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop" 
          alt="Tren UMKM" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        {/* Content Kiri */}
        <div className="absolute bottom-0 left-0 w-full p-6 xl:p-8 flex flex-col items-start z-10">
          <div className="bg-white px-4 py-1.5 rounded-[5px] mb-4">
            <span className="text-[12px] font-bold text-black">Bisnis</span>
          </div>
          <h2 className="text-white text-[16px] font-bold leading-tight mb-3 drop-shadow-md">
            Tren UMKM Indonesia di 2026
          </h2>
          <p className="text-gray-200 text-[16px] font-normal max-w-[600px] drop-shadow-md leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Link>

      {/* Kanan: List Articles */}
      <div className="hidden md:grid md:grid-cols-3 xl:flex w-full xl:w-[40%] xl:flex-col gap-6 xl:gap-[30px]">
        
        {/* Article 1 */}
        <Link to="/berita/kelola-umkm-efisien" state={location.state} className="flex flex-col xl:flex-row items-start gap-4 lg:gap-6 group cursor-pointer">
          <div className="w-full xl:w-[181px] h-[200px] md:h-[160px] xl:h-[126px] rounded-[5px] overflow-hidden shrink-0 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop" 
              alt="Kelola UMKM" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <span className="text-[16px] font-normal text-gray-600 mb-2">9 September 2026</span>
            <h3 className="text-[20px] lg:text-[18px] xl:text-[20px] font-bold text-black leading-snug group-hover:text-[#0CAD31] transition-colors">
              Kelola UMKM Lebih Efisien dengan sistem Digital
            </h3>
          </div>
        </Link>

        {/* Article 2 */}
        <Link to="/berita/ai-senjata-baru" state={location.state} className="flex flex-col xl:flex-row items-start gap-4 lg:gap-6 group cursor-pointer">
          <div className="w-full xl:w-[181px] h-[200px] md:h-[160px] xl:h-[126px] rounded-[5px] overflow-hidden shrink-0 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=600&auto=format&fit=crop" 
              alt="AI Senjata Baru" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <span className="text-[16px] font-normal text-gray-600 mb-2">9 September 2026</span>
            <h3 className="text-[20px] lg:text-[18px] xl:text-[20px] font-bold text-black leading-snug group-hover:text-[#0CAD31] transition-colors">
              AI jadi Senjata Baru UMKM di 2026
            </h3>
          </div>
        </Link>

        {/* Article 3 */}
        <Link to="/berita/strategi-keuangan" state={location.state} className="flex flex-col xl:flex-row items-start gap-4 lg:gap-6 group cursor-pointer">
          <div className="w-full xl:w-[181px] h-[200px] md:h-[160px] xl:h-[126px] rounded-[5px] overflow-hidden shrink-0 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" 
              alt="Strategi Keuangan" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="flex flex-col justify-start w-full">
            <span className="text-[16px] font-normal text-gray-600 mb-2">9 September 2026</span>
            <h3 className="text-[20px] lg:text-[18px] xl:text-[20px] font-bold text-black leading-snug group-hover:text-[#0CAD31] transition-colors">
              Strategi Keuangan UMKM untuk Bisnis Berkelanjutan
            </h3>
          </div>
        </Link>

      </div>
    </div>
  );
}
