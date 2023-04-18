import Sun from './svg/sun'
import Moon from './svg/moon'
import './index.css'
import { useState, useCallback } from 'react'
import { store } from '../../store'
import { toggleTheme } from '../../store/theme'

export default function ThemeSwitcher() {
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  const setToggleTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme)
    const body = document.getElementsByTagName('body')[0]
    isDarkTheme ? body?.classList.add('light') : body?.classList.remove('light')
    store.dispatch(toggleTheme())
  }, [isDarkTheme])
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
