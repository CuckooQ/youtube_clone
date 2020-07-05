import express from 'express'
import routes from './routes'
import {
  users,
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  me
} from '../controllers/userController'
import { onlyPrivate } from '../middlewares/accessMiddleware'
import { uploadAvatarMiddleware } from '../middlewares/multerMiddleware'

const userRouter = express.Router()

userRouter.get(routes.home, onlyPrivate, users)
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile)
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatarMiddleware, postEditProfile)
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword)
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword)
userRouter.get(routes.me, onlyPrivate, me)
userRouter.get(routes.userDetail(), onlyPrivate, userDetail)

export default userRouter
