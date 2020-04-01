import axios from 'axios'
const api = axios.create()
// admin
export default{
  // 新增文章
  addArticle (data) {
    return api.post('/api/articles/addarticle', data)
  },
  // 获取文章
  getArticleAll(data) {
    let {page, pageSize, tagName} = data
    return api.get(`/api/articles/list?page=${page}&pageSize=${pageSize}&tagName=${tagName}`)
  },
   // 查看文章详情
  getArticleInfo (id) {
    return api.get(`/api/articles/${id}`)
  },
  // 删除文章
  delArticle(data) {
    return api.post(`/api/articles/delarticle`, data)
  },
  modifyArticle(data) {
    return api.post(`/api/articles/modify`, data)
  },
  // 根据关键字搜索文章
  search (data) {
    return api.post(`/api/articles/search`, data)
  },
  // 登录
  login (data) {
    return api.post(`/api/users/login`, data)
  },
  // 获取用户信息
  getUser (data) {
    let {userName} = data
    return api.get(`/api/users/info?userName=${userName}`)
  },
  // 修改用户信息
  updateUser (data) {
    return api.post(`/api/users/updateuser`, data)
  },
  // 查询标签
  getTags () {
    return api.get(`/api/tags/list`)
  },
  // 根据文章状态搜索文章
  searchByState (data) {
    return api.post(`/api/articles/searchbystate`, data)
  },
  // 添加标签
  addTag (data) {
    return api.post(`/api/tags/add`, data)
  },
  // 删除标签
  delTag (data) {
    return api.post(`/api/tags/del`, data)
  },
  // 上传图片
  upImg() {
    return api.get(`/api/setting/token`)
  },
  UpToQiniu(data) {
    let {domain, formdata, config} = data
    return api.post(domain,formdata, config)
  },
  // 获取留言
  getHeros() {
    return api.get(`/api/message/list`)
  },
  // 删除留言
  delHeros(data) {
    return api.post(`/api/message/del`, data)
  },
  // 修改留言
  modifyHeros() {

  }
}