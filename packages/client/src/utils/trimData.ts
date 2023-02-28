export const trimData = (data: Record<string, unknown>) => {
  const trimmed: Record<string, unknown> = {}

  Object.keys(data).forEach(key => {
    let value = data[key]
    if (typeof value === 'string') {
      value = value.trim()
    }
    trimmed[key] = value
  })

  return trimmed
}
