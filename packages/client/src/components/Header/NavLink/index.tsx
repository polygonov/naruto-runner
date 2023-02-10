import './index.css'

export default function NavLink(props: {
  link: string
  title: string
  isActive: boolean
  isInvisible: boolean
}) {
  const classList = (): string => {
    const baseClass = 'navigation-item'
    let fullClass = baseClass
    if (props.isActive) fullClass += ' active'
    if (props.isInvisible) fullClass += ' invisible'
    return fullClass
  }
  return (
    <li className={classList()}>
      <a href={props.link} className="navigation-link">
        {props.title}
      </a>
    </li>
  )
}
