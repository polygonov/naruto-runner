import dotenv from 'dotenv'
import path from 'path'
import serverRenderMiddleware from '../client/src/server-render-middleware'
dotenv.config()

import express from 'express'
// import { createClientAndConnect } from './db'

const app = express()
app.use(express.static(path.resolve(__dirname, '../client/dist')))
const port = Number(process.env.SERVER_PORT) || 3001

// createClientAndConnect()

app.get('/', serverRenderMiddleware)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
