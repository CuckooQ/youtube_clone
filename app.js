import '@babel/polyfill'
import bodyParser from 'body-parser'
import connectMongo from 'connect-mongo'
import cookieParser from 'cookie-parser'
import express from 'express'
import flash from 'express-flash'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'
import session from 'express-session'
import './middlewares/passportMiddleware'
import localMiddleware from './middlewares/localMiddleware'
import testMiddleware from './middlewares/testMiddleware'
import globalRouter from './routers/globalRouter'
import routes from './routers/routes'
import userRouter from './routers/userRouter'
import videoRouter from './routers/videoRouter'
import apiRouter from './routers/apiRouter'

const app = express()

const CookieStore = connectMongo(session)

app.set('view engine', 'pug')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: mongoose.connection
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(testMiddleware)
app.use(localMiddleware)

app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.videos, videoRouter)
app.use(routes.api, apiRouter)

export default app
