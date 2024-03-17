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
import { TextField } from '@/components/ui/textField'
import Button from '@/components/ui/button'
import { CheckboxField } from '@/components/ui/checkboxField'
import { SelectField, SelectFieldOption } from '@/components/ui/selectField'
import useGetAllClassesNames from '@/hooks/gym/classes/useGetAllClassesNames'
import useGetCoachesByGymId from '@/hooks/coach/useGetCoachesByGymId'
import useGetGymById from '@/hooks/gym/useGetGymById'
import { doubleDigitDisplay } from '@/lib/utils/utils'
import { StrapiClass } from '@/types/strapi/gym.types'

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
}

type PlanningFormatterProps = {
  timeText: string
  event: {
    title: string
    id?: string
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
  const {
    data: gym,
    isLoading: isLoadingGym,
    isSuccess: isSuccessGym,
  } = useGetGymById({
    id: id,
  })
  const {
    data: coaches,
    isLoading: isLoadingCoaches,
    isSuccess: isSuccessCoaches,
  } = useGetCoachesByGymId({
    id: id,
  })
  const {
    data: allClassesNames,
    isLoading: isLoadingAllClassesNames,
    isSuccess: isSuccessAllClassesNames,
  } = useGetAllClassesNames()

  const [classNamesOptions, setClassNamesOptions] = useState<
    SelectFieldOption[]
  >([])
  const [className, setClassName] = useState<string>('')

  const [coachOptions, setCoachOptions] = useState<SelectFieldOption[]>([])
  const [coach, setCoach] = useState<string>('')

  const [planningData, setPlanningData] = useState<PlanningProps[]>()
  const [sliderVisible, setSliderVisible] = useState(false)

  const [roomOptions, setRoomOptions] = useState<SelectFieldOption[]>([])
  const [room, setRoom] = useState<string>('')

  const [selectedDateTime, setSelectedDateTime] = useState<Date>()
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')

  const [maxAttendees, setMaxAttendees] = useState<number>()
  const [isLesMills, setIsLesMills] = useState<boolean>(true)

  useEffect(() => {
    if (isSuccessAllClassesNames) {
      const _options: SelectFieldOption[] = []

      allClassesNames.data.forEach((className) => {
        _options.push({
          label: className.attributes.name,
          value: className.id,
        })
      })
      setClassNamesOptions(_options)
      setClassName(_options[0].value as string)
    }
  }, [isLoadingAllClassesNames])

  useEffect(() => {
    if (isSuccessCoaches) {
      const _options: SelectFieldOption[] = []

      coaches.data.forEach((className) => {
        _options.push({
          label:
            className.attributes.first_name +
            ' ' +
            className.attributes.last_name,
          value: className.id,
        })
      })
      setCoachOptions(_options)
      setCoach(_options[0].value as string)
    }
  }, [isLoadingCoaches])

  useEffect(() => {
    if (isSuccessGym) {
      const _options: SelectFieldOption[] = []

      gym.data.attributes.rooms?.data?.forEach((room) => {
        _options.push({
          label: room.attributes.name,
          value: room.id,
        })
      })
      setRoomOptions(_options)
      setRoom(_options[0].value as string)
    }
  }, [isLoadingGym])

  const handleDateClick = (arg: PlanningSelectedDateProps) => {
    if (editMode) {
      console.log(arg)
      setSelectedDateTime(arg.date)
      setStartTime(
        doubleDigitDisplay(arg.date.getHours().toString()) +
          ':' +
          doubleDigitDisplay(arg.date.getMinutes().toString())
      )
      setEndTime(
        doubleDigitDisplay((arg.date.getHours() + 1).toString()) +
          ':' +
          doubleDigitDisplay(arg.date.getMinutes().toString())
      )
      setSliderVisible(true)
    }
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
        title: x.attributes.class_name.data.attributes.name,
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
    <>
      <Slider visible={sliderVisible} onHide={() => setSliderVisible(false)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Ajouter un cours</h2>

          <SelectField
            label="Cours"
            value={className}
            options={classNamesOptions}
            onChange={(e) => setClassName(e.target.value)}
          />
          <SelectField
            label="Coach"
            value={coach}
            options={coachOptions}
            onChange={(e) => setCoach(e.target.value)}
          />
          <SelectField
            label="Salle"
            value={room}
            options={roomOptions}
            onChange={(e) => setRoom(e.target.value)}
          />
          <TextField
            label="Date séléctionnée"
            value={dayjs(selectedDateTime).format('dddd, D MMMM')}
            disabled
          />
          <div className="flex gap-4">
            <TextField
              type="time"
              label="Début"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              //error={nameError}
            />
            <TextField
              label="Fin"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              //error={phoneError}
            />
          </div>
          <TextField
            label="Maximum de participants"
            value={maxAttendees?.toString() as string}
            type="number"
            onChange={(e) => setMaxAttendees(parseInt(e.target.value))}
            //error={phoneError}
          />
          <CheckboxField
            label="Les Mills"
            checked={isLesMills}
            onChange={() => setIsLesMills(!isLesMills)}
          />
          <Button variant="primary" size="lg">
            Ajouter
          </Button>
        </div>
      </Slider>
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
    </>
  )
}
