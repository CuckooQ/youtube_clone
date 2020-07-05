import mongoose from 'mongoose'

const CommentScema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createDatetime: {
    type: Date,
    required: false,
    default: Date.now
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  uploader: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

const model = mongoose.model('Comment', CommentScema)

export default model
