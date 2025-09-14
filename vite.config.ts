import { defineConfig, loadEnv } from "vite"
import { fileURLToPath, URL } from "node:url"
import tailwindcss from "@tailwindcss/vite"

// Tailwind v4 через плагин Vite

export default defineConfig(({ mode }) => {
  // Разрешаем только префиксованные переменные окружения
  const env = loadEnv(mode, process.cwd(), "APP_")

  return {
    // Базовый публичный путь (меняйте при деплое на поддиректорию)
    base: "/",

    plugins: [
      tailwindcss(),            // Tailwind v4 интеграция
    ],

    resolve: {
      dedupe: ["lit"],
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },

    server: {
      host: true,      // доступ из LAN/CI
      port: 5173,
      open: false,
      strictPort: true,
      cors: true,
      // proxy: { "/api": { target: "http://localhost:3000", changeOrigin: true } }
    },

    preview: {
      port: 4180,
      strictPort: true,
    },

    // Быстрый pre-bundle зависимостей
    optimizeDeps: {
      entries: ["index.html"],
      include: ["lit", "lit/decorators.js"],
      esbuildOptions: {
        target: "es2022",
      },
    },

    // Глобальные define (минимум «магии»; добавляйте осознанно)
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV ?? mode),
    },

    build: {
      target: "es2022",
      modulePreload: { polyfill: false },
      cssCodeSplit: true,
      sourcemap: mode !== "production",
      minify: "esbuild",
      reportCompressedSize: false,
      // Настройка чанков для стабильных кэшей
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name]-[hash].js",
          chunkFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash][extname]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("lit")) return "vendor_lit"
              return "vendor"
            }
          },
        },
      },
    },

    esbuild: {
      target: "es2022",
      legalComments: "none",
    },

    // Тесты добавим позже при необходимости
  }
})
