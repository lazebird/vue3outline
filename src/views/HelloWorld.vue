<template>
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
    <div v-outline="tocProps" class="content">
      <strong>
        本项目为vue3outline(<a href="https://github.com/lazebird/vue3outline" target="_blank" rel="noopener noreferrer">链接</a>)，
        请前往npmjs下载使用(<a href="https://www.npmjs.com/package/@lazebird/vue3outline" target="_blank" rel="noopener noreferrer">链接</a>)，
        不完善处请提issue(<a href="https://github.com/lazebird/vue3outline/issues" target="_blank" rel="noopener noreferrer">链接</a>)</strong>
      <strong>下文为vue-outline(<a href="https://github.com/wintc23/vue-outline" target="_blank" rel="noopener noreferrer">链接</a>)作者的测试文章，在此致敬</strong>
      <TestArticle />
    </div>
  </div>
</template>

<script setup>
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
</script>

<style scoped>
  .example {
    display: flex;
  }

  .nav {
    width: 16rem;
    flex-shrink: 0;
    padding: 0.5rem;
    border-radius: 2px;
    text-align: left;
    overflow: auto;
  }
  .navcontent {
    position: fixed;
    width: 16rem;
    height: 100%;
    overflow: auto;
  }
  .content_node {
    color: #3361d8;
    user-select: none;
    cursor: pointer;
    margin: 2px 0;
  }
  .content_node:hover {
    text-decoration: underline;
  }
  .content_node:active {
    position: relative;
    left: 1px;
    top: 1px;
  }
  strong {
    display: block;
  }
</style>
