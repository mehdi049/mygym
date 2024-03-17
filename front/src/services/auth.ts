import { ROUTES } from '@/routes'
import { unsetNavCookies, unsetToken } from '@/lib/utils/cookies'
import { API_ENDPOINT } from '@/const/endpoints'
import { fetcher, fetcherGet } from '@/lib/utils/fetcher'
import { StrapiAuthSuccess } from '@/types/strapi/strapi.types'
import { queryKeys } from '@/const/queryKeys'

export type signInQueryProps = {
  identifier: string
  password: string
}
export const signInQuery = async ({
  identifier,
  password,
}: signInQueryProps) => {
  return fetcher<StrapiAuthSuccess>({
    url: API_ENDPOINT.STRAPI + '/auth/local',
    method: 'POST',
    body: { identifier: identifier, password: password } as unknown as BodyInit,
    auth: false,
  })
}

export const getSignedInAccountService = () => {
  const query = {
    queryKey: [queryKeys.accountInfo],
    queryFn: async () =>
      fetcherGet({
        url: API_ENDPOINT.STRAPI + '/users/me?populate=*',
        auth: true,
      }),
  }
  return query
}

export const signOut = () => {
  unsetToken()
  unsetNavCookies()
  if (typeof window !== 'undefined') document.location.href = ROUTES.AUTH
}
