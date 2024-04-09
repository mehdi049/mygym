'use client'

import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import {
  displayStrapiImage,
  getCurrentAccountIdFromToken,
} from '@/lib/utils/utils'
import Image from 'next/image'
import useGetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/user/useGetUserInfo'

export default function UserInfoPreview() {
  const accountId = getCurrentAccountIdFromToken()
  const { data, isLoading, isError } =
    useGetUserInfoWithGymBaiscInfoAndLogoByAccountId({
      id: parseInt(accountId as string),
    })

  const userinfo = data?.data[0].attributes

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <>
      <h1 className="text-xl font-bold mb-8">Preview</h1>

      <DashboardBodyContainer>
        <div className="mb-4">
          {userinfo?.profile_picture && accountId && (
            <Image
              width={200}
              height={200}
              src={displayStrapiImage({
                media: userinfo?.profile_picture,
              })}
              alt=""
            />
          )}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-bold">General</h2>

          <p>Prénom: {userinfo?.first_name}</p>
          <p>Nom: {userinfo?.last_name}</p>
          <p>Phone: {userinfo?.phone}</p>
          <p>Email: {userinfo?.account.data?.attributes.email}</p>
          <p>Sexe: {userinfo?.gender}</p>
          <p>Date de naissance: {userinfo?.birthday}</p>
          <hr />
        </div>
      </DashboardBodyContainer>
    </>
  )
}
