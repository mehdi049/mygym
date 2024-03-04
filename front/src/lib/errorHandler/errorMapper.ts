import { MAX_UPLOAD_SIZE_IMG } from '../const/constant'

export const ERRORS = {
  GENERAL: 'Une erreur est survénue, veuillez réessayer plus tard.',
}

export const API_RESPONSE_ERRORS = {
  NOT_AUTHORIZED: 'Action non authorisé',
  // auth
  INVALID_AUTH_CREDENTAILS: 'Identifiant ou mot de passe invalide',
}

export const ZOD_RESPONSE_ERRORS = {
  REQUIRED: 'Une erreur est survénue, veuillez réessayer plus tard.',
  NOT_AUTHORIZED: 'Action non authorisé',
  MAX_IMG_SIZE:
    'Image très volumineuse, elle ne doit pas dépasser les ' +
    parseInt(MAX_UPLOAD_SIZE_IMG) +
    'mb.',
  // auth
  INVALID_AUTH_CREDENTAILS: 'Identifiant ou mot de passe invalide',
}
