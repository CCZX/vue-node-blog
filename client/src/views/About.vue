<template>
  <div class="about_page">
    <div class="main">
      <div class="base-info">
        <img src="http://blog.static.chenr.cn/6506B1E907CD42416A10694FC424C458.jpg" alt srcset>
        <h1>CHEN</h1>
        <p>今年计划：实习！！！实习！！！实习！！！</p>
      </div>
      <div class="main-info">
        <div class="me">
          <h1>IT'S ME</h1>
          <ul class="me-list">
            <li class="me-item">
              <i class="icon iconfont" style="color:#49a9ee;">&#xe629;</i>
              <!--#3dbd7d-->
              <p>90后青年一枚，喜欢新技术，有家室</p>
            </li>
            <li class="me-item">
              <i class="icon iconfont" style="color:#f46e65;">&#xe6ca;</i>
              <p>熬夜敲代码、民谣、足球、旅行、躺尸</p>
            </li>
            <li class="me-item">
              <i class="icon iconfont" style="color:#3db8c1;">&#xe623;</i>
              <p>JavaScript、Vue、Node</p>
            </li>
            <li class="me-item">
              <i class="icon iconfont" style="color:#948aec;">&#xe7e6;</i>
              <p>四川省成都市（天府之国）</p>
            </li>
          </ul>
        </div>
        <div class="side">
          <div class="contact side_item">
            <h3>你可以在这里找到我</h3>
            <ul>
              <li>
                <a
                  href="https://juejin.im/user/5b322d966fb9a00e9e59d921"
                  title="一起来掘金分享技术呀"
                  target="_blank"
                >
                  <i class="icon iconfont">&#xe600;</i>
                </a>
              </li>
              <li>
                <a href title="音乐的伴侣">
                  <i class="icon iconfont" style="color:red;">&#xe6d0;</i>
                </a>
              </li>
              <li>
                <a href title="常联系">
                  <i class="icon iconfont" style="color:green;">&#xe621;</i>
                </a>
              </li>
              <li>
                <a href="https://gitee.com/chaoch/events" title="一起进步" target="_blank">
                  <i class="icon iconfont" style="color:orange">&#xe601;</i>
                </a>
              </li>
            </ul>
          </div>
          <div class="friend_link side_item">
            <h3>友情链接</h3>
            <div class="link_list">
              <a href="https://bdongs.com" target="blank" class="item">dbongs</a>
              <a href="https://cczx.github.io/" target="blank" class="item">小狮子</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <map-box></map-box> -->
  </div>
</template>

<script>
import mapBox from "@/components/map.vue";
export default {
  metaInfo() {
    return {
      title: "关于 | chen'blog",
      meta: [
        {
          name: "keywords",
          content: "chen'blog"
        }
      ]
    };
  },
  components: {
    mapBox
  }
};
</script>

<style lang='scss'>
.about_page {
  .main {
    width: 100%;
    margin: 0 auto;
    .base-info {
      margin: 20px auto;
      margin-bottom: 40px;
      text-align: center;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      h1 {
        margin: 20px 0;
        font-family: "Courier New", Courier, monospace;
      }
    }
    .main-info {
      width: 80%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      .me {
        width: 70%;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
        background-color: rgb(255, 255, 255);
        h1 {
          text-align-last: center;
          font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .me-list {
          .me-item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: nowrap;
            margin: 10px 0;
            padding: 0 12px;
            font-size: 20px;
            i {
              color: #222;
              display: block;
              margin-block-start: 1em;
              margin-block-end: 1em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
              padding: 4px 0;
              font-size: 20px;
              margin-right: 10px;
            }
            p {
              display: block;
              margin-block-start: 1em;
              margin-block-end: 1em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
              flex: 1 0;
              padding: 4px 0;
            }
          }
        }
      }
      .side {
        width: 25%;
        margin-left: 20px;
        .contact {
          h3 {
            text-align: center;
          }
          ul {
            margin: 10px 0 0 0;
            padding: 0;
            list-style: none;
            display: flex;
            justify-content: space-between;
            a {
              text-decoration: none;
              i {
                font-size: 20px;
              }
            }
          }
        }
        .side_item {
          padding: 10px 25px 15px;
          margin-bottom: 10px;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
          background-color: rgb(255, 255, 255);
          box-sizing: border-box;
          border-radius: 10px;
        }
        .friend_link {
          text-align: center;
          .link_list {
            text-align: left;
            margin-top: 10px;
            .item {
              background-color: #f7f7f7;
              color: #222;
              margin:0 0 10px 10px;
              display: inline-block;
              border-radius: 4px;
              padding: 7px 12px;
              box-sizing: border-box;
              transition: all .5s;
              &:hover {
                background-color: #c5c8ce;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .main {
    width: 90% !important;
    .main-info {
      width: 100% !important;
      .me {
        width: 100% !important;
      }
      .side {
        margin: 15px 0 !important;
        width: 100% !important;
      }
    }
  }
}
</style>
