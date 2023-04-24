import type { Request, Response } from 'express'
import UsersService from '../services/usersService'

export class UsersController {
  public static updateUserTheme = (req: Request, res: Response) => {
    const { yandex_id, isDarkMode } = req.body
    console.log(req.body)

    if (!yandex_id || isDarkMode === undefined) {
      res
        .status(400)
        .json({
          message: 'Missing required fields `yandex_id` or `isDarkMode`',
        })
      return
    }

    UsersService.updateUserTheme({ yandex_id, isDarkMode })
      .then(([updatedUsers]) => {
        console.log(updatedUsers)
        if (!updatedUsers) {
          res
            .status(404)
            .json({ message: `User with 'yandex_id':${yandex_id} not found` })
          return
        }
        res.status(200).json({
          message: 'Theme updated',
        })
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  }
}
