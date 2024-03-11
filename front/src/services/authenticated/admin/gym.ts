import { API_ENDPOINT } from '@/lib/const/endpoints'
import { fetcher, fetcherGet } from '@/lib/utils/fetcher'
import {
  StrapiGym,
  StrapiGymData,
  StrapiGymDataMedia,
  StrapiResponse,
} from '@/types/strapi.types'

type getGymByIdServiceProps = {
  id: number
}
export const getGymByIdService = ({ id }: getGymByIdServiceProps) => {
  return fetcherGet<StrapiResponse<StrapiGym>>({
    url:
      API_ENDPOINT.STRAPI +
      '/gyms/' +
      id +
      '?populate[prices][populate]=*&populate[address][populate]=*&populate[map][populate]=*&populate[logo][populate]=*&populate[social_media][populate]=*&populate[user_infos][populate]=*&populate[open_time][populate]=*',
    auth: true,
  })
}

type updateGymInfoServiceProps = {
  gymId: number
  gymData: StrapiGymData | StrapiGymDataMedia
}
export const updateGymInfoService = ({
  gymId,
  gymData,
}: updateGymInfoServiceProps) => {
  return fetcher<StrapiGymData>({
    url: API_ENDPOINT.STRAPI + '/gyms/' + gymId,
    method: 'PUT',
    body: { data: gymData } as unknown as BodyInit,
  })
}
