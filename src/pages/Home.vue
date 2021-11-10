<template>
  <!-- 头部 -->
  <Head :time="today" />
  <!-- 轮播图 -->
  <section class="banner-box">
    <van-swipe class="my-swipe" autoplay="3000" indicator-color="white" v-if="bannerList.length"
      lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <router-link :to="`/detail/${item.id}`" class="content">
          <img :src="item.image" />
          <div class="mask">
            <h3 class="title">{{item.title}}</h3>
            <span class="tip">{{item.hint}}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>
  <!-- 新闻列表 -->
  <van-skeleton :row="3" v-if="!newsList.length" />
  <div style="margin-top: 15px" v-else>
    <section class="news-box" v-for="(item, index) in newsList" :key="index">
      <van-divider :style="{'padding': '5px 15px'}" v-if="index!==0">
        {{formatTime(item.date, '{1}月{2}日')}}
      </van-divider>
      <Item v-for="item in item.stories" :key="item.id" :data="item" />
    </section>
  </div>
  <!-- 加载更多 -->
  <div class="lazy-more" v-show="newsList.length" ref="loadMore">
    <van-loading size="12px">小主,精彩数据准备中...</van-loading>
  </div>
</template>

<script>
import Head from '../components/Head.vue'
import Item from '../components/NewsItem.vue'
import { formatTime } from '../assets/utils'

import { onBeforeMount, reactive, toRefs, ref, onMounted } from 'vue'
import api from '@/api/index'
export default {
  name: 'Home',
  components: {
    Head,
    Item
  },
  setup () {
    const state = reactive({
      today: '',
      newsList: [],
      bannerList: []
    })
    const loadMore = ref(null)
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
    // 第一次渲染完: 加载更多数据
    onMounted(async () => {
      const ob = new IntersectionObserver(async changes => {
        const item = changes[0]
        if (item.isIntersecting) {
          const result = await api.queryNewsBefore(state.newsList[state.newsList.length - 1].date)
          state.newsList.push(Object.freeze(result))
        }
      })
      ob.observe(loadMore.value)
    })
    return {
      ...toRefs(state),
      formatTime,
      loadMore
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
.news-box {
  background: #fff;
  .van-divider {
    margin: 0;
    font-size: 12px;
    &:before {
      display: none;
    }
  }
}
.van-skeleton {
  margin: 15px 0;
}
.lazy-more {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f4f4f4;
}
</style>
