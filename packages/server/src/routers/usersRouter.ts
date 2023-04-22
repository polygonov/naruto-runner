import { Router } from 'express'
import { UsersController } from '../controllers/usersController'

export const usersRouter = (router: Router) => {
  const usersRouter = Router()

  usersRouter.post('/update-theme', UsersController.updateUserTheme)

  router.use('/user', usersRouter)
}
