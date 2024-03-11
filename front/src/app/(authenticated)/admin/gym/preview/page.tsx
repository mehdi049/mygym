import { queryKeys } from '@/lib/const/queryKeys'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import GymPreview from './gymPreview'
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
      <GymPreview />
    </HydrationBoundary>
  )
}
