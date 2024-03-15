import { API_ENDPOINT } from '@/const/endpoints'
import { queryKeys } from '@/const/queryKeys'
import { fetcher, fetcherGet } from '@/lib/utils/fetcher'
import { StrapiGymData, StrapiGymDataMedia } from '@/types/strapi.types'

type getGymByIdQueryProps = {
  id: number
}
export const getGymByIdQuery = ({ id }: getGymByIdQueryProps) => {
  const query = {
    queryKey: [queryKeys.gymInfo, id],
    queryFn: async () =>
      fetcherGet({
        url:
          API_ENDPOINT.STRAPI +
          '/gyms/' +
          id +
          '?populate[prices][populate]=*&populate[address][populate]&populate[map][populate]&populate[logo][populate]=*&populate[social_media][populate]&populate[open_time][populate]=*&populate[rooms][populate]',
        auth: true,
      }),
  }

  return query
}

type updateGymInfoProps = {
  gymId: number
  gymData: StrapiGymData | StrapiGymDataMedia
}
export const updateGymInfo = ({ gymId, gymData }: updateGymInfoProps) => {
  return fetcher<StrapiGymData>({
    url: API_ENDPOINT.STRAPI + '/gyms/' + gymId,
    method: 'PUT',
    body: { data: gymData } as unknown as BodyInit,
  })
}
