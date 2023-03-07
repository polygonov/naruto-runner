import { PRACTICUM_RESOURCES } from '../constant'

export const updateResourcePath = (path: string | null) => {
  if (!path || path.includes(PRACTICUM_RESOURCES)) {
    return path
  }
  return `${PRACTICUM_RESOURCES}${path}`
}
