import { LeftSubSidebar } from '@/components/authenticated/leftSubNavbar'
import { NAVIGATION } from './adminNavigation'
import { GymSubNavigation } from './subNavigation/gymSubNavigation'
import { MyProfileSubNavigation } from './subNavigation/myProfileSubNavigation'

type subNavigationProps = {
  selected: NAVIGATION
}
export const AdminSubNavigation = ({ selected }: subNavigationProps) => {
  return (
    <LeftSubSidebar>
      {selected === NAVIGATION.PROFILE && <MyProfileSubNavigation />}
      {selected === NAVIGATION.GYM && <GymSubNavigation />}
    </LeftSubSidebar>
  )
}
