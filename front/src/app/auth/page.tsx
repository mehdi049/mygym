'use client'

import { handleErrors } from '@/lib/errorHandler/errorHandler'
import { useState } from 'react'
import { ZodError, object, string } from 'zod'
import useSignIn from '@/hooks/public/useSignin'

export default function Auth() {
  const { isPending, mutate } = useSignIn()
  const [identifier, setIdentifier] = useState<string>('mehdi_admin')
  const [password, setPassword] = useState<string>('scorpion')
  const [passwordError, setPassworError] = useState<boolean>(false)
  const [identifierError, setIdentifierError] = useState<boolean>(false)

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
      mutate({
        identifier: identifier,
        password: password,
      })
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
          {!isPending ? 'Confirmer' : 'loading...'}
        </button>
      </form>
    </main>
  )
}
