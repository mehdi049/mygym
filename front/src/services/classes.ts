import { API_ENDPOINT } from '@/const/endpoints'
import { fetcherGet } from '@/lib/utils/fetcher'

type getClassesByGymIdProps = {
  id: number
}
export const getClassesByGymId = ({ id }: getClassesByGymIdProps) => {
  return fetcherGet({
    url:
      API_ENDPOINT.STRAPI +
      '/classes?populate[room][populate][0]=gym&populate[coaches][populate]=*&populate[attendees][populate]=*&filters[room][gym][id][$eq]=' +
      id,
  })
}
