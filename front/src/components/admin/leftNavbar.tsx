'use client'
import useGetUserInfoAllDetailsByAccountId from '@/hooks/authenticated/useGetUserInfo'
import { getStrapiImageUrl } from '@/lib/utils/utils'
import { ROUTES } from '@/routes'
import { signOut } from '@/services/public/auth'
import Image from 'next/image'
import Link from 'next/link'

export const LeftSidebar = () => {
  const { data, isLoading } = useGetUserInfoAllDetailsByAccountId()
  const linkClass =
    'block w-full px-4 py-2 hover:font-bold hover:bg-gray-200 duration-100'
  return (
    <div className="border-r border-r-gray-200 w-72 min-h-screen pt-4 bg-gray-50">
      <div className="flex gap-2 items-center w-full border-b border-b-gray-200 pb-4 px-2">
        <div>
          {data !== undefined &&
            data.data[0] &&
            data.data[0].attributes.gym &&
            data.data[0].attributes.gym.data?.attributes.logo && (
              <Image
                src={getStrapiImageUrl({
                  media: data.data[0].attributes.gym.data?.attributes.logo,
                  format: 'thumbnail',
                })}
                alt={data.data[0].attributes.gym.data.attributes.name}
                width={200}
                height={50}
                className="w-full max-w-16"
              />
            )}
        </div>
        <div>
          <p className="text-xs font-bold">DASHBOARD</p>
          {data !== undefined &&
            data.data[0] &&
            data.data[0].attributes.gym && (
              <p className="text-xs text-gray-500">
                {data.data[0].attributes.gym.data?.attributes.name}
              </p>
            )}
        </div>
      </div>
      <ul className="mt-4">
        <li className="list-none">
          <Link href={ROUTES.ADMIN.GYM_PREVIEW} className={linkClass}>
            GYM
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.MEMBERS} className={linkClass}>
            Abonnés
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.COACHES} className={linkClass}>
            Coaches
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.PLANNING} className={linkClass}>
            Planning / classes
          </Link>
        </li>
        <li className="list-none">
          <Link href={ROUTES.ADMIN.PROFILE} className={linkClass}>
            Mon profile
          </Link>
        </li>
        <li className="list-none">
          <Link
            href=""
            onClick={() => {
              signOut()
            }}
            className={'text-red-500 ' + linkClass}
          >
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  )
}
