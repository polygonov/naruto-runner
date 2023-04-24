import type { Request, RequestHandler } from 'express'
import type { ClientRequest } from 'http'
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware'
import { User, UserAttributes } from '../models/users'
import { PRACTICUM_ORIGIN } from '../constant'
import type { YaUser } from '../types'

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
    target: PRACTICUM_ORIGIN,
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
          if (_proxyRes.headers['content-type']?.includes('application/json')) {
            let data: YaUser | null = null
            let fullData: (YaUser & Pick<UserAttributes, 'isDarkMode'>) | null =
              null

            try {
              data = JSON.parse(responseBuffer.toString('utf8'))
            } catch (e) {
              data = null
            }

            if (data && data.id) {
              const { avatar, login, id } = data
              await User.upsert({
                yandex_id: id,
                login: login,
                ...(avatar && { avatar }),
              })
                .then(([user]) => {
                  fullData = Object.assign({}, data, {
                    isDarkMode: user.isDarkMode,
                  })
                })
                .catch(e => {
                  console.log(e)
                })

              if (fullData) {
                return Buffer.from(JSON.stringify(fullData))
              } else {
                return responseBuffer
              }
            }
          }
        }
        return responseBuffer
      }
    ),
  })(req, res, next)
}

export default proxyMiddleware
