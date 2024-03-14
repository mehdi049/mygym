'use client'

import { displayStrapiImage } from '@/lib/utils/utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import useUpdateGymLogo from '@/hooks/gym/useUpdateGymLogo'
import { StrapiMedia } from '@/types/strapi.types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import { validateImageUpload } from '@/lib/utils/fileValidation'

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
    <div className="relative max-w-xs max-h-xs pb-8 border border-gray-300 shadow-sm">
      {imageUri ? (
        <Image width={320} height={320} src={imageUri} alt="" />
      ) : (
        <Image
          width={320}
          height={320}
          src={displayStrapiImage({
            media: (isSuccessUpload && data
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
          reader.onload = function () {
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
      <div className="mt-2 absolute bottom-0 left-0 w-full p-2 bg-white-transparent flex justify-end items-center gap-6">
        {imageUri ? (
          <>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-black cursor-pointer"
              onClick={() => {
                setImageUri(undefined)
                if (refFile && refFile.current) refFile.current.value = ''
              }}
            />

            <FontAwesomeIcon
              icon={faCheck}
              className="text-black cursor-pointer"
              onClick={() => handleSubmitImageUpdate()}
            />
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faEdit}
              className="text-black cursor-pointer"
              onClick={() => refFile.current?.click()}
            />
          </>
        )}
      </div>
    </div>
  )
}
