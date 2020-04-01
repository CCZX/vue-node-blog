<template>
  <div class="login_page">
    <div class="content">
      <h2>用户登录</h2>
      <ul>
        <li>
          <i class="icon iconfont">&#xe612;</i>
          <input type="text" v-model="userInfo.userName" placeholder="User Name">
        </li>
        <li>
          <i class="icon iconfont">&#xe603;</i>
          <input type="password" v-model="userInfo.userPwd" placeholder="Password" @keyup.enter="login">
        </li>
      </ul>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import './../../static/css/iconfont.css'
export default {
  data() {
    return {
      userInfo: {
        userName: '',
        userPwd: ''
      }
    };
  },
  methods: {
    async login () {
      if (this.userInfo.userName == '' || this.userInfo.userPwd == '') {
        return alert('请输入完整信息');
      }
      let {data, status} = await this.axios.login({
        'user_name': this.userInfo.userName,
        'user_pwd': this.userInfo.userPwd
      })
      if (status === 200) {
        alert(data.msg)
      }
      if (data.status == 0) {
        this.$store.commit('add', data.result)
        this.$router.push({
          path: '/article'
        })
      }
    }
  },
};
</script>
<style lang='scss'>
.login_page{
  .content{
    width: 500px;
    box-shadow: 0px 0px 10px #666;
    position: absolute;
    padding: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    p{
      margin: 0 auto;
    }
    .login_cell {
      display: flex;
      margin-top: 20px;
      justify-content: flex-start;
      p{
        width: 60px;
        height: 40px;
        background-color: black;
        line-height: 40px;
        color: #ffffff;
        margin-right: 20px;
      }
      input{
        border-bottom: 1px solid #666;
        height: 40px;
        width: 200px;
      }
    }
    ul {
      list-style: none;
      padding: 0;
      li {
        border: 1px solid #666;
        height: 70px;
        margin-top: 20px;
        border-radius: 10px;
        i {
          padding: 10px 0 0 10px;
          display: inline-block;
          width: 40px;
          height: 40px;
          font-size: 40px;
        }
        input {
          border: none;
          height: 40px;
          font-size: 20px;
          &:focus {
            outline: none;
          }
        }
      }
    }
    button {
      border: none;
      color: #fff;
      font-size: 20px;
      margin-left: 40%;
      width: 100px;
      height: 40px;
      background-color: #009de6;
      border-radius: 10px;
      outline: none;
    }
  }
}
</style>