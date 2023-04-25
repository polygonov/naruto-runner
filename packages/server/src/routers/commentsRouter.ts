import { Router } from 'express'
import { CommentsController } from '../controllers/commentsController'
import authMiddleware from '../middlewares/authMiddleware'

export const commentsRouter = (router: Router) => {
  const commentsRouter = Router()

  commentsRouter
    .get('/:topicId/comments/', CommentsController.getCommentsByTopic)
    .post(
      '/:topicId/comments/',
      authMiddleware,
      CommentsController.createComment
    )
    .post(
      '/comments/:commentId/delete/',
      authMiddleware,
      CommentsController.deleteComment
    )

  router.use('/topics', commentsRouter)
}
