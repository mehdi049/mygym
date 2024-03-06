import { getUserInfoAllDetailsByAccountIdService } from '@/services/authenticated/userInfo'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next'
import UpdateGymInfoForm from './updateGymInfoForm'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { queryKeys } from '@/lib/const/queryKeys'

export default async function Page() {
  const token = getCookie('token', { cookies })
  const accountId = getCurrentAccountIdFromToken(token)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: async () =>
      getUserInfoAllDetailsByAccountIdService({
        accountId: accountId,
        token: token,
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateGymInfoForm />
    </HydrationBoundary>
  )
}
