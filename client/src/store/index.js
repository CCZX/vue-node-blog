import Vue from 'vue'
import Vuex from 'vuex'

import article from './modules/article'
import heros from './modules/heros'

Vue.use(Vuex)

export default new Vuex.Store ({
  modules: {
    article,
    heros
  }
})