import { NavLink } from './NavLink'
import { RoutesNameList } from '../../constant'
import './index.css'

interface ILinkList {
  href: string
  text: string
}
export default function HeaderComponent() {
  const linkList: ILinkList[] = [
    { href: RoutesNameList.Main, text: 'Главная' },
    { href: RoutesNameList.Forum, text: 'Форум' },
    {
      href: RoutesNameList.Leaderboard,
      text: 'Лидерборд',
    },
    {
      href: RoutesNameList.Profile,
      text: 'Профиль',
    },
  ]
  return (
    <header className="header-component">
      <nav className="navigation-wrapper">
        <ul className="navigation-list">
          {linkList.map(data => (
            <li key={data.href}>
              <NavLink {...data} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
