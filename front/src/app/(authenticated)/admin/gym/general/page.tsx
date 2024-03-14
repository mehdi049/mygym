import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next'
import UpdateGymInfoForm from './updateGymInfoForm'
import { getGymByIdQuery } from '@/services/gym'

export default async function Page() {
  const gymId = getCookie('gym', { cookies })

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    getGymByIdQuery({
      id: parseInt(gymId as string),
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateGymInfoForm />
    </HydrationBoundary>
  )
}
