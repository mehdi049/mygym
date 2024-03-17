import { StrapiUser } from './user.types'

export type StrapiErrorResponseError = {
  details: unknown
  message: string
  name: string
  status: number
}

export type StrapiResponse<T> = {
  data: T
  error: StrapiErrorResponseError
}

export type StrapiAuthSuccess = {
  jwt: string
  user: StrapiUser
}

export type StrapiMediaFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  url: string
}
export type StrapiMediaData = {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: null
  createdAt: Date
  updatedAt: Date
}
export type StrapiMedia = {
  data: {
    id: 1
    attributes: StrapiMediaData
  }
}
