import { useMutation } from '@tanstack/react-query'
import { displaySuccessToast } from '@/lib/utils/utils'
import { StrapiClassDataUpdate } from '@/types/strapi/gym.types'
import { updateGymClass } from '@/services/classes'
import getQueryClient from '@/app/getQueryClient'
import { queryKeys } from '@/const/queryKeys'

const useUpdateClass = () => {
  return useMutation({
    mutationFn: (body: { classId: number; data: StrapiClassDataUpdate }) => {
      return updateGymClass({ classId: body.classId, data: body.data })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response) {
        displaySuccessToast('Cours mis à jour avec succés')
        const queryClient = getQueryClient()
        queryClient.invalidateQueries({ queryKey: [queryKeys.gymClasses] })
      }
    },
  })
}

export default useUpdateClass
