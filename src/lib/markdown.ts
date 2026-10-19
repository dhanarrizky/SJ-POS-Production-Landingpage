import React from "react"
import { CheckCircle2 } from "lucide-react"

// Simple markdown formatter to avoid React 19 dependency conflict issues
export function parseMarkdown(text?: string): React.ReactNode[] | null {
  if (!text) return null
  const lines = text.split("\n")
  let inList = false
  const listItems: React.ReactNode[] = []
  const renderedElements: React.ReactNode[] = []

  const formatBoldAndCode = (str: string) => {
    // Bold format **text**
    let formatted: React.ReactNode[] = []
    const parts = str.split(/\*\*([^*]+)\*\*/)

    parts.forEach((part, index) => {
      if (index % 2 === 1) {
        formatted.push(
          React.createElement(
            "strong",
            { key: index, className: "font-bold text-slate-900" },
            part
          )
        );
      } else {
        // inline code format `code`
        const codeParts = part.split(/`([^`]+)`/)
        codeParts.forEach((cPart, cIndex) => {
          if (cIndex % 2 === 1) {
            formatted.push(
              React.createElement(
                "code",
                {
                  key: `c-${index}-${cIndex}`,
                  className: "px-1.5 py-0.5 rounded bg-slate-100 text-emerald-600 font-mono text-sm"
                },
                cPart
              )
            );
          } else {
            formatted.push(cPart)
          }
        })
      }
    })
    return formatted
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        inList = true
      }
      listItems.push(
        React.createElement(
          "li",
          {
            key: idx,
            className: "flex items-start gap-2.5 text-slate-600 mb-2 leading-relaxed"
          },
          React.createElement(CheckCircle2, { className: "w-5 h-5 text-emerald-500 shrink-0 mt-0.5" }),
          React.createElement("span", null, formatBoldAndCode(trimmed.substring(2)))
        )
      )
    } else {
      if (inList) {
        inList = false
        renderedElements.push(
          React.createElement(
            "ul",
            { key: `list-${idx}`, className: "my-4 pl-1" },
            [...listItems]
          )
        )
        listItems.length = 0 // Clear list
      }

      if (trimmed.startsWith("# ")) {
        renderedElements.push(
          React.createElement(
            "h1",
            {
              key: idx,
              className: "text-3xl font-black text-slate-900 tracking-tight mt-6 mb-4 leading-tight"
            },
            trimmed.substring(2)
          )
        )
      } else if (trimmed.startsWith("## ")) {
        renderedElements.push(
          React.createElement(
            "h2",
            {
              key: idx,
              className: "text-2xl font-bold text-slate-900 mt-8 mb-3.5 border-b border-slate-150 pb-2"
            },
            trimmed.substring(3)
          )
        )
      } else if (trimmed.startsWith("### ")) {
        renderedElements.push(
          React.createElement(
            "h3",
            { key: idx, className: "text-xl font-bold text-slate-900 mt-6 mb-2" },
            trimmed.substring(4)
          )
        )
      } else if (trimmed === "") {
        // Spacer for empty lines
        renderedElements.push(React.createElement("div", { key: idx, className: "h-2" }))
      } else {
        renderedElements.push(
          React.createElement(
            "p",
            {
              key: idx,
              className: "text-slate-600 text-base leading-relaxed mb-4"
            },
            ...formatBoldAndCode(trimmed)
          )
        )
      }
    }
  })

  // Flush remaining list items if text ends on a list item
  if (inList) {
    renderedElements.push(
      React.createElement(
        "ul",
        { key: "list-end", className: "my-4 pl-1" },
        [...listItems]
      )
    )
  }

  return renderedElements
}
