import { ROUTES } from '@/routes'
import { getTokenFromLocalCookie, unsetToken } from '@/lib/utils/cookies'
import axios from 'axios'
import { API_ENDPOINT } from '@/lib/const/endpoints'
import { StrapiAuthSuccess, StrapiUserMe } from '@/types/types'

export type signInServiceProps = {
  identifier: string
  password: string
}
export const signInService = ({ identifier, password }: signInServiceProps) => {
  return axios.post<StrapiAuthSuccess>(
    API_ENDPOINT.STRAPI + '/auth/local',
    { identifier: identifier, password: password },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export const getSignedInAccountService = () => {
  return axios.get<StrapiUserMe>(API_ENDPOINT.STRAPI + '/users/me?populate=*', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + getTokenFromLocalCookie(),
    },
  })
}

export const signOut = () => {
  unsetToken()
  document.location.href = ROUTES.AUTH
}
