import { any, object } from 'zod'
import { ZOD_RESPONSE_ERRORS } from '../errorHandler/errorMapper'
import { MAX_UPLOAD_SIZE_IMG } from '../const/constant'
import { handleErrors } from '../errorHandler/errorHandler'

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
