import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/fotos': 'http://localhost:5000',
    },
  },
  preview: {
    port: 8080,
    host: true,
    allowedHosts: ['trabalho-nosql-3.onrender.com'], // <- aqui está o necessário para Render
  },
})
