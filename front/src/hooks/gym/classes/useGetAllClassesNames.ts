'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'

import { getAllClassesNamesQuery } from '@/services/classes'
import { StrapiClassName, StrapiResponse } from '@/types/strapi.types'

const useGetAllClassesNames = (): UseQueryResult<
  StrapiResponse<StrapiClassName[]>
> => {
  return useQuery(getAllClassesNamesQuery())
}

export default useGetAllClassesNames
