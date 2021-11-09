<template>

  <Head :time="today"></Head>
  <section class="banner-box">
    <van-swipe class="my-swipe" autoplay="3000" indicator-color="white" v-if="bannerList.length"
      lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <router-link :to="`/detail/item.id`" class="content">
          <img :src="item.image" />
          <div class="mask">
            <h3 class="title">{{item.title}}</h3>
            <span class="tip">{{item.hint}}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>
</template>

<script>
import Head from '../components/Head.vue'
import { onBeforeMount, reactive, toRefs } from 'vue'
import api from '@/api/index'
export default {
  name: 'Home',
  components: {
    Head
  },
  setup () {
    const state = reactive({
      today: '',
      newsList: [],
      bannerList: []
    })
    // 第一次加载获取数据
    onBeforeMount(async () => {
      const { date, stories, top_stories } = await api.queryNewsLatest()
      state.today = date
      state.newsList.push(
        Object.freeze({
          date,
          stories
        })
      )
      // 对于不需要更改或处理的对象 进行Object.freeze冻结  冻结后的对象 Vue2或Vue3不会对其进行劫持或监听
      state.bannerList = Object.freeze(top_stories)
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background: #f4f4f4;
  .van-swipe {
    height: 100%;
    background: #fff;
    .content {
      display: block;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .mask {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 110px;
        color: #fff;
        padding: 10px 20px;
        background: rgab(0, 0, 0, 0.3);
        background: -webkit-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5)
        );
        .title {
          padding-top: 10px;
          font-size: 16px;
          overflow: hidden;
        }
        .tip {
          line-height: 20px;
          font-size: 12px;
        }
      }
    }
    /deep/ .van-swipe__indicators {
      left: auto;
      right: 15px;
      transform: none;
      .van-swipe__indicator--active {
        width: 15px;
        border-radius: 3px;
      }
    }
  }
}
</style>
