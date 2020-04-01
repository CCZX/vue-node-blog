<template>
  <div id="app">
    <info-list class="left"></info-list>
    <!-- <keep-alive :exclude="['ModifyArticle']">
      <router-view class="main" />
    </keep-alive>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="main" ></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="main"></router-view>
  </div>
</template>

<script>
import InfoList from "@/components/InfoList.vue";
export default {
  name: "App",
  components: {
    InfoList
  },
  beforeCreate() {
    this.$store.getters.isLogin;
  }
};
</script>

<style lang='scss'>
#app {
  height: 100%;
  .left {
    display: inline-block;
  }
  .main {
    display: inline-block;
    margin-left: 210px;
  }
}
</style>
