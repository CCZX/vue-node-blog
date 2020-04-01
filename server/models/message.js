let mongoose = require('mongoose')
let Schema = mongoose.Schema
let messageSchema = new Schema({
  name: String,
  content: String,
  website: {
    type:String,
    default: ''
  },
  time: {
    type: String,
    default: Date.now
  },
  contact: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Message', messageSchema)
