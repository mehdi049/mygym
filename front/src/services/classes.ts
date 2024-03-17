import { API_ENDPOINT } from '@/const/endpoints'
import { queryKeys } from '@/const/queryKeys'
import { fetcher, fetcherGet } from '@/lib/utils/fetcher'
import { StrapiClassDataUpdate } from '@/types/strapi/gym.types'

type getClassesByGymIdQueryProps = {
  id: number
}
export const getClassesByGymIdQuery = ({ id }: getClassesByGymIdQueryProps) => {
  const query = {
    queryKey: [queryKeys.gymClasses, id],
    queryFn: async () =>
      fetcherGet({
        url:
          API_ENDPOINT.STRAPI +
          '/classes?populate[class_name][populate]=*&populate[room][populate][0]=gym&populate[coaches][populate]=*&populate[attendees][populate]=*&filters[room][gym][id][$eq]=' +
          id,
      }),
  }
  return query
}

export const getAllClassesNamesQuery = () => {
  const query = {
    queryKey: [queryKeys.gymClassesNames],
    queryFn: async () =>
      fetcherGet({
        url: API_ENDPOINT.STRAPI + '/class-names',
      }),
  }
  return query
}

type addGymClassProps = {
  data: StrapiClassDataUpdate
}

export const addGymClass = ({ data }: addGymClassProps) => {
  return fetcher<StrapiClassDataUpdate>({
    url: API_ENDPOINT.STRAPI + '/classes',
    method: 'POST',
    body: { data: data } as unknown as BodyInit,
  })
}

type updateGymClassProps = {
  classId: number
  data: StrapiClassDataUpdate
}

export const updateGymClass = ({ classId, data }: updateGymClassProps) => {
  return fetcher<StrapiClassDataUpdate>({
    url: API_ENDPOINT.STRAPI + '/classes/' + classId,
    method: 'PUT',
    body: { data: data } as unknown as BodyInit,
  })
}
