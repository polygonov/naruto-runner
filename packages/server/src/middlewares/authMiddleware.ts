import axios from 'axios'
import type { RequestHandler } from 'express'

const axiosInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech',
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
})

const authMiddleware: RequestHandler = async (req, res, next) => {
  axiosInstance
    .get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
    .then(() => {
      next()
    })
    .catch(() => {
      res.status(401).json({ message: 'Unauthorized' })
    })
}

export default authMiddleware
