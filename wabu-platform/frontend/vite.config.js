import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Tutte le richieste che iniziano con /api saranno inoltrate al backend
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  }
})
