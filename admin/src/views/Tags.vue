<template>
  <div class="tag_page">
    <h1>欢迎来到标签管理页面</h1>
    <div class="add_tag">
      <h3>添加新的标签：</h3>
      <p>输入标签名：</p>
      <el-input v-model="tag_name" placeholder="标签名" class="item" maxlength="30"></el-input>
      <p>输入标签描述：</p>
      <el-input type="textarea" :rows="2" placeholder="标签描述" v-model="tag_desc"></el-input>
      <el-button type="danger" @click="add">添加</el-button>
    </div>


    <div class="tag_list">
      <h3>所有标签：</h3>
      <el-table
        :data="afterTagsList"
        style="width: 100%"
        :default-sort="{prop: 'tag_num', order: 'descending'}">
        <el-table-column prop="tag_name" label="标签名" width="180"></el-table-column>
        <el-table-column
          prop="tag_desc"
          label="标签描述"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="tag_num"
          label="标签号"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column prop="_id" label="operation" width="400">
          <template slot-scope="scope">
            <el-button  type="warning">修改标签</el-button>
            <el-button  type="danger" @click="deleteTag(scope.row._id)">删除标签</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>是否删除该标签？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="no()">取 消</el-button>
        <el-button type="danger" @click="ok()">确 定</el-button>
      </span>
    </el-dialog> -->


    <modal :dialogVisible='dialogVisible' :message="message" @ok="ok" @no="no"></modal>
  </div>
</template>

<script>
import Modal from './../components/Modal'
export default {
  data() {
    return {
      tagsList: [],
      delID: '', // 保存要删除的标签
      tag_name: '', // 要添加的标签名
      tag_desc: '', // 要添加的标签描述
      dialogVisible: false, // 模态框
      message: '是否确认删除该标签？' // 提示
    }
  },
  computed: {
    afterTagsList() {
      let arr = []
      this.tagsList.forEach(item => {
        if (item.tag_name != 'All') {
          arr.push(item)
        }
      })
      return arr
    }
  },
  methods: {
    async init () {
      let {data, status} = await this.axios.getTags()
      if (status == 200) {
        this.tagsList = data.result
      }
    },
    // 是否删除？
    deleteTag(id) {
      this.dialogVisible = true
      this.delID = id
    },
    // 确认删除！
    async ok() {
      let {data, status} = await this.axios.delTag({id: this.delID})
      this.dialogVisible = false
      if (status === 200) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.init()
      }
    },
    // 不删除
    no() {
      this.dialogVisible = false
      this.delID = ''
    },
    // 添加标签
    async add() {
      if (this.tag_name == "" || this.tag_desc == '') {
        return this.$message({
          message: "信息没有填写完整",
          type: "error"
        });
      }
      let params = {
        tagName: this.tag_name,
        tagDesc: this.tag_desc,
        tagNum: this.afterTagsList.length+1
      }
      let {data, status} = await this.axios.addTag(params)
      if (status === 200) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.tag_name = this.tag_desc = ''
        this.init()
      }
    }
  },
  created() {
    this.init()
  },
  components: {
    Modal
  }
}
</script>

<style lang="scss">
  .tag_page {
    h1 {
      text-align: center;
    }
    .add_tag {
      margin: 20px 0;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      button {
        margin-top: 10px;
      }
    }
    .tag_list {
      padding: 20px;
    }
  }
</style>

