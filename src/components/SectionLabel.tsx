import { ReactNode } from "react"

export interface SectionLabelProps {
  children: ReactNode
  dark?: boolean
}

export default function SectionLabel({ children, dark }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold font-mono mb-5 border ${
        dark
          ? "border-orange-500/30 text-orange-400 bg-orange-500/10"
          : "border-orange-200 text-orange-700 bg-orange-50"
      }`}
    >
      {children}
    </div>
  )
}
