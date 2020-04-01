<template>
  <div>
    <div class="list">
      <div class="item" >
        <div class="title">
          <a href>写给 iView 开发者的一封信</a>
        </div>
        <a class="body">
          <div
            class="cover"
            style="background-image: url('https://dev-file.iviewui.com/xM14LMsynHq844vHLXuqx7VkO47hX9dO/small');"
          ></div>
          <div class="cotent">
            你好，亲爱的 iView 开发者（准开发者），很高兴你能使用到我们新上线的 iView 开发者社区。iView 从立项到现在已经经历了两年的时间，7 月 28
            日是它两周岁的生日，在这一天，我们荣幸的召开了新品发布会并发布了 iView 3.0。对于初入社区的你，这篇文章将是一个很好的导引，下面就带你玩转 iView Developer。
          </div>
        </a>
        <div class="footer">
          <div class="tag_list">
            <span class="tag_item">javascript</span>
          </div>
          <div class="time">2019-3-1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.item {
      width: 700px;
      height: 200px;
      padding: 10px;
      border: 1px solid red;
      background-color: rgb(248, 248, 248);
    }

    .title {
      margin: 12px 0;
      font-weight: 700;
      font-size: 16px;
    }

    .body {
      display: block;
      color: #616776;
      overflow: hidden;
      border: 1px solid blue;
      min-height: 120px;
    }

    .cover {
      width: 200px;
      /* height: 100px; */
      padding-bottom: 15%;
      float: right;
      margin-left: 10px;
      border: 1px solid black;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .footer {
      margin-top: 10px;
      background-color: red;
      display: flex;
      justify-content: space-between;
    }
</style>

