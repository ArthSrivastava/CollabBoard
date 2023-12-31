import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: { include: '**/*.css' },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})