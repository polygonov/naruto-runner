import type { User } from '../user/types'

export type RegisterPayload = Pick<User, 'login' | 'email'> & {
  password: string
}

export type AuthPayload = Pick<User, 'login'> & {
  password: string
}

export type RegisterResponse = {
  id: string
}

export type GetUserResponse = User
