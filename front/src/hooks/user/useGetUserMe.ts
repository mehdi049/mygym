'use client'

import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { getSignedInAccountService } from '@/services/auth'
import { StrapiUserMe } from '@/types/strapi/user.types'

const useGetUserMe = (): UseQueryResult<StrapiUserMe> => {
  return useQuery(getSignedInAccountService())
}

export default useGetUserMe
