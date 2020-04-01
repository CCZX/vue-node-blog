// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios/axios.js'
import store from './store/index'
import MetaInfo from 'vue-meta-info'
import { Button, Icon, Input } from 'iview'
import 'iview/dist/styles/iview.css'
Vue.component('Button', Button);
Vue.component('Input', Input);
Vue.component('Icon', Icon);

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(MetaInfo)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
