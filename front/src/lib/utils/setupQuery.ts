'use client'

import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { getCookie, urlGenerator } from './utils'
import { handleErrors } from '../errorHandler/errorHandler'

interface setupQueryPropsGet {
  service: 'strapi' | string
  endpoint: string
  cacheKey?: string
  auth?: boolean
  onSuccess?: (data: AxiosResponse) => unknown
}

export const setupQueryGet = ({
  service,
  endpoint,
  cacheKey,
  auth,
  onSuccess,
}: setupQueryPropsGet): UseQueryResult => {
  const url = urlGenerator(service, endpoint)
  const token = getCookie('token')

  const headers = auth
    ? {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      }
    : {
        'Content-Type': 'application/json',
      }

  const fetchData = axios
    .get(url, { headers })
    .then((response) => {
      if (response.status === 200) {
        try {
          onSuccess && onSuccess(response)
        } catch (error) {
          console.log(error)
        }
      }
      response.data
    })
    .catch((error: Error) => {
      handleErrors(error)
    })

  return useQuery({
    queryKey: [cacheKey],
    queryFn: async () => fetchData,
  })
}

interface setupQueryProps {
  type: 'POST' | 'PUT' | 'DELETE'
  service: 'strapi' | string
  endpoint: string
  auth?: boolean
  onError?: () => unknown
  onSuccess?: (data: AxiosResponse) => unknown
}
export const setupQuery = ({
  type,
  service,
  endpoint,
  auth,
  onError,
  onSuccess,
}: setupQueryProps): UseMutationResult => {
  const token = getCookie('token')

  const url = urlGenerator(service, endpoint)
  const headers = auth
    ? {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      }
    : {
        'Content-Type': 'application/json',
      }

  let manipulateData: Promise<AxiosResponse<any, any>>

  return useMutation({
    mutationFn: (body: unknown) => {
      switch (type) {
        case 'POST':
          manipulateData = axios.post(url, body, { headers })
          break
        case 'PUT':
          manipulateData = axios.put(url, body, { headers })
        case 'DELETE':
          manipulateData = axios.delete(url, { headers })

        default:
          break
      }
      return manipulateData
    },
    onError: (error) => {
      handleErrors(error)
      onError && onError
    },
    onSuccess: (data: AxiosResponse) => {
      try {
        if (data) onSuccess && onSuccess(data)
      } catch (error) {
        console.log(error)
      }
    },
  })
}
