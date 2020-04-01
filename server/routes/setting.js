let express = require('express')
let qiniu = require('qiniu')
let qiniuconfig = require('./../utils/index')
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

// 上传图片到七牛云
router.get('/token', (req, res) => {
  res.status(200).send(qiniuconfig.uploadToken)
})

module.exports = router
