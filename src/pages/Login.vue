<template>
  <Nav />
  <van-form ref="formBox" @submit="submit">
    <van-cell-group inset>
      <van-field v-model="phone" maxlength='11' label="手机号" label-width="50px" name="phone"
        :rules="[{required: true, message:'手机号为必填项~'},{pattern:regPhone, message:'手机号格式不正确~'}]">
        <template #button>
          <van-button size="mini" type='primary' @click="sendCode" :disabled="!enable"
            class="form-btn">
            {{enable?'获取验证码':times}}
          </van-button>
        </template>
      </van-field>
      <van-field v-model="code" label="验证码" label-width="50px" name="code"
        :rules="[{required: true, message:'验证码为必填项~'},{pattern: regCode, message:'验证码为必须为6位数字~'}]" />
    </van-cell-group>
    <div style="margin: 20px 40px">
      <van-button round block type="primary" native-type="submit">
        立即登录/注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import Nav from '@/components/Nav.vue'
import api from '../api/index'
import { reactive, toRefs, ref } from '@vue/reactivity'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
export default {
  components: { Nav },
  name: 'Login',
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      phone: '',
      code: '',
      enable: true,
      times: '60s'
    })
    const formBox = ref(null)
    // 发送验证码
    const sendCode = async () => {
      try {
        await formBox.value.validate('phone')
        // 发送请求
        const { code } = await api.phoneCode(state.phone)
        if (+code !== 0) {
          Toast('小主, 当前网络繁忙, 请稍后再试~')
          return
        }
        // 开启按钮倒计时
        state.enable = false
        let n = 60
        state.times = '60s'
        const timer = setInterval(() => {
          n--
          if (n === 0) {
            clearInterval(timer)
            state.enable = true
            return
          }
          state.times = `${n}s`
        }, 1000)
      } catch (error) {
        Toast(error)
      }
    }
    // 表单提交
    const submit = async () => {
      const { code, token } = await api.login(state.phone, state.code)
      if (+code !== 0) {
        Toast('小主, 很遗憾, 当前登录失败了~')
        console.log(formBox.value)
        state.code = ''
        formBox.value.resetValidation('code')
        return
      }
      localStorage.setItem('token', token)
      store.commit('changeIsLogin', true)
      store.dispatch('changeInfoAsync')
      store.commit('changeStoreList', null)
      Toast('恭喜小主, 登录成功~')
      // 挑战到指定地址
      const from = route.query.from
      if (from) {
        router.replace(`/${from}`)
      } else {
        router.replace('/person')
      }
    }
    return {
      ...toRefs(state),
      regPhone: /^1\d{10}$/,
      regCode: /^\d{6}$/,
      formBox,
      sendCode,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 30px;
  .form-btn {
    width: 78px;
  }
}
</style>
