'use client'
import { ROUTES } from '@/routes'
import { signOut } from '@/services/public/auth'
import Image from 'next/image'
import Link from 'next/link'

export const LeftSidebar = () => {
  return (
    <div className="border-r border-r-gray-200 w-72 min-h-screen pt-4 bg-gray-50">
      <div className="flex gap-1 items-center w-full border-b border-b-gray-200 pb-4">
        <div>
          <Image
            src="/img/smart-gym.png"
            alt="smart gym"
            width={250}
            height={80}
            className="w-full max-w-32"
          />
        </div>
        <div>
          <p className="text-sm font-bold">DASHBOARD</p>
          <p className="text-xs text-gray-500">Smart GYM</p>
        </div>
      </div>
      <ul>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.GYM_PROFILE}
            className="block w-full p-4 border-b border-b-gray-200 hover:font-bold hover:bg-gray-200 duration-100"
          >
            GYM
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.MEMBERS}
            className="block w-full p-4 border-b border-b-gray-200 hover:font-bold hover:bg-gray-200 duration-100"
          >
            Members
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.COACHES}
            className="block w-full p-4 border-b border-b-gray-200 hover:font-bold hover:bg-gray-200 duration-100"
          >
            Coaches
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.PLANNING}
            className="block w-full p-4 border-b border-b-gray-200 hover:font-bold hover:bg-gray-200 duration-100"
          >
            Planning / classes
          </Link>
        </li>
        <li className="list-none">
          <Link
            href={ROUTES.ADMIN.PROFILE}
            className="block w-full p-4 border-b border-b-gray-200 hover:font-bold hover:bg-gray-200 duration-100"
          >
            Profile
          </Link>
        </li>
        <li className="list-none">
          <Link
            href=""
            onClick={() => {
              signOut()
            }}
            className="text-red-500 block w-full p-4 border-b border-b-gray-200 hover:font-bold hover:bg-gray-200 duration-100"
          >
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  )
}
