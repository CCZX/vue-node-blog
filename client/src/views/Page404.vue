<template>
  <div class='page_404'>
    <div class="info">
      <h1>404</h1>
      <h3>你找的页面不存在</h3>
      <router-link to="/home">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  methods: {}
}

</script>
<style lang='scss'>
.page_404 {
  margin: 0 !important;
  .info {
  display: table;
  margin: 0 auto;
  text-align-last: center;
  h1 {
    font-size: 200px;
    margin-bottom: 0;
  }
  a {
    display: inline-block;
    margin-top: 30px;
    text-decoration: none;
    color: #222;
  }
}
}

</style>