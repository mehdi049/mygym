import Profile from './profile'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { getUserInfoWithGymBaiscInfoAndLogoByAccountIdService } from '@/services/authenticated/userInfo'
import { queryKeys } from '@/lib/const/queryKeys'
import { cookies } from 'next/headers'

export default async function Page() {
  const token = getCookie('gym', { cookies })
  const accountId = getCurrentAccountIdFromToken(token)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.gymInfo],
    queryFn: async () =>
      getUserInfoWithGymBaiscInfoAndLogoByAccountIdService({
        accountId: accountId,
        token: token,
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  )
}
