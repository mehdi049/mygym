import { useMutation } from '@tanstack/react-query'
import { uploadStrapiMedia } from '@/services/authenticated/strapiMedia'
import useUpdateGymInfo from './useUpdateGymInfo'
import useDeleteStrapiMedia from './useDeleteStrapiMedia'

type useUpdateGymLogoProps = {
  gymId: number
  currentMediaId?: number
}
const useUpdateGymLogo = ({ gymId, currentMediaId }: useUpdateGymLogoProps) => {
  const { mutate } = useUpdateGymInfo()
  const { mutate: mutateMediaDelete } = useDeleteStrapiMedia()

  return useMutation({
    mutationFn: (body: { media: FormData }) => {
      return uploadStrapiMedia({ media: body.media })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response && response[0]) {
        mutate({
          gymId: gymId,
          gymData: {
            logo: response[0].id,
          },
        })
        // delete old picture after update
        if (currentMediaId) mutateMediaDelete({ id: currentMediaId })
      }
    },
  })
}

export default useUpdateGymLogo
