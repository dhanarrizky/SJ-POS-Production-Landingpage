export type FieldType =
  | "text"
  | "url"
  | "slug"
  | "textarea"
  | "number"
  | "bool"
  | "color"
  | "image"
  | "markdown"
  | "richtext"
  | "stringList"
  | "objectList"
  | "footerColumns"
  | "keyValue"

export interface ListColumn {
  key: string
  label: string
  placeholder?: string
  multiline?: boolean
}

export interface FieldDef {
  /** Nama field di PocketBase */
  key: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  hint?: string
  /** Tinggi textarea/markdown (baris) */
  rows?: number
  /** Kolom untuk `objectList` */
  columns?: ListColumn[]
  /** Saran kunci untuk `keyValue` */
  suggestions?: string[]
  /** Tampil setengah lebar di layar besar */
  half?: boolean
}

export type Draft = Record<string, any>
