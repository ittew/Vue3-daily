<template>
  <van-skeleton title :row="5" v-if="!newsInfo"></van-skeleton>
  <div class='content' v-html="newsInfo.body" v-else></div>
  <div class="nav-box">
    <van-icon name="arrow-left" @click="handleBack"></van-icon>
    <van-icon name="comment-o" :badge="comments"></van-icon>
    <van-icon name="good-job-o" :badge="popularity"></van-icon>
    <van-icon name="star-o" :color="isStore?'#1989fa':'#000'" @click="storeHandle"></van-icon>
    <van-icon name="share-o" color="#ccc"></van-icon>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onBeforeMount, onBeforeUnmount, onUpdated, computed } from 'vue'
import api from '@/api/index'
import { useStore } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'Detail',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      comments: 0,
      popularity: 0,
      newsInfo: null
    })
    const id = route.params.id
    const isStore = computed(() => {
      let { isLogin, storeList } = store.state
      if (isLogin) {
        if (!Array.isArray(storeList)) storeList = []
        return storeList.some(item => {
          return +item.news.id === +id
        })
      }
      return false
    })
    onBeforeMount(async () => {
      // 获取路由数据id
      const id = useRoute().params.id
      // 获取文章详情数据
      const result = await api.queryNewsInfo(id)
      // 获取文章内容中的css样式文件 并添加到页面中
      const link = document.createElement('link')
      link.id = 'link'
      link.rel = 'stylesheet'
      link.href = result.css[0]
      document.head.appendChild(link)
      link.onload = () => {
        state.newsInfo = result
      }
      // 获取文章评论数
      const { comments, popularity } = await api.queryNewsStory(id)
      state.popularity = popularity
      state.comments = comments
    })

    onUpdated(async () => {
      const imgPlaceHolder = document.querySelector('.img-place-holder')
      if (imgPlaceHolder) {
        imgPlaceHolder.innerHTML = `<img src="${state.newsInfo.image}">`
      }
    })
    const handleBack = () => {
      router.back()
    }
    // 页面退出移除css
    onBeforeUnmount(async () => {
      const link = document.getElementById('link')
      if (!link) return
      document.head.removeChild(link)
    })
    // 更新缓存数据
    onBeforeMount(async () => {
      if (store.state.isLogin === null) {
        await store.dispatch('changeIsLoginAsync')
      }
      if (store.state.isLogin) {
        if (store.state.info === null) store.dispatch('changeInfoAsync')
        if (store.state.storeList === null) {
          store.dispatch('changeStoreListAsync')
        }
      }
    })
    // 收藏
    const storeHandle = async () => {
      if (!store.state.isLogin) {
        Toast('小主, 请先登录哦~')
        router.push({
          path: '/login',
          query: {
            from: `detail/${id}`
          }
        })
        return
      }
      if (isStore.value) return
      const { code } = await api.store(id)
      if (+code !== 0) {
        Toast('小主, 很遗憾, 收藏失败~')
        return
      }
      Toast('小主, 收藏成功~')
      store.dispatch('changeStoreListAsync')
    }
    return {
      handleBack,
      isStore,
      storeHandle,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding-bottom: 50px;
  margin-top: 0;
  /deep/ img {
    margin: 0 !important;
    display: inline;
  }
  /deep/ .img-place-holder {
    height: auto;
  }
}
.nav-box {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 12px;
  background: #f4f4f4;
  .van-icon:nth-child(1) {
    position: relative;
    &::after {
      position: absolute;
      top: -10%;
      right: -15px;
      content: "";
      width: 1px;
      height: 120%;
      background: #d5d5d5;
    }
  }

  /deep/ .van-badge {
    background-color: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>
