import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
      port: 8001
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': '/src',
      }
    },
})
