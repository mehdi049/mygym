'use client'

import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import useGetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/user/useGetUserInfo'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { setCookie } from 'cookies-next'

export default function Profile() {
  const accountId = getCurrentAccountIdFromToken()
  const { data, isLoading, isError } =
    useGetUserInfoWithGymBaiscInfoAndLogoByAccountId({ id: accountId })

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
