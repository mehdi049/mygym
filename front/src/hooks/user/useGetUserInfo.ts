'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery } from '@/services/userInfo'
import { IdProps } from '@/types/numberProps.types'
import { StrapiResponse } from '@/types/strapi/strapi.types'
import { StrapiUserInfo } from '@/types/strapi/user.types'

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
