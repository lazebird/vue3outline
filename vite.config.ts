import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default defineConfig({
  base: '.',
  resolve: {
    alias: [
      { find: /@\//, replacement: pathResolve('src') + '/' },
      { find: /#\//, replacement: pathResolve('types') + '/' },
    ],
  },
  plugins: [vue()],
});
