import { Link } from "react-router-dom";

export default function HeaderDetailBerita() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-[70px]">
      {/* Kiri: Teks */}
      <div className="flex flex-col w-full md:w-1/2 max-w-[600px]">
        <span className="text-[#0CAD31] text-[12px] font-normal mb-4">Lorem Ipsum</span>
        <h1 className="text-black text-[32px] font-bold leading-tight mb-6">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit
        </h1>
        <p className="text-black text-[12px] font-normal leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-[20px]">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
            alt="Admin Profile"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-black text-[12px] font-bold">Admin</span>
            <span className="text-black text-[12px] font-normal">29 September 2026</span>
          </div>
        </div>
      </div>

      {/* Kanan: Gambar */}
      <div className="w-full md:w-1/2 xl:w-[514px] shrink-0 md:shrink">
        <div className="w-full aspect-[514/311] rounded-[10px] shadow-[4px_0_50px_rgba(0,0,0,0.25)] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"
            alt="Detail Berita"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
