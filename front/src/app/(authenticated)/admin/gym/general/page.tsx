import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next'
import UpdateGymInfoForm from './updateGymInfoForm'
import { queryKeys } from '@/lib/const/queryKeys'
import { getGymByIdService } from '@/services/authenticated/admin/gym'

export default async function Page() {
  const gymId = getCookie('gym', { cookies })

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.gymInfo, gymId],
    queryFn: async () =>
      getGymByIdService({
        id: parseInt(gymId as string),
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateGymInfoForm />
    </HydrationBoundary>
  )
}
