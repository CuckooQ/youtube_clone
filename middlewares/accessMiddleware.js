import routes from '../routers/routes'

export const onlyPublic = (req, res, next) => {
  if (getUser(req)) {
    res.redirect(routes.home)
  } else {
    next()
  }
}

export const onlyPrivate = (req, res, next) => {
  if (!getUser(req)) {
    res.redirect(routes.home)
  } else {
    next()
  }
}

export const getUser = (req) => {
  return (req && req.user) || null
}
