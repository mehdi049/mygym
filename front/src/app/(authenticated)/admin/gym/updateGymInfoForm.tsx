'use client'

import Button from '@/components/ui/button'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { TextField } from '@/components/ui/textField'
import useGetUserInfoAllDetailsByAccountId from '@/hooks/authenticated/useGetUserInfo'
import useUpdateGymInfo from '@/hooks/authenticated/useUpdateGymInfo'
import { getStrapiImageUrl } from '@/lib/utils/utils'
import Image from 'next/image'
import { useState } from 'react'

export default function UpdateGymInfoForm() {
  const { data, isLoading, isError } = useGetUserInfoAllDetailsByAccountId()
  const { isPending, mutate } = useUpdateGymInfo()

  const gym = data?.data[0].attributes.gym?.data?.attributes
  const id = data?.data[0].attributes.gym?.data?.id
  const address = gym?.address
  const map = gym?.map
  const socialMedia = gym?.social_media
  const users = gym?.user_infos

  const [name, setName] = useState<string>(gym?.name as string)
  const [phone, setPhone] = useState<string>(gym?.phone as string)
  const [description, setDescription] = useState<string>(
    gym?.description as string
  )
  const [website, setWebsite] = useState<string>(gym?.website as string)

  const [city, setCity] = useState<string>(address?.city as string)
  const [zipCode, setZipCode] = useState<string>(address?.zip_code as string)
  const [street, setStreet] = useState<string>(address?.street as string)

  const [googleMapLink, setGoogleMapLink] = useState<string>(
    map?.link as string
  )

  const [fbLink, setFbLink] = useState<string>(socialMedia?.facebook as string)
  const [instaLink, setInstaLink] = useState<string>(
    socialMedia?.instagram as string
  )
  const [twLink, setTwLink] = useState<string>(socialMedia?.twitter as string)
  const [youtubeLink, setYoutubeLink] = useState<string>(
    socialMedia?.youtube as string
  )
  const [liLink, setLiLink] = useState<string>(socialMedia?.linkedin as string)

  const HandleSubmitUpdate = () => {
    mutate({
      gymId: id as number,
      gymData: {
        description: description,
        name: name,
        phone: phone,
        website: website,
        address: {
          street: street,
          zip_code: zipCode,
          city: city,
        },
        map: {
          link: googleMapLink,
        },
        social_media: {
          facebook: fbLink,
          linkedin: liLink,
          twitter: twLink,
          instagram: instaLink,
          youtube: youtubeLink,
        },
      },
    })
  }

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

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
          src={getStrapiImageUrl({ data: gym?.logo })}
          alt=""
        />
        <TextField
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Site web"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <h2 className="text-lg font-bold">Adresse</h2>
        <TextField
          label="Cité"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Code postal"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <TextField
          label="Rue"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <TextField
          label="Google map"
          value={googleMapLink}
          onChange={(e) => setGoogleMapLink(e.target.value)}
        />
        {googleMapLink && (
          <a
            href={googleMapLink as string}
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
          value={fbLink}
          onChange={(e) => setFbLink(e.target.value)}
        />
        <TextField
          label="Instagram"
          value={instaLink}
          onChange={(e) => setInstaLink(e.target.value)}
        />
        <TextField
          label="Twitter"
          value={twLink}
          onChange={(e) => setTwLink(e.target.value)}
        />
        <TextField
          label="Youtube"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
        <TextField
          label="LinkedIn"
          value={liLink}
          onChange={(e) => setLiLink(e.target.value)}
        />

        <Button
          variant="primary"
          onClick={() => HandleSubmitUpdate()}
          isLoading={isPending}
        >
          Confirmer
        </Button>
      </div>
    </div>
  )
}
