import type { BaseRESTService } from './baseService'
import { User } from '../models/users'

interface updateThemeRequest {
  yandex_id: number
  isDarkMode: boolean
}

class UserService implements BaseRESTService {
  public request = (id: number) => {
    return User.findByPk(id)
  }

  public updateUserTheme = ({ yandex_id, isDarkMode }: updateThemeRequest) => {
    return User.update(
      {
        isDarkMode,
      },
      {
        where: {
          yandex_id,
        },
        fields: ['isDarkMode'],
        limit: 1,
      }
    )
  }
}

export default new UserService()
