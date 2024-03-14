'use client'

import useGetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/user/useGetUserInfo'
import { getCurrentAccountIdFromToken } from '@/lib/utils/utils'
import { ROUTES } from '@/routes'
import { getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import { useState } from 'react'

const SUB_NAVIGATION = {
  INFO: 'info',
  PRICES: 'prices',
  PLANNING: 'planning',
  STATS: 'stats',
  PREVIEW: 'preview',
}
export const GymSubNavigation = () => {
  const selectedSubNavCookie = getCookie('dash_sub_navigation')

  const accountId = getCurrentAccountIdFromToken()
  const { data } = useGetUserInfoWithGymBaiscInfoAndLogoByAccountId({
    id: accountId,
  })

  const [selectedSubNav, setSelectedSubNav] = useState<string>(
    selectedSubNavCookie ? selectedSubNavCookie : SUB_NAVIGATION.INFO
  )

  const gym = data?.data[0].attributes.gym?.data?.attributes

  const linkClass =
    'block w-full px-4 py-2 hover:font-bold hover:bg-gray-200 duration-100 '

  return (
    <>
      <p className="list-none block w-full px-4 font-bold text-lg">
        {gym?.name}
      </p>
      <ul className="mt-12">
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.GYM_GENERAL}
            className={
              linkClass +
              (selectedSubNav === SUB_NAVIGATION.INFO
                ? 'bg-gray-200 font-bold'
                : '')
            }
            onClick={() => {
              setSelectedSubNav(SUB_NAVIGATION.INFO)
              setCookie('dash_sub_navigation', SUB_NAVIGATION.INFO)
            }}
          >
            Informations générales
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.GYM_PRICING}
            className={
              linkClass +
              (selectedSubNav === SUB_NAVIGATION.PRICES
                ? 'bg-gray-200 font-bold'
                : '')
            }
            onClick={() => {
              setSelectedSubNav(SUB_NAVIGATION.PRICES)
              setCookie('dash_sub_navigation', SUB_NAVIGATION.PRICES)
            }}
          >
            Tarifs
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.GYM_WEEK_PLANNING}
            className={
              linkClass +
              (selectedSubNav === SUB_NAVIGATION.PLANNING
                ? 'bg-gray-200 font-bold'
                : '')
            }
            onClick={() => {
              setSelectedSubNav(SUB_NAVIGATION.PLANNING)
              setCookie('dash_sub_navigation', SUB_NAVIGATION.PLANNING)
            }}
          >
            Planning de la semaine
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.GYM_STAT}
            className={
              linkClass +
              (selectedSubNav === SUB_NAVIGATION.STATS
                ? 'bg-gray-200 font-bold'
                : '')
            }
            onClick={() => {
              setSelectedSubNav(SUB_NAVIGATION.STATS)
              setCookie('dash_sub_navigation', SUB_NAVIGATION.STATS)
            }}
          >
            Statistique
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.GYM_PREVIEW}
            className={
              linkClass +
              (selectedSubNav === SUB_NAVIGATION.PREVIEW
                ? 'bg-gray-200 font-bold'
                : '')
            }
            onClick={() => {
              setSelectedSubNav(SUB_NAVIGATION.PREVIEW)
              setCookie('dash_sub_navigation', SUB_NAVIGATION.PREVIEW)
            }}
          >
            Preview
          </Link>
        </li>
      </ul>
    </>
  )
}
