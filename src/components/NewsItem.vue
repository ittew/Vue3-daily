<template>
  <div class="news-item">
    <router-link :to="`/detail/${data.id}`" class="item-link">
      <div class="content-box">
        <h4 class="title ellipsis2">{{data.title}}</h4>
        <p class="desc">{{data.hint}}</p>
      </div>
      <div class="img-box">
        <img v-if="data.images && data.images.length" v-lazy="data.images[0]" alt="">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.news-item {
  padding: 15px;
  background: #fff;
  .item-link {
    display: flex;
    color: #333;
    .content-box {
      flex: 1;
      padding-right: 10px;
      .title {
        max-height: 40px;
        font-size: 16px;
        margin-bottom: 5px;
      }
      .desc {
        color: #666;
        font-size: 12px;
      }
    }
    .img-box {
      width: 64px;
      height: 64px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
