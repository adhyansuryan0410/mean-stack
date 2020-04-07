const mongoose = require('mongoose')

const schema = mongoose.Schema

const videoSchema = new schema({
  title: String,
  link: String,
  desc: String
})

module.exports = mongoose.model('Video', videoSchema, 'video')
