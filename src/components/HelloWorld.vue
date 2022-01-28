<template>
  <div class="example">
    <div class="navigation">
      <div class="title"> 导航目录 </div>
      <outline-tree :tree-data="navTree" class="tree">
        <template #default="{ data }">
          <div class="node-render-content" @click.stop="jumpToAnchor(data.el)">
            {{ data.title }}
          </div>
        </template>
      </outline-tree>
    </div>
    <div
      v-outline="{
        callback: refreshNavTree,
        selectors: ['h2', 'h3', 'h4'],
        exceptSelector: '[un-nav]',
      }"
      class="content"
    >
      <div ref="editor"> <TestArticle /> </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import TestArticle from './TestArticle.vue';

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
    height: calc(100vh - 30px);
  }

  .content {
    border: 1px solid #3361d8;
    margin: 0 20px;
    padding: 40px;
    border-radius: 4px;
    flex: auto;
    overflow: auto;
  }

  .navigation {
    width: 16rem;
    flex-shrink: 0;
    padding: 0.5rem;
    border-radius: 2px;
    text-align: left;
    overflow: auto;
  }
  .title {
    font-size: 1rem;
    border-bottom: 1px solid #c9c9c9;
    margin: 0.5rem;
  }

  .node-render-content {
    color: #3361d8;
    user-select: none;
    cursor: pointer;
    margin: 2px 0;
  }
  .node-render-content:hover {
    text-decoration: underline;
  }
  .node-render-content:active {
    position: relative;
    left: 1px;
    top: 1px;
  }
</style>
