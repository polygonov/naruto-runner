import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

dotenv.config()

import express from 'express'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.use('*', async (req, res, next) => {
    const distPath = path.dirname(require.resolve('client/dist/index.html'))
    const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')

    const url = req.originalUrl

    try {
      const template = fs.readFileSync(
        path.resolve(distPath, 'index.html'),
        'utf-8'
      )

      const { render } = await import(ssrClientPath)

      const appHtml = await render(url)

      const html = template.replace(`<!--SSR-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      //vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
