<template>
  <div class="header_page">
    <div class="wrap" v-topBar>
      <div class="logo">
        <div class="logo_img">
          <img src="./../../static/img/favicon.jpg" alt="logo" srcset="" width="50" height="40">
        </div>
        <span>code、football、music</span>
      </div>
      <div class="nav_list">
        <ul>
          <li>
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link to="/archives">归档</router-link>
          </li>
          <li>
            <router-link to="/guestbook">留言</router-link>
          </li>
          <li>
            <router-link to="/about">关于</router-link>
          </li>
        </ul>
      </div>
      <div class="button">
          <i class="icon iconfont" v-showList>&#xe606;</i>
      </div>
      <div class="hidden_list">
        <ul>
          <li>
              <Icon type="md-home" />
            <keep-alive>
              <router-link to="/home">首页</router-link>
            </keep-alive>
          </li>
          <li>
            <Icon type="ios-archive" />
            <keep-alive>
              
              <router-link to="/archives">归档</router-link>
            </keep-alive>
          </li>
          <li>
            <Icon type="md-chatbubbles" />
            <keep-alive>
              
              <router-link to="/guestbook">留言</router-link>
            </keep-alive>
          </li>
          <li>
            <Icon type="md-person" />
            <keep-alive>
              <router-link to="/about">关于</router-link>
            </keep-alive>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import './../../static/css/iconfont.css'
export default {
  directives: {
    showList: {
      inserted(el) {
        let hiddenList = document.getElementsByClassName('hidden_list')[0];
        el.onclick = function (e) {
          hiddenList.classList.toggle('show')
          window.onclick = function () {            
            hiddenList.classList.remove('show')
          }
          e.stopPropagation();
        }
      }
    },
    topBar: {
      inserted(el) {
        window.onscroll = function () {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          if (scrollTop > 300) {
            el.style.backgroundColor = '#ddd9d9'
          } else {
            el.style.backgroundColor = '#f2f2f2'
          }
        }
      }
    }
  }
}
</script>

<style lang='scss'>
.header_page{
  z-index: 990;
  position: fixed;
  top: 0;
  width: 100%;
  .wrap{
    background-color: #f2f2f2; // #1a1818 #ebebeb rgba(1,1,1, 0.5) hsla(0, 0%, 100%, 0.8)
    width: 100%; 
    height: 60px;
    box-shadow: 0 0 14px 2px #cccccc;
    color: #222;
    transition: all .5s ease-in-out;
    .logo{
      margin-left: 50px;
      width: 200px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 60px;
      display: flex;
      align-items: center;
      .logo_img{
        height: 40px;
        margin-right: 10px;
      }
    }
    .nav_list{
      margin-right: 50px;
      width: 400px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      ul{
        list-style: none;
        padding: 0;
        margin: 0;
        li{
          display: inline-block;
          width: 70px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          .router-link-active{
            color: #3db8c1;
            border-top: 2px solid rgb(1,1,1);
          }
          a{
            display: inline-block;
            text-decoration: none;
            color: #222;
            height: 100%;
            width: 100%;
          }
          a:hover{
            color: #3db8c1;
          }
        }
      }
    }
    .button{
      position: absolute;
      top: 20px;
      right: 20px;
      display: none;
      cursor: pointer;
    }
    .hidden_list{
      position: absolute;
      transform: translateY(-200px);
      opacity: 0;
      transition: all .5s ease-in-out;
      z-index: 999;
      width: 100%;
      background-color: #f2f2f2;
      padding: 10px;
      padding-left: 30px;
      text-align: left;
      ul{
        list-style: none;
        li{
          height: 30px;
          margin-top: 10px;
          font-size: 1.3rem;
          vertical-align: middle;
          line-height: 30px;
          a{
            color: #222;
            text-decoration: none;
          }
          .router-link-active {
            color: red;
          }
        }
      }
    }
    .hidden_list.show {
      transform: translateY(60px);
      opacity: .9;
    }
  }
}
@media screen and (max-width: 700px){
  .nav_list {
    display: none;
  }
  .button{
    display: block !important;
  }
}
</style>
