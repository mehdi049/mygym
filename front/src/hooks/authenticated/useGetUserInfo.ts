'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserInfoAllDetailsByAccountIdService } from '@/services/authenticated/userInfo'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { queryKeys } from '@/lib/const/queryKeys'

const useGetUserInfoAllDetailsByAccountId = () => {
  const accountId = getCurrentAccountIdFromToken()
  return useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: async () =>
      getUserInfoAllDetailsByAccountIdService({ accountId: accountId }),
  })
}

export default useGetUserInfoAllDetailsByAccountId
