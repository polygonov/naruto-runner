export const PRACTICUM_ORIGIN = 'https://ya-praktikum.tech'
export const WHITE_LIST = [
  `http://localhost:${process.env.CLIENT_PORT}`,
  `http://localhost:${process.env.SERVER_PORT}`,
  'http://milashki-narutorunner-22.ya-praktikum.tech',
  'https://milashki-narutorunner-22.ya-praktikum.tech',
]
export const isProdEnv = () => process.env.NODE_ENV === 'production'
