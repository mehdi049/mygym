import { API_ENDPOINT } from '../const/endpoints'

export const urlGenerator = (
  service: 'strapi' | string,
  endpoint: string
): string => {
  let url: ''
  switch (service) {
    case 'strapi':
      url = API_ENDPOINT.STRAPI + endpoint
      break
    default:
      url = API_ENDPOINT.STRAPI + endpoint
  }

  return url
}

export const getCookie = (cname: string) => {
  if (typeof window !== 'undefined') {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }
}
