import { Lock, ArrowLeft } from "lucide-react"
import logoUrl from "../../assets/logo.png"

interface DashboardLoginProps {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  loginError: string
  loggingIn: boolean
  onLogin: (e: React.FormEvent) => void
}

export default function DashboardLogin({
  email,
  setEmail,
  password,
  setPassword,
  loginError,
  loggingIn,
  onLogin,
}: DashboardLoginProps) {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative Grid Mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(12,173,49,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(12,173,49,0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand/5 blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="w-full max-w-md p-6 relative z-10 animate-float-a">
        {/* Logo brand */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={logoUrl}
            alt="Spontan Jualan Logo"
            className="w-14 h-14 object-contain mb-4 animate-float-s"
          />
          <h1 className="text-white text-2xl font-black tracking-tight">
            Admin SpontanJualan
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Gunakan kredensial pengelola untuk masuk ke dashboard
          </p>
        </div>

        {/* Form Panel */}
        <div className="glass rounded-[32px] p-8 border border-white/10 shadow-screen">
          <form onSubmit={onLogin} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
                Email Admin
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@spontanjualan.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand/40 focus:bg-white/8 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand/40 focus:bg-white/8 transition-all"
              />
            </div>

            {loginError && (
              <div className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl flex items-center gap-2">
                <span>⚠️</span> {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full inline-flex items-center justify-center gap-2 text-white font-bold py-4 rounded-2xl text-[0.95rem] btn-shimmer shadow-emerald-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Masuk Ke Dashboard <Lock size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-8 flex flex-col items-center gap-2">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={12} /> Kembali ke Landing Page
          </a>
        </div>
      </div>
    </div>
  )
}
