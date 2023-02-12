import NavLink from './NavLink'
import './index.css'

export default function HeaderComponent() {
  const linkList = [
    { link: '/', title: 'Главная' },
    { link: '/forum', title: 'Форум' },
    {
      link: '/leaderboard',
      title: 'Лидерборд',
    },
    {
      link: '/profile',
      title: 'Профиль',
    },
  ]
  return (
    <header className="header-component">
      <nav className="navigation-wrapper">
        <ul className="navigation-list">
          {linkList.map(data => (
            <NavLink link={data.link} title={data.title} key={data.link} />
          ))}
        </ul>
      </nav>
    </header>
  )
}
