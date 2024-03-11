'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/const/queryKeys'
import { getGymByIdService } from '@/services/authenticated/admin/gym'
import { getCookie } from 'cookies-next'

const useGetGymInfo = () => {
  const gymId = getCookie('gym')
  return useQuery({
    queryKey: [queryKeys.gymInfo, gymId],
    queryFn: async () => getGymByIdService({ id: parseInt(gymId as string) }),
  })
}

export default useGetGymInfo
