import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

const mode = process.env.APP_ENV

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  build: {
    target: 'esnext',
    rollupOptions:
      mode === 'sonarplugin'
        ? {
            input: resolve(__dirname, './src/sonarplugin.js'),
            output: {
              entryFileNames: `assets/view.js`,
              assetFileNames: `assets/view.css`
            }
          }
        : {}
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    legalComments: 'external'
  }
})
