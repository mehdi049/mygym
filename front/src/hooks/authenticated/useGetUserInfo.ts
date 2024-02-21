'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserInfoAllDetailsByAccountIdService } from '@/services/authenticated/userInfo'
import { getCurrentAccountId } from '@/lib/utils/utils'

const useGetUserInfoAllDetailsByAccountId = () => {
  const accountId = getCurrentAccountId()
  return useQuery({
    queryKey: ['user_info'],
    queryFn: async () =>
      getUserInfoAllDetailsByAccountIdService({ accountId: accountId }),
  })
}

export default useGetUserInfoAllDetailsByAccountId
