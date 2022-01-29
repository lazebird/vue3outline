<template>
  <div class="article" v-for="e in data">
    <h2 :un-nav="e['un-nav']"> {{ e.text }}</h2>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';

  const timers = [];
  const data = ref([]);
  let id = 1;
  function update() {
    data.value.push({ text: '动态插入的h2标题 ' + id++ });
    data.value.push({ text: '动态插入的h2标签，不会出现在导航栏，它被排除了 ' + id++, 'un-nav': true });
  }
  onMounted(() => (timers['update'] = setInterval(update, 3000)));
  onUnmounted(() => timers['update'] && clearInterval(timers['update']));
</script>

<style scoped>
  .article {
    text-align: left;
    padding: 20px;
  }
</style>
