import { queryKeys } from '@/lib/const/queryKeys'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { getGymByIdService } from '@/services/authenticated/admin/gym'
import UpdateGymPricingForm from './updateGymPricingForm'

export default async function Page() {
  const gymId = getCookie('gym', { cookies })

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.userInfo],
    queryFn: async () =>
      getGymByIdService({
        id: parseInt(gymId as string),
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateGymPricingForm />
    </HydrationBoundary>
  )
}
