import express from 'express'
import routes from './routes'
import {
  home,
  getLogin,
  postLogin,
  logout,
  getJoin,
  postJoin,
  search,
  getGithubLogin,
  postGithubLogin,
  githubLoginSuccess,
  getFacebookLogin,
  postFacebookLogin,
  facebookLoginSuccess
} from '../controllers/globalController'
import { onlyPublic, onlyPrivate } from '../middlewares/accessMiddleware'

const globalRouter = express.Router()

globalRouter.get(routes.home, home)
globalRouter.get(routes.login, onlyPublic, getLogin)
globalRouter.post(routes.login, onlyPublic, postLogin)
globalRouter.get(routes.githubLogin, getGithubLogin)
globalRouter.get(routes.githubCallback, postGithubLogin, githubLoginSuccess)
globalRouter.get(routes.facebookLogin, getFacebookLogin)
globalRouter.get(routes.facebookCallback, postFacebookLogin, facebookLoginSuccess)
globalRouter.get(routes.logout, onlyPrivate, logout)
globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin)
globalRouter.get(routes.search, search)

export default globalRouter
