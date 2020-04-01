<template>
  <div class="message_page">
    <div class="model" v-if="showModel">
      <div class="main">
        <div class="main_info">
          <input type="text" class="item inp" v-model="name" placeholder="你的大名(必需)">

          <input type="text" class="item inp" v-model="website" placeholder="你的网站(非必需)">

          <input type="text" class="item inp" v-model="contact" placeholder="你的联系方式(非必需、不会公开)">
        </div>
        <div class="main_content">
          <textarea v-textArea
            v-model="content"
            class="item inp"
            cols="60"
            rows="10"
            placeholder="你此刻的想法(必需、最多300字)"
            maxlength="300"
          ></textarea>
        </div>
        <Button type="primary" @click="add">发表</Button>
        <Button type="dashed" @click="showModel = !showModel">取消</Button>
      </div>
    </div>

    <div class="desc">
      <div class="desc-font">
        <p>"人的平均寿命77岁，一共28105天，67w小时，4047w分钟，24亿秒左右，这10秒你在读这段话，这10秒你属于我。你好陌生人，我爱你 ❤️"</p>
      </div>
      <button @click="showModel = !showModel" class="welcome-btn">我要留言</button>
    </div>

    <transition-group tag="div" class="message_content">
      <div class="column" key="1">
        <div class="list" v-for="list in list0" :key="list._id">
          <h3 class="user">
            <a :href="list.website" class="user-name">{{ list.name }}</a>
          </h3>
          <div class="content">{{list.content}}</div>
          <div class="user_info">
            <i class="icon iconfont">&#xe6e1;</i>
            <span class="time">{{ list.time | formatDate() }}</span>
          </div>
        </div>
      </div>

      <div class="column" key="2">
        <div class="list" v-for="list in list1" :key="list._id">
          <h3 class="user">
            <a :href="list.website" class="user-name">{{ list.name }}</a>
          </h3>
          <div class="content">{{list.content}}</div>
          <div class="user_info">
            <i class="icon iconfont">&#xe6e1;</i>
            <span class="time">{{ list.time | formatDate() }}</span>
          </div>
        </div>
      </div>

      <div class="column" key="3">
        <div class="list" v-for="list in list2" :key="list._id">
          <h3 class="user">
            <a :href="list.website" class="user-name">{{ list.name }}</a>
          </h3>
          <div class="content">{{list.content}}</div>
          <div class="user_info">
            <i class="icon iconfont">&#xe6e1;</i>
            <span class="time">{{ list.time | formatDate() }}</span>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { formatDate } from "@/utils/index";
export default {
  metaInfo() {
    return {
      title: "留言墙 | chen'blog",
      meta: [
        {
          name: "keywords",
          content: "留言  走心  说你想说的"
        }
      ]
    };
  },
  data() {
    return {
      name: "",
      content: "",
      website: "",
      contact: "",
      showModel: false
    };
  },
  methods: {
    async add() {
      if (this.name === "") return alert("名字？");
      if (this.content === "") return alert("不说点什么？");
      let newMes = { name: this.name, time: Date.now(), content: this.content };
      let { data } = await this.axios.addMessage({
        name: this.name,
        content: this.content,
        website: this.website,
        contact: this.contact
      });
      this.list.push(newMes);
      this.name = this.content = this.website = this.contact = "";
      this.showModel = false;
    }
  },
  filters: {
    formatDate(val) {
      return formatDate(val);
    }
  },
  computed: {
    list() {
      return this.$store.state.heros.data;
    },

    list0() {
      return this.list.filter((item, n) => n % 3 === 0);
    },
    list1() {
      return this.list.filter((item, n) => n % 3 === 1);
    },
    list2() {
      return this.list.filter((item, n) => n % 3 === 2);
    }
  },
  directives: {
    textArea: {
      inserted(el) {
        let textarea = document.getElementsByTagName("textarea")[0]
        let width = document.body.offsetWidth || document.documentElement.offsetWidth
        if (width < 700) {
          el.cols = '33.5'
        }
      }
    }
  },
  created() {
    this.$store.dispatch("getHeros");
  }
};
</script>

<style lang="scss">
.message_page {
  .model {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    background-color: rgba(1, 1, 1, 0.5);
    .main {
      padding: 20px;
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
      background-color: #f2f2f2;
      .main_info {
        .item {
          width: 400px;
          height: 30px;
          border: 1px solid rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          display: block;
          margin-bottom: 10px;
          padding: 3px;
        }
      }
    }
  }

  .desc {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    p {
      font-size: 20px;
      font-family: "Courier New", Courier, monospace;
    }
    .welcome-btn {
      margin: 36px 0 16px;
      padding: 6px 32px;
      background: linear-gradient(135deg, #f21368, #e80505);
      color: #fff;
      border: none;
      box-shadow: 0 4px 8px rgba(232, 5, 5, 0.3);
    }
  }

  .message_content {
    width: 980px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .column {
      display: flex;
      flex-direction: column;
      width: calc(100% / 3 - 2rem / 3);
      .list {
        position: relative;
        left: 0;
        top: 0;
        padding: 15px;
        min-height: 150px;
        margin-bottom: 1rem;
        background: rgb(255, 255, 255);
        transition: all 0.5s;

        &:hover {
          box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.2);
          transform: translate(-4px, -4px);
        }

        > .user {
          > .user-name {
            max-width: 20rem;
            font-weight: normal;
            font-size: 1rem;
          }
        }

        > .content {
          margin: 1rem 0;
          min-height: 40px;
          word-break: break-all;
          overflow: hidden;
          word-wrap: break-word;
        }

        > .user_info {
          height: 1rem;
          font-size: 0.85rem;
          line-height: 1rem;
          text-align: right;
        }
      }
    }
  }
}
@media screen and (max-width: 700px) {
  .message_page {
    .model {
      .main {
        width: 70% !important;
        .main_info {
          .inp {
            width: 98% !important;
          }
        }
      }
    }
    .desc {
      width: 90% !important;
    }
    .message_content {
      width: 90% !important;
      .column {
        width: 100% !important;
      }
    }
  }
}
</style>
