let mongoose = require('mongoose')
let Schema = mongoose.Schema
mongoose.Promise = global.Promise
let userSchema = new Schema({
  user_name: String,
  user_pwd: String,
})

module.exports = mongoose.model('User', userSchema)