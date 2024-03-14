import { getCookie } from 'cookies-next'
import Planning from './planning'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { getClassesByGymIdQuery } from '@/services/classes'

export default async function Page() {
  const gymId = getCookie('gym', { cookies })

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    getClassesByGymIdQuery({ id: parseInt(gymId as string) })
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Planning id={parseInt(gymId as string)} />
    </HydrationBoundary>
  )
}
