import { useState, useEffect } from "react"
import { Search, ShoppingCart, X } from "lucide-react"

// ─── Formatters ───────────────────────────────────────────────────────────────
export const rp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`

// ─── POS Catalog Data ─────────────────────────────────────────────────────────
export const catalog = [
  {
    id: 1,
    name: "Kopi Arabica",
    cat: "Minuman",
    price: 35000,
    emoji: "☕",
    stock: 42,
    hot: true,
  },
  {
    id: 2,
    name: "Matcha Latte",
    cat: "Minuman",
    price: 40000,
    emoji: "🍵",
    stock: 28,
    hot: false,
  },
  {
    id: 3,
    name: "Americano",
    cat: "Minuman",
    price: 28000,
    emoji: "☕",
    stock: 55,
    hot: true,
  },
  {
    id: 4,
    name: "Croissant",
    cat: "Makanan",
    price: 25000,
    emoji: "🥐",
    stock: 15,
    hot: false,
  },
  {
    id: 5,
    name: "Cheesecake",
    cat: "Makanan",
    price: 45000,
    emoji: "🍰",
    stock: 8,
    hot: true,
  },
  {
    id: 6,
    name: "Green Tea",
    cat: "Minuman",
    price: 32000,
    emoji: "🍵",
    stock: 33,
    hot: false,
  },
]

export type CartItem = {
  id: number
  name: string
  price: number
  qty: number
  emoji: string
}

export default function POSMockup() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Kopi Arabica", price: 35000, qty: 2, emoji: "☕" },
    { id: 2, name: "Matcha Latte", price: 40000, qty: 1, emoji: "🍵" },
  ])
  const [search, setSearch] = useState("")
  const [payMode, setPayMode] = useState<"qris" | "cash">("qris")
  const [activeTab, setActiveTab] = useState<"Semua" | "Minuman" | "Makanan">(
    "Semua",
  )

  // Responsive state inside browser preview frame
  const [isMobileLayout, setIsMobileLayout] = useState(false)
  const [showCartDrawer, setShowCartDrawer] = useState(false)

  useEffect(() => {
    const checkWidth = () => {
      // Check window width or frame width. Since it renders in a mockup container,
      // we check screen size < 640px to decide responsive mode.
      setIsMobileLayout(window.innerWidth < 640)
    }
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  const filtered = catalog.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeTab === "Semua" || p.cat === activeTab
    return matchesSearch && matchesCategory
  })

  const add = (p: typeof catalog[0]) => {
    setCart((prev) => {
      const i = prev.findIndex((c) => c.id === p.id)
      if (i >= 0)
        return prev.map((c, idx) => (idx === i ? { ...c, qty: c.qty + 1 } : c))
      return [
        ...prev,
        { id: p.id, name: p.name, price: p.price, qty: 1, emoji: p.emoji },
      ]
    })
  }

  const removeOne = (id: number) => {
    setCart((prev) => {
      const i = prev.findIndex((c) => c.id === id)
      if (i >= 0) {
        const item = prev[i]
        if (item.qty > 1) {
          return prev.map((c, idx) =>
            idx === i ? { ...c, qty: c.qty - 1 } : c,
          )
        }
        return prev.filter((c) => c.id !== id)
      }
      return prev
    })
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0)
  const tax = Math.round(total * 0.1)

  const renderCartItems = () => (
    <>
      {cart.map((item) => (
        <div
          key={item.id}
          className="bg-slate-50 rounded-lg p-1.5 flex items-start gap-1.5"
        >
          <span className="text-[14px]">{item.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-slate-700 truncate text-[10px]">
              {item.name}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <button
                onClick={() => removeOne(item.id)}
                className="w-4 h-4 rounded-md bg-white border border-slate-200 text-slate-500 flex items-center justify-center font-bold text-[11px] hover:bg-slate-100"
              >
                −
              </button>
              <span className="font-mono font-bold text-slate-700 text-[10px]">
                {item.qty}
              </span>
              <button
                onClick={() => add(catalog.find((p) => p.id === item.id)!)}
                className="w-4 h-4 rounded-md flex items-center justify-center font-bold text-white bg-brand text-[11px] hover:bg-brand-hover"
              >
                +
              </button>
            </div>
            <div className="font-mono font-bold mt-0.5 text-brand text-[10px]">
              {rp(item.price * item.qty)}
            </div>
          </div>
        </div>
      ))}
      {cart.length === 0 && (
        <div className="text-center text-slate-300 py-6 text-[10px]">
          Keranjang kosong
        </div>
      )}
    </>
  )

  const renderCartSummary = () => (
    <div className="space-y-1.5">
      <div className="flex justify-between text-slate-500 text-[10px]">
        <span>Subtotal</span>
        <span className="font-mono">{rp(total)}</span>
      </div>
      <div className="flex justify-between text-slate-500 text-[10px]">
        <span>PPN 10%</span>
        <span className="font-mono">{rp(tax)}</span>
      </div>
      <div className="flex justify-between font-bold text-slate-800 border-t border-slate-100 pt-1.5 text-[11px]">
        <span>Total</span>
        <span className="font-mono">{rp(total + tax)}</span>
      </div>

      <div className="grid grid-cols-2 gap-1 mt-1">
        {(["qris", "cash"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setPayMode(m)}
            className={`py-1 rounded-lg font-bold border transition-all text-[9px] cursor-pointer ${
              payMode === m
                ? "text-white border-transparent bg-brand"
                : "text-slate-500 border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            {m === "qris" ? "⚡ QRIS" : "💵 Tunai"}
          </button>
        ))}
      </div>

      <button className="w-full text-white font-bold py-2 rounded-xl transition-all hover:opacity-90 btn-shimmer text-[11px] cursor-pointer">
        Bayar Sekarang
      </button>
    </div>
  )

  return (
    <div className="flex h-full text-xs bg-slate-100 relative overflow-hidden">
      {/* Left: Catalog */}
      <div className="flex-1 flex flex-col min-w-0 pb-12 sm:pb-0">
        {/* Topbar */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-slate-100">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Search size={12} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="bg-transparent text-slate-600 text-[11px] outline-none placeholder-slate-400 flex-1"
            />
          </div>
          <button className="font-mono text-[10px] px-2 py-1 rounded-md font-semibold text-white bg-brand hover:bg-brand-hover cursor-pointer">
            + Produk
          </button>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 px-3 py-2 bg-white border-b border-slate-100">
          {(["Semua", "Minuman", "Makanan"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActiveTab(c)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all text-[10px] cursor-pointer ${
                activeTab === c
                  ? "text-white bg-brand"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto p-2.5 grid grid-cols-2 gap-2 content-start">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => add(p)}
              className="bg-white rounded-xl p-2.5 text-left border border-slate-100 hover:border-brand hover:shadow-md transition-all group relative cursor-pointer"
            >
              {p.hot && (
                <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-white font-bold bg-red-500 text-[8px]">
                  HOT
                </span>
              )}
              <div className="text-xl mb-1.5">{p.emoji}</div>
              <div className="font-semibold text-slate-700 leading-tight mb-0.5 text-[11px]">
                {p.name}
              </div>
              <div className="font-mono font-bold text-brand text-[11px]">
                {rp(p.price)}
              </div>
              <div className="text-slate-400 mt-0.5 text-[9px]">
                Stok: {p.stock}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel: Cart (Desktop only) */}
      {!isMobileLayout && (
        <div className="flex flex-col border-l border-slate-200 bg-white w-[156px]">
          {/* Header */}
          <div className="px-3 py-2.5 border-b border-slate-100 flex items-center justify-between">
            <span className="font-mono font-bold text-slate-700 text-[10px]">
              PESANAN
            </span>
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold font-mono bg-brand text-[9px]">
              {cart.length}
            </span>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto p-2 space-y-1.5">
            {renderCartItems()}
          </div>

          {/* Summary */}
          <div className="p-2.5 border-t border-slate-100 bg-white">
            {renderCartSummary()}
          </div>
        </div>
      )}

      {/* Floating Cart Button (Mobile only) */}
      {isMobileLayout && cart.length > 0 && (
        <button
          onClick={() => setShowCartDrawer(true)}
          className="absolute bottom-2.5 left-2.5 right-2.5 bg-brand hover:bg-brand-hover text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-between shadow-emerald animate-count-up z-20 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <ShoppingCart size={14} />
            <span className="font-semibold">Keranjang ({cart.length})</span>
          </span>
          <span className="font-mono font-bold">{rp(total + tax)}</span>
        </button>
      )}

      {/* Slide-up Drawer for Cart (Mobile only) */}
      {isMobileLayout && showCartDrawer && (
        <div className="absolute inset-0 bg-black/40 z-30 flex flex-col justify-end animate-count-up">
          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setShowCartDrawer(false)} />

          <div className="bg-white rounded-t-2xl p-4 flex flex-col max-h-[80%] border-t border-slate-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
              <span className="font-mono font-bold text-slate-700 text-[11px] flex items-center gap-2">
                <ShoppingCart size={14} className="text-brand" />
                PESANAN ({cart.length})
              </span>
              <button
                onClick={() => setShowCartDrawer(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer Items */}
            <div className="overflow-auto space-y-2 mb-4 pr-1">
              {renderCartItems()}
            </div>

            {/* Drawer Summary */}
            <div className="border-t border-slate-100 pt-3">
              {renderCartSummary()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
