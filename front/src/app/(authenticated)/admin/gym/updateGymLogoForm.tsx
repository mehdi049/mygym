'use client'

import Button from '@/components/ui/button'
import { getStrapiImageUrl, validateImageUpload } from '@/lib/utils/utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import useUpdateGymLogo from '@/hooks/authenticated/useUpdateGymLogo'
import { StrapiMedia } from '@/types/types'
import { handleErrors } from '@/lib/errorHandler/errorHandler'

type updateGymLogoFormProps = {
  currentLogoMedia: StrapiMedia
  gymId: number
}
export default function UpdateGymLogoForm({
  currentLogoMedia,
  gymId,
}: updateGymLogoFormProps) {
  const {
    data,
    isPending: isPendingUpload,
    mutate: mutateUpload,
    isSuccess: isSuccessUpload,
  } = useUpdateGymLogo({
    gymId: gymId,
    currentMediaId: currentLogoMedia.data
      ? currentLogoMedia.data.id
      : undefined,
  })

  const refFile = useRef<HTMLInputElement>(null)
  const [imageFile, setImageFile] = useState<File>()
  const [imageUri, setImageUri] = useState<string>()

  const handleSubmitImageUpdate = () => {
    const formData = new FormData()
    formData.append('files', imageFile as File, imageFile?.name)
    formData.append('field', 'logo')

    if (validateImageUpload(imageFile as File))
      mutateUpload({
        media: formData,
      })
  }

  useEffect(() => {
    if (isSuccessUpload) setImageUri(undefined)
  }, [isSuccessUpload])

  return (
    <div className="relative">
      {imageUri ? (
        <Image width={200} height={200} src={imageUri} alt="" />
      ) : (
        <Image
          width={200}
          height={200}
          src={getStrapiImageUrl({
            data: (isSuccessUpload && data
              ? { data: { attributes: data[0] } }
              : currentLogoMedia) as StrapiMedia,
          })}
          alt=""
        />
      )}
      <input
        type="file"
        name="file"
        className="hidden"
        accept="image/*"
        ref={refFile}
        onChange={(e) => {
          const reader = new FileReader()
          reader.onload = function (event) {
            if (e.target.files) {
              setImageFile(e.target.files[0])
              setImageUri(
                e.target.files ? URL.createObjectURL(e.target.files[0]) : ''
              )
            }
          }
          if (e.target.files) reader.readAsDataURL(e.target.files[0])
        }}
      />
      <div className="mt-2">
        {imageUri ? (
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleSubmitImageUpdate()}
              isLoading={isPendingUpload}
            >
              Confirmer
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setImageUri(undefined)
                if (refFile && refFile.current) refFile.current.value = ''
              }}
            >
              Annuler
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => refFile.current?.click()}
          >
            Modifier
          </Button>
        )}
      </div>
    </div>
  )
}
