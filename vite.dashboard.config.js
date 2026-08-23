import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { globSync } from 'glob';
import path from 'node:path';

const input = Object.fromEntries(
  globSync('src/dashboard/**/*.html').map((file) => [
    path.relative('src/dashboard', file).replace(/\.html$/, ''),
    path.resolve(file),
  ])
);

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  root: 'src/dashboard',

  base: './',

  build: {
    outDir: '../../dashboard',
    emptyOutDir: true,

    assetsDir: 'assets',

    rollupOptions: {
      input,
    },
  },
});
