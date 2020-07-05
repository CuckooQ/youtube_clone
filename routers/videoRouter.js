import express from 'express'
import routes from './routes'
import { uploadVideoMiddleware } from '../middlewares/multerMiddleware'
import { videos, videoDetail, getVideoEdit, postVideoEdit, videoDelete, getVideoUpload, postVideoUpload } from '../controllers/videoController'
import { onlyPrivate } from '../middlewares/accessMiddleware'

const videoRouter = express.Router()

videoRouter.get(routes.home, videos)
videoRouter.get(routes.videoUpload, getVideoUpload)
videoRouter.post(routes.videoUpload, uploadVideoMiddleware, postVideoUpload)
videoRouter.get(routes.videoEdit(), onlyPrivate, getVideoEdit)
videoRouter.post(routes.videoEdit(), onlyPrivate, postVideoEdit)
videoRouter.get(routes.videoDelete(), onlyPrivate, videoDelete)
videoRouter.get(routes.videoDetail(), videoDetail)

export default videoRouter
