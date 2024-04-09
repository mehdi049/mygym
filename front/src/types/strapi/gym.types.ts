import { StrapiMedia } from './strapi.types'
import { StrapiAddress, StrapiUserInfo } from './user.types'

export type StrapiMap = {
  link: string
}

export type StrapiSocialMediaLinks = {
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  linkedin?: string
}

export type StrapiClassName = {
  attributes: {
    name: string
    bg_color: string
    updatedAt?: Date
    createdAt?: Date
  }
  id: number
}

export type StrapiRoom = {
  attributes: {
    name: string
    gym: {
      data?: StrapiGym
    }
    updatedAt?: Date
    createdAt?: Date
  }
  id: number
}

export type ClassStatus = 'Active' | 'Cancelled'

export type StrapiClassDataUpdate = {
  start: Date
  end: Date
  class_name: number
  is_les_mills: boolean
  max_attendees?: number
  room: number
  coaches: number[]
  attendees?: number[]
  status?: ClassStatus
  updatedAt?: Date
  createdAt?: Date
}

export type StrapiClassData = {
  start: Date
  end: Date
  class_name: {
    data: StrapiClassName
  }
  is_les_mills: boolean
  max_attendees?: number
  room: {
    data?: StrapiRoom
  }
  coaches: { data?: StrapiUserInfo[] }
  attendees?: { data?: StrapiUserInfo[] }
  status?: ClassStatus
  updatedAt?: Date
  createdAt?: Date
}

export type StrapiClass = {
  attributes: StrapiClassData
  id: number
}

type GymPrice = {
  subscription_fees: number
  currency: string
  extra_info?: string
  packs?: GymPackPrice[]
}

export type GymRoom = {
  attributes: {
    name: string
    gym: StrapiGym
  }
  id: number
}

export type GymOpenCloseTime = {
  open?: string
  close?: string
}

export type GymOpenTime = {
  monday?: GymOpenCloseTime
  tuesday?: GymOpenCloseTime
  wednesday?: GymOpenCloseTime
  thursday?: GymOpenCloseTime
  friday?: GymOpenCloseTime
  saturday?: GymOpenCloseTime
  sunday?: GymOpenCloseTime
}

export type GymPackPrice = {
  name?: string
  extra_info?: string
  one_month?: number
  three_months?: number
  six_months?: number
  nine_months?: number
  one_year?: number
}

export type StrapiGymData = {
  description?: string
  name?: string
  phone?: string
  email?: string
  website?: string
  address?: StrapiAddress
  map?: StrapiMap
  social_media?: StrapiSocialMediaLinks
  prices?: GymPrice
  open_time?: GymOpenTime
}

export type StrapiGymLogoMedia = {
  logo: number
}

export type StrapiGym = {
  attributes: {
    description: string
    name: string
    phone: string
    website: string
    email: string
    slug: string
    address?: StrapiAddress
    map?: StrapiMap
    logo?: StrapiMedia
    open_time?: GymOpenTime
    social_media?: StrapiSocialMediaLinks
    prices?: GymPrice
    rooms?: { data?: GymRoom[] }
    user_infos?: {
      data?: StrapiUserInfo[]
    }
    updatedAt: Date
    createdAt: Date
  }
  id: number
}
