let mongoose = require('mongoose')
let Schema = mongoose.Schema
mongoose.Promise = global.Promise
let articleSchema = new Schema({
  article_title: String,
  article_tags: Array,
  article_create_time: {
    type: String,
    default: Date.now
  },
  article_update_time: {
    type: String,
    default: Date.now
  },
  article_state: {
    type: Number,
    default: 1
  },
  article_desc: String,
  article_content: String,
  article_cover: {
    type: String,
    default: 'https://mp.weixin.qq.com/wxopen/basicprofile?action=get_headimg&token=1142505962&t=20190101204715'
  }
})
module.exports = mongoose.model('Article', articleSchema)