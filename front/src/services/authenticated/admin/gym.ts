import { API_ENDPOINT } from '@/lib/const/endpoints'
import { fetcher, fetcherGet } from '@/lib/utils/fetcher'
import { StrapiGymData, StrapiUserMe } from '@/types/types'

type getGymInfoByUserInfoIdServiceProps = {
  userInfoId: number
}
export const getGymInfoByUserInfoIdService = ({
  userInfoId,
}: getGymInfoByUserInfoIdServiceProps) => {
  return fetcherGet<StrapiUserMe>({
    url:
      API_ENDPOINT.STRAPI +
      '/gyms?filters[user_infos][id][$eq]=' +
      userInfoId +
      '&populate=*',
    auth: true,
  })
}

type updateGymInfoServiceProps = {
  gymId: number
  gymData: StrapiGymData
}
export const updateGymInfoService = ({
  gymId,
  gymData,
}: updateGymInfoServiceProps) => {
  return fetcher<StrapiUserMe>({
    url: API_ENDPOINT.STRAPI + '/gyms/' + gymId,
    method: 'PUT',
    body: { data: gymData },
  })
}
