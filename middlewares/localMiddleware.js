import routes from '../routers/routes'
import { getUser } from './accessMiddleware'
const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'Wetube'
  res.locals.routes = routes
  res.locals.loggedUser = getUser(req)
  next()
}

export default localMiddleware
