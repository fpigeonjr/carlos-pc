import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fpigeonjr.github.io',
  base: '/carlos-pc',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
