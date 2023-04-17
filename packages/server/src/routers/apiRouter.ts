import { Router } from 'express'
import { commentsRouter } from './commentsRouter'
import { topicsRouter } from './topicsRouter'

const apiRouter = Router({ mergeParams: true })
commentsRouter(apiRouter)
topicsRouter(apiRouter)

export default apiRouter
