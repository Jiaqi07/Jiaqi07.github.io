import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkObsidian } from './plugins/remark-obsidian.mjs';
import { remarkMeta } from './plugins/remark-meta.mjs';

export default defineConfig({
  site: 'https://alanchen.me',
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/research/overview') })],
  markdown: {
    remarkPlugins: [remarkObsidian, remarkMeta, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
