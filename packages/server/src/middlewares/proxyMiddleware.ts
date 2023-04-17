import type { Request, RequestHandler } from 'express'
import type { ClientRequest } from 'http'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'

import { User } from '../models/users'
const modifyBodyReStreamCb = function (proxyReq: ClientRequest, req: Request) {
  if (req.body && Object.keys(req.body).length > 0) {
    const bodyData = JSON.stringify(req.body)
    proxyReq.setHeader('Content-Type', 'application/json')
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
    proxyReq.write(bodyData)
  }
}

const proxyMiddleware: RequestHandler = (req, res, next) => {
  return createProxyMiddleware({
    target: 'https://ya-praktikum.tech',
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    selfHandleResponse: true,
    logLevel: 'error',
    onProxyReq: modifyBodyReStreamCb,
    onProxyRes: responseInterceptor(
      async (responseBuffer, _proxyRes, _req, _res) => {
        if (req.url.includes('/auth/user') && req.method === 'GET') {
          const response = responseBuffer.toString() // convert buffer to string
          let user
          try {
            user = JSON.parse(response)
          } catch (e) {
            user = null
          }
          if (user && user.id) {
            try {
              const { avatar, display_name, login, id } = user
              await User.upsert({
                yandex_id: id,
                login: login,
                ...(display_name && { display_name }),
                ...(avatar && { avatar }),
              })
            } catch (e) {
              console.error(e)
            }
          }
        }
        return responseBuffer
      }
    ),
  })(req, res, next)
}

export default proxyMiddleware
