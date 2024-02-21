import { StrapiMedia } from '@/types/types'
import { getTokenFromLocalCookie } from './cookies'
import { STRAPI_URL } from '../const/constant'

export const getCurrentAccountId = () => {
  const token = getTokenFromLocalCookie()
  if (token) {
    try {
      const { id } = JSON.parse(atob((token as string).split('.')[1]))
      return id
    } catch (error) {
      console.log('Token not valid')
      return undefined
    }
  }
  return undefined
}

type getStrapiImageUrlProps = {
  data?: StrapiMedia
  format?: 'thumbnail' | 'small' | 'medium' | 'large'
}
export const getStrapiImageUrl = ({
  data,
  format,
}: getStrapiImageUrlProps): string => {
  if (!data) return '/img/not-found.jpg'
  if (data.data.attributes.formats && format) {
    if (data.data.attributes.formats.thumbnail && format === 'thumbnail')
      return STRAPI_URL + data.data.attributes.formats.thumbnail.url
    else if (data.data.attributes.formats.small && format === 'small')
      return STRAPI_URL + data.data.attributes.formats.small.url
    else if (data.data.attributes.formats.medium && format === 'medium')
      return STRAPI_URL + data.data.attributes.formats.medium.url
    else if (data.data.attributes.formats.large && format === 'large')
      return STRAPI_URL + data.data.attributes.formats.large.url
  }
  return STRAPI_URL + data.data.attributes.url
}
