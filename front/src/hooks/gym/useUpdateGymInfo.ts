import { useMutation } from '@tanstack/react-query'
import { updateGymInfo } from '@/services/gym'
import { displaySuccessToast } from '@/lib/utils/utils'
import { queryKeys } from '@/const/queryKeys'
import { StrapiGymData, StrapiGymDataMedia } from '@/types/strapi/gym.types'
import getQueryClient from '@/app/getQueryClient'

const useUpdateGymInfo = () => {
  return useMutation({
    mutationFn: (body: {
      gymId: number
      gymData: StrapiGymData | StrapiGymDataMedia
    }) => {
      return updateGymInfo({ gymId: body.gymId, gymData: body.gymData })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response) {
        displaySuccessToast('Information mis à jour avec succés')
        const queryClient = getQueryClient()
        queryClient.invalidateQueries({ queryKey: [queryKeys.gymInfo] })
      }
    },
  })
}

export default useUpdateGymInfo
