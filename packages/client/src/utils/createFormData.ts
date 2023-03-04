export const createFormData = (data: Record<string, string | Blob | File>) => {
  const formData = new FormData()
  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }
  return formData
}
