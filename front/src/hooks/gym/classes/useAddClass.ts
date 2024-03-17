import { QueryClient, useMutation } from '@tanstack/react-query'
import { displaySuccessToast } from '@/lib/utils/utils'
import { queryKeys } from '@/const/queryKeys'
import { StrapiClassDataUpdate } from '@/types/strapi/gym.types'
import { addGymClass } from '@/services/classes'

const useAddClass = () => {
  return useMutation({
    mutationFn: (body: { data: StrapiClassDataUpdate }) => {
      return addGymClass({ data: body.data })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response) {
        displaySuccessToast('Cours ajouté avec succés')
        const queryClient = new QueryClient()
        queryClient.invalidateQueries({ queryKey: [queryKeys.gymClasses] })
      }
    },
  })
}

export default useAddClass
