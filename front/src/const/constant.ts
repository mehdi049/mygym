export const ENV = process.env.NEXT_PUBLIC_ENV as string
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL as string
export const MAX_UPLOAD_SIZE_IMG = process.env
  .NEXT_PUBLIC_MAX_UPLOAD_SIZE_IMG as string

export const userRoleNames = {
  admin: 'Admin',
  coach: 'Coach',
  member: 'Member',
}
