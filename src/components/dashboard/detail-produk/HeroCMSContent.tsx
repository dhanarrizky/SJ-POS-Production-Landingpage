import { ImageField, Card, SectionHeader, TextField, useDpSection, type SectionProps } from "./shared"

export default function HeroCMSContent(props: SectionProps) {
  const [c, set] = useDpSection(props, "dp_hero")
  return (
    <div className="p-6">
      <SectionHeader title="Hero" desc="Banner paling atas halaman detail produk POS F&B." />
      <div className="space-y-8 max-w-4xl">
        <Card title="Teks Hero">
          <TextField label="Label Kecil" value={c.badge} onChange={(v) => set({ badge: v })} placeholder="POS F&B" />
          <TextField label="Judul Utama" rows={2} value={c.title} onChange={(v) => set({ title: v })} />
          <TextField label="Deskripsi" rows={2} value={c.desc} onChange={(v) => set({ desc: v })} />
        </Card>
        <Card title="Tombol" hint="Tombol hijau di bawah teks hero.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField label="Teks Tombol" value={c.btn_label} onChange={(v) => set({ btn_label: v })} />
            <TextField label="Link Tombol" value={c.btn_link} onChange={(v) => set({ btn_link: v })} placeholder="/bandingkan-paket" />
          </div>
        </Card>
        <Card title="Gambar Latar">
          <ImageField {...props} field="dp_hero_image" label="Gambar latar hero" />
        </Card>
      </div>
    </div>
  )
}
