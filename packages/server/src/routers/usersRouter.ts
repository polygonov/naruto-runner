import { Router } from 'express'

export const usersRouter = (router: Router) => {
  const usersRouter = Router()

  router.use('/users', usersRouter)
}
