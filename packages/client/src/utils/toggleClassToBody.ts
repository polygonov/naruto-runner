export default function toggleClassToBody(isDarkTheme: boolean): void {
  const body = document.getElementsByTagName('body')[0]
  isDarkTheme ? body?.classList.remove('light') : body?.classList.add('light')
}
