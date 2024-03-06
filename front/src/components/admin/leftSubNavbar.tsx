'use client'
import useGetUserInfoAllDetailsByAccountId from '@/hooks/authenticated/useGetUserInfo'
import { ROUTES } from '@/routes'
import { signOut } from '@/services/public/auth'
import Link from 'next/link'

export const LeftSubSidebar = () => {
  const { data, isLoading } = useGetUserInfoAllDetailsByAccountId()
  let gym = data?.data[0].attributes.gym?.data?.attributes
  const linkClass =
    'block w-full px-4 py-2 hover:font-bold hover:bg-gray-200 duration-100'

  return (
    <div className="border-r border-r-gray-200 min-w-64 min-h-screen pt-4 bg-gray-100">
      <p className="list-none block w-full px-4 font-bold text-lg">
        {gym?.name}
      </p>
      <ul className="mt-12">
        <li className="list-none">
          <Link href={ROUTES.ADMIN.GYM_GENERAL} className={linkClass}>
            Informations générales
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.GYM_PRICING} className={linkClass}>
            Tarifs
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.GYM_WEEK_PLANNING} className={linkClass}>
            Planning de la semaine
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.GYM_STAT} className={linkClass}>
            Statistique
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.GYM_PREVIEW} className={linkClass}>
            Preview
          </Link>
        </li>
      </ul>
    </div>
  )
}
