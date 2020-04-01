/**
 * 留言
 */

import api from "@/axios/axios.js"

const state = {
  data: []
}

const actions = {
  async getHeros({commit}) {
    let res = await api.getMessage()
    commit('saveHeros', res.data)
  },
  async postHeros({commit}) {

  }
}

const mutations = {
  saveHeros(state, {result = []}) {
    if (result.length !== 0) {
      // state.data.concat(result)
      state.data = result
    }
  }
}

export default {
  state,
  actions,
  mutations
}
