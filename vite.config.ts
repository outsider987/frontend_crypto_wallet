import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/aha-frontend/' : '/',
  // base: './',
  plugins: [react()],
  server: {
    // host: 'https://aha-frontend-lemon.vercel.app',
    // origin:process.env.API_URL,
    // https: process.env.NODE_ENV === 'production' ,
    // cors: {
    //   origin: process.env.API_URL,
    //   credentials: true,
    // },
    // port: 8080,
    open: true,
    // cors: true,
    proxy: {
      '/api': {
        target: 'https://aha-frontend-lemon.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  resolve: {
    alias: {
      '~': '/src'
    }
  },
  define: {
    'process.env': { ...process.env }
  }
});
