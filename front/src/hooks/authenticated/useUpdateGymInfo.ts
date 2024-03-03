import { QueryClient, useMutation } from '@tanstack/react-query'
import { updateGymInfoService } from '@/services/authenticated/admin/gym'
import { StrapiGymData } from '@/types/types'
import { displaySuccessToast } from '@/lib/utils/utils'
import { queryKeys } from '@/lib/const/queryKeys'

const useUpdateGymInfo = () => {
  return useMutation({
    mutationFn: (body: { gymId: number; gymData: StrapiGymData }) => {
      return updateGymInfoService({ gymId: body.gymId, gymData: body.gymData })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: async (response) => {
      displaySuccessToast('Information mis à jour avec succés')
      const queryClient = new QueryClient()
      queryClient.invalidateQueries({ queryKey: [queryKeys.userInfo] })
    },
  })
}

export default useUpdateGymInfo
