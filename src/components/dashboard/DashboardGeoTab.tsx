
interface GeoStat {
  name: string
  count: number
  pct: number
}

interface DashboardGeoTabProps {
  countries: GeoStat[]
  cities: GeoStat[]
}

export default function DashboardGeoTab({
  countries,
  cities,
}: DashboardGeoTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Countries Card */}
      <div className="glass border border-white/8 rounded-3xl p-6 sm:p-8">
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand" /> Negara
          Pengunjung Terbanyak
        </h3>

        <div className="space-y-4">
          {countries.length === 0 ? (
            <div className="text-slate-500 text-xs text-center py-10">
              Belum ada data geografis terkumpul.
            </div>
          ) : (
            countries.slice(0, 10).map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[10px]">
                      #{i + 1}
                    </span>{" "}
                    {c.name}
                  </span>
                  <span className="text-slate-300 font-mono">
                    {c.count} kunjungan ({c.pct}%)
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-brand to-brand-dark rounded-full transition-all duration-1000"
                    style={{ width: `${c.pct}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Top Cities Card */}
      <div className="glass border border-white/8 rounded-3xl p-6 sm:p-8">
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Wilayah /
          Kota Pengunjung Terbanyak
        </h3>

        <div className="space-y-4">
          {cities.length === 0 ? (
            <div className="text-slate-500 text-xs text-center py-10">
              Belum ada data kota terkumpul.
            </div>
          ) : (
            cities.slice(0, 10).map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-white flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[10px]">
                      #{i + 1}
                    </span>{" "}
                    {c.name}
                  </span>
                  <span className="text-slate-300 font-mono">
                    {c.count} kunjungan ({c.pct}%)
                  </span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-full transition-all duration-1000"
                    style={{ width: `${c.pct}%` }}
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
