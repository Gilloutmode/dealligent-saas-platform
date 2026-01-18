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
      // IMPORTANT: More specific paths MUST come first!
      // '/api/n8n-status' must be before '/api/n8n' to avoid wrong matching
      '/api/n8n-status': {
        target: 'https://gilloutmode.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => {
          // /api/n8n-status?executionId=xxx → /webhook/cds-status?executionId=xxx
          const url = new URL(path, 'http://localhost')
          return `/webhook/cds-status${url.search}`
        },
      },
      '/api/n8n': {
        target: 'https://gilloutmode.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n/, '/webhook/61ea8949-d762-49f1-8f5c-75169b5a4190'),
        // Timeout 5 minutes for long-running n8n workflows (~3:36)
        timeout: 300000,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setTimeout(300000)
          })
          proxy.on('error', (err, _req, res) => {
            console.error('[Vite Proxy] Error:', err.message)
            if (res && 'writeHead' in res) {
              res.writeHead(502, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Proxy error', message: err.message }))
            }
          })
        },
      },
    },
  },
})
