import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled', '@mui/icons-material'],
  },
    server: {
      host:'0.0.0.0',
      port: 5173
  }
  
});