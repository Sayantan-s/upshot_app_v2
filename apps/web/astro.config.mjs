import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/web',
  server: {
    open: true,
  },
  integrations:[react(), tailwind()]
});
