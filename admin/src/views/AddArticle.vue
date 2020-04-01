<template>
  <div class="add_article_page">
    <div class="select_modal" v-if="visitModal">
      <div class="main">
        <div class="cancel" @click="visitModal = false">
          <i class="el-icon-circle-close-outline"></i>
        </div>
        <h4>发表文章</h4>
        <p>输入文章描述：</p>
        <el-input type="textarea" :rows="2" placeholder="请输入文章描述" v-model="article_desc"></el-input>

        <p>输入文章封面地址：</p>
        <el-input v-model="article_cover" placeholder="文章封面地址" class="item" maxlength="30"></el-input>
        <p>上传封面：</p>
        <input type="file" name id @change="upImg">
        <el-button type="danger" size="mini" @click="upqiniu()">上传封面</el-button>

        <div class="tag_list">
          <p>选择文章标签：</p>
          <el-tag
            v-for="(item) in afterTagsList"
            :key="item._id"
            class="tag_item"
            v-selectTag
            @click="addTag(item.tag_name)"
          >{{item.tag_name}}</el-tag>

          <div class="btn">
            <el-button type="warning" @click="visitModal = false">取消发表</el-button>
            <el-button type="danger" @click="published">发布文章</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="head">
      <el-input v-model="article_title" placeholder="请输入文章标题,最多30个字" class="item" maxlength="30"></el-input>
      <el-button type="danger" class="item" @click="publish">发表文章</el-button>
    </div>
    
    <mavon-editor v-model="article_content" class="container"/>
  </div>
</template>

<script>
import axios from "axios";
import { imgRandomName } from "@/utils/index";
export default {
  data() {
    return {
      tagsList: [], // 从后台获取的标签
      article_content: "", // 文章内容
      article_title: "", // 文章标题
      article_desc: "", // 文章描述
      article_tags: [], // 文章标签
      article_cover: "", // 文章封面
      visitModal: false, // 是否显示模态框
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名pki3o6rvk.bkt.clouddn.com
      qiniuaddr: "static.chenr.cn",
      upload_img: {} // 上传的图片
    };
  },
  computed: {
    afterTagsList() {
      let arr = [];
      this.tagsList.forEach(item => {
        if (item.tag_name !== "All") {
          arr.push(item);
        }
      });
      return arr;
    }
  },
  methods: {
    async getTags() {
      let { data, status } = await this.axios.getTags();
      if (status === 200) {
        this.tagsList = data.result;
      }
    },
    addTag(tag_name) {
      console.log(tag_name);
      if (this.article_tags.indexOf(tag_name) == -1) {
        this.article_tags.push(tag_name);
      } else {
        let index = this.article_tags.indexOf(tag_name);
        this.article_tags.splice(index, 1);
      }
      console.log(this.article_tags);
    },
    // 进入选择标签
    publish() {
      if (this.article_content === "" || this.article_title === "") {
        this.$message({
          message: "信息没有填写完整哦！！！",
          type: "error"
        });
        return;
      }
      this.visitModal = true;
    },
    // 选择完毕可以发布
    async published() {
      if (this.article_desc == "" || this.article_tags.length == 0) {
        return this.$message({
          message: "信息没有填写完整哦！！！",
          type: "error"
        });
      }
      let params = {
        article_title: this.article_title,
        article_content: this.article_content,
        article_desc: this.article_desc,
        article_cover: this.article_cover,
        article_tags: this.article_tags,
        article_state: 1
      };
      let { data, status } = await this.axios.addArticle(params);
      if (status === 200) {
        this.$message({
          message: "发表文章成功！！！",
          type: "success"
        });
        this.article_title = this.article_content = this.article_desc = this.article_cover =
          "";
        this.article_tags.length = 0;
        this.visitModal = false;
      }
    },
    upImg(e) {
      let obj = e.target;
      let file = obj.files[0];
      this.upload_img = {
        file_realname: file.name,
        file_size: file.size,
        fiel_type: file.type,
        file
      };
    },
    upqiniu() {
      if (this.upload_img.file === undefined) {
        return this.$message({
          message: "还没有选择图片！！！",
          type: "error"
        });
      }
      let item = this.upload_img;
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let filetype = "";
      if (item.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      const keyname = imgRandomName() + "." + filetype;
      this.axios.upImg().then(res => {
        const formdata = new FormData();
        formdata.append("file", item.file);
        formdata.append("token", res.data);
        formdata.append("key", keyname);
        axios.post(this.domain, formdata, config).then(res => {
          this.article_cover = "http://" + this.qiniuaddr + "/" + res.data.key;
        });
      });
    }
  },
  directives: {
    selectTag: {
      inserted(el) {
        el.addEventListener("click", function() {
          el.classList.toggle("tag_select");
        });
      }
    },
    h: {
      inserted(el) {
        let height = window.screen.height;
        el.style.height = `${height}px`;
      }
    }
  },
  created() {
    this.getTags();
  }
};
</script>


<style lang="scss">
.add_article_page {
  height: 100%;
  .head {
    display: flex;
    margin: 20px 0;
    input {
      margin-right: 10px;
    }
  }
  .container {
    width: 1250px;
    height: 700px;
  }

  .select_modal {
    z-index: 99999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(1, 1, 1, 0.5);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .main {
      width: 600px;
      height: 550px;
      padding: 20px;
      border-radius: 10px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-70%, -50%);
      .cancel {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag_list {
        .tag_item {
          cursor: pointer;
          margin: 0 0 10px 10px;
          user-select: none;
        }
        .tag_select {
          background-color: #f56c6c;
          color: white;
        }
      }
      .btn {
        margin-top: 20px;
      }
    }
  }
}
</style>
