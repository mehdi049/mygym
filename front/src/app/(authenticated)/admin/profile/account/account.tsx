'use client'

import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import DashboardGroupContainer from '@/components/authenticated/dashboardGroupContainer'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { SelectField } from '@/components/ui/selectField'
import { TextField } from '@/components/ui/textField'
import useGetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/user/useGetUserInfo'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { setCookie } from 'cookies-next'
import UpdateAccountProfilePictureForm from './updateAccountProfilePictureForm'
import { StrapiMedia } from '@/types/strapi/strapi.types'

export default function Account() {
  const accountId = getCurrentAccountIdFromToken()
  const { data, isLoading, isError } =
    useGetUserInfoWithGymBaiscInfoAndLogoByAccountId({ id: accountId })

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  if (data) setCookie('gym', data.data[0].attributes.gym?.data?.id)

  return (
    <div>
      <h1 className="text-xl font-bold mb-8">Mon compte</h1>

      <DashboardBodyContainer>
        <DashboardGroupContainer>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Photo de profile</h2>
            <UpdateAccountProfilePictureForm
              currentLogoMedia={
                data?.data[0].attributes.profile_picture as StrapiMedia
              }
              userInfoId={data?.data[0].id as number}
            />
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            {/* 
            <div className="flex gap-4">
              <TextField
                label="Gym"
                value={
                  data?.data[0].attributes.gym?.data?.attributes.name as string
                }
                disabled
                //value={data?.data[0].attributes.last_name as string}
                //onChange={(e) => setPhone(e.target.value)}
                //error={phoneError}
              />
            </div>
*/}
            <div className="flex gap-4">
              <TextField
                label="Prénom"
                value={data?.data[0].attributes.first_name as string}
                //onChange={(e) => setName(e.target.value)}
                //error={nameError}
              />
              <TextField
                label="Nom"
                value={data?.data[0].attributes.last_name as string}
                //onChange={(e) => setPhone(e.target.value)}
                //error={phoneError}
              />
            </div>
            <div className="flex gap-4">
              <TextField
                label="Télephone"
                value={data?.data[0].attributes.phone as string}
                //onChange={(e) => setName(e.target.value)}
                //error={nameError}
              />
              <TextField
                type="date"
                label="Date de naissance"
                value={data?.data[0].attributes.birthday as string}
                //value={data?.data[0].attributes.last_name as string}
                //onChange={(e) => setPhone(e.target.value)}
                //error={phoneError}
              />
            </div>
            <div className="flex gap-4">
              <SelectField
                label="Sexe"
                options={[
                  {
                    label: 'Homme',
                    value: 'Homme',
                  },
                  {
                    label: 'Femme',
                    value: 'Femme',
                  },
                ]}
                value={data?.data[0].attributes.gender as string}
                onChange={(e) => {}}

                //error={nameError}
              />
              <TextField
                label="Email"
                value={
                  data?.data[0].attributes.account.data?.attributes
                    .email as string
                }
                onChange={(e) => {}}

                //error={nameError}
              />
            </div>
          </div>
        </DashboardGroupContainer>
      </DashboardBodyContainer>
    </div>
  )
}
