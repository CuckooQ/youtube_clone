import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-northeast-1'
})

const multerVideo = multer({
  storage: multerS3({
    s3,
    bucket: 'youtube-clone-cho/video',
    acl: 'public-read'
  })
})
const multerAvatar = multer({
  storage: multerS3({
    s3,
    bucket: 'youtube-clone-cho/avatar',
    acl: 'public-read'
  })
})

export const uploadVideoMiddleware = multerVideo.single('file')
export const uploadAvatarMiddleware = multerAvatar.single('avatar')
