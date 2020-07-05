import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: false
  },
  facebookId: {
    type: String,
    required: false
  },
  githubId: {
    type: String,
    required: false
  }
})

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
})

const model = mongoose.model('User', UserSchema)

export default model
