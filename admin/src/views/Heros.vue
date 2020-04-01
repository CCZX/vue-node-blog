<template>
  <div class="heros_page">
    <div class="message_list">
      <h3>所有留言：</h3>
      <el-table
        style="width: 100%"
        :data="list.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      >
        <el-table-column prop="name" label="用户名" width="150"></el-table-column>
        <el-table-column prop="content" label="内容" width="500" max-height="200px"></el-table-column>
        <el-table-column prop="website" label="网站" width="150">
          <template slot-scope="scope">
            <a :href="scope.row.website">个人网站</a>
          </template>
        </el-table-column>
        <el-table-column prop="contact" label="联系方式" :formatter="contactFilter" width="180"></el-table-column>
        <el-table-column prop="_id" label="operation" width="300">
          <template slot="header"  slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" :data="scope.row"/>
          </template>
          <template slot-scope="scope">
            <el-button type="warning">修改标签</el-button>
            <el-button type="danger" @click="deleteMsg(scope.row._id)">删除留言</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <modal :dialogVisible="dialogVisible" :message="message" @no="no" @ok="ok"></modal>

  </div>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  data() {
    return {
      list: [], // 留言列表
      search: '', // 表格搜索
      dialogVisible: false, // 弹出框
      message: '是否删除？', // 弹出框消息
      delID: '', // 删除留言的ID
    };
  },
  methods: {
    async init() {
      let res = await this.axios.getHeros();
      if (res.status === 200) {
        this.list = res.data.result;
      }
    },
    // 联系方式过滤
    contactFilter(row, column) {
      let val = row[column.property]
      return val == "" ? "无联系方式" : val
    },
    // 确认是否继续删除留言
    deleteMsg(_id) {
      this.delID = _id
      this.dialogVisible = true
    },
    no() {
      this.dialogVisible = false
      this.delID = ''
    },
    // 确认删除
    async ok() {
      let {data, status} = await this.axios.delHeros({id: this.delID})
      this.dialogVisible = false
      if (status === 200) {
        this.$message({
          message:"删除成功！！！",
          type: "success"
        })
        this.init()
      }
    }
  },
  created() {
    this.init();
  },
  components: {
    Modal
  }
};
</script>

<style lang="scss">
</style>

