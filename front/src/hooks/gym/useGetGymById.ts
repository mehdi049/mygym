'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getGymByIdQuery } from '@/services/gym'
import { StrapiResponse } from '@/types/strapi/strapi.types'
import { IdProps } from '@/types/numberProps.types'
import { StrapiGym } from '@/types/strapi/gym.types'

const useGetGymById = ({
  id,
}: IdProps): UseQueryResult<StrapiResponse<StrapiGym>> => {
  return useQuery(getGymByIdQuery({ id: id }))
}

export default useGetGymById
