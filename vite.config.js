import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    proxy: {
      '/hf': {
        target: 'https://router.huggingface.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hf/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Authorization', `Bearer ${process.env.HF_ACCESS_TOKEN}`)
            proxyReq.setHeader('Content-Type', 'application/json')
          })
        }
      }
    }
  }
})