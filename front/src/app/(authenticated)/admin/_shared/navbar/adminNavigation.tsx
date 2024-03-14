'use client'
import useGetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/user/useGetUserInfo'
import {
  displayStrapiImage,
  getCurrentAccountIdFromToken,
} from '@/lib/utils/utils'
import { ROUTES } from '@/routes'
import { signOut } from '@/services/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LeftSidebar } from '@/components/authenticated/leftNavbar'
import { AdminSubNavigation } from './adminSubNavigation'
import { getCookie, setCookie } from 'cookies-next'

export const NAVIGATION = {
  GYM: 'gym',
  MEMBERS: 'members',
  COACHES: 'coaches',
  ROOMS: 'rooms',
  PROFILE: 'profile',
}

export const AdminNavigation = () => {
  const selectedNavCookie = getCookie('dash_navigation')

  const [selectedNav, setSelectedNav] = useState<string>(
    selectedNavCookie ? selectedNavCookie : NAVIGATION.PROFILE
  )

  const accountId = getCurrentAccountIdFromToken()
  const { data } = useGetUserInfoWithGymBaiscInfoAndLogoByAccountId({
    id: accountId,
  })

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
                setCookie('dash_navigation', NAVIGATION.PROFILE)
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
                setCookie('dash_navigation', NAVIGATION.GYM)
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
                setCookie('dash_navigation', NAVIGATION.MEMBERS)
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
              onClick={() => {
                setSelectedNav(NAVIGATION.COACHES)
                setCookie('dash_navigation', NAVIGATION.COACHES)
              }}
            >
              Coaches
            </Link>
          </li>
          <li className="list-none">
            <Link
              href={ROUTES.ADMIN.PLANNING}
              className={
                linkClass +
                (selectedNav === NAVIGATION.ROOMS
                  ? 'bg-gray-200 font-bold'
                  : '')
              }
              onClick={() => {
                setSelectedNav(NAVIGATION.ROOMS)
                setCookie('dash_navigation', NAVIGATION.ROOMS)
              }}
            >
              Salle des cours
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
