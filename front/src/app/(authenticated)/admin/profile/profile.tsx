'use client'

import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import usegetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/user/useGetUserInfo'
import { setCookie } from 'cookies-next'

export default function Profile() {
  const { data, isLoading, isError } =
    usegetUserInfoWithGymBaiscInfoAndLogoByAccountId()

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  if (data) setCookie('gym', data.data[0].attributes.gym?.data?.id)

  return (
    <div>
      <h1 className="text-xl font-bold">PROFILE</h1>

      {JSON.stringify(data)}
    </div>
  )
}
