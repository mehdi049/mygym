'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getClassesByGymIdQuery } from '@/services/classes'
import { StrapiClass, StrapiResponse } from '@/types/strapi.types'
import { IdProps } from '@/types/numberProps.types'

const useGetClassesByGymId = ({
  id,
}: IdProps): UseQueryResult<StrapiResponse<StrapiClass[]>> => {
  return useQuery(getClassesByGymIdQuery({ id: id }))
}

export default useGetClassesByGymId
