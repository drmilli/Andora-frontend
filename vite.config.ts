import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        short_name: "Audora",
        name: "Audora - Your Sound, the World's Stage",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#000000",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Target is the ORIGIN only. The '/api' prefix stays on the request path,
      // so /api/influencer -> https://server.audorasounds.com/api/influencer.
      // Including '/api' in the target here would send /api/api/influencer.
      '/api': {
        target: 'https://server.audorasounds.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})