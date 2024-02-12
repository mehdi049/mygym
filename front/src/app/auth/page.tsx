'use client'

import {
  displayToastErrors,
  handleErrors,
} from '@/lib/errorHandler/errorHandler'
import { API_RESPONSE_ERRORS } from '@/lib/errorHandler/errorMapper'
import { setupQuery, setupQueryGet } from '@/lib/utils/setupQuery'
import {
  StrapiAuthSuccess,
  StrapiResponse,
  StrapiUserInfo,
} from '@/types/types'
import { AxiosResponse } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { ZodError, object, string } from 'zod'

export default function Auth() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['token', 'user'])

  const [identifier, setIdentifier] = useState<string>('mehdi_admin')
  const [password, setPassword] = useState<string>('scorpion')
  const [passwordError, setPassworError] = useState<boolean>(false)
  const [identifierError, setIdentifierError] = useState<boolean>(false)

  /*const loginMutation = setupQuery({
    type: 'POST',
    service: 'strapi',
    endpoint: '/auth/local',
    onSuccess: (response: AxiosResponse) => {
      const authSuccess: StrapiAuthSuccess = response.data

      setCookie('token', authSuccess.jwt)
      setupQueryGet({
        service: 'strapi',
        endpoint:
          '/user-infos?filters[account][id][$eq]=' +
          authSuccess.user.id +
          '&populate[account][populate][role]=*&populate[gyms]=*',
        auth: true,
        onSuccess: (response) => {
          const userInfo = response.data as StrapiResponse<StrapiUserInfo[]>

          if (userInfo.data.length > 0) {
            setCookie('user', userInfo.data[0])
            if(userInfo?.data[0].attributes.account.data && userInfo?.data[0].attributes.account.data?.attributes.role?.data)
            window.location.href =
              '/authenticated/' +
              userInfo?.data[0].attributes.account.data.attributes.role.data.attributes.name.toLowerCase()
          }
        },
      })
    },
  })*/

  const authSchema = object({
    identifier: string().min(1, {
      message: 'Identifiant obligatoire',
    }),
    password: string().min(1, {
      message: 'Mot de passe obligatoire',
    }),
  })

  const onSubmit = async () => {
    try {
      setPassworError(false)
      setIdentifierError(false)
      authSchema.parse({
        identifier: identifier,
        password: password,
      })
      /*loginMutation.mutate({
        identifier: identifier,
        password: password,
      })*/
      const auth = await signIn('credentials', {
        identifier: identifier,
        password: password,
        redirect: false,
      })
      if (auth?.ok) {
        router.push('/')
        router.refresh()
      } else displayToastErrors([API_RESPONSE_ERRORS.INVALID_AUTH_CREDENTAILS])
    } catch (error) {
      if (error instanceof ZodError) {
        const erros = error.errors
        setPassworError(
          erros.find((err) => err.path.includes('password')) !== undefined
        )
        setIdentifierError(
          erros.find((err) => err.path.includes('identifier')) !== undefined
        )
      }
      handleErrors(error)
    }
  }

  return (
    <main className="min-h-screen p-24">
      <form>
        <label className="block">Identifiant</label>
        <input
          className={
            'block border border-1 rounded-lg p-2 ' +
            (identifierError ? 'border-red-500' : '')
          }
          type="text"
          placeholder="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <label className="block mt-4">Mot de passe</label>
        <input
          className={
            'block border border-1 rounded-lg p-2 ' +
            (passwordError ? 'border-red-500' : '')
          }
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => onSubmit()}
          className="mt-4 border border-1 rounded-lg p-2"
        >
          Confirmer
        </button>
      </form>
    </main>
  )
}
