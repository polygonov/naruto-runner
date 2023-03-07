export const createFormData = (
  data: Record<string, string | Blob | File | unknown>
) => {
  const formData = new FormData()
  for (const key of Object.keys(data)) {
    const value = data[key]

    const isValidValueType =
      typeof value === 'string' ||
      value instanceof File ||
      value instanceof Blob

    if (isValidValueType) {
      formData.append(key, value)
    } else {
      formData.append(key, JSON.stringify(value))
    }
  }
  return formData
}
