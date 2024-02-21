import { API_ENDPOINT } from '@/lib/const/endpoints'
import { getTokenFromLocalCookie } from '@/lib/utils/cookies'
import { StrapiUserMe } from '@/types/types'
import axios from 'axios'

type getGymInfoByUserInfoIdServiceProps = {
  userInfoId: number
}
export const getGymInfoByUserInfoIdService = ({
  userInfoId,
}: getGymInfoByUserInfoIdServiceProps) => {
  return axios.get<StrapiUserMe>(
    API_ENDPOINT.STRAPI +
      '/gyms?filters[user_infos][id][$eq]=' +
      userInfoId +
      '&populate=*',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + getTokenFromLocalCookie(),
      },
    }
  )
}
