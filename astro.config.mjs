import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
export default defineConfig({
  site: 'https://hridal.com',
  // Pages stay static; only the Shelf's ratings endpoint runs on the server.
  adapter: vercel(),
  // Start loading a page as soon as you hover or touch its link, so clicks feel instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
