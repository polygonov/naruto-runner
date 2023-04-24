import type { Dialect } from 'sequelize'
import dotenv from 'dotenv'
import * as path from 'path'
import { isProdEnv } from '../constant'

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DATABASE_HOST,
} = process.env

const dbConfig = {
  HOST: isProdEnv() ? DATABASE_HOST : 'localhost',
  USER: POSTGRES_USER,
  PASSWORD: POSTGRES_PASSWORD,
  DB: POSTGRES_DB,
  PORT: Number(POSTGRES_PORT),
  dialect: 'postgres' as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

export default dbConfig
