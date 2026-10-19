import { useState } from "react";

// Catalog Data
const catalog = [
  { id: 1, name: "Kopi Arabica", cat: "Minuman", price: 35000, emoji: "☕", stock: 42, hot: true },
  { id: 2, name: "Matcha Latte", cat: "Minuman", price: 40000, emoji: "🍵", stock: 28, hot: false },
  { id: 3, name: "Americano", cat: "Minuman", price: 28000, emoji: "🧊", stock: 55, hot: true },
  { id: 4, name: "Croissant", cat: "Makanan", price: 25000, emoji: "🥐", stock: 15, hot: false },
];

export default function POSMockup() {
  const [activeTab, setActiveTab] = useState<"Makanan" | "Minuman">("Minuman");
  const [cart, setCart] = useState([
    { id: 1, name: "Kopi Arabica", price: 35000, qty: 2, emoji: "☕" },
    { id: 2, name: "Matcha Latte", price: 40000, qty: 1, emoji: "🍵" },
  ]);
  const [payMode, setPayMode] = useState<"qris" | "cash">("qris");

  const filtered = catalog.filter((p) => p.cat === activeTab);

  const addToCart = (p: typeof catalog[0]) => {
    setCart((prev) => {
      const i = prev.findIndex((c) => c.id === p.id);
      if (i >= 0) return prev.map((c, idx) => (idx === i ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1, emoji: p.emoji }];
    });
  };

  const removeOne = (id: number) => {
    setCart((prev) => {
      const i = prev.findIndex((c) => c.id === id);
      if (i >= 0) {
        if (prev[i].qty > 1) return prev.map((c, idx) => (idx === i ? { ...c, qty: c.qty - 1 } : c));
        return prev.filter((c) => c.id !== id);
      }
      return prev;
    });
  };

  const totalQty = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div className="relative w-full lg:w-[406px] h-[328px] mx-auto z-0 mt-10 lg:mt-0 select-none">
      {/* Tablet / Browser Frame */}
      <div className="relative bg-[#F8FAFC] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 h-full w-full">
         {/* Top Bar (Browser/App Header) */}
         <div className="h-10 bg-[#0F172A] flex items-center px-4 gap-4 w-full absolute top-0 left-0 z-20">
           <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
           </div>
           <div className="text-gray-400 text-[11px] font-mono flex items-center gap-3">
             <span className="text-gray-300">⚡ spontanjualan</span> 
             <span className="text-gray-500">•</span>
             <span className="text-white font-sans flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 
                100 Mitra Pertama
             </span>
             <span className="text-gray-500">•</span>
             <span className="text-white font-sans">Early Partner</span>
           </div>
         </div>
         
         {/* Main Application Area */}
         <div className="flex h-full pt-10">
           {/* Kiri: Daftar Produk */}
           <div className="flex-1 p-4 bg-gray-50 flex flex-col gap-4 overflow-hidden">
             {/* Kategori */}
             <div className="flex gap-2">
               <button 
                 onClick={() => setActiveTab("Makanan")}
                 className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${activeTab === "Makanan" ? "bg-green-100 text-green-700 border-green-200" : "bg-white text-gray-500 border-gray-200 shadow-sm hover:bg-gray-50"}`}>
                 Makanan
               </button>
               <button 
                 onClick={() => setActiveTab("Minuman")}
                 className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${activeTab === "Minuman" ? "bg-green-100 text-green-700 border-green-200" : "bg-white text-gray-500 border-gray-200 shadow-sm hover:bg-gray-50"}`}>
                 Minuman
               </button>
             </div>
             
             {/* Grid Produk */}
             <div className="grid grid-cols-2 gap-3 overflow-y-auto content-start pr-1 custom-scrollbar">
                {filtered.map(p => (
                  <div key={p.id} onClick={() => addToCart(p)} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 relative cursor-pointer hover:border-[#0CAD31] hover:shadow-md transition-all group">
                     {p.hot && <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">HOT</span>}
                     <div className="w-10 h-10 bg-[#F3F4F6] group-hover:bg-green-50 rounded-lg mb-2 text-xl flex items-center justify-center transition-colors">{p.emoji}</div>
                     <h4 className="font-bold text-gray-800 text-xs">{p.name}</h4>
                     <p className="text-[#0CAD31] font-bold text-xs mt-0.5">Rp {p.price.toLocaleString("id-ID")}</p>
                     <p className="text-gray-400 text-[9px] mt-1">Stok: {p.stock}</p>
                  </div>
                ))}
             </div>
           </div>

           {/* Kanan: Sidebar Pesanan */}
           <div className="w-[180px] bg-white border-l border-gray-200 p-4 flex flex-col z-10 shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-gray-500 tracking-wider">PESANAN</span>
                <span className="w-4 h-4 bg-[#0CAD31] text-white text-[9px] flex items-center justify-center rounded-full font-bold">{totalQty}</span>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-gray-50 rounded border border-gray-100 flex items-center justify-center text-xs">{item.emoji}</div>
                    <div className="flex-1">
                      <h5 className="text-[10px] font-bold text-gray-800 truncate">{item.name}</h5>
                      <div className="flex justify-between items-center mt-0.5">
                        <div className="text-gray-400 text-[9px] font-medium flex gap-1.5 items-center">
                           <button onClick={() => removeOne(item.id)} className="w-3.5 h-3.5 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200 text-gray-600 font-bold cursor-pointer">−</button>
                           <span>{item.qty}</span>
                           <button onClick={() => addToCart(catalog.find(c => c.id === item.id)!)} className="w-3.5 h-3.5 flex items-center justify-center bg-[#0CAD31] rounded hover:bg-[#0a962a] text-white font-bold cursor-pointer">+</button>
                        </div>
                        <span className="text-[#0CAD31] font-bold text-[10px]">Rp {(item.price * item.qty).toLocaleString("id-ID").replace(",00", "")}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {cart.length === 0 && (
                   <div className="text-center text-[9px] text-gray-400 py-4 font-medium">Keranjang Kosong</div>
                )}
              </div>

              {/* Bagian Bawah Sidebar (Bayar) */}
              <div className="pt-3 border-t border-gray-100 mt-auto bg-white">
                <div className="flex gap-2 mb-2">
                  <button onClick={() => setPayMode("qris")} className={`flex-1 py-1.5 text-[9px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer ${payMode === "qris" ? "bg-[#0CAD31] text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                     <i className="fa-solid fa-qrcode"></i> QRIS
                  </button>
                  <button onClick={() => setPayMode("cash")} className={`flex-1 py-1.5 text-[9px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer ${payMode === "cash" ? "bg-[#0CAD31] text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                     <i className="fa-solid fa-money-bill"></i> Tunai
                  </button>
                </div>
                <button className="w-full py-2 bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold rounded-lg text-xs flex justify-center items-center shadow-md shadow-[#0CAD31]/20 transition-all cursor-pointer">
                  Bayar Sekarang
                </button>
              </div>
           </div>
         </div>
      </div>

      {/* Float Card Kiri: Periode Gratis */}
      <div className="hidden md:block absolute -left-4 sm:-left-12 top-16 bg-[#0F172A] text-white p-4 rounded-2xl shadow-xl w-[190px] z-30 border border-gray-800 transform -rotate-2 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-[#0CAD31] rounded-full"></div>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Periode Gratis</span>
        </div>
        <h3 className="text-xl font-extrabold mb-1">6 Bulan</h3>
        <p className="text-[10px] text-[#0CAD31] flex items-center justify-between font-medium">
          Tanpa kartu kredit <i className="fa-solid fa-check"></i>
        </p>
      </div>

      {/* Float Card Kanan: Pilih Produk */}
      <div className="hidden md:block absolute -right-4 sm:-right-8 bottom-12 bg-[#0F172A] text-white p-4 rounded-2xl shadow-xl w-[170px] z-30 border border-gray-800 pointer-events-none">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700/50">
          <i className="fa-solid fa-store text-gray-400 text-sm"></i>
          <span className="text-[11px] font-bold">Pilih Produk Anda</span>
        </div>
        <ul className="flex flex-col gap-2.5 text-[10px] font-bold text-gray-300">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0CAD31]"></div> POS Retail</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0CAD31]"></div> POS F&B</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0CAD31]"></div> POS Laundry</li>
        </ul>
      </div>
      
    </div>
  );
}
