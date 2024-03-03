import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export const setToken = (token: string) => {
  setCookie('token', token)
}

export const unsetToken = () => {
  deleteCookie('token')
}

export const getTokenFromLocalCookie = () => {
  return getCookie('token')
}
