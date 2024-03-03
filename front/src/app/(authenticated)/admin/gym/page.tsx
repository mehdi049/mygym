import { getUserInfoAllDetailsByAccountIdService } from '@/services/authenticated/userInfo'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next'
import UpdateGymInfoForm from './updateGymInfoForm'

export default async function Page() {
  const accountId = 2
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['user_info'],
    queryFn: async () =>
      getUserInfoAllDetailsByAccountIdService({
        accountId: accountId,
        token: getCookie('token', { cookies }),
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateGymInfoForm />
    </HydrationBoundary>
  )
}
