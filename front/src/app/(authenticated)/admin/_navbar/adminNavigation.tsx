'use client'
import usegetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/authenticated/useGetUserInfo'
import { displayStrapiImage } from '@/lib/utils/utils'
import { ROUTES } from '@/routes'
import { signOut } from '@/services/public/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LeftSidebar } from '@/components/authenticated/leftNavbar'
import { AdminSubNavigation } from './adminSubNavigation'

export enum NAVIGATION {
  GYM,
  MEMBERS,
  COACHES,
  CLASSES,
  PROFILE,
}

export const AdminNavigation = () => {
  const [selectedNav, setSelectedNav] = useState<any>(NAVIGATION.PROFILE)

  const { data } = usegetUserInfoWithGymBaiscInfoAndLogoByAccountId()
  const linkClass =
    'block w-full px-4 py-2 hover:font-bold hover:bg-gray-200 duration-100 '
  return (
    <>
      <LeftSidebar>
        <div className="flex gap-2 items-center w-full border-b border-b-gray-200 pb-4 px-2">
          <div>
            {data !== undefined &&
              data.data[0] &&
              data.data[0].attributes.gym &&
              data.data[0].attributes.gym.data?.attributes.logo && (
                <Image
                  src={displayStrapiImage({
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
              data.data !== undefined &&
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
            <Link
              href={ROUTES.ADMIN.PROFILE}
              className={
                linkClass +
                (selectedNav === NAVIGATION.PROFILE
                  ? 'bg-gray-200 font-bold'
                  : '')
              }
              onClick={() => {
                setSelectedNav(NAVIGATION.PROFILE)
              }}
            >
              Mon profile
            </Link>
          </li>

          <li className="list-none">
            <Link
              href={ROUTES.ADMIN.GYM_PREVIEW}
              className={
                linkClass +
                (selectedNav === NAVIGATION.GYM ? 'bg-gray-200 font-bold' : '')
              }
              onClick={() => {
                setSelectedNav(NAVIGATION.GYM)
              }}
            >
              GYM
            </Link>
          </li>
          <li className="list-none">
            <Link
              href={ROUTES.ADMIN.MEMBERS}
              className={
                linkClass +
                (selectedNav === NAVIGATION.MEMBERS
                  ? 'bg-gray-200 font-bold'
                  : '')
              }
              onClick={() => {
                setSelectedNav(NAVIGATION.MEMBERS)
              }}
            >
              Abonnés
            </Link>
          </li>
          <li className="list-none">
            <Link
              href={ROUTES.ADMIN.COACHES}
              className={
                linkClass +
                (selectedNav === NAVIGATION.COACHES
                  ? 'bg-gray-200 font-bold'
                  : '')
              }
              onClick={() => setSelectedNav(NAVIGATION.COACHES)}
            >
              Coaches
            </Link>
          </li>
          <li className="list-none">
            <Link
              href={ROUTES.ADMIN.PLANNING}
              className={
                linkClass +
                (selectedNav === NAVIGATION.CLASSES
                  ? 'bg-gray-200 font-bold'
                  : '')
              }
              onClick={() => setSelectedNav(NAVIGATION.CLASSES)}
            >
              Cours
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
      </LeftSidebar>
      <AdminSubNavigation selected={selectedNav} />
    </>
  )
}
