import { handleErrors } from '../errorHandler/errorHandler'
import { getTokenFromLocalCookie } from './cookies'

type fetcherGetProps = {
  url: string
  auth?: boolean
  token?: string
}
export const fetcherGet = <T>({ url, auth, token }: fetcherGetProps) => {
  let headerInit: HeadersInit
  if (auth)
    headerInit = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + (token ? token : getTokenFromLocalCookie()),
    }
  else
    headerInit = {
      'Content-Type': 'application/json',
    }
  return fetch(url, {
    headers: headerInit,
  })
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: T) => data)
    .catch((error) => handleErrors(error))
}

type fetcherProps = {
  method: 'POST' | 'PUT' | 'DELETE'
  url: string
  body: object
  auth?: boolean
  token?: string
}
export const fetcher = <T>({
  url,
  method,
  body,
  auth = true,
  token,
}: fetcherProps) => {
  let headerInit: HeadersInit
  if (auth)
    headerInit = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + (token ? token : getTokenFromLocalCookie()),
    }
  else
    headerInit = {
      'Content-Type': 'application/json',
    }

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headerInit,
  })
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: T) => data)
    .catch((error) => handleErrors(error))
}
