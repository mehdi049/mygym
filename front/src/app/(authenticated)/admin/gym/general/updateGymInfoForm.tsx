'use client'

import Button from '@/components/ui/button'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { TextField } from '@/components/ui/textField'
import useUpdateGymInfo from '@/hooks/authenticated/gym/useUpdateGymInfo'
import { useEffect, useState } from 'react'
import UpdateGymLogoForm from './updateGymLogoForm'
import { ZodError, literal, object, string, union } from 'zod'
import { TextAreaField } from '@/components/ui/textAreaField'
import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import DashboardGroupContainer from '@/components/authenticated/dashboardGroupContainer'
import useGetGymInfo from '@/hooks/authenticated/gym/useGetGymInfo'
import { Select, SelectOption } from '@/components/ui/select'
import { doubleDigitDisplay } from '@/lib/utils/utils'

const timeOptions: SelectOption[] = []

export default function UpdateGymInfoForm() {
  const { data, isLoading, isError, isSuccess } = useGetGymInfo()
  const { isPending, mutate } = useUpdateGymInfo()

  const gym = data?.data.attributes
  const gymId = data?.data.id
  const address = gym?.address
  const map = gym?.map
  const socialMedia = gym?.social_media
  const openTime = gym?.open_time

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

  const [openTimeMonday, setOpenTimeMonday] = useState<string>(
    openTime?.monday?.open?.toString() as string
  )
  const [closeTimeMonday, setCloseTimeMonday] = useState<string>(
    openTime?.monday?.open?.toString() as string
  )
  const [openTimeTuesday, setOpenTimeTuesday] = useState<string>(
    openTime?.tuesday?.open?.toString() as string
  )
  const [closeTimeTuesday, setCloseTimeTuesday] = useState<string>(
    openTime?.tuesday?.open?.toString() as string
  )
  const [openTimeWednesday, setOpenTimeWednesday] = useState<string>(
    openTime?.wednesday?.open?.toString() as string
  )
  const [closeTimeWednesday, setCloseTimeWednesday] = useState<string>(
    openTime?.wednesday?.open?.toString() as string
  )
  const [openTimeThursday, setOpenTimeThursday] = useState<string>(
    openTime?.thursday?.open?.toString() as string
  )
  const [closeTimeThursday, setCloseTimeThursday] = useState<string>(
    openTime?.thursday?.open?.toString() as string
  )
  const [openTimeFriday, setOpenTimeFriday] = useState<string>(
    openTime?.friday?.open?.toString() as string
  )
  const [closeTimeFriday, setCloseTimeFriday] = useState<string>(
    openTime?.friday?.open?.toString() as string
  )
  const [openTimeSaturday, setOpenTimeSaturday] = useState<string>(
    openTime?.saturday?.open?.toString() as string
  )
  const [closeTimeSaturday, setCloseTimeSaturday] = useState<string>(
    openTime?.saturday?.open?.toString() as string
  )
  const [openTimeSunday, setOpenTimeSunday] = useState<string>(
    openTime?.sunday?.open?.toString() as string
  )
  const [closeTimeSunday, setCloseTimeSunday] = useState<string>(
    openTime?.sunday?.open?.toString() as string
  )

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

  useEffect(() => {
    if (isSuccess) {
      setName(gym?.name as string)
      setPhone(gym?.phone as string)
      setEmail(gym?.email as string)
      setDescription(gym?.description as string)
      setWebsite(gym?.website as string)

      setCity(address?.city as string)
      setZipCode(address?.zip_code as string)
      setStreet(address?.street as string)

      setGoogleMapLink(map?.link as string)

      setOpenTimeMonday(openTime?.monday?.open?.toString() as string)
      setCloseTimeMonday(openTime?.monday?.open?.toString() as string)
      setOpenTimeTuesday(openTime?.tuesday?.open?.toString() as string)
      setCloseTimeTuesday(openTime?.tuesday?.open?.toString() as string)
      setOpenTimeWednesday(openTime?.wednesday?.open?.toString() as string)
      setCloseTimeWednesday(openTime?.wednesday?.open?.toString() as string)
      setOpenTimeThursday(openTime?.thursday?.open?.toString() as string)
      setCloseTimeThursday(openTime?.thursday?.open?.toString() as string)
      setOpenTimeFriday(openTime?.friday?.open?.toString() as string)
      setCloseTimeFriday(openTime?.friday?.open?.toString() as string)
      setOpenTimeSaturday(openTime?.saturday?.open?.toString() as string)
      setCloseTimeSaturday(openTime?.saturday?.open?.toString() as string)
      setOpenTimeSunday(openTime?.sunday?.open?.toString() as string)
      setCloseTimeSunday(openTime?.sunday?.open?.toString() as string)

      setFbLink(socialMedia?.facebook as string)
      setInstaLink(socialMedia?.instagram as string)
      setTwLink(socialMedia?.twitter as string)
      setYoutubeLink(socialMedia?.youtube as string)
      setLiLink(socialMedia?.linkedin as string)
    }
  }, [isLoading])

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
      message: 'Ville obligatoire',
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

  ;[...Array(24).keys()].map((x) => {
    return timeOptions.push({
      label: doubleDigitDisplay(x.toString()),
      value: x,
    })
  })

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8 sticky top-0 bg-white z-50 p-2 shadow-sm">
        <h1 className="text-xl font-bold">Informations générales</h1>
        <Button
          variant="primary"
          onClick={() => handleSubmitUpdate()}
          isLoading={isPending}
        >
          Confirmer
        </Button>
      </div>

      <DashboardBodyContainer>
        <DashboardGroupContainer>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Logo</h2>
            {gym?.logo && gymId && (
              <UpdateGymLogoForm
                currentLogoMedia={gym?.logo}
                gymId={gymId as number}
              />
            )}
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">General</h2>

            <div className="flex gap-4">
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
            </div>
            <div className="flex gap-4">
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
              />
              <TextField
                label="Site web"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                error={websiteError}
              />
            </div>
            <TextAreaField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={descriptionError}
            />
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Adresse</h2>

            <div className="flex gap-4">
              <TextField
                label="Ville"
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
            </div>
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
        </DashboardGroupContainer>

        <DashboardGroupContainer className="my-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Horraire d'ouverture</h2>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-20">Lundi</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={openTimeMonday}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={closeTimeMonday}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-20">Mardi</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={openTimeTuesday}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={closeTimeTuesday}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-20">Mercredi</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={openTimeWednesday}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={closeTimeWednesday}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-20">Jeudi</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={openTimeThursday}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={closeTimeThursday}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-20">Vendredi</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={openTimeFriday}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={closeTimeFriday}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-20">Samedi</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={openTimeSaturday}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={closeTimeSaturday}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-20">Dimanche</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={openTimeSunday}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-20">
                <Select
                  onChange={() => {}}
                  options={timeOptions}
                  value={closeTimeSunday}
                />
              </div>
            </div>
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="my-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Réseau sociaux</h2>
            <div className="flex gap-4">
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
            </div>

            <div className="flex gap-4">
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
            </div>
            <TextField
              label="LinkedIn"
              value={liLink}
              onChange={(e) => setLiLink(e.target.value)}
              error={liLinkError}
            />
          </div>
        </DashboardGroupContainer>
      </DashboardBodyContainer>
    </>
  )
}
