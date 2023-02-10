import { NavLink } from './NavLink'
import './index.css'

export default function HeaderComponent() {
  const isAuthUser = false
  const linkList = [
    { href: '/', text: 'Главная', isInvisible: false },
    { href: '/forum', text: 'Форум', isInvisible: false },
    {
      href: '/leaderboard',
      text: 'Лидерборд',
      isInvisible: isAuthUser,
    },
    { href: '/profile', text: 'Профиль', isInvisible: isAuthUser },
  ]
  return (
    <header className="header-component">
      <nav className="navigation-wrapper">
        <ul className="navigation-list">
          {linkList.map(data => (
            <li key={data.text}>
              <NavLink {...data} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
