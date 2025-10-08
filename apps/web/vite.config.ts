import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@untitled-card-game/shared': path.resolve(__dirname, '../../libs/shared/src/index.ts'),
    },
  },
  define: {
    // Environment variables for runtime
    'import.meta.env.VITE_PORT': JSON.stringify(process.env.PORT || '5173'),
    'import.meta.env.VITE_AUTHOR': JSON.stringify('Gaël Jacquin'),
    'import.meta.env.VITE_LINKTREE': JSON.stringify('https://linktr.ee/gaeljacquin'),
    'import.meta.env.VITE_PROFILE_PIC': JSON.stringify('/gael-himself.webp'),
    'import.meta.env.VITE_SERVER_URL': JSON.stringify(
      process.env.SERVER_URL || 'http://localhost:8080'
    ),
    'import.meta.env.VITE_MAINTENANCE_MODE': JSON.stringify(process.env.MAINTENANCE_MODE || ''),
  },
  server: {
    port: parseInt(process.env.PORT || '5173'),
    host: true,
  },
  preview: {
    port: parseInt(process.env.PORT || '5173'),
    host: true,
  },
});
