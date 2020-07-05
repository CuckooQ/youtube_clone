import routes from '../routers/routes'
import User from '../models/User'
import Video from '../models/Video'

export const users = (req, res) => {
  res.render('users', { pageTitle: 'Users' })
}

export const userDetail = async (req, res) => {
  try {
    const {
      params: {
        id
      }
    } = req
    const user = await User.findById(id)
    const videos = await Video.find({ uploader: req.user.id })
    res.render('userDetail', { pageTitle: 'User-Detail', user, videos })
  } catch (error) {
    res.redirect(routes.home)
  }
}

export const getEditProfile = (req, res) => {
  res.render('editProfile', { pageTitle: 'Edit-Profile' })
}

export const postEditProfile = async (req, res) => {
  const {
    body: {
      name
    },
    file
  } = req

  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      avatarUrl: file ? file.location : req.user.avatarUrl
    })
    res.redirect(routes.users + routes.me)
  } catch (error) {
    res.redirect(routes.editProfile)
  }
}

export const getChangePassword = (req, res) => {
  res.render('changePassword', { pageTitle: 'Change-Password' })
}

export const postChangePassword = async (req, res) => {
  const {
    body: {
      oldPassword,
      newPassword,
      newPasswordConfirm
    }
  } = req

  try {
    if (newPassword !== newPasswordConfirm) {
      res.status(400)
      res.redirect(routes.users + routes.changePassword)
    } else {
      await req.user.changePassword(oldPassword, newPassword)
      res.redirect(routes.users + routes.me)
    }
  } catch (error) {
    res.redirect(routes.users + routes.changePassword)
  }

  res.send('changePassword')
}

export const me = async (req, res) => {
  let videos = []

  try {
    videos = await Video.find({ uploader: req.user.id })
  } catch (error) {
    videos = []
  }

  res.render('userDetail', { pageTitle: 'User Detail', user: res.locals.loggedUser, videos })
}
