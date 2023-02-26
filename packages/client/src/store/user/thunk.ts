import { authApi } from '../../api/auth'
import { createThunk } from '../utils/createThunk'
import type { User } from '../../api/user/types'

export const getUser = createThunk<void, User>('user/get-user', authApi.getUser)
