'use client'

import Button from '@/components/ui/button'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { TextField } from '@/components/ui/textField'
import useUpdateGymInfo from '@/hooks/authenticated/useUpdateGymInfo'
import { useEffect, useState } from 'react'
import { ZodError, literal, object, string, union } from 'zod'
import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import DashboardGroupContainer from '@/components/authenticated/dashboardGroupContainer'
import useGetGymInfo from '@/hooks/authenticated/useGetGymInfo'

export default function UpdateGymPricingForm() {
  const { data, isLoading, isError, isSuccess } = useGetGymInfo()
  const { isPending, mutate } = useUpdateGymInfo()

  let gym = data?.data.attributes

  let gymId = data?.data.id

  const [subscribtionPrice, setSubscribtionPrice] = useState<string>(
    gym?.prices?.subscription_fees
      ? gym?.prices?.subscription_fees.toString()
      : ''
  )
  const [subscribtionPriceError, setSubscribtionPricePriceError] =
    useState<string>()

  const [currency, setCurrency] = useState<string>('TND')

  const [oneMonthPrice, setOneMonthPrice] = useState<string>(
    gym?.prices?.one_month
      ? (gym?.prices?.one_month?.price as unknown as string)
      : ''
  )
  const [oneMonthPriceError, setOneMonthPriceError] = useState<string>()
  const [oneMonthExtraInfo, setOneMonthExtraInfo] = useState<string>(
    gym?.prices?.one_month ? gym?.prices?.one_month?.extra_info : ''
  )
  const [oneMonthExtraInfoError, setOneMonthExtraInfoError] = useState<string>()

  const [threeMonthPrice, setThreeMonthPrice] = useState<string>(
    gym?.prices?.three_months
      ? (gym?.prices?.three_months?.price as unknown as string)
      : ''
  )
  const [threeMonthPriceError, setThreeMonthPriceError] = useState<string>()
  const [threeMonthExtraInfo, setThreeMonthExtraInfo] = useState<string>(
    gym?.prices?.three_months ? gym?.prices?.three_months?.extra_info : ''
  )
  const [threeMonthExtraInfoError, setThreeMonthExtraInfoError] =
    useState<string>()

  const [sixMonthPrice, setSixMonthPrice] = useState<string>(
    gym?.prices?.six_months
      ? (gym?.prices?.six_months?.price as unknown as string)
      : ''
  )
  const [sixMonthPriceError, setSixMonthPriceError] = useState<string>()
  const [sixMonthExtraInfo, setSixMonthExtraInfo] = useState<string>(
    gym?.prices?.six_months ? gym?.prices?.six_months?.extra_info : ''
  )
  const [sixMonthExtraInfoError, setSixMonthExtraInfoError] = useState<string>()

  const [nineMonthPrice, setNineMonthPrice] = useState<string>(
    gym?.prices?.nine_months
      ? (gym?.prices?.nine_months?.price as unknown as string)
      : ''
  )
  const [nineMonthPriceError, setNineMonthPriceError] = useState<string>()
  const [nineMonthExtraInfo, setNineMonthExtraInfo] = useState<string>(
    gym?.prices?.nine_months ? gym?.prices?.nine_months?.extra_info : ''
  )
  const [nineMonthExtraInfoError, setNineMonthExtraInfoError] =
    useState<string>()

  const [oneYearPrice, setOneYearPrice] = useState<string>(
    gym?.prices?.one_year
      ? (gym?.prices?.one_year?.price as unknown as string)
      : ''
  )
  const [oneYearPriceError, setOneYearPriceError] = useState<string>()
  const [oneYearExtraInfo, setOneYearExtraInfo] = useState<string>(
    gym?.prices?.one_year ? gym?.prices?.one_year?.extra_info : ''
  )
  const [oneYearExtraInfoError, setOneYearExtraInfoError] = useState<string>()

  /*useEffect(() => {
    if (isSuccess) {
      set(gym?.name as string)
      setPhone(gym?.phone as string)
      setEmail(gym?.email as string)
      setDescription(gym?.description as string)
    }
  }, [isLoading])*/

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
    /* setNameError('')
    setPhoneError('')
    setEmailError('')*/
  }

  const handleSubmitUpdate = () => {
    /* try {
      resetErrors()

      formSchema.parse({
        name: name,
        phone: phone,
        email: email,
        description: description,
      })

      mutate({
        gymId: gymId as number,
        gymData: {
          description: description,
          name: name,
          phone: phone,
          email: email,
        },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        const erros = error.errors
        setNameError(erros.find((err) => err.path.includes('name'))?.message)
        setPhoneError(erros.find((err) => err.path.includes('phone'))?.message)
        setEmailError(erros.find((err) => err.path.includes('email'))?.message)
      }
    }*/
  }

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8 sticky top-0 bg-white z-50 p-2 shadow-sm">
        <h1 className="text-xl font-bold">Tarifs</h1>
        <Button
          variant="primary"
          onClick={() => handleSubmitUpdate()}
          isLoading={isPending}
        >
          Confirmer
        </Button>
      </div>

      <DashboardBodyContainer>
        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Frais abonnement</h2>

            <div className="flex gap-4">
              <TextField
                label="Prix"
                value={subscribtionPrice}
                onChange={(e) => setSubscribtionPrice(e.target.value)}
                error={subscribtionPriceError}
              />
              <TextField
                label="devise"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                disabled
              />
            </div>
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">1 mois</h2>

            <div className="flex gap-4">
              <TextField
                label="Prix"
                value={oneMonthPrice}
                onChange={(e) => setOneMonthPrice(e.target.value)}
                error={oneMonthPriceError}
              />
              <TextField
                label="Information additionnelle"
                value={oneMonthExtraInfo}
                onChange={(e) => setOneMonthExtraInfo(e.target.value)}
                error={oneMonthExtraInfoError}
              />
            </div>
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">3 mois</h2>

            <div className="flex gap-4">
              <TextField
                label="Prix"
                value={threeMonthPrice}
                onChange={(e) => setThreeMonthPrice(e.target.value)}
                error={threeMonthPriceError}
              />
              <TextField
                label="Information additionnelle"
                value={threeMonthExtraInfo}
                onChange={(e) => setThreeMonthExtraInfo(e.target.value)}
                error={threeMonthExtraInfoError}
              />
            </div>
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">6 mois</h2>

            <div className="flex gap-4">
              <TextField
                label="Prix"
                value={sixMonthPrice}
                onChange={(e) => setSixMonthPrice(e.target.value)}
                error={sixMonthPriceError}
              />
              <TextField
                label="Information additionnelle"
                value={sixMonthExtraInfo}
                onChange={(e) => setSixMonthExtraInfo(e.target.value)}
                error={sixMonthExtraInfoError}
              />
            </div>
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">9 mois</h2>

            <div className="flex gap-4">
              <TextField
                label="Prix"
                value={nineMonthPrice}
                onChange={(e) => setNineMonthPrice(e.target.value)}
                error={nineMonthPriceError}
              />
              <TextField
                label="Information additionnelle"
                value={nineMonthExtraInfo}
                onChange={(e) => setNineMonthExtraInfo(e.target.value)}
                error={nineMonthExtraInfoError}
              />
            </div>
          </div>
        </DashboardGroupContainer>

        <DashboardGroupContainer className="mt-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">1 année</h2>

            <div className="flex gap-4">
              <TextField
                label="Prix"
                value={oneYearPrice}
                onChange={(e) => setOneYearPrice(e.target.value)}
                error={oneYearPriceError}
              />
              <TextField
                label="Information additionnelle"
                value={oneYearExtraInfo}
                onChange={(e) => setOneYearExtraInfo(e.target.value)}
                error={oneYearExtraInfoError}
              />
            </div>
          </div>
        </DashboardGroupContainer>
      </DashboardBodyContainer>
    </>
  )
}
