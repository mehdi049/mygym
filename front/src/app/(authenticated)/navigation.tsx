'use client'

import useGetUserMe from '@/hooks/user/useGetUserMe'
import { userRoleNames } from '@/const/constant'
import { AdminNavigation } from './admin/_shared/navbar/adminNavigation'

export default function Navigation() {
  const { data } = useGetUserMe()
  /*
  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />
*/
  return (
    <>
      {(data?.role.name.toLowerCase() as string) ===
        userRoleNames.admin.toLowerCase() && <AdminNavigation />}
    </>
  )
}
