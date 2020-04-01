var express = require('express');
var router = express.Router();
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
let User = require('./../models/user')
/* GET users listing. */
// 获取用户信息
router.get('/info', function(req, res, next) {
  let user_name = req.query.userName
  User.find({
    user_name: user_name
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    } else {
      if (doc.length == 0) {
        res.json({
          status: 1,
          msg: '没有该用户',
          result: ''
        })
      } else {
        res.json({
          status: 0,
          msg: '查找用户成功',
          result: doc
        })
      }
    }
  })
});
// 用户登录
router.post('/login', function (req, res, next) {
  let user_name = req.body.user_name
  let user_pwd = req.body.user_pwd
  User.findOne({
    user_name: user_name,
    user_pwd: user_pwd
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误，请稍后重试!',
        result: ''
      })
    } else {
      if (!doc) {
        res.json({
          status: 1,
          msg: '用户或密码错误',
          result: ''
        })
      } else {
        res.json({
          status: 0,
          msg: '登录成功',
          result: doc.user_name
        })
      }
    }
  })
})
// 修改用户信息
router.post('/updateuser', function (req, res, next) {
  let {userName, userPwd, newPwd} = req.body
  User.find({
    user_name: userName
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    } else {
      if (doc.length == 0) {
        res.json({
          status: 1,
          msg: '没有该用户',
          result: ''
        })
      } else {
        let {user_pwd} = doc
        if (user_pwd !== userPwd) {
          res.json({
            status: 1,
            msg: '密码输入错误',
            result: {
              
            }
          })
        } else {
          doc.user_pwd = newPwd
          doc.save(function (err1, doc) {
            if (err1) {
              res.json({
                status: 500,
                msg: '服务器错误',
                result: ''
              })
            } else {
              res.json({
                status: 0,
                msg: '修改成功',
                result: ''
              })
            }
          })
        }
      }
    }
  })
})
module.exports = router;
