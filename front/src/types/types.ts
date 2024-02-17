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

export type StrapiUserAccount = {
  attributes: StrapiUser
  id: number
}

export type StrapiGym = {
  attributes: {
    description: string
    name: string
    phone: string
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
    gyms?: {
      data?: StrapiGym[]
    }
  }
  id: number
}
