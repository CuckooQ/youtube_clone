import fs from 'fs'
import routes from '../routers/routes'
import Video from '../models/Video'
import Comment from '../models/Comment'

export const videos = (req, res) => {
  res.render('videos', { pageTitle: 'Videos' })
}

export const videoDetail = async (req, res) => {
  const {
    params: {
      id
    }
  } = req

  try {
    const video = await Video.findById(id).populate('uploader')
    const comments = await Comment.find({ video: video.id }).populate('uploader')
    res.render('videoDetail', { pageTitle: 'Video-Detail', video, comments })
  } catch (error) {
    res.redirect(routes.home)
  }
}

export const getVideoEdit = async (req, res) => {
  const {
    params: {
      id
    }
  } = req

  try {
    const video = await Video.findById(id)
    if (video.uploader.toString() !== req.user.id) {
      throw Error()
    }
    res.render('videoEdit', { pageTitle: 'Video-Edit', video })
  } catch (error) {
    res.redirect(routes.home)
  }
}

export const postVideoEdit = async (req, res) => {
  const {
    params: {
      id
    },
    body: {
      title,
      description
    }
  } = req

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description })
    res.redirect(routes.videoDetail(id))
  } catch (error) {
    res.redirect(routes.home)
  }

  res.send('video-edit')
}

export const videoDelete = async (req, res) => {
  const {
    params: {
      id
    }
  } = req

  try {
    const video = await Video.findById(id)
    if (video.uploader.toString() !== req.user.id) {
      throw Error()
    }
    await Video.findOneAndRemove({ _id: id })
    fs.unlinkSync(`./${video.fileUrl}`)
  } catch (error) {
  }

  res.redirect(routes.home)
}

export const getVideoUpload = (req, res) => {
  res.render('videoUpload', { pageTitle: 'Video-Upload' })
}

export const postVideoUpload = async (req, res) => {
  const {
    body: {
      title,
      description
    },
    file: {
      location
    }
  } = req

  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    uploader: req.user.id
  })
  res.redirect(routes.videoDetail(newVideo.id))
}
