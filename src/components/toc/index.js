import vueOutline from './directive';
import tree from '@/components/toc/table.vue';

export function useOutline(app, opts = {}) {
  let { directiveName = 'outline', treeName = 'outline-tree' } = opts;
  app.directive(directiveName, vueOutline);
  app.component(treeName, tree);
}
