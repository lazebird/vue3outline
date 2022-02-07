import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const buildlib = {
  lib: {
    entry: pathResolve('src/components/toc/index.js'),
    name: 'vue3outline',
    fileName: (format) => `vue3outline.${format}.js`,
  },
  sourcemap: true,
  rollupOptions: {
    external: ['vue'],
    output: { globals: { vue: 'Vue' } },
  },
};
const builddemo = {};

export default defineConfig(({ command, mode }) => {
  console.log('[vite.config.ts] command %s mode %s', command, mode);
  return {
    base: './',
    resolve: {
      alias: [
        { find: /@\//, replacement: pathResolve('src') + '/' },
        { find: /#\//, replacement: pathResolve('types') + '/' },
      ],
    },
    plugins: [vue()],
    build: mode === 'demo' ? builddemo : buildlib,
  };
});
