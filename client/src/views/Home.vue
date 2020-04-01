/*
 * @Author: chenchao 
 * @Date: 2018-11-26 20:10:01 
 * @Last Modified by: chenchao
 * @Last Modified time: 2019-04-02 14:37:31
 */
<template>
  <div class="home">
    <div class="main">
      <div class="article">
        <div v-if="this.articleList.length == 0">
          <h2>客官这里还没有你要找的文章，请您关注我以便以后查看更新！</h2>
        </div>
        <div class="list">
          <div class="item" v-for="item in articleList" :key="item._id">
            <div class="title">
              <router-link
                :to="'/article/'+item._id"
                class="article-title"
                title="文章标题"
              >{{item.article_title}}</router-link>
            </div>
            <router-link :to="'/article/'+item._id" class="body">
              <div
                class="cover"
                :style='"background-image:url("+item.article_cover+");"'
                v-if="item.article_cover != ''"
              ></div>
              <div class="cotent">{{item.article_desc}}</div>
            </router-link>
            <div class="footer">
              <div class="tag_list">
                <i class="icon iconfont">&#xe793;</i>
                <span
                  class="tag_item"
                  v-for="(itemTag, index) in item.article_tags"
                  :key="index"
                  v-tag
                >{{itemTag}}</span>
              </div>
              <div class="time">
                <i class="icon iconfont">&#xe6e1;</i>{{item.article_create_time | formattime('yyyy-mm-dd')}}
              </div>
            </div>
          </div>
        </div>
        <div class="load-more" @click="loadMore" v-if="articleList != 0">
          <span v-show="!loading">{{loadFont}}</span>
          <span v-show="loading"><Icon type="ios-loading" />加载中...</span>
        </div>
      </div>
      <div class="info">
        <div class="search" v-inpFocus>
          <input type="text" placeholder="Search..." v-model="searchKeyword" @keyup.enter="search">
          <i class="icon iconfont">&#xe680;</i>
        </div>
        <div class="about">
          <!-- <p>个人简介</p> -->
          <router-link to="/about" title="简介">成都大学·陈超</router-link>
          <a href title="email">Email</a>
          <a href="https://juejin.im/user/5b322d966fb9a00e9e59d921" title="掘金地址">掘金</a>
          <a href="https://gitee.com/chaoch/events" title="gitee">码云</a>
        </div>
        <div class="tags">
          <div class="tag_header"><i class="icon iconfont">&#xe793;</i><span>标签</span></div>
          <span
            class="tag_item"
            v-for="(item, index) in tagsInfo"
            :class="{'tag_select': selectTagIndex == index}"
            :key="item._id"
            :data-num="item.tag_num"
            @click="searchByTag(item.tag_name, index)"
          >{{item.tag_name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/index";
import "./../../static/css/iconfont.css";
export default {
  metaInfo() {
    return {
      title: "首页 | Chen'blog",
      meta:  [{
        name: "keywords",
        content: "Chen博客 陈超 技术交流 民谣 前端技术 前端学习"
      }]
    }
  },
  data() {
    return {
      articleList: [],
      tagsInfo: [],
      loading: false,
      loadFont: "加载更多...",
      searchKeyword: "",
      selectTagIndex: 0,
      errorImg: 'this.src="' + require("./../../static/img/errorimg.png") + '"', // 图片失效的替代图片
      getKeyword: {
        page: 1,
        pageSize: 3,
        tagName: "All"
      }
    };
  },
  methods: {
    // 获取首页文章
    async getArticleAll(flag = false) {
      let params = {
        page: this.getKeyword.page,
        pageSize: this.getKeyword.pageSize,
        tagName: this.getKeyword.tagName
      };
      this.loading = true;
      let { data, status } = await this.axios.getArticleAll(params);
      this.loading = false;
      if (status === 200) {
        if (flag) {
          this.articleList = this.articleList.concat(data.result);
          if (data.result.length == 0) {
            this.loadFont = "没有更多啦！";
            this.loading = false;
          } else {
            this.loading = false;
          }
        } else {
          this.articleList = data.result;
          this.loading = false;
        }
      }
    },
    // 获取首页标签列表
    async getTags() {
      let { data, status } = await this.axios.getTags();
      if (status === 200) {
        this.tagsInfo = data.result;
      }
    },
    // 根据关键字标题搜索文章
    async search() {
      let { data, status } = await this.axios.search({
        keyword: this.searchKeyword,
        pageSize: this.getKeyword.pageSize
      });
      if (status === 200) {
        this.articleList = data.result;
      }
    },
    // 根据标签搜索文章
    async searchByTag(tag_name, index) {
      this.getKeyword.page = 1;
      this.selectTagIndex = index;
      this.getKeyword.tagName = tag_name;
      this.loadFont = "加载更多...";
      let params = {
        page: 1,
        pageSize: this.getKeyword.pageSize,
        tagName: this.getKeyword.tagName
      };
      this.loading = true;
      let { data, status } = await this.axios.getArticleAll(params);
      this.loading = false;
      if (status == 200) {
        this.articleList = data.result;
      }
    },
    // 加载更多
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.getKeyword.page++;
        this.getArticleAll(true);
      }, 500);
    }
  },
  filters: {
    formattime(val, pattern) {
      return formatDate(val, pattern);
    },
    filterTag (val) {
      return val == "All"? "" : val
    }
  },
  directives: {
    inpFocus: {
      inserted(el) {
        el.onclick = function(e) {
          this.style.border = "3px solid rgba(0, 0, 0, 0.1)";
          window.onclick = function name() {
            el.style.border = "none";
          };
          e.stopPropagation();
        };
      }
    },
    tag: {
      inserted(el) {
        if (el.innerText == 'All') {
          el.style.display = 'none'
        }
      }
    }
  },
  mounted() {
    this.getArticleAll();
    this.getTags();
  }
};
</script>

<style lang='scss'>
.home {
  .main {
    width: 1200px;
    margin: 10px auto;
    position: relative;
    box-sizing: border-box;
    .article {
      overflow: hidden;
      width: 70%;
      .list {
        width: 100%;
        .item {
          margin-bottom: 20px;
          width: 100%;
          height: 250px;
          padding: 10px;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
          background-color: rgb(255, 255, 255);
          border-radius: 10px;
          position: relative;
          .title {
            margin: 12px 0;
            font-weight: 700;
            font-size: 16px;
            a {
              color: #222;
              &:hover {
                color: rgb(45,140,240);
              }
            }
          }
          .body {
            display: block;
            color: #616776;
            overflow: hidden;
            max-height: 120px;
            .cover {
              width: 200px;
              height: 120px;
              float: right;
              margin-left: 10px;
              border-radius: 6px;
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
          .footer {
            padding-top: 10px;
            .tag_list {
              .tag_item {
                line-height: 15px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 2px;
                margin-left: 10px;
                display: inline-block;
                padding: 3px;
                box-sizing: border-box;
                cursor: pointer;
              }
            }
            .time {
              font-size: 16px;
              i {
                margin-right: 12px;
              }
            }
          }
        }
      }
      .load-more {
        width: 150px;
        margin: 36px auto 16px;
        padding: 6px 32px;
        line-height: 30px;
        color: #222;
        border: none;
        color: rgb(45,140,240);
        cursor: pointer;
      }
    }
    .info {
      width: 27%;
      padding: 10px;
      position: absolute;
      top: 0;
      right: 0;
      overflow: hidden;
      .search {
        // width: 270px;
        height: 40px;
        padding-left: 15px;
        line-height: 40px;
        box-sizing: border-box;
        background-color: rgba(164, 177, 191, 0.15);
        border-radius: 20px;
        transition: all 0.5s ease-in-out;
        display: flex;
        justify-content: center;
        input {
          display: inline-block;
          width: 210px;
          background-color: transparent;
          outline: none;
          border: none;
          &:focus {
            outline: none;
            border: none;
          }
        }
        i {
          display: inline-block;
          font-size: 30px;
        }
      }
      .about {
        margin: 20px 0;
        padding: 20px 10px;
        text-align: center;
        background-color: rgb(255, 255, 255);
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        a {
          text-decoration: none;
          color: #222;
          display: block;
          margin-top: 5px;
        }
      }
      .tags {
        padding: 15px 5px;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
        .tag_header {
          border-bottom: 1px solid #dcdee2;
          padding: 4px 0 10px;
          span {
            margin-left: 7px;
            font-size: 15px;
            font-weight: 800;
          }
        }
        .tag_item {
          display: inline-block;
          padding: 3px 8px;
          border: 1px solid #dcdee2;
          border-radius: 3px;
          text-align: center;
          margin: 15px 10px 0 0;
          cursor: pointer;
          transition: all 0.5s ease-in-out;
          &:hover {
            background-color: #c5c8ce;
          }
        }
        .tag_select {
          background-color: #c5c8ce;
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .main {
    width: 100% !important;
  }
  .article {
    width: 100% !important;
    .list {
      .item {
        .cover {
          width: 150px !important;
          height: 120px !important;
        }
      }
    }
  }
  .info {
    display: none !important;
  }
}
</style>
