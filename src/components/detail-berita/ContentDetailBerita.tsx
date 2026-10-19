import React from 'react';

export default function ContentDetailBerita() {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-10">
      
      {/* Kiri: Topik Artikel */}
      <div className="w-full xl:w-[220px] shrink-0 order-3 xl:order-1">
        <h3 className="text-[16px] font-bold text-black mb-[20px]">Topik artikel</h3>
        <div className="bg-[#0CAD31] rounded-[5px] px-[20px] py-[5px] flex flex-col">
          {["Strategi Bisnis", "Tips Jualan", "Ide Promosi", "Digital Marketing", "Bisnis UMKM", "Manajemen Bisnis"].map((item, index, arr) => (
            <div key={index} className={`py-[15px] ${index !== arr.length - 1 ? 'border-b border-white/50' : ''}`}>
              <a href="#" className="text-white text-[12px] font-medium hover:underline block">
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Tengah: Konten Artikel */}
      <div className="flex-1 max-w-[700px] xl:mx-auto order-2 xl:order-2">
        <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nunc vestibulum lorem, vitae facilisis justo erat sed nisi.
        </p>
        <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p className="text-[16px] font-normal text-black leading-relaxed mb-[20px]">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus, nunc vestibulum lorem, vitae facilisis justo erat sed nisi.
        </p>
        <p className="text-[16px] font-normal text-black leading-relaxed mb-[30px]">
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="w-full h-auto overflow-hidden rounded-[10px] mb-[30px]">
          <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop" alt="AI in Business" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Kanan: Share & Written By */}
      <div className="w-full xl:w-[250px] shrink-0 order-1 xl:order-3">
        <h3 className="text-[14px] font-bold text-black mb-[15px]">Share Artikel</h3>
        <div className="flex gap-[10px] mb-[40px]">
          <a href="#" className="w-[30px] h-[30px] rounded-full bg-[#0CAD31] flex items-center justify-center text-white hover:bg-green-700 transition-colors">
            <i className="fa-brands fa-instagram text-[14px]"></i>
          </a>
          <a href="#" className="w-[30px] h-[30px] rounded-full bg-[#0CAD31] flex items-center justify-center text-white hover:bg-green-700 transition-colors">
            <i className="fa-brands fa-facebook-f text-[14px]"></i>
          </a>
          <a href="#" className="w-[30px] h-[30px] rounded-full bg-[#0CAD31] flex items-center justify-center text-white hover:bg-green-700 transition-colors">
            <i className="fa-brands fa-x-twitter text-[14px]"></i>
          </a>
        </div>

        <h3 className="text-[14px] font-bold text-black mb-[15px]">Written by</h3>
        <div className="flex items-center gap-[15px] mb-[15px]">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" alt="Admin" className="w-[40px] h-[40px] rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-black">Admin</span>
            <span className="text-[12px] font-normal text-gray-500">29 September 2026</span>
          </div>
        </div>
        <p className="text-[12px] font-normal text-gray-600 leading-relaxed italic">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        </p>
      </div>
      
    </div>
  );
}
