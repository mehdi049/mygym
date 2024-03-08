import { ROUTES } from '@/routes'
import { unsetToken } from '@/lib/utils/cookies'
import { API_ENDPOINT } from '@/lib/const/endpoints'
import { fetcher, fetcherGet } from '@/lib/utils/fetcher'
import { StrapiAuthSuccess, StrapiUserMe } from '@/types/strapi.types'

export type signInServiceProps = {
  identifier: string
  password: string
}
export const signInService = async ({
  identifier,
  password,
}: signInServiceProps) => {
  return fetcher<StrapiAuthSuccess>({
    url: API_ENDPOINT.STRAPI + '/auth/local',
    method: 'POST',
    body: { identifier: identifier, password: password },
    auth: false,
  })
}

export const getSignedInAccountService = async () => {
  return fetcherGet<StrapiUserMe>({
    url: API_ENDPOINT.STRAPI + '/users/me?populate=*',
    auth: true,
  })
}

export const signOut = () => {
  unsetToken()
  if (typeof window !== 'undefined') document.location.href = ROUTES.AUTH
}
