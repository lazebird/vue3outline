<template>
  <div class="tree-container">
    <tree :data="data">
      <template #default="scope">
        <slot :scope="scope">
          <span @click="handleNodeClick(scope.row)">{{ scope.row.title }}</span>
        </slot>
      </template>
    </tree>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import Tree from '../tree.vue';

  const props = defineProps({ treeData: { type: Array, required: true } });
  const data = ref([]);
  watch(props, () => {
    if (!props.treeData?.length) return;
    data.value = props.treeData;
    for (const n of data.value) trimEmptyChildren(n);
    let id = 1;
    for (const n of data.value) id = patchId(n, id);
    // console.log('[table] data %s', JSON.stringify(data.value));
  });
  function trimEmptyChildren(node) {
    if (!node.children?.length) node.children = undefined;
    else for (const n of node.children) trimEmptyChildren(n);
  }
  function patchId(node, id) {
    node.id = id++;
    if (node.children?.length) for (const n of node.children) id = patchId(n, id++);
    return id;
  }
  function handleNodeClick(row) {
    // console.log('[table] row ', row);
    row.el?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
</script>
<style scoped>
  span {
    color: blue;
  }
  span:hover {
    text-decoration: underline;
  }
  span:active {
    position: relative;
    left: 1px;
    top: 1px;
  }
</style>
