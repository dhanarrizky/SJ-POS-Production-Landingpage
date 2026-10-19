import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export default function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors duration-200"
  const variantStyle = variant === "primary" 
    ? "bg-emerald-500 text-white hover:bg-emerald-600"
    : "bg-slate-800 text-white hover:bg-slate-700"

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  )
}
