import { API_ENDPOINT } from '@/const/endpoints'
import { setToken } from '@/lib/utils/cookies'
import { fetcherGet } from '@/lib/utils/fetcher'
import { signInQuery, signInQueryProps } from '@/services/auth'
import { StrapiAuthSuccess } from '@/types/strapi/strapi.types'
import { StrapiUserMe } from '@/types/strapi/user.types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useSignIn = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: (body: signInQueryProps) => {
      return signInQuery(body)
    },
    onError: (error) => console.log(error),
    onSuccess: async (response) => {
      if (response) {
        setToken((response as StrapiAuthSuccess).jwt)

        const userInfoResonse = await fetcherGet({
          url: API_ENDPOINT.STRAPI + '/users/me?populate=*',
          auth: true,
        })

        router.push(
          '/' + (userInfoResonse as StrapiUserMe).role.name.toLowerCase()
        )
      }
    },
  })
}

export default useSignIn
