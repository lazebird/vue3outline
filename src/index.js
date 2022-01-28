import vueOutline from '@/directives/outline';
import tree from '@/components/tree';

export function useOutline(app, opts = {}) {
  let { directiveName = 'outline', treeName = 'outline-tree' } = opts;
  app.directive(directiveName, vueOutline);
  app.component(treeName, tree);
}
