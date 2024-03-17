'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getAllClassesNamesQuery } from '@/services/classes'
import { StrapiResponse } from '@/types/strapi/strapi.types'
import { StrapiClassName } from '@/types/strapi/gym.types'

const useGetAllClassesNames = (): UseQueryResult<
  StrapiResponse<StrapiClassName[]>
> => {
  return useQuery(getAllClassesNamesQuery())
}

export default useGetAllClassesNames
