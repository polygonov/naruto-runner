export const RoutesNameList = {
  Main: '/',
  Forum: '/forum',
  Login: '/login',
  Registration: '/registration',
  Profile: '/profile',
  Leaderboard: '/leaderboard',
}

export const getImagePath = (imageName: string) => {
  return `src/assets/images/background/${imageName}`
}

export const regExps = {
  image: /^.+\.(jpe?g|png|gif)$/,
}
