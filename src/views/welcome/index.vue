<template>
  <div class="container">
    <div></div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http
      .get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  div {
    width: 100%;
    height: 100%;
    background: url("../../assets/welcome.jpg") no-repeat center;
  }
}
</style>
