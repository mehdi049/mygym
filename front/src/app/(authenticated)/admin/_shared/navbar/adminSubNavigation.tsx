'use client'
import { LeftSubSidebar } from '@/components/authenticated/leftSubNavbar'
import { GymSubNavigation } from './subNavigation/gymSubNavigation'
import { MyProfileSubNavigation } from './subNavigation/myProfileSubNavigation'
import { ValueOf } from 'next/dist/shared/lib/constants'
import { NAVIGATION } from './adminNavigation'

type subNavigationProps = {
  selected: ValueOf<typeof NAVIGATION>
}
export const AdminSubNavigation = ({ selected }: subNavigationProps) => {
  return (
    <LeftSubSidebar>
      {selected === NAVIGATION.PROFILE && <MyProfileSubNavigation />}
      {selected === NAVIGATION.GYM && <GymSubNavigation />}
    </LeftSubSidebar>
  )
}
