<template>
  <div class="archives_page">
    <div class="archives_box">
      <div class="archives_header">
        <Icon type="ios-archive" />
        <h2><span>归档</span></h2>
        <h3>共计<span>{{articleInfo.length}}</span>篇文章</h3>
      </div>
      <div v-for="(item, index) in list" :key="index">
        <h3>
          <i class="icon iconfont">&#xe6e1;</i>
          {{index | formatDate}}
        </h3>
        <ul v-for="(articleItem, index) in item" :key="index">
          <router-link :to="'/article/'+articleItem._id" :title="articleItem.article_desc">
            <li>{{articleItem.article_title}}</li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { archivesFormatDate, formatDate } from "@/utils/index";
export default {
  metaInfo() {
    return {
      title: "归档 | chen'blog",
      meta: [{
        name: 'keywords',
        content: "前端技术 前端学习 分享 总结 生活"
      }]
    }
  },
  data() {
    return {
      articleInfo: []
    };
  },
  methods: {
    async init() {
      let params = {
        page: 1,
        pageSize: 0,
        tagName: "All"
      };
      let { data, status } = await this.axios.getArticleAll(params);
      if (status === 200) {
        this.articleInfo = data.result;
      }
    }
  },
  computed: {
    list() {
      let tmpJson = {};
      this.articleInfo.forEach(item => {
        let time = item.article_create_time.substring(0, 7);
        if (!tmpJson[time]) tmpJson[time] = [];
        tmpJson[time].push(item);
      });
      return tmpJson;
    }
  },
  filters: {
    formatDate(val) {
      return archivesFormatDate(val);
    }
  },
  async created() {
    await this.init();
    this.articleInfo.sort((a, b) => {
      return b.article_create_time - a.article_create_time;
    });
    this.articleInfo = this.articleInfo.map(item => {
      return {
        _id: item._id,
        article_title: item.article_title,
        article_desc: item.article_desc,
        article_create_time: formatDate(item.article_create_time)
      };
    });
  }
};
</script>

<style lang='scss'>
.archives_page {
  width: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  .archives_box {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    background-color: rgb(255, 255, 255);
    padding: 20px;
    .archives_header {
      border-bottom: 1px solid #dcdee2;
      text-align: center;
      margin-bottom: 20px;
      padding: 10px 0;
      i {
        font-size: 40px;
      }
      span {
        color: #f56a00;
      }
    }
    h3 {
      i {
        margin-right: 10px;
      }
    }
    ul {
      margin-left: 20px;
      list-style-type: disc;
      a {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
          transform: translateX(20px);
        }
        li {
          line-height: 40px;
          color: #666;
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .archives_page {
    width: 100% !important;
  }
}
</style>
