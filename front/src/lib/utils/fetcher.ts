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
  body: BodyInit
  auth?: boolean
  token?: string
  isMedia?: boolean
}
export const fetcher = <T>({
  url,
  method,
  body,
  auth = true,
  token,
  isMedia = false,
}: fetcherProps) => {
  let headerInit: HeadersInit

  if (auth) {
    isMedia
      ? (headerInit = {
          Authorization:
            'bearer ' + (token ? token : getTokenFromLocalCookie()),
        })
      : (headerInit = {
          'Content-Type': 'application/json',
          Authorization:
            'bearer ' + (token ? token : getTokenFromLocalCookie()),
        })
  } else
    headerInit = {
      'Content-Type': 'application/json',
    }

  return fetch(url, {
    method: method,
    body: isMedia ? body : JSON.stringify(body),
    headers: headerInit,
  })
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: T) => data)
    .catch((error) => handleErrors(error))
}

type fetcherMediaProps = {
  url: string
  body: any
  token?: string
}
export const fetcherMedia = <T>({ url, body, token }: fetcherMediaProps) => {
  const headerInit: HeadersInit = {
    Authorization: 'bearer ' + (token ? token : getTokenFromLocalCookie()),
  }

  return fetch(url, {
    method: 'POST',
    body: body,
    headers: headerInit,
  })
    .then((response) => {
      if (response.ok) return response.json()
      else handleErrors(response)
    })
    .then((data: T) => data)
    .catch((error) => handleErrors(error))
}
