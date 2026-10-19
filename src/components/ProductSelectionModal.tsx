import { CSSProperties } from "react"
import { X, Globe, Smartphone } from "lucide-react"

export interface SelectedProduct {
  title: string
  accentColor?: string
  loginUrl: string
}

interface ProductSelectionModalProps {
  product: SelectedProduct | null
  onClose: () => void
}

export default function ProductSelectionModal({
  product,
  onClose,
}: ProductSelectionModalProps) {
  if (!product) return null

  const accentColor = product.accentColor || "#10b981"
  const accentBgHover = `${accentColor}10`
  const accentBg = `${accentColor}15`

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl relative overflow-hidden p-6 sm:p-8 flex flex-col gap-6 transform transition-all duration-300 scale-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
          aria-label="Tutup modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center">
          <h3 className="text-xl font-black text-slate-900 leading-tight">
            Pilih Platform {product.title}
          </h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Mulai kelola usaha Anda dengan versi web di browser, atau unduh
            aplikasi mobile untuk perangkat Android Anda.
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          {/* Option 1: Web App */}
          <a
            href={product.loginUrl}
            className="group border border-slate-150 rounded-2xl p-4 flex items-start gap-4 transition-all duration-200 hover:border-[var(--accent-color)] hover:bg-[var(--accent-bg-hover)] cursor-pointer text-left"
            style={
              {
                "--accent-color": accentColor,
                "--accent-bg-hover": accentBgHover,
              } as CSSProperties
            }
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors bg-[var(--accent-bg)] text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white"
              style={
                {
                  "--accent-bg": accentBg,
                  "--accent-color": accentColor,
                } as CSSProperties
              }
            >
              <Globe size={20} />
            </div>
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-slate-800 group-hover:text-[var(--accent-color)] transition-colors"
                style={
                  {
                    "--accent-color": accentColor,
                  } as CSSProperties
                }
              >
                Gunakan Versi Web
              </h4>
              <p className="text-slate-400 text-xs mt-1 leading-normal">
                Akses cepat melalui browser laptop, tablet, atau PC.
              </p>
            </div>
          </a>

          {/* Option 2: Mobile App (Playstore) */}
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-slate-150 rounded-2xl p-4 flex items-start gap-4 transition-all duration-200 hover:border-[var(--accent-color)] hover:bg-[var(--accent-bg-hover)] cursor-pointer text-left"
            style={
              {
                "--accent-color": accentColor,
                "--accent-bg-hover": accentBgHover,
              } as CSSProperties
            }
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Smartphone size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                Unduh Aplikasi Android
              </h4>
              <p className="text-slate-400 text-xs mt-1 leading-normal">
                Instal dari Google Play Store khusus untuk smartphone kasir
                Anda.
              </p>
            </div>
          </a>
        </div>

        {/* Footer info */}
        <p className="text-center text-[10px] text-slate-400">
          Versi Web dan Mobile saling terhubung secara real-time.
        </p>
      </div>
    </div>
  )
}
