'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { IdProps } from '@/types/numberProps.types'
import { StrapiResponse, StrapiUserInfo } from '@/types/strapi.types'
import { getCoachesByGymIdIdQuery } from '@/services/coach'

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
