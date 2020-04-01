let express = require('express')
let mongoose = require('mongoose')
// connect ESC databse
let env = process.env.NODE_ENV || 'development'
let dburl = 'mongodb://127.0.0.1:27017/blog'
if (env) {
  dburl = 'mongodb://localhost/blog'
}
mongoose.connect(dburl, {
  useNewUrlParser: true
})
let router = express.Router()
let Message = require('./../models/message')

// 获取所有留言列表
router.get('/list', (req, res) => {
  Message.find({}, (err, doc) => {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    }
    res.json({
      status: 0,
      msg: 'success',
      result: doc
    })
  })
})
// 新增留言
router.post('/add', (req ,res) => {
  let {name, content, website, contact} = req.body
  let params = {
    name: name,
    content: content,
    website: website,
    contact: contact
  }
  new Message(params).save((err, doc) => {
    if (err) {
      return res.json({
        status: 500,
        msg: '添加失败',
        result: ''
      })
    }
    res.json({
      status: 0,
      msg: '添加成功',
      result: ''
    })
  })
})
// 删除留言
router.post('/del', (req, res) => {
  let {id} = req.body
  Message.findByIdAndDelete({
    _id: id
  }, function (err, doc) {
    if (err) {
     return res.json({
      status: 500,
      msg: '服务器错误',
      result: ''
     }) 
    } else {
      res.json({
        status: 0,
        msg: '删除成功',
        result: ''
      })
    }
  })
})
// 修改留言
router.post('/modify', (req, res) => {
  let {id, name, content, website, contact} = req.body
  
})
module.exports = router
