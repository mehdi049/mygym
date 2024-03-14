import Profile from './profile'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery } from '@/services/userInfo'

import { cookies } from 'next/headers'

export default async function Page() {
  const token = getCookie('token', { cookies })
  const accountId = getCurrentAccountIdFromToken(token)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery({
      accountId: accountId,
      token: token,
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  )
}
