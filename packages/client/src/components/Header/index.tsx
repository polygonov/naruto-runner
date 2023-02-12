import { NavLink } from './NavLink'
import './index.css'

export default function HeaderComponent() {
  const linkList = [
    { href: '/', text: 'Главная' },
    { href: '/forum', text: 'Форум' },
    {
      href: '/leaderboard',
      text: 'Лидерборд',
    },
    {
      href: '/profile',
      text: 'Профиль',
    },
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
