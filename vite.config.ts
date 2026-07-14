import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// `base` defaults to '/' for Netlify. The GitHub Pages build overrides it
// via `vite build --base=/my_portfolio/` (see the `build:pages` script).
export default defineConfig({
  plugins: [react()],
  base: '/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    restoreMocks: true,
  },
})
