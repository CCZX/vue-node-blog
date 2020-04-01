<template>
  <div class="add_article_page">
    <div class="article_info">

      <p>文章描述：</p>
      <el-input type="textarea" :rows="2" placeholder="请输入文章描述" v-model="article_info.article_desc"></el-input>

      <p>文章封面地址：</p>
      <el-input v-model="article_info.article_cover" placeholder="文章封面地址" class="item" maxlength="30"></el-input>
      <p>上传封面：</p>
      <input type="file" name id @change="upImg">
      <el-button type="danger" size="mini" @click="upqiniu()">上传封面</el-button>

      <div class="tag_list">
        <p>文章标签：</p>


        <!-- <p v-if="article_info.article_tags.length == 0">还没有选择标签</p> -->
        <el-tag
          v-for="(item, index) in article_info.article_tags"
          :key="index"
          class="tag_item"
          closable
          v-filterTag
          @close="delTag(item)"
        >{{item}}</el-tag>
        <p>选择更多的标签：</p>
        <el-tag
          v-for="(item) in tagsList"
          :key="item._id"
          class="tag_item"
          type='warning'
          v-filterTag
          @click="addTag(item.tag_name)"
        >{{item.tag_name}}</el-tag>
      </div>
    </div>

    <div class="head">
      <p>文章标题：</p>
      <el-input v-model="article_info.article_title" placeholder="请输入文章标题,最多30个字" class="item" maxlength="30"></el-input>
      <el-button type="warning" @click="no">取消修改</el-button>
      <el-button type="danger" @click="ok">确认修改</el-button>
    </div>
    <p>文章内容：</p>
    <mavon-editor v-model="article_info.article_content" class="container"/>
  </div>
</template>

<script>
import axios from "axios";
import { imgRandomName } from "@/utils/index";
export default {
  data() {
    return {
      tagsList: [], // 从后台获取的标签
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名pki3o6rvk.bkt.clouddn.com
      qiniuaddr: "static.chenr.cn",
      upload_img: {}, // 上传的图片
      article_info: {},
    };
  },
  methods: {
    async getTags() {
      let { data, status } = await this.axios.getTags();
      if (status === 200) {
        this.tagsList = data.result;
      }
    },
    // 删除文章标签
    delTag(tag_name) {
      console.log(tag_name)
      let index = this.article_info.article_tags.indexOf(tag_name)
      console.log(index)
      this.article_info.article_tags.splice(index, 1)
    },
    // 添加文章标签
    addTag(tag_name) {
      if (this.article_info.article_tags.indexOf(tag_name) != -1) {
        return this.$message({
          message: `已经选择了${tag_name}标签了哦！！！`,
          type: "error"
        });
      }
      this.article_info.article_tags.push(tag_name)
    },
    // 取消修改
    no() {
      this.$router.go(-1)
    },
    // 确认修改
    async ok() {
      this.article_info.article_tags.push('All')
      let params = {
        _id: this.$route.params.id,
        article_info: this.article_info
      }
      let {data, status} = await this.axios.modifyArticle(params) 
      if (status === 200) {
        this.$message({
          message: `修改成功！！！`,
          type: "success"
        });
        setTimeout(() => {
          this.$router.go(-1)
        }, 500);
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
          this.article_info.article_cover = "http://" + this.qiniuaddr + "/" + res.data.key;
        });
      });
    }
  },
  directives: {
    filterTag: {
      inserted(el) {
        if (el.innerText == "All") {
          el.style.display = 'none'
        }
      }
    }
  },
  async created() {
    let { id } = this.$route.params;
    let {data, status} = await this.axios.getArticleInfo(id)
    if (status === 200) {
      let index = data.result.article_tags.indexOf('All')
      data.result.article_tags.splice(index,1)
      this.article_info = data.result
    }
    this.getTags()
  }
};
</script>


<style lang="scss">
.add_article_page {
  .article_info {
    padding: 10px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    .tag_list {
      span {
        margin-right: 10px;
        cursor: pointer;
        user-select:none;
      }
    }
  }
  .head {
    margin: 20px 0;
    input {
      margin-right: 10px;
    }
  }
  .container {
    width: 1250px;
    height: 600px;
  }
}
</style>
