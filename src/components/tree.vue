<template>
  <div>
    <div v-for="(e, index) in data" :key="index" :style="{ 'padding-left': indent + 'px' }">
      <slot :row="e">
        <div @click="handleClick(e)"> {{ e.title }}</div>
      </slot>
      <Tree v-if="e.children" :data="e.children" :indent="indent + 10">
        <template #default="scope">
          <slot :row="scope.row">
            <div @click="handleClick(scope.row)"> {{ scope.row.title }}</div>
          </slot>
        </template>
      </Tree>
    </div>
  </div>
</template>
<script>
  export default { name: 'Tree' };
</script>
<script setup>
  defineProps({ data: { type: Array, required: true }, indent: { type: Number, default: 10 } });
  const emits = defineEmits(['node-click']);
  const handleClick = (e) => emits('node-click', e);
</script>
