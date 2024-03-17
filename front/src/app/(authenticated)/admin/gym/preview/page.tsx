import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import GymPreview from './gymPreview'
import { getGymByIdQuery } from '@/services/gym'
import getQueryClient from '@/app/getQueryClient'

export default async function Page() {
  const gymId = getCookie('gym', { cookies })

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    getGymByIdQuery({
      id: parseInt(gymId as string),
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GymPreview />
    </HydrationBoundary>
  )
}
