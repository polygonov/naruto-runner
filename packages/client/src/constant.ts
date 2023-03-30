export const IS_DEV_ENV = process.env.NODE_ENV === 'development'

export const PRACTICUM_ORIGIN = 'https://ya-praktikum.tech/api/v2'
export const PRACTICUM_RESOURCES = `${PRACTICUM_ORIGIN}/resources`
export const OAUTH_REDIRECT_URI = IS_DEV_ENV ? 'http://localhost:3000' : ''

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
