import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://hridal.com',
  // Start loading a page as soon as you hover or touch its link, so clicks feel instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
