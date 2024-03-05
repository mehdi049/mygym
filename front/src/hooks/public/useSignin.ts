import { setToken } from '@/lib/utils/cookies'
import {
  getSignedInAccountService,
  signInService,
  signInServiceProps,
} from '@/services/public/auth'
import { StrapiAuthSuccess, StrapiUserMe } from '@/types/strapi.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useSignIn = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: (body: signInServiceProps) => {
      return signInService(body)
    },
    onError: (error) => console.log(error),
    onSuccess: async (response) => {
      if (response) {
        setToken((response as StrapiAuthSuccess).jwt)

        const userAccountResponse = await getSignedInAccountService()

        router.push(
          '/' + (userAccountResponse as StrapiUserMe).role.name.toLowerCase()
        )
      }
    },
  })
}

export default useSignIn
