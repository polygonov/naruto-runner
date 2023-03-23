import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import cors from 'cors'
import serverRenderMiddleware from './middlewares/server-render-middleware'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
dotenv.config()

const isDev = process.env.NODE_ENV === 'development'
async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer
  const srcPath = path.dirname(require.resolve('client'))
  //const distPath = path.dirname(require.resolve('client/dist/index.html'))

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  }

  app.get('/', serverRenderMiddleware)
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
