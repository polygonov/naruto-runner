import Sun from './svg/sun'
import Moon from './svg/moon'
import './index.css'
import { useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectUserData } from '../../store/user/selectors'
import { changeUserTheme } from '../../store/user/thunk'

export default function ThemeSwitcher() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUserData)

  const setToggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme)
    const body = document.getElementsByTagName('body')[0]
    isDarkTheme ? body?.classList.add('light') : body?.classList.remove('light')
    dispatch(
      changeUserTheme({
        yandex_id: user?.id || 0,
        isDarkMode: !isDarkTheme,
      })
    )
  }, [dispatch, isDarkTheme, user?.id])

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
