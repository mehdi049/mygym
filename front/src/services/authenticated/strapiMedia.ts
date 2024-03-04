import { API_ENDPOINT } from '@/lib/const/endpoints'
import { fetcherMedia } from '@/lib/utils/fetcher'
import { StrapiMediaData } from '@/types/types'

type uploadStrapiMediaProps = {
  media: FormData
}
export const uploadStrapiMedia = ({ media }: uploadStrapiMediaProps) => {
  return fetcherMedia<StrapiMediaData[]>({
    url: API_ENDPOINT.STRAPI + '/upload',
    body: media,
  })
}
