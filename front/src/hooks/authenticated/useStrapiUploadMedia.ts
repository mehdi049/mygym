import { useMutation } from '@tanstack/react-query'
import { uploadStrapiMedia } from '@/services/authenticated/strapiMedia'

const useStrapiUploadMedia = () => {
  return useMutation({
    mutationFn: (body: { media: FormData }) => {
      return uploadStrapiMedia({ media: body.media })
    },
    onError: (error) => {
      console.log(error)
    },
    onSuccess: (response) => {
      if (response) {
      }
    },
  })
}

export default useStrapiUploadMedia
