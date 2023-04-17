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

export interface UserRepository {
  getCurrent(): Promise<User>
}

export class UserService {
  constructor(private _repo: UserRepository) {}
  getCurrentUser() {
    return this._repo.getCurrent()
  }
}
