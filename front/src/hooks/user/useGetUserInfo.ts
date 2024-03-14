'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery } from '@/services/userInfo'
import { IdProps } from '@/types/numberProps.types'
import { StrapiResponse, StrapiUserInfo } from '@/types/strapi.types'

const useGetUserInfoWithGymBaiscInfoAndLogoByAccountId = ({
  id,
}: IdProps): UseQueryResult<StrapiResponse<StrapiUserInfo[]>> => {
  return useQuery(
    getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery({
      accountId: id,
    })
  )
}

export default useGetUserInfoWithGymBaiscInfoAndLogoByAccountId
