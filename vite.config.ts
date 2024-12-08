import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash']
        },
      },
    },
  },
});