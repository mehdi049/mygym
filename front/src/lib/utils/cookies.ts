import Cookies from 'js-cookie'

export const setToken = (token: string) => {
  if (typeof window === 'undefined') return

  Cookies.set('token', token)
}

export const unsetToken = () => {
  if (typeof window === 'undefined') return

  Cookies.remove('token')
}

export const getTokenFromLocalCookie = () => {
  return Cookies.get('token')
}
