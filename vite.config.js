import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Let /blog/ serve static 11ty files from public/blog/
    // Everything else falls back to index.html for React Router
  },
})
