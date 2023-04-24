export const stringifyUrlParams = (
  target: string,
  params: Record<string, string | number | boolean>
): string => {
  let url = target
  const paramKeys = Object.keys(params)

  if (!paramKeys.length) {
    return url
  }

  url = paramKeys.reduce((path, key, currentIndex) => {
    path += `${key}=${encodeURIComponent(params[key])}`

    if (currentIndex !== paramKeys.length - 1) {
      path += '&'
    }

    return path
  }, `${url}?`)

  return url
}
