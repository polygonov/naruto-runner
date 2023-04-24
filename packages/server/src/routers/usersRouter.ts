import { Router } from 'express'
import { UsersController } from '../controllers/usersController'
import authMiddleware from '../middlewares/authMiddleware'

export const usersRouter = (router: Router) => {
  const usersRouter = Router()

  usersRouter.post(
    '/update-theme/',
    authMiddleware,
    UsersController.updateUserTheme
  )

  router.use('/user', usersRouter)
}
