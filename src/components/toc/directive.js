let dom = null;
let observer = null;
let props = { callback: null, selectors: [], exceptSelector: null, listenScroll: false };
let tocTree = [];
let topNode = null;

const obs_config = {
  subtree: true,
  childList: true,
  characterData: true,
};

function getElemPos(e) {
  const rect = e.getBoundingClientRect();
  return { left: rect.left + window.scrollX, top: rect.top + window.scrollY };
}
function addTreeNode(node, parent) {
  if (node.level > parent.level) {
    node.parent = parent;
    if (!parent.children) parent.children = [];
    parent.children.push(node);
    // console.log('[directive] node %d %s, parent %s', node.level, node.title, parent.title);
    return node;
  }
  if (parent.parent) return addTreeNode(node, parent.parent);
  console.error('[directive] fatal error: should not get here');
  return parent; // error: drop current node
}
function buildTree(nodes) {
  let root = { title: 'ToC', level: 0, children: [] };
  let parent = root;
  for (const n of nodes) parent = addTreeNode(n, parent);
  return root.children;
}
// e.nodeName === 'H2' e.getAttribute(props.exceptSelector) e.innerHTML getBoundingClientRect()-valid after mount
function calcTree() {
  let elems = [];
  for (let s of props.selectors) elems = [...elems, ...dom.querySelectorAll(s)]; // gather selectors, lost order
  let excludes = [];
  if (props.exceptSelector) excludes = [...dom.querySelectorAll(props.exceptSelector)];
  elems = elems.filter((e) => !excludes.includes(e)); // remove excludes

  let nodes = [];
  for (const e of elems) nodes.push({ title: e.innerHTML, level: parseInt(e.nodeName.substring(1)), pos: getElemPos(e), el: e });
  nodes.sort((a, b) => (a.pos.top !== b.pos.top ? a.pos.top - b.pos.top : a.pos.left - b.pos.left)); // reorder
  return buildTree(nodes);
}
function calcTopNode(nodes) {
  for (const n of nodes) {
    if (n.pos.top > window.scrollY) return n;
    const topNode = calcTopNode(n.children ?? []);
    if (topNode) return topNode;
  }
  return null;
}
function refresh(toc_chg = true) {
  if (toc_chg) tocTree = calcTree();
  topNode = calcTopNode(tocTree);
  // console.log('[directive] ', tocTree, topNode);
  props.callback && props.callback(tocTree, topNode);
}

export default {
  mounted(e, binding) {
    // console.log('[directive] e ', e);
    dom = e;
    if (binding.value) props = binding.value;
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    observer = new MutationObserver(() => refresh());
    observer.observe(dom, obs_config);
    if (props.listenScroll) window.addEventListener('scroll', () => refresh(false));
    refresh();
    // console.log('[directive] calcTree ', calcTree());
  },
  unmounted() {
    observer.disconnect();
    if (props.listenScroll) window.removeEventListener('scroll');
    dom = null;
    props = null;
    observer = null;
    tocTree = null;
  },
};
