let mongoose = require('mongoose')
mongoose.Promise = global.Promise
let Schema = mongoose.Schema
let tagsSchema = new Schema({
  tag_name: String,
  tag_desc: String,
  tag_num: Number
})


module.exports = mongoose.model('Tag', tagsSchema)