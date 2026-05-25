import { defineConfig } from 'astro/config';

// User site (robertobautistafregoso.github.io) serves at the root, so base = '/'.
// A custom domain later also serves at root — no reconfig needed (ADR-0003).
export default defineConfig({
  site: 'https://robertobautistafregoso.github.io',
  base: '/',
});
