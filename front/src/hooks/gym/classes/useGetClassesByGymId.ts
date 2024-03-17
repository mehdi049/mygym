'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getClassesByGymIdQuery } from '@/services/classes'
import { StrapiResponse } from '@/types/strapi/strapi.types'
import { IdProps } from '@/types/numberProps.types'
import { StrapiClass } from '@/types/strapi/gym.types'

const useGetClassesByGymId = ({
  id,
}: IdProps): UseQueryResult<StrapiResponse<StrapiClass[]>> => {
  return useQuery(getClassesByGymIdQuery({ id: id }))
}

export default useGetClassesByGymId
