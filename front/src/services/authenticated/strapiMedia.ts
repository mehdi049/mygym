import { API_ENDPOINT } from '@/lib/const/endpoints'
import { fetcher, fetcherMedia } from '@/lib/utils/fetcher'
import { StrapiMediaData } from '@/types/strapi.types'

type uploadStrapiMediaProps = {
  media: FormData
}
export const uploadStrapiMedia = ({ media }: uploadStrapiMediaProps) => {
  return fetcherMedia<StrapiMediaData[]>({
    url: API_ENDPOINT.STRAPI + '/upload',
    body: media,
  })
}

type deleteStrapiMediaProps = {
  id: number
}
export const deleteStrapiMedia = ({ id }: deleteStrapiMediaProps) => {
  return fetcher<StrapiMediaData>({
    method: 'DELETE',
    url: API_ENDPOINT.STRAPI + '/upload/files/' + id,
    body: undefined,
  })
}
