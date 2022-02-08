# @lazebird/vue3outline

## 介绍

- 本项目缘起于[vue-outline](https://github.com/wintc23/vue-outline)，目的是为页面增加内部目录导航。原项目已经停更 近 2 年了，基于 vue2。
- [预览](https://lazebird.github.io/vue3outline/)
- [npmjs](https://www.npmjs.com/package/@lazebird/vue3outline)

## 依赖

`"vue": "^3.2.25"`

## 安装

`pnpm install @lazebird/vue3outline`

## 导入

```Js
import { createApp } from 'vue';
import App from './App.vue';
import { useOutline } from '@lazebird/vue3outline';

const app = createApp(App);
useOutline(app);
app.mount('#app');

```

## 使用

**可以参考 src/views/HelloWorld.vue**

```HTML
  <div class="example">
    <div class="nav">
      <div class="navcontent">
        <h1> 目录 </h1>
        <outline-tree :tree-data="navTree">
          <template #default="{ scope }">
            <span class="content_node" @click.stop="jumpToAnchor(scope.row.el)"> {{ scope.row.title }} </span>
          </template>
        </outline-tree>
      </div>
    </div>
    <div v-outline="tocProps" class="content"> <Contents /> </div>
  </div>
```

```Js
  import { ref } from 'vue';
  import TestArticle from './test/TestArticle.vue';

  const tocProps = { callback: refreshNavTree, selectors: ['h2', 'h3', 'h4'], exceptSelector: '[un-nav]' };

  const navTree = ref([]);
  function refreshNavTree(treeData) {
    navTree.value = treeData;
  }
  function jumpToAnchor(el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
```
