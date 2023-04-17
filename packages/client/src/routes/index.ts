import { AppDispatch } from '../store'
import { checkAuth } from '../store/auth/thunk'
import { MainPage } from '../pages/Main'
import { Login } from '../pages/Login'

export const routes = [
  {
    path: '/',
    exact: true,
    component: MainPage,
    loader: (dispatch: AppDispatch) => {
      return dispatch(checkAuth())
    },
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
]
