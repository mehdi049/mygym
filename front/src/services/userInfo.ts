import { API_ENDPOINT } from '@/const/endpoints'
import { queryKeys } from '@/const/queryKeys'
import { fetcher, fetcherGet } from '@/lib/utils/fetcher'
import {
  StrapiUserInfoData,
  StrapiUserProfileMedia,
} from '@/types/strapi/user.types'

type getUserInfoWithGymBasicInfoAndLogoByAccountIdQueryProps = {
  accountId: number
  token?: string
}
export const getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery = ({
  accountId,
  token,
}: getUserInfoWithGymBasicInfoAndLogoByAccountIdQueryProps) => {
  const query = {
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeys.accountInfo, accountId],
    queryFn: async () =>
      fetcherGet({
        url:
          API_ENDPOINT.STRAPI +
          '/user-infos?populate[profile_picture][populate]&populate[account][populate]&populate[gym][populate]=logo&filters[account][id][$eq]=' +
          accountId,
        auth: true,
        token: token,
      }),
  }

  return query
}

type updateUserInfoProps = {
  userInfoId: number
  userInfoData: StrapiUserInfoData | StrapiUserProfileMedia
}
export const updateUserInfo = ({
  userInfoId,
  userInfoData,
}: updateUserInfoProps) => {
  return fetcher<StrapiUserInfoData>({
    url: API_ENDPOINT.STRAPI + '/user-infos/' + userInfoId,
    method: 'PUT',
    body: { data: userInfoData } as unknown as BodyInit,
  })
}
