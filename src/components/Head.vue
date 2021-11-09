<template>
  <div class="head-box">
    <div class="time">
      <span>{{timeNow.day}}</span>
      <span>{{timeNow.month}}月</span>
    </div>
    <h4 class="title">知乎日报</h4>
    <router-link to="/person" class="link-btn">
      <img :src="pic" alt="" />
    </router-link>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { formatTime } from '../assets/utils'
export default {
  name: 'Head',
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const state = reactive({
      pic: require('@/assets/images/timg.jpg')
    })
    const timeNow = computed(() => {
      const time = props.time || null
      const [month, day] = formatTime(time, '{1}-{2}').split('-')
      const area = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
      return {
        month: area[month - 1],
        day
      }
    })
    return {
      ...toRefs(state),
      timeNow
    }
  }
}
</script>

<style lang="less" scoped>
.head-box {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #fff;
  .time {
    padding-right: 15px;
    border-right: 1px solid #ddd;
    span {
      display: block;
      font-size: 20px;
      text-align: center;
      &:nth-child(2) {
        font-size: 12px;
        text-align: center;
      }
    }
  }
  .title {
    font-size: 20px;
    padding-left: 12px;
  }
  .link-btn {
    margin-left: auto;
    img {
      border-radius: 50%;
      width: 50px;
    }
  }
}
</style>
