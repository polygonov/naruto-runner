import { Router } from 'express'
import https from 'https'

export const usersRouter = (router: Router) => {
  const usersRouter = Router()

  usersRouter.get('/current/', (req, res) => {
    const options = {
      hostname: 'ya-praktikum.tech',
      path: '/api/v2/auth/user',
      headers: {
        ...req.headers,
      },
      rejectUnauthorized: false,
    }

    https
      .get(options, response => {
        let data = ''

        const status = response.statusCode || 500

        response.on('data', chunk => {
          data += chunk
        })

        response.on('end', () => {
          res.status(status).json(JSON.parse(data))
        })
      })
      .on('error', err => {
        console.log('Error: ' + err.message)
      })
  })

  router.use('/users', usersRouter)
}
