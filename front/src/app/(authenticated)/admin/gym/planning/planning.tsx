'use client'

import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'

import { IdProps } from '@/types/numberProps.types'
import PlanningCallendarByGymId from '@/app/_components/planning/planningCalendar'

export default function Planning({ id }: IdProps) {
  return (
    <>
      <h1 className="text-xl font-bold mb-8">Planning</h1>

      <DashboardBodyContainer>
        <PlanningCallendarByGymId id={id} editMode={true} />
      </DashboardBodyContainer>
    </>
  )
}
