import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist/widget',
    emptyOutDir: true,
    lib: {
      entry: 'src/widget.jsx',
      name: 'ChatWidget',
      fileName: 'widget',
      formats: ['iife']
    }
  }
})
