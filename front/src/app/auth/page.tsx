'use client'

import { useState } from 'react'
import { ZodError, object, string } from 'zod'
import useSignIn from '@/hooks/public/useSignin'
import { TextField } from '@/components/ui/textField'
import Button from '@/components/ui/button'

export default function Auth() {
  const { isPending, mutate } = useSignIn()
  const [identifier, setIdentifier] = useState<string>('mehdi_admin')
  const [password, setPassword] = useState<string>('scorpion')
  const [passwordError, setPassworError] = useState<string>()
  const [identifierError, setIdentifierError] = useState<string>()

  const authSchema = object({
    identifier: string({
      required_error: 'Identifiant obligatoire',
    }).min(1, {
      message: 'Identifiant obligatoire',
    }),
    password: string({
      required_error: 'Mot de passe obligatoire',
    }).min(1, {
      message: 'Mot de passe obligatoire',
    }),
  })

  const onSubmit = async () => {
    try {
      setPassworError('')
      setIdentifierError('')
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
          erros.find((err) => err.path.includes('password'))?.message
        )
        setIdentifierError(
          erros.find((err) => err.path.includes('identifier'))?.message
        )
      }
    }
  }

  return (
    <main className="min-h-screen p-24">
      <form className="flex flex-col gap-4 max-w-sm">
        <TextField
          label="Identifiant"
          placeholder="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={identifierError}
        />

        <TextField
          type="password"
          label="Mot de passe"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />

        <Button
          variant="primary"
          onClick={() => onSubmit()}
          isLoading={isPending}
          size="lg"
        >
          Confirmer
        </Button>
      </form>
    </main>
  )
}
