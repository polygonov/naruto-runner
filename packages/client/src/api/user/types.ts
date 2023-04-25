export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  email: string
  phone: string
  avatar: string | null
  isDarkMode: boolean
}

export type ChangeUserPayload = Pick<User, 'login' | 'email'>

export type ChangeAvatarPayload = {
  avatar: File
}

export type ChangeThemePayload = {
  yandex_id: number
  isDarkMode: boolean
}

export type ChangePasswordPayload = {
  oldPassword: string
  newPassword: string
}
