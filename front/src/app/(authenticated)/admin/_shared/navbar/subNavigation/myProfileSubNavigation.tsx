'use client'
import useGetUserInfoWithGymBaiscInfoAndLogoByAccountId from '@/hooks/authenticated/useGetUserInfo'
import { ROUTES } from '@/routes'
import { getCookie, setCookie } from 'cookies-next'
import Link from 'next/link'
import { useState } from 'react'

const SUB_NAVIGATION = {
  INFO: 'info',
  PWD: 'pwd',
  PREVIEW: 'preview',
}
export const MyProfileSubNavigation = () => {
  const selectedSubNavCookie = getCookie('dash_sub_navigation')
  const { data } = useGetUserInfoWithGymBaiscInfoAndLogoByAccountId()
  const [selectedSubNav, setSelectedSubNav] = useState<string>(
    selectedSubNavCookie ? selectedSubNavCookie : SUB_NAVIGATION.INFO
  )

  const linkClass =
    'block w-full px-4 py-2 hover:font-bold hover:bg-gray-200 duration-100 '

  return (
    <>
      <p className="list-none block w-full px-4 font-bold text-lg">
        {data?.data[0].attributes.first_name +
          ' ' +
          data?.data[0].attributes.last_name}
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
              (selectedSubNav === SUB_NAVIGATION.PWD
                ? 'bg-gray-200 font-bold'
                : '')
            }
            onClick={() => {
              setSelectedSubNav(SUB_NAVIGATION.PWD)
              setCookie('dash_sub_navigation', SUB_NAVIGATION.PWD)
            }}
          >
            Modifier mon mot de passe
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.GYM_PRICING}
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
