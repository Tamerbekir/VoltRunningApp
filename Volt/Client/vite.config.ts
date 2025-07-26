import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //For api and avoiding cors issues.
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
