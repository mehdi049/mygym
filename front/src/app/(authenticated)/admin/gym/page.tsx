'use client'

import Button from '@/components/ui/button'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { TextField } from '@/components/ui/textField'
import useGetUserInfoAllDetailsByAccountId from '@/hooks/authenticated/useGetUserInfo'
import { getStrapiImageUrl } from '@/lib/utils/utils'
import Image from 'next/image'

export default function GymProfile() {
  const { data, isLoading, isError } = useGetUserInfoAllDetailsByAccountId()
  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />
  else {
    const gym = data?.data.data[0].attributes.gym?.data
    const address = gym?.attributes.address
    const map = gym?.attributes.map
    const socialMedia = gym?.attributes.social_media
    const users = gym?.attributes.user_infos
    return (
      <div>
        <h1 className="text-xl font-bold">GYM PROFILE</h1>
        <h3 className="text-sm mt-4">{users?.data?.length} Membres</h3>
        <h3 className="text-sm">{users?.data?.length} Coaches</h3>

        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-bold">General</h2>

          <label className="mb-2 block">Logo</label>
          <Image
            width={200}
            height={200}
            src={getStrapiImageUrl({ data: gym?.attributes.logo })}
            alt=""
          />
          <TextField label="Nom" value={gym?.attributes.name as string} />
          <TextField label="Tel" value={gym?.attributes.phone as string} />
          <TextField
            label="Description"
            value={gym?.attributes.description as string}
          />
          <TextField
            label="Site web"
            value={socialMedia?.attributes.website as string}
          />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-bold">Adresse</h2>
          <TextField label="Cité" value={address?.city as string} />
          <TextField label="Code postal" value={address?.zipcode as string} />
          <TextField label="Rue" value={address?.street as string} />
          <TextField label="Google map" value={map?.link as string} />
          {map && map.link && (
            <a
              href={map?.link as string}
              target="_blank"
              className=" underline text-xs"
            >
              Lien vers google map
            </a>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-bold">Réseau sociaux</h2>

          <TextField
            label="Facebook"
            value={socialMedia?.attributes.facebook as string}
          />
          <TextField
            label="Instagram"
            value={socialMedia?.attributes.instagram as string}
          />
          <TextField
            label="Twitter"
            value={socialMedia?.attributes.twitter as string}
          />
          <TextField
            label="Youtube"
            value={socialMedia?.attributes.youtube as string}
          />
          <TextField
            label="LinkedIn"
            value={socialMedia?.attributes.linkedin as string}
          />

          <Button variant="primary">Confirmer</Button>
        </div>
      </div>
    )
  }
}
