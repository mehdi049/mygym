import { API_ENDPOINT } from '@/lib/const/endpoints'
import { fetcherGet } from '@/lib/utils/fetcher'
import { StrapiQueryResult, StrapiUserInfo } from '@/types/types'

type getUserInfoAllDetailsByAccountIdServiceProps = {
  accountId: number
  token?: string
}
export const getUserInfoAllDetailsByAccountIdService = async ({
  accountId,
  token,
}: getUserInfoAllDetailsByAccountIdServiceProps) => {
  return fetcherGet<StrapiQueryResult<StrapiUserInfo>>({
    url:
      API_ENDPOINT.STRAPI +
      '/user-infos?filters[account][id][$eq]=' +
      accountId +
      '&populate[gym][populate]=*',
    auth: true,
    token: token,
  })
}
