import { StrapiMedia } from '@/types/types'
import { getTokenFromLocalCookie, unsetToken } from './cookies'
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
      console.log('invalid token')
      signOut()
    }
  }
  console.log('token not found')
  signOut()
}

type getStrapiImageUrlProps = {
  data?: StrapiMedia
  format?: 'thumbnail' | 'small' | 'medium' | 'large'
}
export const getStrapiImageUrl = ({
  data,
  format,
}: getStrapiImageUrlProps): string => {
  if (data && data.data) {
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
  } else return '/img/not-found.jpg'
  return STRAPI_URL + data.data.attributes.url
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
