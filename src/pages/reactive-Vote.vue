<template>
  <!-- <div class="vote-box">
    <header class="vote-head">
      <h2>{{ title }}</h2>
      <span>{{ state.oppNum + state.supNum }}人</span>
    </header>
    <main class="vote-main">
      <p>支持人数：{{ state.supNum }}人</p>
      <p>反对人数：{{ state.oppNum }}人</p>
      <p>支持比率：{{ ratio }}</p>
    </main>
    <footer>
      <button @click='change("sup")'>支持</button>
      <button @click='change("opp")'>反对</button>
    </footer>
  </div> -->
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
import { ref, computed, reactive, toRefs, toRef } from 'vue'
export default {
  name: 'Vote',
  props: ['title'],
  setup () {
    const state = reactive({ // 使用reactive声明响应式对象
      supNum: 10,
      oppNum: 5
    })
    console.log(ref(10))
    // 计算属性
    const ratio = computed(() => {
      const total = state.supNum + state.oppNum
      return total === 0 ? '--' : ((state.supNum / total) * 100).toFixed(2) + '%'
    })
    console.log(toRef(state.supNum)) // RefImpl {_shallow: false,..., value: 10}
    console.log(toRefs(state)) // {supNum: ObjectRefImpl, oppNum: ObjectRefImpl}
    // 普通方法
    const change = (type) => {
      type === 'sup' ? state.supNum++ : state.oppNum++
    }
    return {
      ...toRefs(state),
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
