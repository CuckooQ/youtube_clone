import passport from 'passport'
import FacebookStategy from 'passport-facebook'
import GithubStrategy from 'passport-github'
import { githubAuthSuccess, facebookAuthSuccess } from '../controllers/globalController'
import routes from '../routers/routes'
import User from '../models/User'

passport.use(User.createStrategy())

passport.use(
  new GithubStrategy({
    clientID: process.env.CLIENT_ID_GITHUB,
    clientSecret: process.env.CLIENT_SECRET_GITHUB,
    callbackURL: `${process.env.URL}:${process.env.PORT}${routes.githubCallback}`
  }, githubAuthSuccess)
)

passport.use(
  new FacebookStategy({
    clientID: process.env.CLIENT_ID_FACEBOOK,
    clientSecret: process.env.CLIENT_SECRET_FACEBOOK,
    callbackURL: `${process.env.URL}:${process.env.PORT}${routes.facebookCallback}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile', 'email']
  }, facebookAuthSuccess)
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
