import { USER_ROLES } from '@/const/constant'
import { API_ENDPOINT } from '@/const/endpoints'
import { queryKeys } from '@/const/queryKeys'
import { fetcherGet } from '@/lib/utils/fetcher'
import { IdProps } from '@/types/numberProps.types'

export const getCoachesByGymIdIdQuery = ({ id }: IdProps) => {
  const query = {
    queryKey: [queryKeys.coaches, id],
    queryFn: async () =>
      fetcherGet({
        url:
          API_ENDPOINT.STRAPI +
          '/user-infos?populate[profile_picture][populate]&populate[gym][populate]&populate[account][populate]=*&filters[account][role][name][$eq]=' +
          USER_ROLES.COACH +
          '&filters[gym][id][$eq]=' +
          id,
      }),
  }

  return query
}
