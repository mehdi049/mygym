import { API_ENDPOINT } from '@/const/endpoints'
import { queryKeys } from '@/const/queryKeys'
import { fetcherGet } from '@/lib/utils/fetcher'

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
