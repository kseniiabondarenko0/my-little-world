import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes the built game work from any folder or sub-path
// (GitHub Pages, Netlify, a school server...).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { host: true },
  build: { chunkSizeWarningLimit: 1500 },
});
