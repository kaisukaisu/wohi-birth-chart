import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    // Serve astrochart2 assets (fonts, etc.) from node_modules at /assets
    // so the library's internal relative URLs resolve correctly in dev.
    middlewareMode: false,
    setup: undefined
  },
  plugins: [
    react(),
    {
      name: 'serve-astrochart2-assets',
      configureServer(server) {
        server.middlewares.use('/assets', (req, res, next) => {
          if (!req.url) return next();
          const rel = req.url.replace(/^\/+/, '');
          const filePath = path.join(process.cwd(), 'node_modules', 'astrochart2', 'assets', rel);
          fs.stat(filePath, (err, stat) => {
            if (err || !stat.isFile()) return next();
            const ext = path.extname(filePath).toLowerCase();
            if (ext === '.ttf') res.setHeader('Content-Type', 'font/ttf');
            fs.createReadStream(filePath).pipe(res);
          });
        });
      }
    }
  ]
})
