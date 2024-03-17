import Profile from './profile'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { getUserInfoWithGymBasicInfoAndLogoByAccountIdQuery } from '@/services/userInfo'

import { cookies } from 'next/headers'
import getQueryClient from '@/app/getQueryClient'

export default async function Page() {
  const token = getCookie('token', { cookies })
  const accountId = getCurrentAccountIdFromToken(token)

  const queryClient = getQueryClient()
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
