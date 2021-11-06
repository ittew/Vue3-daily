<template>
  <h2>Hello Vue3!</h2>
  <Suspense>
    <template #default>
      <AsyncTest />
    </template>
    <template #fallback>loading... </template>
  </Suspense>
</template>

<script>
import AsyncTest from './AsyncTest.vue'
export default {
  name: 'App',
  components: {
    AsyncTest
  }
}
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
