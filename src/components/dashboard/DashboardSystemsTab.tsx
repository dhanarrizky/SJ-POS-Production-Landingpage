
interface SystemStat {
  name: string
  count: number
  pct: number
}

interface DashboardSystemsTabProps {
  browsers: SystemStat[]
  os: SystemStat[]
}

export default function DashboardSystemsTab({
  browsers,
  os,
}: DashboardSystemsTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Browsers Card */}
      <div className="glass border border-white/8 rounded-3xl p-6 sm:p-8">
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400" /> Distribusi
          Browser
        </h3>

        <div className="space-y-4">
          {browsers.length === 0 ? (
            <div className="text-slate-500 text-xs text-center py-10">
              Belum ada data browser terkumpul.
            </div>
          ) : (
            browsers.map((b, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{b.name}</span>
                  <span className="text-slate-300 font-mono">
                    {b.count} ({b.pct}%)
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-violet-700 rounded-full"
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Top OS Card */}
      <div className="glass border border-white/8 rounded-3xl p-6 sm:p-8">
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400" /> Distribusi
          Sistem Operasi (OS)
        </h3>

        <div className="space-y-4">
          {os.length === 0 ? (
            <div className="text-slate-500 text-xs text-center py-10">
              Belum ada data OS terkumpul.
            </div>
          ) : (
            os.map((o, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white">{o.name}</span>
                  <span className="text-slate-300 font-mono">
                    {o.count} ({o.pct}%)
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-pink-700 rounded-full"
                    style={{ width: `${o.pct}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
