import Sun from './svg/sun'
import Moon from './svg/moon'
import './index.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { setTheme } from '../../store/user/slice'
import { changeUserTheme } from '../../store/user/thunk'
import toggleClassToBody from '../../utils/toggleClassToBody'

export default function ThemeSwitcher() {
  const dispatch = useAppDispatch()
  const isDarkTheme = useAppSelector(state => state.user.isDarkMode)
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    toggleClassToBody(isDarkTheme)
  }, [])

  const setToggleTheme = () => {
    dispatch(setTheme(!isDarkTheme))
    if (user) {
      dispatch(
        changeUserTheme({
          yandex_id: user?.id || 0,
          isDarkMode: !isDarkTheme,
        })
      )
    }
  }
  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      title="Toggles light & dark"
      onClick={setToggleTheme}
      aria-label="auto"
      aria-live="polite">
      {!isDarkTheme && <Sun />}
      {isDarkTheme && <Moon />}
    </button>
  )
}
