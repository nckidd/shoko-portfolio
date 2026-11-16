import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext' // Enables modern JS features like top-level await
  }
});