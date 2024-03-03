import { API_ENDPOINT } from '@/lib/const/endpoints'
import { handleErrors } from '@/lib/errorHandler/errorHandler'
import { getTokenFromLocalCookie } from '@/lib/utils/cookies'
import { StrapiQueryResult, StrapiUserInfo } from '@/types/types'

type getUserInfoAllDetailsByAccountIdServiceProps = {
  accountId: number
  token?: string
}
export const getUserInfoAllDetailsByAccountIdService = async ({
  accountId,
  token,
}: getUserInfoAllDetailsByAccountIdServiceProps) => {
  return fetch(
    API_ENDPOINT.STRAPI +
      '/user-infos?filters[account][id][$eq]=' +
      accountId +
      '&populate[gym][populate]=*',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + (token ? token : getTokenFromLocalCookie()),
      },
    }
  )
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: StrapiQueryResult<StrapiUserInfo>) => data)
    .catch((error) => handleErrors(error))
}
