import * as process from 'process'

export const PRACTICUM_ORIGIN = `${
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${process.env.SERVER_PORT}`
    : ''
}/api/v2`

export const PRACTICUM_RESOURCES = `${PRACTICUM_ORIGIN}/resources`

export const RoutesNameList = {
  Main: '/',
  Forum: '/forum',
  Login: '/oauth',
  Registration: '/registration',
  Profile: '/profile',
  Leaderboard: '/leaderboard',
  Topic: `/forum/:id`,
  Game: '/game',
}

export const regExps = {
  image: /^.+\.(jpe?g|png|gif)$/,
}

export const GENERAL_ERROR = 'Что-то пошло не так'

export const TEAM_NAME = '22-cuties-naruto-runner'
export const RATING_FIELD_NAME = 'score'

export const YANDEX_OAUTH_URL = 'https://oauth.yandex.ru/authorize'
/* eslint-disable @typescript-eslint/no-empty-function */
const windowSsr = {
  localStorage: {
    key: () => null,
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
    clear: () => null,
  },
  addEventListener() {},
  removeEventListener() {},
  innerWidth: 500,
  innerHeight: 500,
  location: {
    origin: '/',
  },
}

const win: Window | typeof windowSsr =
  typeof window !== 'undefined' ? window : windowSsr
export const OAUTH_REDIRECT_URI = `${win.location.origin}${RoutesNameList.Login}`

export const OAUTH_RESPONSE_PARAM = 'code'

export const YANDEX_OAUTH_REDIRECT_CONFIG = {
  url: YANDEX_OAUTH_URL,
  params: {
    response_type: OAUTH_RESPONSE_PARAM,
    redirect_uri: OAUTH_REDIRECT_URI,
  },
}
