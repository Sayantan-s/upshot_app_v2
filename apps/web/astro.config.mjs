import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/web',
  server: {
    open: true,
  },
});