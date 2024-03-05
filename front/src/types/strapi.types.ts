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

/** strapi collections */
export type StrapiUserMe = {
  blocked: boolean
  confirmed: boolean
  email: string
  id: number
  provider: string
  username: string
  updatedAt: Date
  createdAt: Date
  role: {
    description: string
    name: string
    type: string
    updatedAt: Date
    createdAt: Date
    id: number
  }
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

export type StrapiUserRole = {
  attributes: {
    description: string
    name: string
    type: string
    updatedAt: Date
    createdAt: Date
  }
  id: number
}

export type StrapiMap = {
  link: string
}

export type StrapiAddress = {
  city: string
  zip_code: string
  street: string
}

export type StrapiSocialMediaLinks = {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  linkedin?: string
}

export type StrapiUser = {
  blocked: boolean
  confirmed: boolean
  email: string
  id: number
  provider: string
  username: string
  updatedAt: Date
  createdAt: Date
  role?: {
    data?: StrapiUserRole
  }
}

export type StrapiUserAccount = {
  attributes: StrapiUser
  id: number
}

export type StrapiGym = {
  attributes: {
    description: string
    name: string
    phone: string
    website: string
    email: string
    address?: StrapiAddress
    map?: StrapiMap
    logo?: StrapiMedia
    social_media?: StrapiSocialMediaLinks
    user_infos?: {
      data?: StrapiUserInfo[]
    }
    updatedAt: Date
    createdAt: Date
  }
  id: number
}

export type StrapiUserInfo = {
  attributes: {
    birthday: string
    first_name: string
    last_name: string
    gender: 'Homme' | 'Femme'
    phone: string
    updatedAt: Date
    createdAt: Date
    account: {
      data?: StrapiUserAccount
    }
    gym?: {
      data?: StrapiGym
    }
  }
  id: number
}

export type StrapiQueryResult<T> = {
  data: T[]
}

export type StrapiGymData = {
  description: string
  name: string
  phone: string
  website: string
  email: string
  address?: StrapiAddress
  map?: StrapiMap
  social_media?: StrapiSocialMediaLinks
}

export type StrapiGymDataMedia = {
  logo: number
}
