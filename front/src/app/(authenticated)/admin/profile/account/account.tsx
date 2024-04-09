'use client'

import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import DashboardGroupContainer from '@/components/authenticated/dashboardGroupContainer'
import { ErrorArea } from '@/components/ui/error'
import { LoadingArea } from '@/components/ui/loading'
import { SelectField } from '@/components/ui/selectField'
import { TextField } from '@/components/ui/textField'
import useGetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/user/useGetUserInfo'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import UpdateAccountProfilePictureForm from './updateAccountProfilePictureForm'
import { StrapiMedia } from '@/types/strapi/strapi.types'
import { useEffect, useState } from 'react'
import useUpdateUserInfo from '@/hooks/user/useUpdateUserInfo'
import Button from '@/components/ui/button'
import { ZodError, object, string } from 'zod'
import { StrapiUserGender } from '@/types/strapi/user.types'

export default function Account() {
  const accountId = getCurrentAccountIdFromToken()
  const { data, isLoading, isError, isSuccess } =
    useGetUserInfoWithGymBaiscInfoAndLogoByAccountId({ id: accountId })
  const { isPending, mutate } = useUpdateUserInfo()

  const [fName, setFName] = useState('')
  const [fNameError, setFNameError] = useState('')

  const [lName, setLName] = useState('')
  const [lNameError, setLNameError] = useState('')

  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const [birthday, setBirthday] = useState('')
  const [birthdayError, setBirthdayError] = useState('')

  const [gender, setGender] = useState('Homme')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    if (isSuccess) {
      setFName(data.data[0].attributes.first_name)
      setLName(data.data[0].attributes.last_name)
      setPhone(data.data[0].attributes.phone)
      setBirthday(data.data[0].attributes.birthday)
      setGender(data.data[0].attributes.gender)
      setEmail(data.data[0].attributes.account.data?.attributes.email ?? '')
    }
  }, [data])

  const resetErrors = () => {
    setFNameError('')
    setLNameError('')
    setPhoneError('')
    setEmailError('')
    setBirthdayError('')
  }

  const formSchema = object({
    fName: string().min(1, {
      message: 'Prénom obligatoire',
    }),
    lName: string().min(1, {
      message: 'Nom obligatoire',
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
    birthday: string().min(1, {
      message: 'Date de naissance obligatoire',
    }),
  })

  const handleSubmitUpdate = () => {
    try {
      resetErrors()

      formSchema.parse({
        fName: fName,
        lName: lName,
        phone: phone,
        email: email,
        birthday: birthday,
      })

      mutate({
        userInfoId: data?.data[0].id as number,
        userInfoData: {
          first_name: fName,
          last_name: lName,
          phone: phone,

          birthday: birthday,
          /*address: {
            street: street,
            zip_code: zipCode,
            city: city,
          },*/
          gender: gender as StrapiUserGender,
          account: {
            data: {
              attributes: {
                email: email,
              },
            },
          },
        },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors
        setFNameError(
          errors.find((err) => err.path.includes('fName'))?.message ?? ''
        )
        setLNameError(
          errors.find((err) => err.path.includes('lName'))?.message ?? ''
        )
        setPhoneError(
          errors.find((err) => err.path.includes('phone'))?.message ?? ''
        )
        setBirthdayError(
          errors.find((err) => err.path.includes('birthday'))?.message ?? ''
        )
        setEmailError(
          errors.find((err) => err.path.includes('email'))?.message ?? ''
        )
      }
    }
  }

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8 sticky top-0 bg-white z-50 p-2 shadow-sm">
        <h1 className="text-xl font-bold">Mon profil</h1>
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
            <div className="flex gap-4">
              <TextField
                label="Prénom"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                error={fNameError}
              />
              <TextField
                label="Nom"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                error={lNameError}
              />
            </div>
            <div className="flex gap-4">
              <TextField
                label="Télephone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
              />
              <TextField
                type="date"
                label="Date de naissance"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                error={birthdayError}
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
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value)
                }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                error={emailError}
              />
            </div>
          </div>
        </DashboardGroupContainer>
      </DashboardBodyContainer>
    </div>
  )
}
