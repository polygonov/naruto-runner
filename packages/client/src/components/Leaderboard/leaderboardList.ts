import avatar from '../../assets/images/image-18.png'
export type LeaderBoardPerson = {
  order: number
  avatar: string
  username: string
  score: number
}
export const leaderboardList: LeaderBoardPerson[] = [
  { order: 1, avatar, username: 'Игрок 111111', score: 520 },
  { order: 2, avatar, username: 'Игрок 2', score: 470 },
  { order: 3, avatar, username: 'Игрок 3', score: 315 },
  { order: 4, avatar, username: 'Игрок 4', score: 310 },
]
