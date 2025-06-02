import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',  // <-- add this line
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'https://charging-station-0agt.onrender.com'
    }
  }
})
