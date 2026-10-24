import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"
import type { Suggestion } from "../../types/cms"

function FormattedDate({ dateString }: { dateString: string }) {
  const [formatted, setFormatted] = useState("")
  useEffect(() => {
    setFormatted(
      new Date(dateString).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    )
  }, [dateString])
  return <>{formatted}</>
}

interface DashboardFeedbackTabProps {
  suggestions: Suggestion[]
  onDelete: (id: string) => void
}

export default function DashboardFeedbackTab({
  suggestions,
  onDelete,
}: DashboardFeedbackTabProps) {
  return (
    <div className="glass border border-white/8 rounded-3xl p-6 sm:p-8">
      <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-violet-500" /> Kotak Masuk
        Saran &amp; Kritik
      </h3>

      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-white/5 text-slate-300 font-bold border-b border-white/8">
              <th className="p-4">Tanggal</th>
              <th className="p-4">Nama Pengirim</th>
              <th className="p-4">Email</th>
              <th className="p-4">Pesan / Saran</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Belum ada saran yang dikirimkan.
                </td>
              </tr>
            ) : (
              suggestions.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="p-4 text-slate-400 font-mono">
                    <FormattedDate dateString={s.created} />
                  </td>
                  <td className="p-4 font-bold text-white">
                    {s.name || "Anonim"}
                  </td>
                  <td className="p-4 text-slate-300 font-mono">
                    {s.email || "-"}
                  </td>
                  <td className="p-4 text-slate-300 whitespace-pre-wrap leading-relaxed max-w-sm">
                    {s.message}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onDelete(s.id)}
                      className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white hover:bg-rose-500 hover:border-transparent transition-all cursor-pointer"
                      title="Hapus Saran"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
