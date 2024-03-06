import { StrapiMedia } from '@/types/strapi.types'
import { getTokenFromLocalCookie } from './cookies'
import { MAX_UPLOAD_SIZE_IMG, STRAPI_URL } from '../const/constant'
import { toast } from 'react-toastify'
import { signOut } from '@/services/public/auth'
import { any, object } from 'zod'
import { ZOD_RESPONSE_ERRORS } from '../errorHandler/errorMapper'
import { handleErrors } from '../errorHandler/errorHandler'

export const getCurrentAccountIdFromToken = (token?: string) => {
  const jwtToken = token ? token : getTokenFromLocalCookie()
  if (jwtToken) {
    try {
      const { id } = JSON.parse(atob((jwtToken as string).split('.')[1]))
      return id
    } catch (error) {
      signOut()
    }
  }
}

type getStrapiImageUrlProps = {
  media?: StrapiMedia
  format?: 'thumbnail' | 'small' | 'medium' | 'large'
}
export const getStrapiImageUrl = ({
  media,
  format,
}: getStrapiImageUrlProps): string => {
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

const getImageSchema = () => {
  return object({
    image: any().refine(
      (file) =>
        parseInt((file?.size / 1024 / 1024).toFixed(2)) <=
        parseInt(MAX_UPLOAD_SIZE_IMG),

      ZOD_RESPONSE_ERRORS.MAX_IMG_SIZE
    ),
  })
}

export const validateImageUpload = (image: File): boolean => {
  try {
    const imageSchema = getImageSchema()
    imageSchema.parse({
      image: image,
    })
    return true
  } catch (error) {
    handleErrors(error)
    return false
  }
}
