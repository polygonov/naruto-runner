import { Router } from 'express'
import { TopicsController } from '../controllers/topicsController'
import authMiddleware from '../middlewares/authMiddleware'

export const topicsRouter = (router: Router) => {
  const topicsRouter = Router()

  topicsRouter
    .get('/', TopicsController.getTopics)
    .get('/:topicId/', TopicsController.getTopic)
    .post('/', authMiddleware, TopicsController.createTopic)
    .post('/:topicId/delete', authMiddleware, TopicsController.deleteTopic)

  router.use('/topics', topicsRouter)
}
