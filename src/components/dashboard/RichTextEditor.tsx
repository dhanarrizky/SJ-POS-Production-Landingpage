import { useRef, type ReactNode } from "react"
import TipTapImage from "@tiptap/extension-image"
import {
  EditorContent,
  Extension,
  useEditor,
  useEditorState,
  type Editor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Color, FontSize, TextStyle } from "@tiptap/extension-text-style"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@tiptap/extension-table"
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Eraser,
  Highlighter,
  Image as ImageIcon,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react"

export interface RichTextEditorProps {
  /** HTML awal. Ganti `key` di parent untuk memuat konten lain. */
  value: string
  /** Dipanggil dengan HTML terbaru ("" jika editor kosong) */
  onChange: (html: string) => void
}

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 40, 48]

// Tab = geser masuk. Di list: turun level. Di tabel: pindah sel (bawaan Table).
// Di teks biasa: sisipkan karakter tab (lebar diatur `tab-size` di .rich-content).
function indent(editor: Editor): boolean {
  if (editor.isActive("table")) return false
  if (editor.isActive("listItem")) {
    editor.commands.sinkListItem("listItem")
    return true
  }
  return editor
    .chain()
    .command(({ tr }) => {
      tr.insertText("\t")
      return true
    })
    .run()
}

function outdent(editor: Editor): boolean {
  if (editor.isActive("table")) return false
  if (editor.isActive("listItem")) {
    editor.commands.liftListItem("listItem")
    return true
  }
  const { from } = editor.state.selection
  if (from > 0 && editor.state.doc.textBetween(from - 1, from) === "\t") {
    editor
      .chain()
      .command(({ tr }) => {
        tr.delete(from - 1, from)
        return true
      })
      .run()
  }
  return true
}

const TabKey = Extension.create({
  name: "tabKey",
  addKeyboardShortcuts() {
    return {
      Tab: () => indent(this.editor),
      "Shift-Tab": () => outdent(this.editor),
    }
  },
})

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`h-7 min-w-7 px-1.5 inline-flex items-center justify-center rounded text-xs font-bold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default ${
        active ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  )
}

const Sep = () => <span className="w-px h-4 bg-slate-300 mx-1" />

const selectCls =
  "h-7 rounded border border-slate-300 bg-white px-1.5 text-xs text-slate-700 cursor-pointer"

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string
      if (!rawDataUrl) return

      const img = new window.Image()
      img.onload = () => {
        const maxDim = 1200
        let w = img.width
        let h = img.height
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w)
            w = maxDim
          } else {
            w = Math.round((w * maxDim) / h)
            h = maxDim
          }
        }
        const canvas = document.createElement("canvas")
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h)
          const compressed = canvas.toDataURL("image/jpeg", 0.82)
          editor?.chain().focus().setImage({ src: compressed, alt: file.name }).run()
        } else {
          editor?.chain().focus().setImage({ src: rawDataUrl, alt: file.name }).run()
        }
      }
      img.src = rawDataUrl
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
        },
      }),
      TipTapImage.configure({
        inline: false,
        allowBase64: true,
      }),
      TextStyle,
      Color,
      FontSize,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Subscript,
      Superscript,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      TabKey,
    ],
    content: value,
    editorProps: {
      attributes: {
        // Kelas sama dengan kolom isi di halaman publik (FeatureDetailBody)
        class:
          "rich-content font-poppins text-base leading-6 text-slate-900 outline-none min-h-[16rem]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.isEmpty ? "" : editor.getHTML())
    },
  })

  const s = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      const ts = editor.getAttributes("textStyle")
      return {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        strike: editor.isActive("strike"),
        sub: editor.isActive("subscript"),
        sup: editor.isActive("superscript"),
        code: editor.isActive("code"),
        codeBlock: editor.isActive("codeBlock"),
        link: editor.isActive("link"),
        highlight: editor.isActive("highlight"),
        bullet: editor.isActive("bulletList"),
        ordered: editor.isActive("orderedList"),
        quote: editor.isActive("blockquote"),
        inTable: editor.isActive("table"),
        alignLeft: editor.isActive({ textAlign: "left" }),
        alignCenter: editor.isActive({ textAlign: "center" }),
        alignRight: editor.isActive({ textAlign: "right" }),
        alignJustify: editor.isActive({ textAlign: "justify" }),
        block: editor.isActive("heading", { level: 2 })
          ? "h2"
          : editor.isActive("heading", { level: 3 })
            ? "h3"
            : editor.isActive("heading", { level: 4 })
              ? "h4"
              : "p",
        fontSize: ((ts.fontSize as string | undefined) || "").replace("px", ""),
        color: (ts.color as string | undefined) || "#0f172a",
        highlightColor:
          (editor.getAttributes("highlight").color as string | undefined) ||
          "#fef08a",
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
      }
    },
  })

  if (!editor || !s) return null

  const run = () => editor.chain().focus()

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined
    const url = window.prompt(
      "Alamat link (kosongkan untuk menghapus):",
      previous || "https://",
    )
    if (url === null) return
    const chain = editor.chain().focus().extendMarkRange("link")
    if (url.trim() === "") {
      chain.unsetLink().run()
      return
    }
    // Hanya izinkan http(s), mailto, tel
    if (!/^(https?:\/\/|mailto:|tel:)/i.test(url.trim())) {
      alert("Link harus diawali http://, https://, mailto: atau tel:")
      return
    }
    chain.setLink({ href: url.trim() }).run()
  }

  const setBlock = (v: string) => {
    if (v === "p") run().setParagraph().run()
    else run().setHeading({ level: Number(v.slice(1)) as 2 | 3 | 4 }).run()
  }

  const setSize = (v: string) => {
    if (v === "") run().unsetFontSize().run()
    else run().setFontSize(`${v}px`).run()
  }

  return (
    <div className="rounded-lg border border-white/15 bg-white text-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-brand/60">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-100 px-1.5 py-1">
        <ToolbarButton
          label="Urungkan"
          disabled={!s.canUndo}
          onClick={() => run().undo().run()}
        >
          <Undo2 size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Ulangi"
          disabled={!s.canRedo}
          onClick={() => run().redo().run()}
        >
          <Redo2 size={14} />
        </ToolbarButton>
        <Sep />

        <select
          aria-label="Jenis paragraf"
          className={selectCls}
          value={s.block}
          onChange={(e) => setBlock(e.target.value)}
        >
          <option value="p">Paragraf</option>
          <option value="h2">Judul bagian (H2)</option>
          <option value="h3">Sub-judul (H3)</option>
          <option value="h4">Sub-judul kecil (H4)</option>
        </select>
        <select
          aria-label="Ukuran huruf"
          className={selectCls}
          value={s.fontSize}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">Ukuran</option>
          {FONT_SIZES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <Sep />

        <ToolbarButton
          label="Tebal"
          active={s.bold}
          onClick={() => run().toggleBold().run()}
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Miring"
          active={s.italic}
          onClick={() => run().toggleItalic().run()}
        >
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Garis bawah"
          active={s.underline}
          onClick={() => run().toggleUnderline().run()}
        >
          <UnderlineIcon size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Coret"
          active={s.strike}
          onClick={() => run().toggleStrike().run()}
        >
          <Strikethrough size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Subskrip"
          active={s.sub}
          onClick={() => run().toggleSubscript().run()}
        >
          <SubscriptIcon size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Superskrip"
          active={s.sup}
          onClick={() => run().toggleSuperscript().run()}
        >
          <SuperscriptIcon size={14} />
        </ToolbarButton>
        <Sep />

        <label
          title="Warna teks"
          className="h-7 inline-flex items-center gap-1 px-1 text-xs font-bold text-slate-600 cursor-pointer"
        >
          A
          <input
            type="color"
            value={s.color}
            onChange={(e) => run().setColor(e.target.value).run()}
            className="w-5 h-5 p-0 border border-slate-300 rounded cursor-pointer bg-transparent"
          />
        </label>
        <ToolbarButton
          label="Hapus warna teks"
          onClick={() => run().unsetColor().run()}
        >
          <span className="text-[10px]">A×</span>
        </ToolbarButton>
        <label
          title="Warna sorot"
          className="h-7 inline-flex items-center gap-1 px-1 text-slate-600 cursor-pointer"
        >
          <Highlighter size={14} />
          <input
            type="color"
            value={s.highlightColor}
            onChange={(e) =>
              run().setHighlight({ color: e.target.value }).run()
            }
            className="w-5 h-5 p-0 border border-slate-300 rounded cursor-pointer bg-transparent"
          />
        </label>
        <ToolbarButton
          label="Hapus sorot"
          active={s.highlight}
          onClick={() => run().unsetHighlight().run()}
        >
          <span className="text-[10px]">H×</span>
        </ToolbarButton>
        <Sep />

        <ToolbarButton
          label="Rata kiri"
          active={s.alignLeft}
          onClick={() => run().setTextAlign("left").run()}
        >
          <AlignLeft size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Rata tengah"
          active={s.alignCenter}
          onClick={() => run().setTextAlign("center").run()}
        >
          <AlignCenter size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Rata kanan"
          active={s.alignRight}
          onClick={() => run().setTextAlign("right").run()}
        >
          <AlignRight size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Rata kiri-kanan"
          active={s.alignJustify}
          onClick={() => run().setTextAlign("justify").run()}
        >
          <AlignJustify size={14} />
        </ToolbarButton>
        <Sep />

        <ToolbarButton
          label="Daftar poin"
          active={s.bullet}
          onClick={() => run().toggleBulletList().run()}
        >
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Daftar angka"
          active={s.ordered}
          onClick={() => run().toggleOrderedList().run()}
        >
          <ListOrdered size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Geser masuk (Tab)"
          onClick={() => {
            editor.commands.focus()
            indent(editor)
          }}
        >
          <IndentIncrease size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Geser keluar (Shift+Tab)"
          onClick={() => {
            editor.commands.focus()
            outdent(editor)
          }}
        >
          <IndentDecrease size={14} />
        </ToolbarButton>
        <Sep />

        <ToolbarButton label="Link" active={s.link} onClick={setLink}>
          <Link2 size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Sisipkan Foto / Gambar"
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon size={14} />
        </ToolbarButton>
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageFile}
        />
        <ToolbarButton
          label="Kutipan"
          active={s.quote}
          onClick={() => run().toggleBlockquote().run()}
        >
          <Quote size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Kode"
          active={s.code}
          onClick={() => run().toggleCode().run()}
        >
          <Code size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Blok kode"
          active={s.codeBlock}
          onClick={() => run().toggleCodeBlock().run()}
        >
          <Code2 size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Garis pemisah"
          onClick={() => run().setHorizontalRule().run()}
        >
          <Minus size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Sisipkan tabel 3×3"
          active={s.inTable}
          disabled={s.inTable}
          onClick={() =>
            run().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          <TableIcon size={14} />
        </ToolbarButton>
        <ToolbarButton
          label="Hapus semua format"
          onClick={() => run().clearNodes().unsetAllMarks().run()}
        >
          <Eraser size={14} />
        </ToolbarButton>
      </div>

      {s.inTable && (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-emerald-50 px-1.5 py-1 text-[11px]">
          <span className="px-1.5 font-semibold text-slate-600">Tabel:</span>
          <ToolbarButton
            label="Tambah kolom di kanan"
            onClick={() => run().addColumnAfter().run()}
          >
            + Kolom
          </ToolbarButton>
          <ToolbarButton
            label="Hapus kolom"
            onClick={() => run().deleteColumn().run()}
          >
            − Kolom
          </ToolbarButton>
          <ToolbarButton
            label="Tambah baris di bawah"
            onClick={() => run().addRowAfter().run()}
          >
            + Baris
          </ToolbarButton>
          <ToolbarButton
            label="Hapus baris"
            onClick={() => run().deleteRow().run()}
          >
            − Baris
          </ToolbarButton>
          <ToolbarButton
            label="Jadikan baris judul / biasa"
            onClick={() => run().toggleHeaderRow().run()}
          >
            Baris judul
          </ToolbarButton>
          <ToolbarButton
            label="Hapus tabel"
            onClick={() => run().deleteTable().run()}
          >
            Hapus tabel
          </ToolbarButton>
        </div>
      )}

      {/* Latar & lebar sama dengan kolom isi di halaman publik (desktop) */}
      <div className="bg-[#F5FFF6] overflow-x-auto px-4 py-6">
        <div className="w-[594px] max-w-full">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
