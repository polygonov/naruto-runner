export const stringifyUrlParams = (
  target: string,
  params: Record<string, string | number | boolean>
): string => {
  const url = new URL(target)

  Object.keys(params).forEach(key =>
    url.searchParams.set(key, params[key].toString())
  )

  return url.toString()
}
