import axios from 'axios'
import type { RequestHandler } from 'express'
import { PRACTICUM_ORIGIN } from '../constant'

const axiosInstance = axios.create({
  baseURL: PRACTICUM_ORIGIN,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
})

const authMiddleware: RequestHandler = async (req, res, next) => {
  axiosInstance
    .get(`${PRACTICUM_ORIGIN}/api/v2/auth/user`, {
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
