import { useMutation } from '@tanstack/react-query'
import { displaySuccessToast } from '@/lib/utils/utils'
import { queryKeys } from '@/const/queryKeys'
import getQueryClient from '@/app/getQueryClient'
import {
  StrapiUserInfoData,
  StrapiUserProfileMedia,
} from '@/types/strapi/user.types'
import { updateUserInfo } from '@/services/userInfo'

const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn: (body: {
      userInfoId: number
      userInfoData: StrapiUserInfoData | StrapiUserProfileMedia
    }) => {
      return updateUserInfo({
        userInfoId: body.userInfoId,
        userInfoData: body.userInfoData,
      })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response) {
        displaySuccessToast('Information mis à jour avec succés')
        const queryClient = getQueryClient()
        queryClient.invalidateQueries({ queryKey: [queryKeys.userInfo] })
      }
    },
  })
}

export default useUpdateUserInfo
