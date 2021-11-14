<template>
  <Nav />
  <div class="base-info" v-if="info">
    <img :src="info.pic" alt="" @click="$router.push('/updateperson')" />
    <p>{{ info.name }}</p>
  </div>
  <van-cell-group>
    <van-cell title="我的收藏" is-link url="#/store" />
    <van-cell title="退出登录" @click="signout" />
  </van-cell-group>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Nav from '../components/Nav'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  name: 'Person',
  components: { Nav },
  setup () {
    const store = useStore()
    const router = useRouter()
    const info = computed(() => {
      const { isLogin, info } = store.state
      if (isLogin && info) return info
      return null
    })
    const signout = () => {
      Toast('小主, 您已经安全退出~')
      localStorage.removeItem('token')
      store.commit('changeIsLogin', null)
      store.commit('changeInfo', null)
      store.commit('changeStoreList', null)
      router.replace('/login')
    }
    return {
      info,
      signout
    }
  }
}
</script>

<style lang="less" scoped>
.base-info {
  box-sizing: border-box;
  margin: 20px 0;
  img {
    display: block;
    margin: 0 auto;
    width: 86px;
    height: 86px;
    border-radius: 50%;
  }
  p {
    line-height: 50px;
    font-size: 18px;
    text-align: center;
  }
}
</style>
