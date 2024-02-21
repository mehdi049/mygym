import { API_ENDPOINT } from '@/lib/const/endpoints'
import { handleErrors } from '@/lib/errorHandler/errorHandler'
import { getTokenFromLocalCookie } from '@/lib/utils/cookies'
import { StrapiQueryResult, StrapiUserInfo } from '@/types/types'
import axios from 'axios'

type getUserInfoAllDetailsByAccountIdServiceProps = {
  accountId: number
}
export const getUserInfoAllDetailsByAccountIdService = async ({
  accountId,
}: getUserInfoAllDetailsByAccountIdServiceProps) => {
  return axios
    .get<StrapiQueryResult<StrapiUserInfo>>(
      API_ENDPOINT.STRAPI +
        '/user-infos?filters[account][id][$eq]=' +
        accountId +
        '&populate[gym][populate]=*',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'bearer ' + getTokenFromLocalCookie(),
        },
      }
    )
    .catch((error) => {
      handleErrors(error)
    })
}
