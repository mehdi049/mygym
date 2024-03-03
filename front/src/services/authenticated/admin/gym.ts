import { API_ENDPOINT } from '@/lib/const/endpoints'
import { handleErrors } from '@/lib/errorHandler/errorHandler'
import { getTokenFromLocalCookie } from '@/lib/utils/cookies'
import { StrapiGym, StrapiGymData, StrapiUserMe } from '@/types/types'
import axios from 'axios'

type getGymInfoByUserInfoIdServiceProps = {
  userInfoId: number
}
export const getGymInfoByUserInfoIdService = ({
  userInfoId,
}: getGymInfoByUserInfoIdServiceProps) => {
  return fetch(
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
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: StrapiUserMe) => data)
    .catch((error) => handleErrors(error))
}

type updateGymInfoServiceProps = {
  gymId: number
  gymData: StrapiGymData
}
export const updateGymInfoService = ({
  gymId,
  gymData,
}: updateGymInfoServiceProps) => {
  return fetch(API_ENDPOINT.STRAPI + '/gyms/' + gymId, {
    method: 'PUT',
    body: JSON.stringify({ data: gymData }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + getTokenFromLocalCookie(),
    },
  })
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: StrapiUserMe) => data)
    .catch((error) => handleErrors(error))
}
