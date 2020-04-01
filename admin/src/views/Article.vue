<template>
  <div class="article_page">

    <h2 style="text-align:center">欢迎来到文章管理页面</h2>
    <!-- 搜索文章 -->
    <div class="tag_list">
      <h3>
        <i class="el-icon-info"></i> 根据标签搜索：
      </h3>
      <el-tag
        v-for="(item, index) in tagsList"
        :key="item._id"
        class="tag_item"
        :class="{'tag_select': selectTagIndex == index}"
        @click="searchByTag(item.tag_name, index)"
      >{{item.tag_name}}</el-tag>
    </div>
    <div class="key_word">
      <h3><i class="el-icon-search"></i>根据关键字搜索：</h3>
      <el-row>
        <el-col :span="9">
          <div class="grid-content bg-purple">
            <el-input v-model="inpkey" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-button type="primary" @click="searchByKeyWord">搜索文章</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="state">
      <h3><i class="el-icon-question"></i>根据文章状态搜索文章</h3>
      <el-radio v-model="radioState" label="1" @change="searchByState(1)">已发布</el-radio>
      <el-radio v-model="radioState" label="0" @change="searchByState(0)">未发布</el-radio>
      <!-- <el-radio v-model="radioState" label="2" @change="searchByState(2)">所有</el-radio> -->
    </div>


    <!-- 文章列表 -->
    <div class="article_table">
      <h3 class="all_title">
        <i class="el-icon-success"></i>所有文章
      </h3>
      <el-table
        :data="articleList"
        style="width: 100%"
        :default-sort="{prop: 'article_create_time', order: 'descending'}">
        <el-table-column prop="article_title" label="title" width="250"></el-table-column>
        <el-table-column
          prop="article_create_time"
          label="publish time"
          sortable
          :formatter="formatDate"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="article_update_time"
          label="modify time"
          sortable
          :formatter="formatDate"
          width="180"
        ></el-table-column>
        <el-table-column prop="article_state" label="status" width="180" :formatter="formatState"></el-table-column>
        <el-table-column prop="_id" label="operation" width="400">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">
              <a :href="'http://blog.chenr.cn/#/article/'+scope.row._id" target="_blank">查看文章</a>
            </el-button>
            <el-button size="mini" type="warning">
              <router-link :to="'/modifyarticle/'+scope.row._id">修改文章</router-link>
            </el-button>
            <el-button size="mini" type="danger" @click="delteArticle(scope.row._id)">删除文章</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    


    <!-- 提示框 -->

    <modal :dialogVisible="dialogVisible" :message="message" @no="no" @ok="ok"></modal>

  </div>
</template>

<script>
import { formatDate } from "./../utils/index.js";
import Modal from './../components/Modal'
export default {
  data() {
    return {
      articleList: [], // 文章列表
      tagsList: [],
      dialogVisible: false, // 弹出框
      message: '是否删除该文章', // 提示框消息
      delArId: "", // 保存要删除文章ID
      selectTagIndex: 0, // 被选中的标签索引
      inpkey: '', // 输入搜索的关键字
      radioState: '1',
      serachKey: {
        // 获取文章的查询字符串
        page: 1,
        pageSize: 0,
        tagName: "All",
        state: 1
      }
    };
  },
  methods: {
    // 初始化，获取文章
    async init() {
      let params = {
        page: this.serachKey.page,
        pageSize: this.serachKey.pageSize,
        tagName: this.serachKey.tagName
      };
      let { data, status } = await this.axios.getArticleAll(params);
      if (status === 200) {
        this.articleList = data.result;
      }
      {
        let { data, status } = await this.axios.getTags();
        if (status === 200) {
          this.tagsList = data.result;
        }
      }
    },
    // 时间过滤器
    formatDate(row, column) {
      let date = row[column.property];
      let time = new Date(Number(date));
      return formatDate(time);
    },
    // 状态过滤器
    formatState(row, column) {
      var state = row[column.property];
      return state == 1 ? "已发布" : "未发表";
    },
    // 确认是否删除文章
    delteArticle(_id) {
      this.delArId = _id;
      this.dialogVisible = true;
    },
    no() {
      this.dialogVisible = false 
      this.delArId = ''
    },
    // 开始删除文章
    async ok() {
      // this.deling = true;
      let { data, status } = await this.axios.delArticle({ id: this.delArId });
      this.dialogVisible = false;
      // this.deling = false;
      if (status === 200) {
        this.$message({
          message: "删除成功！！！",
          type: "success"
        });
        this.init();
      }
    },
    // 根据标签搜索文章
    async searchByTag(tag_name, index) {
      this.selectTagIndex = index
      let params = {
        page: 1,
        pageSize: 0,
        tagName: tag_name
      }
      let {data, status} = await this.axios.getArticleAll(params)
      if (status === 200) {
        this.articleList = data.result
      }
    },
    // 输入框关键字搜索文章
    async searchByKeyWord() {
      let {data, status} = await this.axios.search({keyword: this.inpkey})
      if (status === 200) {
        this.articleList = data.result
      }
    },
    // 根据状态搜索文章
    async searchByState(state) {
      let {data, status} = await this.axios.searchByState({state: state})
      if (status === 200) {
        this.articleList =data.result
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
.article_page {
  i {
    margin-right: 10px;
  }
  .tag_list {
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .tag_select {
      background-color:#F56C6C;
      color: white;
    }
    .tag_item {
      margin: 0 20px;
      cursor: pointer;
    }
  }
  .key_word, .state, .article_table {
    margin-top: 20px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
}
</style>
