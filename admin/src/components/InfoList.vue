<template>
  <div class="InfoList_page">
    <div class="content">
      <div class="header">
        <div class="avatar">
          <img src="./../../static/img/avatar.jpg" alt srcset width="150">
        </div>
        <p>chenchao</p>
        <h5>在学习前端的道路上奋斗</h5>
      </div>
      <ul>
        <li>
          <keep-alive>
          <router-link to="/article" title="文章管理">文章管理</router-link>
          </keep-alive>
        </li>
        <li>
          <keep-alive>
            <router-link to="/add" title="新增文章">新增文章</router-link>
          </keep-alive>
        </li>
        <li>
          <router-link to="/tags" title="标签管理">标签管理</router-link>
        </li>
        <li>
          <router-link to="/message" title="留言管理">留言管理</router-link>
        </li>
        <li>
          <router-link to="/upimg" title="用户设置">上传图片</router-link>
        </li>
        <li>
          <router-link to="/setting" title="用户设置">用户设置</router-link>
        </li>
        <li>
          <a href="javascript: void(0)" @click="logout" title="退出登录">退出登录</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      let isLogin = sessionStorage.getItem("isLogin");
      if (isLogin) {
        let isOut = confirm(`确定退出用户${this.$store.state.userName}`);
        if (!isOut) return;
        this.$store.commit("add", "");
        sessionStorage.clear();
        this.$router.push("/login");
      } else {
      }
    }
  }
};
</script>
<style lang='scss'>
.InfoList_page {
  width: 200px;
  height: 100%;
  background-color: gray;
  background-image: url(./../../static/img/blog_leftbanner.jpg);
  background-size: cover;
  position: fixed;
  left: 0;
  top: 0;
  .content {
    text-align: center;
    .header {
      width: 100%;
      height: 300px;
      border-bottom: 3px solid #ffffff;
      overflow: hidden;
      .avatar {
        height: 150px;
        height: 150px;
        margin: 25px 25px 0 25px;
        overflow: hidden;
        border-radius: 50%;
      }
    }
    ul {
      list-style: none;
      padding: 0;
      li {
        line-height: 40px;
        a {
          color: #ffffff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
          color: red;
        }
      }
    }
    .router-link-active {
      color: red;
    }
  }
}
</style>