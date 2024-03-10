'use client'

import useGetUserMe from '@/hooks/authenticated/useGetUserMe'
import { userRoleNames } from '@/lib/const/constant'
import { AdminNavigation } from './admin/_shared/navbar/adminNavigation'

export default function Navigation() {
  const { data, isLoading, isError, isSuccess } = useGetUserMe()
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
