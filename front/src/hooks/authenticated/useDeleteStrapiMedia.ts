import { useMutation } from '@tanstack/react-query'
import { deleteStrapiMedia } from '@/services/authenticated/strapiMedia'

const useDeleteStrapiMedia = () => {
  return useMutation({
    mutationFn: (body: { id: number }) => {
      return deleteStrapiMedia({ id: body.id })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      console.log('strapi media deleted after update')
    },
  })
}

export default useDeleteStrapiMedia
