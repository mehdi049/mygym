import { ZodError } from 'zod'
import { API_RESPONSE_ERRORS, ERRORS } from './errorMapper'
import { StrapiErrorResponseError, StrapiResponse } from '@/types/types'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const handleErrors = (error: unknown) => {
  if (error instanceof AxiosError) handleStrapiErrors(error)
  else if (error instanceof ZodError) handleZodErrors(error)
  else displayToastErrors([ERRORS.GENERAL])
}

const handleStrapiErrors = (error: AxiosError) => {
  let errors: string[] = []
  if (error.response) {
    try {
      const strapiError: StrapiErrorResponseError = (
        error?.response?.data as StrapiResponse<any>
      ).error

      if (strapiError.status === 403)
        errors.push(API_RESPONSE_ERRORS.NOT_AUTHORIZED)
      else if (strapiError.message) {
        // handled auth error responses
        if (
          strapiError.message
            .toLowerCase()
            .includes('invalid identifier or password')
        )
          errors.push(API_RESPONSE_ERRORS.INVALID_AUTH_CREDENTAILS)
        else errors.push(ERRORS.GENERAL)
      } else errors.push(ERRORS.GENERAL)
    } catch (error) {
      errors.push(ERRORS.GENERAL)
    }
  } else errors.push(ERRORS.GENERAL)
  displayToastErrors(errors)
}

const handleZodErrors = (error: ZodError) => {
  let errors: string[] = []
  error.errors.forEach((err) => {
    errors.push(err.message)
  })

  displayToastErrors(errors)
}

export const displayToastErrors = (errors: string[]) => {
  errors.forEach((error) => {
    toast.error(error, {
      position: 'top-right',
    })
  })
}
