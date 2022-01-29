<template>
  <div class="article" ref="article"> </div>
</template>

<script>
  export default {
    mounted() {
      this.timer = setInterval(() => {
        let div = document.createElement('h2');
        div.innerText = '动态插入的h2标题';
        let div2 = document.createElement('h2');
        div2.setAttribute('un-nav', '');
        div2.innerText = '动态插入的h2标签，不会出现在导航栏，它被排除了';
        this.$refs.article.appendChild(div);
        this.$refs.article.appendChild(div2);
      }, 3000);
    },
    beforeUnmount() {
      this.timer && clearInterval(this.timer);
    },
  };
</script>

<style scoped>
  .article {
    text-align: left;
    padding: 20px;
  }
</style>
