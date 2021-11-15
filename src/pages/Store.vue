<template>
  <Nav title="收藏列表" />
  <van-empty description="暂无收藏" v-if="storeList.length === 0" />
  <div v-else>
    <van-swipe-cell v-for="item in storeList" :key="item.id">
      <div class="con">
        <Item :data="{ ...item.news, images: [item.news.image], hint: '' }" />
      </div>
      <template #right>
        <van-button square type="danger" text="删除" @click="removeHandle(item.id)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Item from '@/components/NewsItem.vue'
import api from '../api/index'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onBeforeMount } from '@vue/runtime-core'
import { Toast } from 'vant'

export default {
  name: 'Store',
  components: { Nav, Item },
  setup () {
    const store = useStore()
    const storeList = computed(() => {
      return store.state.storeList || []
    })
    onBeforeMount(() => {
      if (store.state.storeList === null) {
        store.dispatch('changeStoreListAsync')
      }
    })
    const removeHandle = async (id) => {
      const { code } = await api.storeRemove(id)
      if (+code !== 0) {
        Toast('小主, 很遗憾, 删除失败了~')
        return
      }
      Toast('小主, 删除成功了~')
      store.commit('removeStoreList', id)
    }
    return {
      storeList,
      removeHandle
    }
  }
}
</script>
<style lang="less" scoped>
.van-empty {
  padding-top: 160px;
}
.van-swipe-cell {
  .con {
    padding: 0 15px;
  }

  /deep/ .van-swipe-cell__right {
    .van-button {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
