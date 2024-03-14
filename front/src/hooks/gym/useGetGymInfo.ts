'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getGymByIdQuery } from '@/services/gym'
import { StrapiGym, StrapiResponse } from '@/types/strapi.types'
import { IdProps } from '@/types/numberProps.types'

const useGetGymInfo = ({
  id,
}: IdProps): UseQueryResult<StrapiResponse<StrapiGym>> => {
  return useQuery(getGymByIdQuery({ id: id }))
}

export default useGetGymInfo
