<template>
  <div class="footer_page">
    <div class="content">
      <p>蜀ICP备19006121号</p>
      <p>歌舞升平的城市</p>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    // myfixed: {
    //   inserted(el) {
    //     let footer = document.getElementsByClassName("footer")[0];
    //     if (
    //        (document.documentElement.clientHeight - document.body.clientHeight) > 200
    //     ) {
    //       footer.style.marginTop = '600px'
    //       console.log(111)
    //     } else {
    //       footer.style.display = 'block'
    //       console.log(222)
    //     }
    //   }
    // }
  }
};
</script>
<style lang='scss'>
.footer_page {
  width: 100%;
  margin-top: 200px;
  .content {
    width: 100%;
    height: 100px;
    background-color: #303133;
    text-align: center;
    color: #fff;
    p{
      line-height: 50px;
      font-size: 20px;
      margin: 0;
    }
  }
}
@media screen and (max-width: 700px) {
  .footer_page {
    margin-top: 100px !important;
  }
}
</style>