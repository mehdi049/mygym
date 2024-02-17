import { ROUTES } from '@/routes'
import { handleErrors } from '@/lib/errorHandler/errorHandler'
import { setToken } from '@/lib/utils/cookies'
import {
  getSignedInAccountService,
  signInService,
  signInServiceProps,
} from '@/services/auth/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useSignIn = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: (body: signInServiceProps) => {
      return signInService(body)
    },
    onError: (error) => {
      handleErrors(error)
    },
    onSuccess: async (response) => {
      // const queryClient = new QueryClient()
      //queryClient.invalidateQueries({ queryKey: refetchKey })

      setToken(response.data.jwt)

      const userAccountResponse = await getSignedInAccountService()
      if (userAccountResponse.status === 200)
        router.push('/' + userAccountResponse.data.role.name.toLowerCase())
    },
  })
}

export default useSignIn
