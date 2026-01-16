import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/n8n': {
        target: 'https://gilloutmode.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n/, '/webhook/61ea8949-d762-49f1-8f5c-75169b5a4190'),
      },
    },
  },
})
