import { Card, ImageField, SectionHeader, TextField, useDpSection, type SectionProps } from "./shared"

export default function DapurCMSContent(props: SectionProps) {
  const [c, set] = useDpSection(props, "dp_dapur")

  const setKds = (i: number, patch: Partial<(typeof c.kds_items)[number]>) =>
    set({ kds_items: c.kds_items.map((x, j) => (j === i ? { ...x, ...patch } : x)) })
  const setStat = (i: number, patch: Partial<(typeof c.seating_stats)[number]>) =>
    set({ seating_stats: c.seating_stats.map((x, j) => (j === i ? { ...x, ...patch } : x)) })

  return (
    <div className="p-6">
      <SectionHeader title="Dapur Modern" desc="Bagian Modernisasi Dapur beserta banner Tempat Duduk Tamu di bawahnya." />
      <div className="space-y-8 max-w-4xl">
        <Card title="Teks Pengantar">
          <TextField label="Label Hijau" value={c.badge} onChange={(v) => set({ badge: v })} />
          <TextField label="Judul Utama" value={c.title} onChange={(v) => set({ title: v })} />
          <TextField label="Deskripsi" rows={3} value={c.desc} onChange={(v) => set({ desc: v })} />
        </Card>

        <Card title="Gambar Dapur">
          <ImageField {...props} field="dp_dapur_image" label="Foto aktivitas dapur" />
        </Card>

        <Card title="3 Kartu Keunggulan" hint="Jumlah kartu tetap 3 (ikon mengikuti urutan). Judul dan deskripsi bisa diedit.">
          {c.kds_items.map((item, i) => (
            <div key={i} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField label={`Kartu ${i + 1} — Judul`} value={item.title} onChange={(v) => setKds(i, { title: v })} />
              <TextField label={`Kartu ${i + 1} — Deskripsi`} rows={2} value={item.desc} onChange={(v) => setKds(i, { desc: v })} />
            </div>
          ))}
        </Card>

        <Card title="Banner Tempat Duduk Tamu" hint="Banner hijau gelap di bawah bagian dapur.">
          <TextField label="Judul" value={c.seating_title} onChange={(v) => set({ seating_title: v })} />
          <TextField label="Deskripsi" rows={2} value={c.seating_desc} onChange={(v) => set({ seating_desc: v })} />
          {c.seating_stats.map((s, i) => (
            <div key={i} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TextField label={`Statistik ${i + 1} — Angka`} value={s.value} onChange={(v) => setStat(i, { value: v })} />
              <TextField label="Judul" value={s.label} onChange={(v) => setStat(i, { label: v })} />
              <TextField label="Deskripsi" rows={2} value={s.desc} onChange={(v) => setStat(i, { desc: v })} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
