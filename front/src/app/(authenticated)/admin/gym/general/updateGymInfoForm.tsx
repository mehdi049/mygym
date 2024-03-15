'use client'

import Button from '@/components/ui/button'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { TextField } from '@/components/ui/textField'
import useUpdateGymInfo from '@/hooks/gym/useUpdateGymInfo'
import { useEffect, useState } from 'react'
import UpdateGymLogoForm from './updateGymLogoForm'
import { ZodError, literal, object, string, union } from 'zod'
import { TextAreaField } from '@/components/ui/textAreaField'
import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import DashboardGroupContainer from '@/components/authenticated/dashboardGroupContainer'
import useGetGymById from '@/hooks/gym/useGetGymById'
import { SelectField, SelectFieldOption } from '@/components/ui/selectField'
import { doubleDigitDisplay } from '@/lib/utils/utils'
import { getCookie } from 'cookies-next'

const DEFAULT_OPENING_TIME = '06'
const DEFAULT_CLOSING_TIME = '23'

export default function UpdateGymInfoForm() {
  const id = getCookie('gym')
  const { data, isLoading, isError, isSuccess } = useGetGymById({
    id: parseInt(id as string),
  })
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

  const [timeOptions, setTimeOptions] = useState<SelectFieldOption[]>([])
  const [openTimeMonday, setOpenTimeMonday] = useState<string>(
    openTime?.monday?.open ? openTime?.monday?.open : DEFAULT_OPENING_TIME
  )
  const [closeTimeMonday, setCloseTimeMonday] = useState<string>(
    openTime?.monday?.close ? openTime?.monday?.close : DEFAULT_CLOSING_TIME
  )
  const [openTimeTuesday, setOpenTimeTuesday] = useState<string>(
    openTime?.tuesday?.open ? openTime?.tuesday?.open : DEFAULT_OPENING_TIME
  )
  const [closeTimeTuesday, setCloseTimeTuesday] = useState<string>(
    openTime?.tuesday?.close ? openTime?.tuesday?.close : DEFAULT_CLOSING_TIME
  )
  const [openTimeWednesday, setOpenTimeWednesday] = useState<string>(
    openTime?.wednesday?.open ? openTime?.wednesday?.open : DEFAULT_OPENING_TIME
  )
  const [closeTimeWednesday, setCloseTimeWednesday] = useState<string>(
    openTime?.wednesday?.close
      ? openTime?.wednesday?.close
      : DEFAULT_CLOSING_TIME
  )
  const [openTimeThursday, setOpenTimeThursday] = useState<string>(
    openTime?.thursday?.open ? openTime?.thursday?.open : DEFAULT_OPENING_TIME
  )
  const [closeTimeThursday, setCloseTimeThursday] = useState<string>(
    openTime?.thursday?.close ? openTime?.thursday?.close : DEFAULT_CLOSING_TIME
  )
  const [openTimeFriday, setOpenTimeFriday] = useState<string>(
    openTime?.friday?.open ? openTime?.friday?.open : DEFAULT_OPENING_TIME
  )
  const [closeTimeFriday, setCloseTimeFriday] = useState<string>(
    openTime?.friday?.close ? openTime?.friday?.close : DEFAULT_CLOSING_TIME
  )
  const [openTimeSaturday, setOpenTimeSaturday] = useState<string>(
    openTime?.saturday?.open ? openTime?.saturday?.open : DEFAULT_OPENING_TIME
  )
  const [closeTimeSaturday, setCloseTimeSaturday] = useState<string>(
    openTime?.saturday?.close ? openTime?.saturday?.close : DEFAULT_CLOSING_TIME
  )
  const [openTimeSunday, setOpenTimeSunday] = useState<string>(
    openTime?.sunday?.open ? openTime?.sunday?.open : DEFAULT_OPENING_TIME
  )
  const [closeTimeSunday, setCloseTimeSunday] = useState<string>(
    openTime?.sunday?.close ? openTime?.sunday?.close : DEFAULT_CLOSING_TIME
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

      setOpenTimeMonday(
        openTime?.monday?.open ? openTime?.monday?.open : DEFAULT_OPENING_TIME
      )
      setCloseTimeMonday(
        openTime?.monday?.close ? openTime?.monday?.close : DEFAULT_CLOSING_TIME
      )
      setOpenTimeTuesday(
        openTime?.tuesday?.open ? openTime?.tuesday?.open : DEFAULT_OPENING_TIME
      )
      setCloseTimeTuesday(
        openTime?.tuesday?.close
          ? openTime?.tuesday?.close
          : DEFAULT_CLOSING_TIME
      )
      setOpenTimeWednesday(
        openTime?.wednesday?.open
          ? openTime?.wednesday?.open
          : DEFAULT_OPENING_TIME
      )
      setCloseTimeWednesday(
        openTime?.wednesday?.close
          ? openTime?.wednesday?.close
          : DEFAULT_CLOSING_TIME
      )
      setOpenTimeThursday(
        openTime?.thursday?.open
          ? openTime?.thursday?.open
          : DEFAULT_OPENING_TIME
      )
      setCloseTimeThursday(
        openTime?.thursday?.close
          ? openTime?.thursday?.close
          : DEFAULT_CLOSING_TIME
      )
      setOpenTimeFriday(
        openTime?.friday?.open ? openTime?.friday?.open : DEFAULT_OPENING_TIME
      )
      setCloseTimeFriday(
        openTime?.friday?.close ? openTime?.friday?.close : DEFAULT_CLOSING_TIME
      )
      setOpenTimeSaturday(
        openTime?.saturday?.open
          ? openTime?.saturday?.open
          : DEFAULT_OPENING_TIME
      )
      setCloseTimeSaturday(
        openTime?.saturday?.close
          ? openTime?.saturday?.close
          : DEFAULT_CLOSING_TIME
      )
      setOpenTimeSunday(
        openTime?.sunday?.open ? openTime?.sunday?.open : DEFAULT_OPENING_TIME
      )
      setCloseTimeSunday(
        openTime?.sunday?.close ? openTime?.sunday?.close : DEFAULT_CLOSING_TIME
      )

      setFbLink(socialMedia?.facebook as string)
      setInstaLink(socialMedia?.instagram as string)
      setTwLink(socialMedia?.twitter as string)
      setYoutubeLink(socialMedia?.youtube as string)
      setLiLink(socialMedia?.linkedin as string)
    }
  }, [isLoading])

  useEffect(() => {
    const _timeOptions: SelectFieldOption[] = []
    ;[...Array(24).keys()].map((x) => {
      return _timeOptions.push({
        label: doubleDigitDisplay(x.toString()),
        value: doubleDigitDisplay(x.toString()),
      })
    })
    setTimeOptions(_timeOptions)
  }, [])

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
    ])
      .optional()
      .nullable(),
    city: string({
      required_error: 'Ville obligatoire',
    }).min(1, {
      message: 'Ville obligatoire',
    }),
    zipCode: string({
      required_error: 'Code postal obligatoire',
    }).min(1, {
      message: 'Code postal obligatoire',
    }),
    street: string({
      required_error: 'Nom de la rue obligatoire',
    }).min(1, {
      message: 'Nom de la rue obligatoire',
    }),
    googleMapLink: union([
      string().startsWith('https://maps.app.goo.gl/', {
        message: 'Lien vers Google map invalid',
      }),
      literal(''),
    ])
      .nullable()
      .optional(),
    fbLink: union([
      string().startsWith('https://www.facebook.com/', {
        message: 'Lien Facebook invalid',
      }),
      literal(''),
    ])
      .nullable()
      .optional(),
    instaLink: union([
      string().startsWith('https://www.instagram.com/', {
        message: 'Lien Instagram invalid',
      }),
      literal(''),
    ])
      .nullable()
      .optional(),
    twLink: union([
      string().startsWith('https://twitter.com/', {
        message: 'Lien Twitter invalid',
      }),
      literal(''),
    ])
      .nullable()
      .optional(),
    youtubeLink: union([
      string().startsWith('https://www.youtube.com/', {
        message: 'Lien Youtube invalid',
      }),
      literal(''),
    ])
      .nullable()
      .optional(),
    liLink: union([
      string().startsWith('https://www.linkedin.com/', {
        message: 'Lien LinkedIn invalid',
      }),
      literal(''),
    ])
      .nullable()
      .optional(),
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

  const timeRefactor = (time: string) => {
    if (time.length === 2) return time + ':00:00'

    return time
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
          open_time: {
            monday: {
              open: timeRefactor(openTimeMonday),
              close: timeRefactor(closeTimeMonday),
            },
            tuesday: {
              open: timeRefactor(openTimeTuesday),
              close: timeRefactor(closeTimeTuesday),
            },
            wednesday: {
              open: timeRefactor(openTimeWednesday),
              close: timeRefactor(closeTimeWednesday),
            },
            thursday: {
              open: timeRefactor(openTimeThursday),
              close: timeRefactor(closeTimeThursday),
            },
            friday: {
              open: timeRefactor(openTimeFriday),
              close: timeRefactor(closeTimeFriday),
            },
            saturday: {
              open: timeRefactor(openTimeSaturday),
              close: timeRefactor(closeTimeSaturday),
            },
            sunday: {
              open: timeRefactor(openTimeSunday),
              close: timeRefactor(closeTimeSunday),
            },
          },
        },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error)
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
              <p className="font-bold w-full max-w-24">Lundi</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setOpenTimeMonday(e.target.value)}
                  options={timeOptions as SelectFieldOption[]}
                  value={openTimeMonday?.substring(0, 2)}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setCloseTimeMonday(e.target.value)}
                  options={timeOptions}
                  value={closeTimeMonday?.substring(0, 2)}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-24">Mardi</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setOpenTimeTuesday(e.target.value)}
                  options={timeOptions}
                  value={openTimeTuesday?.substring(0, 2)}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setCloseTimeTuesday(e.target.value)}
                  options={timeOptions}
                  value={closeTimeTuesday?.substring(0, 2)}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-24">Mercredi</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setOpenTimeWednesday(e.target.value)}
                  options={timeOptions}
                  value={openTimeWednesday?.substring(0, 2)}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setCloseTimeWednesday(e.target.value)}
                  options={timeOptions}
                  value={closeTimeWednesday?.substring(0, 2)}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-24">Jeudi</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setOpenTimeThursday(e.target.value)}
                  options={timeOptions}
                  value={openTimeThursday?.substring(0, 2)}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setCloseTimeThursday(e.target.value)}
                  options={timeOptions}
                  value={closeTimeThursday?.substring(0, 2)}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-24">Vendredi</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setOpenTimeFriday(e.target.value)}
                  options={timeOptions}
                  value={openTimeFriday?.substring(0, 2)}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setCloseTimeFriday(e.target.value)}
                  options={timeOptions}
                  value={closeTimeFriday?.substring(0, 2)}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-24">Samedi</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setOpenTimeSaturday(e.target.value)}
                  options={timeOptions}
                  value={openTimeSaturday?.substring(0, 2)}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setCloseTimeSaturday(e.target.value)}
                  options={timeOptions}
                  value={closeTimeSaturday?.substring(0, 2)}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <p className="font-bold w-full max-w-24">Dimanche</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setOpenTimeSunday(e.target.value)}
                  options={timeOptions}
                  value={openTimeSunday?.substring(0, 2)}
                />
              </div>
              <p>jusqu'à</p>
              <div className="w-full max-w-24">
                <SelectField
                  onChange={(e) => setCloseTimeSunday(e.target.value)}
                  options={timeOptions}
                  value={closeTimeSunday?.substring(0, 2)}
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
