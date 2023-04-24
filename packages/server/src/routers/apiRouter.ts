import { Router } from 'express'
import { commentsRouter } from './commentsRouter'
import { topicsRouter } from './topicsRouter'
import { usersRouter } from './usersRouter'

const apiRouter = Router({ mergeParams: true })
commentsRouter(apiRouter)
topicsRouter(apiRouter)
usersRouter(apiRouter)

export default apiRouter
