'use client'

import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import useGetGymInfo from '@/hooks/authenticated/useGetGymInfo'
import { displayStrapiImage } from '@/lib/utils/utils'

import Image from 'next/image'

export default function GymPreview() {
  const { data, isLoading, isError } = useGetGymInfo()

  const gym = data?.data.attributes
  const gymId = data?.data.id
  const address = gym?.address
  const map = gym?.map
  const socialMedia = gym?.social_media

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <>
      <h1 className="text-2xl font-bold uppercase mb-8">Preview</h1>

      <DashboardBodyContainer>
        <div className="mb-4">
          {gym?.logo && gymId && (
            <Image
              width={200}
              height={200}
              src={displayStrapiImage({
                media: gym?.logo,
              })}
              alt=""
            />
          )}
        </div>

        <div className="flex gap-8 mb-8">
          <div className="flex flex-col gap-4 mt-8">
            <h2 className="text-lg font-bold">General</h2>

            <p>Nom: {gym?.name}</p>
            <p>Phone: {gym?.phone}</p>
            <p>Email: {gym?.email}</p>
            <p>Description: {gym?.description}</p>
            <p>Site web: {gym?.website}</p>
            <hr />
            <h2 className="text-lg font-bold">Adresse</h2>
            <p>Ville: {address?.city}</p>
            <p>Code postal: {address?.zip_code}</p>
            <p>Rue: {address?.street}</p>
            <p>Google map: {map?.link}</p>

            <h2 className="text-lg font-bold">Réseau sociaux</h2>
            <p>LinkedIn: {socialMedia?.linkedin}</p>
            <p>Facebook: {socialMedia?.facebook}</p>
            <p>Instagram: {socialMedia?.instagram}</p>
            <p>Youtube: {socialMedia?.youtube}</p>
            <p>Twitter: {socialMedia?.twitter}</p>
          </div>
        </div>
      </DashboardBodyContainer>
    </>
  )
}
