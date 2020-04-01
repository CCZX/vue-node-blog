<template>
  <div class="up-page">
    <h1>uploadImage</h1>
    <input type="file" @change="upImg">
    <ul v-for="(item, index) in upload_list" :key="index">
      <li><img :src="item.imageUrl" alt="" srcset=""></li>
      <p id="website_value" v-show="item.imageUrl" v-copy>{{item.imageUrl}}</p>
      <button @click="upqiniu(item)">UPIMG</button>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import {imgRandomName} from '@/utils/index'
export default {
  data() {
    return {
      upload_list: [],
      token: {},
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名pki3o6rvk.bkt.clouddn.com
      qiniuaddr: "static.chenr.cn"
    };
  },
  methods: {
    upImg(e) {
      let obj = e.target
      let file = obj.files[0]
      this.upload_list.push({
        file_realname: file.name,
        // file_codename: random_file_name,
        file_size: file.size,
        fiel_type: file.type,
        website: '',
        cur_progress: 'width:0%;',
        imageUrl: '',
        detail: {
          hash: '',
          bucket: ''
        },
        file
      })
    },
    upqiniu (item) {
      // console.log(item)
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (item.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = imgRandomName() + '.' + filetype
      // 从后端获取上传凭证token
      this.axios.upImg().then(res => {
        console.log(res)
        const formdata = new FormData()
        formdata.append('file', item.file)
        formdata.append('token', res.data)
        formdata.append('key', keyname)
        // console.log(formdata)
        axios.post(this.domain, formdata, config).then(res => {
          console.log(res)
          item.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
        })
      })
    }
  },
  directives:{
    copy:{
      inserted(el){
        el.addEventListener('click', () => {
          el.select();
          document.execCommand("Copy");
          alert("网址已复制好，可贴粘。");
        })
      }
    }
  }
};
</script>

<style lang='scss'>
.up-page {
  img {
  width: 300px;
  height: 200px;
}
}
</style>