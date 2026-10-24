import { Plus, Trash2 } from "lucide-react"
import { Card, ImageField, SectionHeader, TextField, inputCls, useDpSection, type SectionProps } from "./shared"

export default function MarginCMSContent(props: SectionProps) {
  const [c, set] = useDpSection(props, "dp_margin")

  return (
    <div className="p-6">
      <SectionHeader title="Margin & Akurasi Finansial" desc="Bagian Bahan Baku Terkunci, Margin Keuntungan Transparan." />
      <div className="space-y-8 max-w-4xl">
        <Card title="Teks">
          <TextField label="Label Hijau" value={c.badge} onChange={(v) => set({ badge: v })} />
          <TextField label="Judul Utama" rows={2} value={c.title} onChange={(v) => set({ title: v })} />
          <TextField label="Deskripsi" rows={4} value={c.desc} onChange={(v) => set({ desc: v })} />
        </Card>

        <Card title="Gambar Ilustrasi">
          <ImageField {...props} field="dp_margin_image" label="Ilustrasi koin / margin" />
        </Card>

        <Card title="Label Pil Hijau" hint="Label di sisi kanan ilustrasi. Bisa ditambah atau dihapus.">
          <div className="space-y-2">
            {c.tags.map((tag, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  className={inputCls}
                  value={tag}
                  onChange={(e) => set({ tags: c.tags.map((t, j) => (j === i ? e.target.value : t)) })}
                />
                <button
                  type="button"
                  onClick={() => set({ tags: c.tags.filter((_, j) => j !== i) })}
                  className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer"
                  aria-label="Hapus label"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => set({ tags: [...c.tags, ""] })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5 cursor-pointer"
          >
            <Plus size={14} /> Tambah label
          </button>
        </Card>
      </div>
    </div>
  )
}
