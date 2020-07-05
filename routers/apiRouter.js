import express from 'express'
import routes from './routes'
import { postRegisterView, postAddComment } from '../controllers/apiController'

const apiRouter = express.Router()

apiRouter.post(routes.regiesterView, postRegisterView)
apiRouter.post(routes.addComment, postAddComment)

export default apiRouter
