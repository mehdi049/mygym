'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserInfoWithGymBaiscInfoAndLogoByAccountIdService } from '@/services/authenticated/userInfo'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { queryKeys } from '@/lib/const/queryKeys'

const useGetUserInfoWithGymBaiscInfoAndLogoByAccountId = () => {
  const accountId = getCurrentAccountIdFromToken()
  return useQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: async () =>
      getUserInfoWithGymBaiscInfoAndLogoByAccountIdService({
        accountId: accountId,
      }),
  })
}

export default useGetUserInfoWithGymBaiscInfoAndLogoByAccountId
