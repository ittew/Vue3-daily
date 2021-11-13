<template>
  <van-skeleton
    title
    :row="5"
    v-if="!newsInfo"
  ></van-skeleton>
  <div
    class='content'
    v-html="newsInfo.body"
    v-else
  ></div>
  <div class="nav-box">
    <van-icon
      name="arrow-left"
      @click="handleBack"
    ></van-icon>
    <van-icon
      name="comment-o"
      :badge="comments"
    ></van-icon>
    <van-icon
      name="good-job-o"
      :badge="popularity"
    ></van-icon>
    <van-icon
      name="star-o"
      color="#1989fa"
    ></van-icon>
    <van-icon
      name="share-o"
      color="#ccc"
    ></van-icon>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, onBeforeMount, onBeforeUnmount, onUpdated } from 'vue'
import api from '@/api/index'
export default {
  name: 'Detail',
  setup () {
    const router = useRouter()
    const state = reactive({
      comments: 0,
      popularity: 0,
      newsInfo: null
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
    return {
      handleBack,
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
