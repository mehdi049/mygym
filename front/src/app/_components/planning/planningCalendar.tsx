'use client'

import 'dayjs/locale/fr'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dayjs from 'dayjs'
import { LoadingArea } from '@/components/ui/loading'
import { ErrorArea } from '@/components/ui/error'
import { useEffect, useState } from 'react'
import { IdProps } from '@/types/numberProps.types'
import useGetClassesByGymId from '@/hooks/gym/classes/useGetClassesByGymId'
import { Slider } from '@/components/ui/slider'
import { ClassStatus, StrapiClass } from '@/types/strapi/gym.types'
import ManageClassesForm from '@/app/(authenticated)/admin/gym/planning/manageClassForm'
import Badge from '@/components/ui/badge'

type PlanningSelectedDateProps = {
  date: Date
  dateStr: string
  allDay: boolean
}

type PlanningProps = {
  title: string
  start: string
  end: string
  id?: string
  extendedProps?: {
    status?: ClassStatus
    coach: string
  }
}

type PlanningFormatterProps = {
  timeText: string
  event: {
    title: string
    id?: string
    extendedProps?: {
      status?: ClassStatus
      coach: string
    }
  }
}

interface PlanningCallendarByGymIdProps extends IdProps {
  editMode?: boolean
}

dayjs.locale('fr')
export default function PlanningCallendarByGymId({
  id,
  editMode,
}: PlanningCallendarByGymIdProps) {
  const { data, isLoading, isError, isSuccess } = useGetClassesByGymId({
    id: id,
  })

  const [planningData, setPlanningData] = useState<PlanningProps[]>()
  const [sliderVisible, setSliderVisible] = useState(false)

  const [selectedDateTime, setSelectedDateTime] = useState<Date>()
  const [selectedClass, setSelectedClass] = useState<StrapiClass | undefined>()

  const handleDateClick = (calendarDate: PlanningSelectedDateProps) => {
    if (editMode) {
      setSelectedDateTime(calendarDate.date)
      setSelectedClass(undefined)
      setSliderVisible(true)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClassEventClick = (classEvent: any) => {
    if (editMode) {
      const _selectedClass = data?.data.filter(
        (x) => x.id === parseInt(classEvent.event.id)
      )
      if (_selectedClass) {
        setSelectedDateTime(undefined)
        setSelectedClass(_selectedClass ? _selectedClass[0] : undefined)
        setSliderVisible(true)
      }
    }
  }

  const renderEventContent = (event: PlanningFormatterProps) => {
    return (
      <div className="realtive">
        <span className="text-xxs block">{event.timeText}</span>

        <span className="text-xs font-bold block">{event.event.title}</span>

        <span className="text-xxs block">
          {event.event.extendedProps?.coach}
        </span>

        {event.event.extendedProps?.status === 'Cancelled' && (
          <p className="absolute top-0 right-0.5">
            <Badge variant="error" textSize="text-xxs">
              Annulé
            </Badge>
          </p>
        )}
      </div>
    )
  }

  const generateEventsBasedOnAPIResponse = (data: StrapiClass[]) => {
    const _data: PlanningProps[] = []

    data.map((x) => {
      if (
        x.attributes.start &&
        x.attributes.end &&
        x.attributes.class_name &&
        x.attributes.class_name.data
      )
        return _data.push({
          start: x.attributes.start.toString(),
          end: x.attributes.end.toString(),
          title: x.attributes.class_name.data.attributes.name,
          id: x.id.toString(),
          extendedProps: {
            status: x.attributes.status,
            coach: x.attributes.coaches.data[0].attributes.first_name,
          },
        })
    })

    setPlanningData(_data)
  }

  useEffect(() => {
    if (isSuccess) generateEventsBasedOnAPIResponse(data.data)
  }, [data])

  if (isLoading) return <LoadingArea />

  if (isError) return <ErrorArea />

  return (
    <>
      {editMode && (selectedDateTime || selectedClass) && (
        <Slider visible={sliderVisible} onHide={() => setSliderVisible(false)}>
          <ManageClassesForm
            selectedDateTime={selectedDateTime}
            id={id}
            selectedClass={selectedClass}
          />
        </Slider>
      )}
      <FullCalendar
        selectable={true}
        dateClick={handleDateClick}
        eventClick={handleClassEventClick}
        slotMinTime={'06:00:00'}
        locale={'fr'}
        firstDay={1}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        allDaySlot={false}
        events={planningData}
        eventContent={renderEventContent}
      />
    </>
  )
}
