import api from '@/axios/axios.js'

const state = {
  data: [],
  currentArticle: {}
}

const actions = {
  async getArticle({state, commit}, id = '') {
    let data = state.data.find(item => {
      return item.id == id
    })
    if (data == null || data.length == 0) {
      let res = await api.getArticleInfo(id)
      commit('saveArticleData', res.data)
    } else {
      state.currentArticle = data[0]
    }
  }
}

const mutations = {
  saveArticleData(state, {result = []}) {
    if (result.length !== 0) {
      state.data.push(result)
      state.currentArticle = result
    }
  }
}

export default {
  state,
  actions,
  mutations
}

