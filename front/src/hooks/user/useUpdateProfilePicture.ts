import { useMutation } from '@tanstack/react-query'
import { uploadStrapiMedia } from '@/services/strapiMedia'
import useDeleteStrapiMedia from '../useDeleteStrapiMedia'
import useUpdateUserInfo from './useUpdateUserInfo'

type UseUpdateGymLogoProps = {
  userInfoId: number
  currentMediaId?: number
}
const useUpdateProfilePicture = ({
  userInfoId,
  currentMediaId,
}: UseUpdateGymLogoProps) => {
  const { mutate } = useUpdateUserInfo()
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
          userInfoId: userInfoId,
          userInfoData: {
            profile_picture: response[0].id,
          },
        })
        // delete old picture after update
        if (currentMediaId) mutateMediaDelete({ id: currentMediaId })
      }
    },
  })
}

export default useUpdateProfilePicture
