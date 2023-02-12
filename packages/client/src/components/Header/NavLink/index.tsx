import { Link, useLocation } from 'react-router-dom'
import './index.css'

export default function NavLink(props: { link: string; title: string }) {
  const pathname = useLocation().pathname
  const classList = (): string => {
    const baseClass = 'navigation-item'
    let fullClass = baseClass
    if (pathname == props.link) fullClass += ' active'
    return fullClass
  }
  return (
    <li className={classList()}>
      <Link to={props.link} className="navigation-link">
        {props.title}
      </Link>
    </li>
  )
}
