import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig({
  root: 'src',
  base: '/goit-js-hw-09/',
  build: {
    outDir:  '../dist',
    emptyOutDir: true,
    rollupOptions: {
           input: {
        index: resolve(__dirname, 'src/index.html'),
        gallery: resolve(__dirname, 'src/1-gallery.html'),
        form: resolve(__dirname, 'src/2-form.html'),
      },

      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: chunkInfo => {
          if (chunkInfo.name === 'commonHelpers') {
            return 'commonHelpers.js';
          }
          return '[name].js';
        },
        assetFileNames: assetInfo => {
          if (assetInfo.name && assetInfo.name.endsWith('.html')) {
            return '[name].[ext]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
  ],
  css: {
    postcss: {
      plugins: [
        SortCss({
          sort: 'mobile-first',
        }),
      ],
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'],
  },
});
