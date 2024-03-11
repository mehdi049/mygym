import { ZodError } from 'zod'
import { API_RESPONSE_ERRORS, ERRORS } from './errorMapper'
import { StrapiErrorResponseError, StrapiResponse } from '@/types/strapi.types'
import { toast } from 'react-toastify'

export const handleErrors = (error: unknown) => {
  if (error instanceof Response) handleFetchErrors(error)
  else if (error instanceof ZodError) handleZodErrors(error)
  else {
    console.log(error)
    displayToastErrors([ERRORS.GENERAL])
  }
}

const handleFetchErrors = async (error: Response) => {
  let errors: string[] = []
  try {
    if (error.status === 403) errors.push(API_RESPONSE_ERRORS.NOT_AUTHORIZED)

    const fetchError = await error.json()
    // handle strapi error
    if (fetchError.data === null && fetchError.error)
      handleStrapiErrors(fetchError)
  } catch (error) {
    console.log(error)
    errors = [ERRORS.GENERAL]
  }
  displayToastErrors(errors)
}

const handleStrapiErrors = (error: StrapiResponse<unknown>) => {
  let errors: string[] = []
  if (error) {
    const strapiError: StrapiErrorResponseError = error.error

    if (strapiError.message) {
      // handled auth error responses
      if (
        strapiError.message
          .toLowerCase()
          .includes('invalid identifier or password')
      )
        errors.push(API_RESPONSE_ERRORS.INVALID_AUTH_CREDENTAILS)
      else errors = [ERRORS.GENERAL]
    } else errors = [ERRORS.GENERAL]
  } else errors = [ERRORS.GENERAL]
  displayToastErrors(errors)
}

const handleZodErrors = (error: ZodError) => {
  const errors: string[] = []
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
