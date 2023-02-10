import NavLink from './NavLink'
import './index.css'

export default function HeaderComponent() {
  const isAuthUser = false
  const linkList = [
    { link: '#', title: 'Главная', isActive: false, isInvisible: false },
    { link: '#', title: 'Форум', isActive: false, isInvisible: false },
    {
      link: '#',
      title: 'Лидерборд',
      isActive: false,
      isInvisible: isAuthUser,
    },
    { link: '#', title: 'Профиль', isActive: true, isInvisible: isAuthUser },
  ]
  return (
    <header className="header-component">
      <nav className="navigation-wrapper">
        <ul className="navigation-list">
          {linkList.map(data => (
            <NavLink
              link={data.link}
              title={data.title}
              isActive={data.isActive}
              isInvisible={data.isInvisible}
            />
          ))}
        </ul>
      </nav>
    </header>
  )
}
