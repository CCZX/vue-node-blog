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
let Article = require('./../models/article')
let Tag = require('./../models/tags')

// 获取文章列表
router.get('/list', function (req, res, next) {
  let page = parseInt(req.query.page)
  let pageSize = parseInt(req.query.pageSize)
  let tag = req.query.tagName 
  let skip = (page - 1) * pageSize
  let articleModel = Article.find({
    article_state: 1,
    article_tags: {$in: [tag]}
  }).skip(skip).limit(pageSize)
  articleModel.exec(function (err, doc) {
    if (err) {
      return res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    } else {
      if (doc.length != 0) {
        res.json({
          status: 1,
          msg: '查找文章成功',
          result: doc
        })
      } else {
        res.json({
          status: 0,
          msg: '没有你查找文章',
          result: doc
        })
      }
    }
  })
})
// 修改文章
router.post('/modify', function (req, res) {
  let {body} = req
  const id = body._id
  const ids = {_id: id}
  const article_info = body.article_info
  console.log(article_info.article_tags)
  const updateData = {
    article_tags: article_info.article_tags,
    article_content: article_info.article_content,
    article_cover: article_info.article_cover,
    article_desc: article_info.article_desc,
    article_state: article_info.article_state,
    article_title: article_info.article_title,
    article_create_time: article_info.article_create_time,
    article_update_time: Date.now()
  }
  Article.findByIdAndUpdate(ids, updateData, (err, data) => {
    if (err) {
      res.json({
        status: 500,
        msg: 'error',
        result: ''
      })
    } else {
      res.json({
        status: 1,
        msg: 'success',
        result: ''
      })
    }
  })
})
// 查看文章详情
router.get('/:id', function (req, res, next) {
  let _id = req.params.id
  Article.findOne({
    '_id': _id
  }, function (err, doc) {
    if (err) {
      return res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    }
    res.json({
      status: 0,
      msg: '查询文章成功',
      result: doc
    })
  })
})
// 增加文章
router.post('/addarticle', function (req, res, next) {
  let {article_tags} = req.body
  article_tags.push('All')
  let params = {
    article_title: req.body.article_title,
    article_state: req.body.article_state,
    article_tags: article_tags,
    article_desc: req.body.article_desc,
    article_cover: req.body.article_cover,
    article_content: req.body.article_content
  }
  new Article(params).save(function (err, doc) {
    if (err) {
      return res.json({
        status: 500,
        msg: '新增文章失败，请稍后重试！',
        result: ''
      })
    }
    res.json({
      status: 0,
      msg: '新增文章成功',
      result: ''
    })
  })
})
// 删除文章
router.post('/delarticle', function (req, res, next) {
  let id = req.body.id
  Article.findByIdAndDelete({
    _id: id
  }, function (err, doc) {
    if (err) {
      return res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    }
    res.json({
      status: 0,
      msg: '删除成功',
      result: ''
    })
  })
})
// 根据keyword搜索文章
router.post('/search', function (req, res, next) {
  let keyword = req.body.keyword
  let pageSize = req.body.pageSize
  let articleModel = Article.find({
    article_state: 1
  }).limit(pageSize)
  articleModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    } else {
      if (doc) {
        let searchArticle = []
        doc.forEach(item => {
          if ((item.article_title).includes(keyword)) {
            searchArticle.push(item)
          }
        })
        if (searchArticle.length == 0) {
          res.json({
            status: 0,
            msg: '没有找到你想要的',
            result: ''
          })
        } else {
          res.json({
            status: 0,
            msg: '查找成功',
            result: searchArticle
          })
        }
      }
    }
  })
})
// 在admin根据状态查找文章
router.post('/searchbystate', function (req, res, next) {
  let article_state = Number(req.body.state)
  console.log(article_state)
  // if (article_state === 2) {
  //   Article.find({}, function (err, doc) {
  //     if (err) {
  //       return res.json({
  //         status: 500,
  //         msg: '服务器错误',
  //         result: ''
  //       })
  //     } else {
  //       res.json({
  //         status: 0,
  //         msg: '查询成功',
  //         result: doc
  //       })
  //     }
  //   })
  // }
  Article.find({
    article_state: article_state
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 500,
        msg: '服务器错误',
        result: ''
      })
    } else {
      return res.json({
        status: 0,
        msg: '查找文章成功',
        result: doc
      })
    }
  })
})

module.exports = router