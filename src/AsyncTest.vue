<template>
  获取的用户信息是<br />
  用户编号: {{ id }}<br />
  用户姓名: {{ name }}<br />
</template>

<script>
const query = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'tew' })
    }, 2000)
  })
}
export default {
  name: 'AsyncTest',
  async setup () {
    const { id, name } = await query()
    return {
      id,
      name
    }
  }
}
</script>

<style></style>
