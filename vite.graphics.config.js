import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';
import path from 'node:path';

const input = Object.fromEntries(
  globSync('src/graphics/**/*.html').map((file) => [
    path.relative('src/graphics', file).replace(/\.html$/, ''),
    path.resolve(file),
  ])
);

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  root: 'src/graphics',

  base: './',

  build: {
    outDir: '../../graphics',
    emptyOutDir: true,

    assetsDir: 'assets',

    rollupOptions: {
      input,
    },
  },
});
