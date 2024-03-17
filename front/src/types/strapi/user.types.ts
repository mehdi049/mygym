import { StrapiGym } from './gym.types'
import { StrapiMedia } from './strapi.types'

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

export type UserRoleName = {
  name: 'Admin' | 'Coach' | 'Member'
}

export type StrapiUserRole = {
  attributes: {
    description: string
    name: UserRoleName
    type: string
    updatedAt: Date
    createdAt: Date
  }
  id: number
}

export type StrapiAddress = {
  city: string
  zip_code: string
  street: string
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

export type StrapiUserInfo = {
  attributes: {
    birthday: string
    first_name: string
    last_name: string
    gender: 'Homme' | 'Femme'
    phone: string
    profile_picture?: StrapiMedia
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
