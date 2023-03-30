export const PRACTICUM_ORIGIN = 'https://ya-praktikum.tech/api/v2'
export const PRACTICUM_RESOURCES = `${PRACTICUM_ORIGIN}/resources`

export const RoutesNameList = {
  Main: '/',
  Forum: '/forum',
  Login: '/login',
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
export const OAUTH_REDIRECT_URI = window.location.origin

export const YANDEX_OAUTH_REDIRECT_CONFIG = {
  url: YANDEX_OAUTH_URL,
  params: {
    response_type: 'code',
    redirect_uri: OAUTH_REDIRECT_URI,
  },
}
