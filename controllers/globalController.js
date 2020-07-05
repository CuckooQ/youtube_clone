import routes from '../routers/routes'
import User from '../models/User'
import Video from '../models/Video'
import passport from 'passport'

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 })
    res.render('home', { pageTitle: 'Home', videos })
  } catch (error) {
    res.render('home', { pageTitle: 'Home', videos: [] })
  }
}

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'Login' })
}

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: 'Welcome!',
  failureFlash: "Can't login. Check your email or password."
})

export const getGithubLogin = passport.authenticate('github')

export const postGithubLogin = passport.authenticate('github', { failureRedirect: routes.login })

export const githubAuthSuccess = async (_, __, profile, cb) => {
  const {
    _json: {
      id: githubId,
      avatar_url: avatarUrl,
      name,
      email
    }
  } = profile

  try {
    let user = await User.findOne({ email })
    if (user) {
      user.githubId = githubId
      user.avatarUrl = avatarUrl
      user.save()
    } else {
      user = await User.create({
        email,
        name,
        githubId,
        avatarUrl
      })
    }
    return cb(null, user)
  } catch (error) {
    return cb(error)
  }
}

export const githubLoginSuccess = (req, res) => {
  res.redirect(routes.home)
}

export const getFacebookLogin = passport.authenticate('facebook')

export const postFacebookLogin = passport.authenticate('facebook', { failureRedirect: routes.login })

export const facebookAuthSuccess = async (_, __, profile, cb) => {
  const {
    _json: {
      id: facebookId,
      name,
      email
    }
  } = profile

  try {
    let user = await User.findOne({ email })
    if (user) {
      user.facebookId = facebookId
      user.avatarUrl = `https://graph.facebook.com/${facebookId}/picture?type=large`
      user.save()
    } else {
      user = await User.create({
        email,
        name,
        facebookId,
        avatarUrl: `https://graph.facebook.com/${facebookId}/picture?type=large`
      })
    }
  } catch (error) {
    return cb(error)
  }
}

export const facebookLoginSuccess = (req, res) => {
  res.redirect(routes.home)
}

export const logout = (req, res) => {
  req.flash('info', 'Logged out. See you later!')
  req.logout()
  res.redirect(routes.home)
}

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' })
}

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name,
      email,
      password,
      varifyPassword
    }
  } = req

  if (password !== varifyPassword) {
    req.flash('error', "Password don't match.")
    res.status(400)
    res.render('join', { pageTitle: 'join' })
  } else {
    try {
      const user = await User({
        name,
        email
      })
      await User.register(user, password)
      next()
    } catch (error) {
      res.redirect(routes.join)
    }
  }
}

export const search = async (req, res) => {
  const {
    query: {
      term
    }
  } = req

  try {
    const videos = await Video.find({ title: { $regex: term, $options: 'i' } })

    res.render('search', {
      pageTitle: 'Search',
      term,
      videos
    })
  } catch (error) {
    res.redirect(routes.home)
  }
}
