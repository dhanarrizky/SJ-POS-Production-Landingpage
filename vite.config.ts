import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// Vite config — https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: "/",
    build: {
      sourcemap: false,
      minify: true,
      rollupOptions: {
        output: {
          minify: {
            compress: {
              dropConsole: true,
            },
          },
          manualChunks(id: string) {
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/react-router")
            ) {
              return "react-vendor"
            }
            if (id.includes("node_modules/pocketbase")) {
              return "pocketbase"
            }
            if (id.includes("node_modules/lucide-react")) {
              return "lucide"
            }
          },
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
      strictPort: true,
      watch: { ignored: ["**/pb_data/**", "**/pb_public/**"] },
    },
    preview: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
    },
  }
})
