import { StrapiMedia } from '@/types/strapi/strapi.types'
import { getTokenFromLocalCookie } from './cookies'
import { STRAPI_URL } from '../../const/constant'
import { toast } from 'react-toastify'
import { signOut } from '@/services/auth'

export const getCurrentAccountIdFromToken = (token?: string) => {
  const jwtToken = token ? token : getTokenFromLocalCookie()
  if (jwtToken) {
    try {
      const { id } = JSON.parse(atob((jwtToken as string).split('.')[1]))
      return id
    } catch (error) {
      console.log(error)
      signOut()
    }
  }
}

type displayStrapiImageProps = {
  media?: StrapiMedia
  format?: 'thumbnail' | 'small' | 'medium' | 'large'
}
export const displayStrapiImage = ({
  media,
  format,
}: displayStrapiImageProps): string => {
  if (media && media.data) {
    if (media.data.attributes.formats && format) {
      if (media.data.attributes.formats.thumbnail && format === 'thumbnail')
        return STRAPI_URL + media.data.attributes.formats.thumbnail.url
      else if (media.data.attributes.formats.small && format === 'small')
        return STRAPI_URL + media.data.attributes.formats.small.url
      else if (media.data.attributes.formats.medium && format === 'medium')
        return STRAPI_URL + media.data.attributes.formats.medium.url
      else if (media.data.attributes.formats.large && format === 'large')
        return STRAPI_URL + media.data.attributes.formats.large.url
    }
  } else return '/img/not-found.jpg'
  return STRAPI_URL + media.data.attributes.url
}

export const displaySuccessToast = (msg: string) => {
  toast.success(msg, {
    position: 'top-right',
  })
}

export const removeItemByKey = (arr: unknown[], key: number) => {
  if (key > -1) arr.splice(key, 1)

  return arr
}

export const doubleDigitDisplay = (digit: string | string) => {
  if (digit.toString().length < 2) return '0' + digit

  return digit
}
