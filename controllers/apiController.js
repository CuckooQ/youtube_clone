import Video from '../models/Video'
import Comment from '../models/Comment'

export const postRegisterView = async (req, res) => {
  const {
    params: {
      id
    }
  } = req
  try {
    const video = await Video.findById(id)
    video.views += 1
    video.save()
    res.status(200)
  } catch (error) {
    res.status(400)
  } finally {
    res.end()
  }
}

export const postAddComment = async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      comment
    }
  } = req
  try {
    const video = await Video.findById(id)
    await Comment.create({
      text: comment,
      uploader: req.user.id,
      video: video.id
    })
    res.status(200)
  } catch (error) {
    res.status(400)
  } finally {
    res.end()
  }
}
