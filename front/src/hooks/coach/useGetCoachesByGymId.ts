'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { IdProps } from '@/types/numberProps.types'
import { StrapiResponse } from '@/types/strapi/strapi.types'
import { getCoachesByGymIdIdQuery } from '@/services/coach'
import { StrapiUserInfo } from '@/types/strapi/user.types'

const useGetCoachesByGymId = ({
  id,
}: IdProps): UseQueryResult<StrapiResponse<StrapiUserInfo[]>> => {
  return useQuery(
    getCoachesByGymIdIdQuery({
      id: id,
    })
  )
}

export default useGetCoachesByGymId
