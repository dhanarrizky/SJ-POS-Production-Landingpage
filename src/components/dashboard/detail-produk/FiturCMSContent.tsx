import { Info } from "lucide-react"
import { Card, SectionHeader, TextField, useDpSection, type SectionProps } from "./shared"

export default function FiturCMSContent(props: SectionProps) {
  const [c, set] = useDpSection(props, "dp_fitur")
  return (
    <div className="p-6">
      <SectionHeader title="Spesifikasi dan Fitur" desc="Judul dan tombol bagian fitur. Kartu fiturnya dikelola terpisah." />
      <div className="space-y-8 max-w-4xl">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            Kartu fitur (gambar, judul, deskripsi, tombol) diatur di tab <strong>⭐ Sorotan Produk</strong>. Halaman ini hanya untuk judul bagian dan tombol &quot;Lihat Semua Fitur&quot;.
          </p>
        </div>
        <Card title="Judul Bagian">
          <TextField label="Label Hijau" value={c.badge} onChange={(v) => set({ badge: v })} />
          <TextField label="Judul Utama" rows={2} value={c.title} onChange={(v) => set({ title: v })} />
        </Card>
        <Card title="Tombol Bawah">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="Teks Tombol" value={c.btn_label} onChange={(v) => set({ btn_label: v })} />
            <TextField label="Link Tombol" value={c.btn_link} onChange={(v) => set({ btn_link: v })} placeholder="/fitur" />
          </div>
        </Card>
      </div>
    </div>
  )
}
