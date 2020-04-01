<template>
  <div id="app">
    <nav-header></nav-header>
    <transition>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="router-view"></router-view>
      </keep-alive>
    </transition>
    <transition>
      <router-view v-if="!$route.meta.keepAlive" class="router-view"></router-view>
    </transition>
    <nav-footer class="footer"></nav-footer>
  </div>
</template>

<script>
import NavHeader from "@/components/Header";
import NavFooter from "@/components/Footer";
import { bgc } from "@/plugins/bgc";
export default {
  name: "App",
  components: {
    NavHeader,
    NavFooter
  },
  mounted() {
    bgc();
  }
};
</script>

<style lang="scss">
html {
  body {
    background-color: rgb(248, 248, 249);
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    .router-view {
      margin-top: 100px;
      min-height: 600px;
    }
    .v-enter {
      opacity: 0;
    }
    .v-leave-to {
      opacity: 0;
    }
    .v-enter-active,
    .v-leave-active {
      transition: all 0.3s ease;
    }
  }
}
</style>
