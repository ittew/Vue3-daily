<template>
  <p>支持人数：{{ supNum }}人</p>
  <footer>
    <button @click='change("sup")'>支持</button>
  </footer>
</template>

<script>
import { ref, reactive, toRefs, watch, watchEffect } from 'vue'
export default {
  props: ['title'],
  setup () {
    const state = reactive({ // 使用reactive声明响应式对象
      supNum: 10
    })
    const num = ref(0)
    // 普通方法
    const change = (type) => {
      type === 'sup' ? state.supNum++ : state.oppNum++
      num.value++
    }
    // // watchEffect(callback) 第一次加载组件和函数中所依赖数据发生改变时都会触发callback
    // watchEffect(() => {
    //   console.log('watchEffect: ', state.supNum)
    // })
    // watch 监听器 默认第一次加载组件不执行 当监听的数据改变时会触发执行
    // 监听对象
    // watch(state, () => {
    //   console.log('watch: ')
    // })
    // 监听 reactive 创建 单个值 不能直接使用 watch(state.supNum, ()=>{})
    // watch(
    //   () => state.supNum,
    //   (next, prev) => { // next:新值  prev:旧值
    //     console.log('watch: ', next, prev)
    //   }
    // )
    // // 监听 ref 创建的数据
    // watch(num, (next, prev) => { // next:新值  prev:旧值
    //   console.log('watch: ', next, prev)
    // })

    // watch 深度监听 或 第一次也执行
    watch(
      num,
      (next, prev) => { // next:新值  prev:旧值
        console.log('watch: ', next, prev)
      },
      {
        deep: true,
        immediate: true
      }
    )
    return {
      ...toRefs(state),
      change,
      num
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
