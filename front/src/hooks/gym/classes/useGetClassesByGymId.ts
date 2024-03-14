'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/const/queryKeys'
import { getCookie } from 'cookies-next'
import { getClassesByGymId } from '@/services/classes'
import { StrapiClass, StrapiQueryResult } from '@/types/strapi.types'

const useGetClassesByGymId = (): UseQueryResult<
  StrapiQueryResult<StrapiClass>
> => {
  const gymId = getCookie('gym')
  return useQuery({
    queryKey: [queryKeys.gymClasses, gymId],
    queryFn: async () => getClassesByGymId({ id: parseInt(gymId as string) }),
  })
}

export default useGetClassesByGymId
