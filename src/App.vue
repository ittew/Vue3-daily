<template>
  <router-view v-slot="{Component}">
    <keep-alive include="Home">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="less">
html,
body {
  min-height: 100%;
  overflow-x: hidden;
}
#app {
  margin: 0 auto;
}
</style>
