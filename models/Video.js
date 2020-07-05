import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  views: {
    type: Number,
    required: false,
    default: 0
  },
  createDatetime: {
    type: Date,
    required: false,
    default: Date.now
  },
  uploader: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

const model = mongoose.model('Video', VideoSchema)

export default model
