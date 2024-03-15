import { API_ENDPOINT } from '@/const/endpoints'
import { queryKeys } from '@/const/queryKeys'
import { fetcherGet } from '@/lib/utils/fetcher'

type getUserInfoWithGymBasicInfoAndLogoByAccountIdQueryProps = {
  accountId: number
  token?: string
}
export const getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery = ({
  accountId,
  token,
}: getUserInfoWithGymBasicInfoAndLogoByAccountIdQueryProps) => {
  const query = {
    queryKey: [queryKeys.gymInfo, accountId, token],
    queryFn: async () =>
      fetcherGet({
        url:
          API_ENDPOINT.STRAPI +
          '/user-infos?populate[profile_picture][populate]&populate[gym][populate]=logo&filters[account][id][$eq]=' +
          accountId,
        auth: true,
        token: token,
      }),
  }

  return query
}
