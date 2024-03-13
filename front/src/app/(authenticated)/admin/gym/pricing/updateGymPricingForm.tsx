'use client'

import Button from '@/components/ui/button'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { TextField } from '@/components/ui/textField'
import useUpdateGymInfo from '@/hooks/authenticated/gym/useUpdateGymInfo'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ZodError, coerce, object, string } from 'zod'
import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import DashboardGroupContainer from '@/components/authenticated/dashboardGroupContainer'
import useGetGymInfo from '@/hooks/authenticated/gym/useGetGymInfo'
import { GymPackPrice } from '@/types/strapi.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {
  displayToastErrors,
  handleErrors,
} from '@/lib/errorHandler/errorHandler'
import { TextAreaField } from '@/components/ui/textAreaField'

const emptyPack: GymPackPrice = {
  name: undefined,
  extra_info: undefined,
  one_month: undefined,
  three_months: undefined,
  six_months: undefined,
  nine_months: undefined,
  one_year: undefined,
}

export default function UpdateGymPricingForm() {
  const { data, isLoading, isError, isSuccess } = useGetGymInfo()
  const { isPending, mutate } = useUpdateGymInfo()

  const gym = data?.data.attributes

  const gymId = data?.data.id

  const [packs, setPacks] = useState(gym?.prices?.packs)

  const [subscribtionPrice, setSubscribtionPrice] = useState<string>(
    gym?.prices?.subscription_fees
      ? gym?.prices?.subscription_fees.toString()
      : ''
  )
  const [extraInfo, setExtraInfo] = useState<string>(
    gym?.prices?.extra_info ? gym?.prices?.extra_info : ''
  )
  const [subscribtionPriceError, setSubscribtionPriceError] = useState<string>()

  const [currency, setCurrency] = useState<string>('TND')

  useEffect(() => {
    if (isSuccess) {
      setSubscribtionPrice(
        gym?.prices?.subscription_fees
          ? gym?.prices?.subscription_fees.toString()
          : ''
      )
      setExtraInfo(gym?.prices?.extra_info ? gym?.prices?.extra_info : '')
      setPacks(gym?.prices?.packs)
    }
  }, [isLoading])

  const subscriptionSchema = object({
    subscription_fees: coerce.number().positive({
      message: "Frais d'inscription invalid",
    }),
  })

  const resetErrors = () => {
    setSubscribtionPriceError('')
  }

  const handleSubmitUpdate = () => {
    try {
      resetErrors()

      subscriptionSchema.parse({
        subscription_fees: subscribtionPrice,
      })

      packs?.forEach((pack) => {
        packSchema.parse({
          name: pack.name,
          one_month:
            pack.one_month?.toString() === '' ? undefined : pack.one_month,
          three_month:
            pack.three_months?.toString() === ''
              ? undefined
              : pack.three_months,
          six_month:
            pack.six_months?.toString() === '' ? undefined : pack.six_months,
          nine_month:
            pack.nine_months?.toString() === '' ? undefined : pack.nine_months,
          one_year:
            pack.one_year?.toString() === '' ? undefined : pack.one_year,
        })
      })

      mutate({
        gymId: gymId as number,
        gymData: {
          prices: {
            subscription_fees: parseFloat(subscribtionPrice),
            currency: currency,
            extra_info: extraInfo,
            packs: packs?.filter((pack) => pack.name && pack.name.length > 0),
          },
        },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        const erros = error.errors
        setSubscribtionPriceError(
          erros.find((err) => err.path.includes('subscription_fees'))?.message
        )
      }
      // handle packs erros
      handleErrors(error)
    }
  }

  const packSchema = object({
    name: string({
      required_error: 'Nom du pack obligatoire',
    })
      .min(1, {
        message: 'Nom du pack obligatoire',
      })
      .default(''),
    one_month: coerce
      .number()
      .positive({
        message: "Tarif du '1 mois' est invalid",
      })
      .nullish(),
    three_month: coerce
      .number()
      .positive({
        message: "Tarif du '3 mois' est invalid",
      })
      .nullish(),
    six_month: coerce
      .number()
      .positive({
        message: "Tarif du '6 mois' est invalid",
      })
      .nullish(),
    nine_month: coerce
      .number()
      .positive({
        message: "Tarif du '9 mois' est invalid",
      })
      .nullish(),
    one_year: coerce
      .number()
      .positive({
        message: "Tarif du '1 année' est invalide",
      })
      .nullish(),
  })

  const handleAddPack = () => {
    const _packs = packs ? [...packs] : []

    const packToValidate = _packs.slice(-1)

    try {
      // check if at least a pack exist for validation
      if (packToValidate && packToValidate[0]) {
        packSchema.parse({
          name: packToValidate[0].name,
          one_month:
            packToValidate[0].one_month?.toString() === ''
              ? undefined
              : packToValidate[0].one_month,
          three_month:
            packToValidate[0].three_months?.toString() === ''
              ? undefined
              : packToValidate[0].three_months,
          six_month:
            packToValidate[0].six_months?.toString() === ''
              ? undefined
              : packToValidate[0].six_months,
          nine_month:
            packToValidate[0].nine_months?.toString() === ''
              ? undefined
              : packToValidate[0].nine_months,
          one_year:
            packToValidate[0].one_year?.toString() === ''
              ? undefined
              : packToValidate[0].one_year,
        })
        if (
          (!packToValidate[0].one_month ||
            packToValidate[0].one_month?.toString().length === 0) &&
          (!packToValidate[0].three_months ||
            packToValidate[0].three_months?.toString().length === 0) &&
          (!packToValidate[0].six_months ||
            packToValidate[0].six_months?.toString().length === 0) &&
          (!packToValidate[0].nine_months ||
            packToValidate[0].nine_months?.toString().length === 0) &&
          (!packToValidate[0].one_year ||
            packToValidate[0].one_year?.toString().length === 0)
        )
          displayToastErrors(["Il faut saisir au moin une tarif d'un mois"])
        else {
          _packs?.push(emptyPack)
          setPacks(_packs)
        }
      } else {
        _packs?.push(emptyPack)
        setPacks(_packs)
      }
    } catch (error) {
      handleErrors(error)
    }
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
            <h2 className="text-lg font-bold">Frais d'inscription</h2>

            <div className="flex gap-4">
              <TextField
                label="Prix"
                value={subscribtionPrice}
                onChange={(e) => setSubscribtionPrice(e.target.value)}
                error={subscribtionPriceError}
                type="number"
                min={1}
              />
              <TextField
                label="devise"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                disabled
              />
            </div>

            <div className="flex gap-4">
              <TextAreaField
                label="Information additionnelle"
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
              />
            </div>
          </div>
        </DashboardGroupContainer>
        {packs?.map((pack, key) => {
          return (
            <Pack key={key} packKey={key} packs={packs} setPacks={setPacks} />
          )
        })}
        <Button
          variant="secondary"
          size="lg"
          className="w-full mt-8"
          onClick={() => handleAddPack()}
        >
          Ajouter un pack
        </Button>
      </DashboardBodyContainer>
    </>
  )
}

type PackProps = {
  packKey: number
  packs: GymPackPrice[] | undefined
  setPacks: Dispatch<SetStateAction<GymPackPrice[] | undefined>>
}

const Pack = ({ packKey, packs, setPacks }: PackProps) => {
  const handleRemovePack = () => {
    let p = packs ? [...packs] : undefined
    p = p?.filter((pack) => pack.name !== (p as GymPackPrice[])[packKey].name)
    setPacks(p)
  }

  return (
    <>
      {packs && packs.length > 0 && (
        <DashboardGroupContainer className="mt-8">
          <div
            className="bg-gray-200 absolute top-0 right-0 py-2 px-3 rounded-md cursor-pointer hover:bg-gray-300 duration-200"
            onClick={() => {
              handleRemovePack()
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="text-black " />
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-bold w-40">Pack</h2>

              <TextField
                value={packs[packKey].name as string}
                onChange={(e) => {
                  const p = [...packs]
                  p[packKey].name = e.target.value
                  setPacks(p)
                }}
              />
            </div>
            <div className="flex gap-4 items-center">
              <h2 className="text-lg font-bold w-40">
                Information additionnelle
              </h2>

              <TextAreaField
                value={packs[packKey].extra_info as string}
                onChange={(e) => {
                  const p = [...packs]
                  p[packKey].extra_info = e.target.value
                  setPacks(p)
                }}
              />
            </div>

            <hr />

            <div className="flex gap-4 items-center">
              <h2 className="text-lg w-40">1 mois</h2>

              <TextField
                type="number"
                value={packs[packKey].one_month as unknown as string}
                onChange={(e) => {
                  const p = [...packs]
                  p[packKey].one_month =
                    e.target.value.length === 0
                      ? undefined
                      : parseInt(e.target.value)
                  setPacks(p)
                }}
                min={1}
              />
            </div>
            <div className="flex gap-4 items-center">
              <h2 className="text-lg w-40">3 mois</h2>

              <TextField
                type="number"
                value={packs[packKey].three_months as unknown as string}
                onChange={(e) => {
                  const p = [...packs]
                  p[packKey].three_months =
                    e.target.value.length === 0
                      ? undefined
                      : parseInt(e.target.value)
                  setPacks(p)
                }}
                min={1}
              />
            </div>
            <div className="flex gap-4 items-center">
              <h2 className="text-lg w-40">6 mois</h2>

              <TextField
                type="number"
                value={packs[packKey].six_months as unknown as string}
                onChange={(e) => {
                  const p = [...packs]
                  p[packKey].six_months =
                    e.target.value.length === 0
                      ? undefined
                      : parseInt(e.target.value)
                  setPacks(p)
                }}
                min={1}
              />
            </div>
            <div className="flex gap-4 items-center">
              <h2 className="text-lg w-40">9 mois</h2>

              <TextField
                type="number"
                value={packs[packKey].nine_months as unknown as string}
                onChange={(e) => {
                  const p = [...packs]

                  p[packKey].nine_months =
                    e.target.value.length === 0
                      ? undefined
                      : parseInt(e.target.value)

                  setPacks(p)
                }}
                min={1}
              />
            </div>
            <div className="flex gap-4 items-center">
              <h2 className="text-lg w-40">1 année</h2>

              <TextField
                type="number"
                value={packs[packKey].one_year as unknown as string}
                onChange={(e) => {
                  const p = [...packs]
                  p[packKey].one_year =
                    e.target.value.length === 0
                      ? undefined
                      : parseInt(e.target.value)
                  setPacks(p)
                }}
                min={1}
              />
            </div>
          </div>
        </DashboardGroupContainer>
      )}
    </>
  )
}
