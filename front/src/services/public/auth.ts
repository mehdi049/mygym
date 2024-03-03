import { ROUTES } from '@/routes'
import { getTokenFromLocalCookie, unsetToken } from '@/lib/utils/cookies'
import { API_ENDPOINT } from '@/lib/const/endpoints'
import { StrapiAuthSuccess, StrapiUserMe } from '@/types/types'
import { handleErrors } from '@/lib/errorHandler/errorHandler'

export type signInServiceProps = {
  identifier: string
  password: string
}
export const signInService = async ({
  identifier,
  password,
}: signInServiceProps) => {
  return await fetch(API_ENDPOINT.STRAPI + '/auth/local', {
    method: 'POST',
    body: JSON.stringify({ identifier: identifier, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: StrapiAuthSuccess) => data)
    .catch((error) => handleErrors(error))
}

export const getSignedInAccountService = async () => {
  return await fetch(API_ENDPOINT.STRAPI + '/users/me?populate=*', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + getTokenFromLocalCookie(),
    },
  })
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: StrapiUserMe) => data)
    .catch((error) => handleErrors(error))
}

export const signOut = () => {
  unsetToken()
  document.location.href = ROUTES.AUTH
}
