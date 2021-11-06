<template>
  <div class="vote-box">
    <header class="vote-head">
      <h2>{{ title }}</h2>
      <span>{{ oppNum + supNum }}人</span>
    </header>
    <main class="vote-main">
      <p>支持人数：{{ supNum }}人</p>
      <p>反对人数：{{ oppNum }}人</p>
      <p>支持比率：{{ ratio }}</p>
    </main>
    <footer>
      <button @click='change("sup")'>支持</button>
      <button @click='change("opp")'>反对</button>
    </footer>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  name: 'Vote',
  props: ['title'],
  // vue3中以setup开始
  //    + setup中可以拿到props接收的值
  //    + setup发生在初始化props和beforeCreate之间，没有this无法拿到vue实例
  //    + 会将data/methods/computed/watch/filters等options API聚合在setup中
  //    + setup只在第一次加载执行一次，重新渲染不会再执行它[销毁后再加载属于第一次]
  //    + setup中return返回的内容可以直接在视图中渲染

  // 基于 ref 响应式 API
  //    + 返回 RefTml 对象
  //    + 在模板视图中自动渲染value值， 在js中使用时 需要使用value属性去获取和设置值
  //    + value属性是基于【Object.defineProperty】的set/get实现数据劫持
  setup (props) {
    const supNum = ref(10)
    const oppNum = ref(5)
    // 计算属性
    const ratio = computed(() => {
      const total = supNum.value + oppNum.value
      return total === 0 ? '--' : ((supNum.value / total) * 100).toFixed(2) + '%'
    })
    console.log(ratio) // ComputedRefImpl {dep: undefined, _dirty: true, …}
    // ratio.value = '100%' // 无法修改 并警告 Write operation failed: computed value is readonly
    // 普通方法
    const change = (type) => {
      type === 'sup' ? supNum.value++ : oppNum.value++
    }
    return {
      oppNum,
      supNum,
      ratio,
      change
    }
  }
}
</script>

<style>
.vote-box {
  box-sizing: border-box;
  width: 200px;
}
.vote-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
