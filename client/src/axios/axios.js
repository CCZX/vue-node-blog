import axios from 'axios'
const api = axios.create()

export default {
  // 查询文章
  getArticleAll(data) {
    let {page, pageSize, tagName} = data
    return api.get(`/api/articles/list?page=${page}&pageSize=${pageSize}&tagName=${tagName}`)
  },
  // 查看文章详情
  getArticleInfo (id) {
    return api.get(`/api/articles/${id}`)
  },
  // 查询标签
  getTags () {
    return api.get(`/api/tags/list`)
  },
  // 搜索文章
  search (data) {
    return api.post(`/api/articles/search`, data)
  },
  // 根据标签查找文章
  searchByTag (data) {
    return api.post(`/api/articles/searchbytag`, data)
  },
  // 获取留言
  getMessage() {
    return api.get(`api/message/list`)
  },
  // 添加留言
  addMessage(data) {
    return api.post(`/api/message/add`, data)
  }
}