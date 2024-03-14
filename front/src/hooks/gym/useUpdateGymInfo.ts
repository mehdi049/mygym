import { QueryClient, useMutation } from '@tanstack/react-query'
import { updateGymInfo } from '@/services/gym'
import { StrapiGymData, StrapiGymDataMedia } from '@/types/strapi.types'
import { displaySuccessToast } from '@/lib/utils/utils'
import { queryKeys } from '@/const/queryKeys'

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
        const queryClient = new QueryClient()
        //queryClient.refetchQueries({ queryKey: [queryKeys.gymInfo] })
        queryClient.invalidateQueries({ queryKey: [queryKeys.gymInfo] })
      }
    },
  })
}

export default useUpdateGymInfo
