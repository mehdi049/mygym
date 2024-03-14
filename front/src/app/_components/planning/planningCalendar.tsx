'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { LoadingArea } from '@/components/ui/loading'
import { ErrorArea } from '@/components/ui/error'
import { useEffect, useState } from 'react'
import { StrapiClass } from '@/types/strapi.types'
import { IdProps } from '@/types/numberProps.types'
import useGetClassesByGymId from '@/hooks/gym/classes/useGetClassesByGymId'

type PlanningProps = {
  title: string
  start: string
  end: string
  id?: string
}

type PlanningFormatterProps = {
  timeText: string
  event: {
    title: string
    id?: string
  }
}

export default function PlanningCallendarByGymId({ id }: IdProps) {
  const { data, isLoading, isError, isSuccess } = useGetClassesByGymId({
    id: id,
  })
  const [planningData, setPlanningData] = useState<PlanningProps[]>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    alert(arg.dateStr)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventClick = (arg: any) => {
    console.log('Event: ' + arg)
  }

  const renderEventContent = (event: PlanningFormatterProps) => {
    return (
      <div>
        <span className="text-xs block" style={{ fontSize: '8px' }}>
          {event.timeText}
        </span>
        <span className="text-xs font-bold">{event.event.title}</span>
        <span className="text-xs font-bold">{event.event.id}</span>
      </div>
    )
  }

  const generateEventsBasedOnAPIResponse = (data: StrapiClass[]) => {
    const _data: PlanningProps[] = []

    data.map((x) => {
      _data.push({
        start: x.attributes.start.toString(),
        end: x.attributes.end.toString(),
        title: x.attributes.name,
        id: '',
      })
    })

    setPlanningData(_data)
  }

  useEffect(() => {
    if (isSuccess) generateEventsBasedOnAPIResponse(data.data)
  }, [isLoading])

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <FullCalendar
      selectable={true}
      dateClick={handleDateClick}
      eventClick={eventClick}
      slotMinTime={'06:00:00'}
      locale={'fr'}
      firstDay={1}
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      allDaySlot={false}
      events={planningData}
      eventContent={renderEventContent}
    />
  )
}
