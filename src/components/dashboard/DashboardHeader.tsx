import { LogOut, Database } from "lucide-react"
import { pb } from "../../lib/pocketbase"
import { resolveSiteLogo } from "../../lib/media"
import logoUrl from "../../assets/logo.png"
import type { SiteSettings } from "../../types/cms"

interface DashboardHeaderProps {
  loadingData: boolean
  onRefresh: () => void
  onLogout: () => void
  siteSettings?: SiteSettings | null
}

export default function DashboardHeader({
  loadingData,
  onRefresh,
  onLogout,
  siteSettings,
}: DashboardHeaderProps) {
  const brandName = siteSettings?.site_name || "SpontanJualan"
  const logoImage = resolveSiteLogo(siteSettings, logoUrl)

  return (
    <header className="border-b border-white/8 py-4 px-6 sticky top-0 bg-[#060d19]/90 backdrop-blur-md z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden bg-white/5 border border-white/10 p-1">
            <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">
              {brandName}
            </h2>
            <p className="text-[10px] text-emerald-400 font-mono tracking-wider">
              ANALYTICS SYSTEM v1.0
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`${pb.baseUrl}/_/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 transition-all cursor-pointer"
          >
            PB Admin <Database size={13} />
          </a>
          <button
            onClick={onRefresh}
            disabled={loadingData}
            className="px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer disabled:opacity-50"
          >
            {loadingData ? "Memuat..." : "Refresh Data"}
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer"
          >
            Keluar <LogOut size={13} />
          </button>
        </div>
      </div>
    </header>
  )
}
