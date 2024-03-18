import { useMutation } from '@tanstack/react-query'
import { displaySuccessToast } from '@/lib/utils/utils'
import { deleteGymClass } from '@/services/classes'
import getQueryClient from '@/app/getQueryClient'
import { queryKeys } from '@/const/queryKeys'

const useDeleteClass = () => {
  return useMutation({
    mutationFn: (body: { id: number }) => {
      return deleteGymClass({ id: body.id })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response) {
        displaySuccessToast('Cours retiré avec succés')
        const queryClient = getQueryClient()
        queryClient.refetchQueries({ queryKey: [queryKeys.gymClasses] })
      }
    },
  })
}

export default useDeleteClass
