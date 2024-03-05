'use client'

import Button from '@/components/ui/button'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { TextField } from '@/components/ui/textField'
import useGetUserInfoAllDetailsByAccountId from '@/hooks/authenticated/useGetUserInfo'
import useUpdateGymInfo from '@/hooks/authenticated/useUpdateGymInfo'
import { useState } from 'react'
import UpdateGymLogoForm from './updateGymLogoForm'
import { ZodError, literal, object, string, union } from 'zod'
import { TextAreaField } from '@/components/ui/textAreaField'

export default function UpdateGymInfoForm() {
  const { data, isLoading, isError } = useGetUserInfoAllDetailsByAccountId()
  const { isPending, mutate } = useUpdateGymInfo()

  let gym = data?.data[0].attributes.gym?.data?.attributes
  let gymId = data?.data[0].attributes.gym?.data?.id
  let address = gym?.address
  let map = gym?.map
  let socialMedia = gym?.social_media
  let users = gym?.user_infos

  const [name, setName] = useState<string>(gym?.name as string)
  const [nameError, setNameError] = useState<string>()
  const [phone, setPhone] = useState<string>(gym?.phone as string)
  const [phoneError, setPhoneError] = useState<string>()
  const [email, setEmail] = useState<string>(gym?.email as string)
  const [emailError, setEmailError] = useState<string>()
  const [description, setDescription] = useState<string>(
    gym?.description as string
  )
  const [descriptionError, setDescriptionError] = useState<string>()
  const [website, setWebsite] = useState<string>(gym?.website as string)
  const [websiteError, setWebsiteError] = useState<string>()

  const [city, setCity] = useState<string>(address?.city as string)
  const [cityError, setCityError] = useState<string>()
  const [zipCode, setZipCode] = useState<string>(address?.zip_code as string)
  const [zipCodeError, setZipCodeError] = useState<string>()
  const [street, setStreet] = useState<string>(address?.street as string)
  const [streetError, setStreetError] = useState<string>()

  const [googleMapLink, setGoogleMapLink] = useState<string>(
    map?.link as string
  )
  const [googleMapLinkError, setGoogleMapLinkError] = useState<string>()

  const [fbLink, setFbLink] = useState<string>(socialMedia?.facebook as string)
  const [fbLinkError, setFbLinkError] = useState<string>()
  const [instaLink, setInstaLink] = useState<string>(
    socialMedia?.instagram as string
  )
  const [instaLinkError, setInstaLinkError] = useState<string>()
  const [twLink, setTwLink] = useState<string>(socialMedia?.twitter as string)
  const [twLinkError, setTwLinkError] = useState<string>()
  const [youtubeLink, setYoutubeLink] = useState<string>(
    socialMedia?.youtube as string
  )
  const [youtubeLinkError, setYoutubeLinkError] = useState<string>()
  const [liLink, setLiLink] = useState<string>(socialMedia?.linkedin as string)
  const [liLinkError, setLiLinkError] = useState<string>()

  const formSchema = object({
    name: string().min(1, {
      message: 'Nom de la salle obligatoire',
    }),
    phone: string().min(1, {
      message: 'Numéro de téléphone obligatoire',
    }),
    email: string()
      .min(1, {
        message: 'Email obligatoire',
      })
      .email({
        message: 'Email invalid',
      }),
    description: string().optional(),
    website: union([
      string().url({
        message: 'Lien invalid',
      }),
      literal(''),
    ]),
    city: string().min(1, {
      message: 'Cité obligatoire',
    }),
    zipCode: string().min(1, {
      message: 'Code postal obligatoire',
    }),
    street: string().min(1, {
      message: 'Nom de rue obligatoire',
    }),
    googleMapLink: union([
      string().startsWith('https://maps.app.goo.gl/', {
        message: 'Lien vers Google map invalid',
      }),
      literal(''),
    ]),
    fbLink: union([
      string().startsWith('https://www.facebook.com/', {
        message: 'Lien Facebook invalid',
      }),
      literal(''),
    ]),
    instaLink: union([
      string().startsWith('https://www.instagram.com/', {
        message: 'Lien Instagram invalid',
      }),
      literal(''),
    ]),
    twLink: union([
      string().startsWith('https://twitter.com/', {
        message: 'Lien Twitter invalid',
      }),
      literal(''),
    ]),
    youtubeLink: union([
      string().startsWith('https://www.youtube.com/', {
        message: 'Lien Youtube invalid',
      }),
      literal(''),
    ]),
    liLink: union([
      string().startsWith('https://www.linkedin.com/', {
        message: 'Lien LinkedIn invalid',
      }),
      literal(''),
    ]),
  })

  const resetErrors = () => {
    setNameError('')
    setPhoneError('')
    setEmailError('')
    setDescriptionError('')
    setWebsiteError('')
    setCityError('')
    setZipCodeError('')
    setStreetError('')
    setGoogleMapLinkError('')
    setFbLinkError('')
    setInstaLinkError('')
    setTwLinkError('')
    setYoutubeLinkError('')
    setLiLinkError('')
  }

  const handleSubmitUpdate = () => {
    try {
      resetErrors()

      formSchema.parse({
        name: name,
        phone: phone,
        email: email,
        description: description,
        website: website,
        city: city,
        zipCode: zipCode,
        street: street,
        googleMapLink: googleMapLink,
        fbLink: fbLink,
        instaLink: instaLink,
        twLink: twLink,
        youtubeLink: youtubeLink,
        liLink: liLink,
      })

      mutate({
        gymId: gymId as number,
        gymData: {
          description: description,
          name: name,
          phone: phone,
          email: email,
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
    } catch (error) {
      if (error instanceof ZodError) {
        const erros = error.errors
        setNameError(erros.find((err) => err.path.includes('name'))?.message)
        setPhoneError(erros.find((err) => err.path.includes('phone'))?.message)
        setEmailError(erros.find((err) => err.path.includes('email'))?.message)
        setDescriptionError(
          erros.find((err) => err.path.includes('description'))?.message
        )
        setWebsiteError(
          erros.find((err) => err.path.includes('website'))?.message
        )
        setCityError(erros.find((err) => err.path.includes('city'))?.message)
        setZipCodeError(
          erros.find((err) => err.path.includes('zipCode'))?.message
        )
        setStreetError(
          erros.find((err) => err.path.includes('street'))?.message
        )
        setGoogleMapLinkError(
          erros.find((err) => err.path.includes('googleMapLink'))?.message
        )
        setFbLinkError(
          erros.find((err) => err.path.includes('fbLink'))?.message
        )
        setInstaLinkError(
          erros.find((err) => err.path.includes('instaLink'))?.message
        )
        setTwLinkError(
          erros.find((err) => err.path.includes('twLink'))?.message
        )
        setYoutubeLinkError(
          erros.find((err) => err.path.includes('youtubeLink'))?.message
        )
        setLiLinkError(
          erros.find((err) => err.path.includes('liLink'))?.message
        )
      }
    }
  }

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <div>
      <h1 className="text-xl font-bold">GYM PROFILE</h1>
      <h3 className="text-sm mt-4">{users?.data?.length} Membres</h3>
      <h3 className="text-sm">{users?.data?.length} Coaches</h3>

      <div className="my-4">
        {gym?.logo && gymId && (
          <UpdateGymLogoForm
            currentLogoMedia={gym?.logo}
            gymId={gymId as number}
          />
        )}
      </div>

      <div className="flex gap-8 mb-8">
        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-bold">General</h2>

          <TextField
            label="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
          />
          <TextField
            label="Tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <TextAreaField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
          />
          <TextField
            label="Site web"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            error={websiteError}
          />
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <h2 className="text-lg font-bold">Adresse</h2>
          <TextField
            label="Cité"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={cityError}
          />
          <TextField
            label="Code postal"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            error={zipCodeError}
          />
          <TextField
            label="Rue"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            error={streetError}
          />
          <TextField
            label="Lien vers Google map"
            value={googleMapLink}
            onChange={(e) => setGoogleMapLink(e.target.value)}
            error={googleMapLinkError}
          />
          {map?.link && (
            <a
              href={map.link as string}
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
            error={fbLinkError}
          />
          <TextField
            label="Instagram"
            value={instaLink}
            onChange={(e) => setInstaLink(e.target.value)}
            error={instaLinkError}
          />
          <TextField
            label="Twitter"
            value={twLink}
            onChange={(e) => setTwLink(e.target.value)}
            error={twLinkError}
          />
          <TextField
            label="Youtube"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            error={youtubeLinkError}
          />
          <TextField
            label="LinkedIn"
            value={liLink}
            onChange={(e) => setLiLink(e.target.value)}
            error={liLinkError}
          />
        </div>
      </div>

      <Button
        variant="primary"
        onClick={() => handleSubmitUpdate()}
        isLoading={isPending}
      >
        Confirmer
      </Button>
    </div>
  )
}
