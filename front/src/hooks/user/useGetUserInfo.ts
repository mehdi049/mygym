'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserInfoWithGymBaiscInfoAndLogoByAccountIdService } from '@/services/userInfo'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { queryKeys } from '@/const/queryKeys'

const useGetUserInfoWithGymBaiscInfoAndLogoByAccountId = () => {
  const accountId = getCurrentAccountIdFromToken()
  return useQuery({
    queryKey: [queryKeys.userInfo, accountId],
    queryFn: async () =>
      getUserInfoWithGymBaiscInfoAndLogoByAccountIdService({
        accountId: accountId,
      }),
  })
}

export default useGetUserInfoWithGymBaiscInfoAndLogoByAccountId
