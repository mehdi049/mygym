import { QueryClient, useMutation } from '@tanstack/react-query'
import { displaySuccessToast } from '@/lib/utils/utils'
import { queryKeys } from '@/const/queryKeys'
import { StrapiClass } from '@/types/strapi/gym.types'
import { updateGymClass } from '@/services/classes'

const useUpdateClass = () => {
  return useMutation({
    mutationFn: (body: { classId: number; data: StrapiClass }) => {
      return updateGymClass({ classId: body.classId, data: body.data })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response) {
        displaySuccessToast('Cours mis à jour avec succés')
        const queryClient = new QueryClient()
        queryClient.invalidateQueries({ queryKey: [queryKeys.gymClasses] })
      }
    },
  })
}

export default useUpdateClass
