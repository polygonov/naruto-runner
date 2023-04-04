import { Router } from 'express'
import { CommentsController } from '../controllers/commentsController'

export const commentsRouter = (router: Router) => {
  const commentsRouter = Router()

  commentsRouter
    .get('/', CommentsController.getCommentsByTopic)
    .post('/', CommentsController.createComment)
    .post('/:commentId/delete/', CommentsController.deleteComment)

  router.use('/topics/:topicId/comments', commentsRouter)
}
