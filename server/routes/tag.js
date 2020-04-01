let mongoose = require('mongoose')
let express = require('express')
let router = express.Router()
// connect ESC databse
let env = process.env.NODE_ENV || 'development'
let dburl = 'mongodb://127.0.0.1:27017/blog'
if (env) {
  dburl = 'mongodb://localhost/blog'
}
mongoose.connect(dburl, {
  useNewUrlParser: true
})
let Tag = require('./../models/tags')

// 查询标签
router.get('/list', function (req, res, next) {
  Tag.find(function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    }
    res.json({
      status: 0,
      msg: '成功',
      result: doc
    })
  })
})
// 添加标签
router.post('/add', function (req, res, next) {
  let params = {
    tag_name: req.body.tagName,
    tag_desc: req.body.tagDesc,
    tag_num: req.body.tagNum
  }
  new Tag(params).save(function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    }
    res.json({
      status: 0,
      msg: '添加标签成功',
      result: doc
    })
  })
})
// 删除标签
router.post('/del', function (req, res, next) {
  let _id = req.body.id
  Tag.findByIdAndDelete({
    _id: _id
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误,删除失败',
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
module.exports = router