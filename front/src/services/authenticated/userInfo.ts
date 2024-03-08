import { API_ENDPOINT } from '@/lib/const/endpoints'
import { fetcherGet } from '@/lib/utils/fetcher'
import { StrapiQueryResult, StrapiUserInfo } from '@/types/strapi.types'

type getUserInfoWithGymBaiscInfoAndLogoByAccountIdServiceProps = {
  accountId: number
  token?: string
}
export const getUserInfoWithGymBaiscInfoAndLogoByAccountIdService = async ({
  accountId,
  token,
}: getUserInfoWithGymBaiscInfoAndLogoByAccountIdServiceProps) => {
  return fetcherGet<StrapiQueryResult<StrapiUserInfo>>({
    url:
      API_ENDPOINT.STRAPI +
      '/user-infos?filters[account][id][$eq]=' +
      accountId +
      '&populate[gym][populate]=logo',
    auth: true,
    token: token,
  })
}
