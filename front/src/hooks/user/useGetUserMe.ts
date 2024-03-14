'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/const/queryKeys'
import { getSignedInAccountService } from '@/services/auth'

const useGetUserMe = () => {
  return useQuery({
    queryKey: [queryKeys.accountInfo],
    queryFn: async () => getSignedInAccountService(),
  })
}

export default useGetUserMe
