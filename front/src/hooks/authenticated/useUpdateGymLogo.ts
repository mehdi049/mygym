import { useMutation } from '@tanstack/react-query'
import { uploadStrapiMedia } from '@/services/authenticated/strapiMedia'
import useUpdateGymInfo from './useUpdateGymInfo'

const useUpdateGymLogo = (gymId: number) => {
  const { mutate } = useUpdateGymInfo()

  return useMutation({
    mutationFn: (body: { media: FormData }) => {
      return uploadStrapiMedia({ media: body.media })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response && response[0])
        mutate({
          gymId: gymId,
          gymData: {
            logo: response[0].id,
          },
        })
    },
  })
}

export default useUpdateGymLogo
