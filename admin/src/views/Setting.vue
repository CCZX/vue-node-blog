<template>
  <div class='set_page'>
    <h2>setting</h2>
    <div class="changePwd">
      <p>userName:{{$store.state.userName}}</p>
      <span>原始密码:</span><input type="password" v-model="changeInfo.userPwd">
      <span>修改密码:</span><input type="password" v-model="changeInfo.newPwd">
      <span>确认密码:</span><input type="password" v-model="changeInfo.reNewPwd">
      <button @click="changeUser">修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: [],
      changeInfo: {
        userName: this.$store.state.userName,
        userPwd: '',
        newPwd: '',
        reNewPwd: ''
      }
    }
  },
  methods: {
    async init () {
      let userName = this.$store.state.userName
      let {data, status} = await this.axios.getUser({userName: userName})
      if (status === 200) {
        this.userInfo = data.result
      }
    },
    // 修改密码
    async changeUser () {
      if (this.changeInfo.newPwd == '' || this.changeInfo.reNewPwd == '' || this.changeInfo.originalPwd == '') {
        return alert('请输入用户完整信息!')
      } else if (this.changeInfo.reNewPwd !== this.changeInfo.newPwd) {
        return alert('修改输入的两次密码不一致，请重新输入!')
      }
      let {data, status} = await this.axios.updateUser(this.changeInfo)
      if (status === 200) {
        
      }
    }
  },
  created() {
    this.init()
  },
}

</script>
<style lang='scss'>
</style>