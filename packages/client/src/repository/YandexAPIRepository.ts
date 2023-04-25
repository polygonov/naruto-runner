import { UserRepository } from '../api/UserService'
import axios from 'axios'
interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string | null
  email: string
  phone: string | null
}

const REDIRECT_URI = 'http://localhost:3000'
const API_ROOT = `${REDIRECT_URI}/api/v2`

export class YandexAPIRepository implements UserRepository {
  async getCurrent(): Promise<User> {
    const { data } = await axios.get(`${API_ROOT}/auth/user`, {
      withCredentials: true,
    })
    return data
  }
}
