import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8010,
    host: '0.0.0.0',
    open: true,
    allowedHosts: [
      'luminaverse.keen333.cloud',
      '*.keen333.cloud',
      'localhost',
      '127.0.0.1',
    ]
  }
})
