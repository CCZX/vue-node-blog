<template>
  <div class="article_page">
    <div class="main_page">
      <div class="content">
        <div class="article_cover" :style='"background-image:url("+articleInfo.article_cover+");"' v-if="articleInfo.article_cover != ''"></div>
        <div class="header">
          <h1 class="article_title">{{articleInfo.article_title}}</h1>
          <p>{{articleInfo.article_create_time | formatDate}}</p>
        </div>
        <div v-html="articleContent" class="markdown-body"></div>
        <div class="article_footer">
          <span
            class="tag_item"
            v-for="(item, index) in articleInfo.article_tags"
            :key="index"
            v-tag
          >{{item}}</span>
        </div>
      </div>
      <div class="directory" v-tocFixed v-jump>
        <p class="toc_title">目录</p>
        <ul v-html="articleToc"></ul>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "@/plugins/marked";
import {jumpTop,debounce,formatDate} from "@/utils/index"
export default {
  metaInfo() {
    return {
      title: `文章详情 | ${this.articleInfo.article_title}`,
      meta: [{
        name: 'keywords',
        content: "前端技术"
      }]
    }
  },
  data() {
    return {
      input: ""
    };
  },
  computed: {
    articleContent() {
      return marked(this.articleInfo.article_content, false, true).html;
    },
    articleToc() {
      let tochtml = '';
      let tocArr = marked(this.articleInfo.article_content, false, true).toc;
      if(tocArr == null) return;
      tocArr.forEach(item => {
        tochtml += `<li data-id=${item.anchor}><i class="iconfont icon-line"></i>`;
        for(let i=0;i<item.level;i++){
          tochtml += '<i class="iconfont icon-shuxian-copy-copy"></i>';
        }
        tochtml += " " + item.text + '</li>';
      })
      return tochtml
    },
    articleInfo() {
      return this.$store.state.article.currentArticle
    }
  },
  directives: {
    tocFixed: {
      inserted(el) {
        window.addEventListener('scroll', function () {
          let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
          if (scrollTop > 300) {
            el.classList.add('toc_fixed')
            el.style.right = '20px'
          } else {
            el.classList.remove('toc_fixed')
          }
        })
      }
    },
    jump: {
      inserted(el) {
        function index(e) {
          const TARGET = e.target
          let attr = TARGET.getAttribute('data-id').replace('#', '')
          let jumpToTag = document.getElementById(attr)
          jumpTop(jumpToTag)
        }
        el.onclick = debounce(index, 500)
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
  filters: {
    formatDate(val) {
      return formatDate(val, 'ZH')
    }
  },
  created() {
    let { id } = this.$route.params;
    this.$store.dispatch("getArticle", id)
  }
};
</script>

<style src="../../static/css/markdown.css"></style>
<style lang='scss'>
.article_page {
  .main_page {
    margin: 0 100px;
    .content {
      width: 80%;
      padding: 10px 10px 40px;
      display: inline-block;
      box-sizing: border-box;
      background-color: rgb(255,255,255);
      border-radius: 10px;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
      .article_cover {
        width: 100%;
        height: 30vw;
        margin-bottom: 40px;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .header {
        margin-bottom: 30px;
        text-align: center;
      }
      .article_footer {
        margin: 30px 0;
        border-top: 1px solid #dcdee2;
        text-align-last: center;
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
      }
    }
    .directory {
      min-height: 80px;
      padding: 10px 15px;
      position: fixed;
      top: 100px;
      width: 20%;
      display: inline-block;
      background-color: rgb(255,255,255);
      box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
      border-radius: 10px;
      .toc_title {
        text-align: center;
        font-size: 20px;
        font-weight: 800;
      }
      ul {
        width: 100%;
        margin: 0;
        list-style: none;
        li {
          margin-top: 2px;
          line-height: 50px;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .main_page {
    margin: 0 !important;
    width: 100% !important;
    .content {
      width: 100% !important;
      padding: 0 10px !important;
      .article_cover {
        height: 200px !important;
      }
      h1 {
        word-break: break-all;
      }
    }
  }
  .directory {
    display: none !important;
  }
}
</style>