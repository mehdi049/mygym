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
import useAddClass from '@/hooks/gym/classes/useAddClass'
import { handleErrors } from '@/lib/errorHandler/errorHandler'
import { ZodError, coerce, date, object } from 'zod'

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

  const { mutate } = useAddClass()

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
  const [startTimeError, setStartTimeError] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [endTimeError, setEndTimeError] = useState<string>('')

  const [maxAttendees, setMaxAttendees] = useState<number>()
  const [maxAttendeesError, setMaxAttendeesError] = useState<string>()

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
      if (
        x.attributes.start &&
        x.attributes.end &&
        x.attributes.class_name &&
        x.attributes.class_name.data
      )
        _data.push({
          start: x.attributes.start.toString(),
          end: x.attributes.end.toString(),
          title: x.attributes.class_name.data.attributes.name,
          id: '',
        })
    })

    setPlanningData(_data)
  }

  const classSchema = object({
    startTime: date({
      required_error: 'Date obligatoire',
    }),
    endTime: date({
      required_error: 'Date obligatoire',
    }),
    maxAttendees: coerce
      .number()
      .positive({
        message: 'Maximum de participants invalide',
      })
      .nullish(),
  }).refine((data) => data.endTime > data.startTime, {
    message: 'Date de fin doit être supèrieur à la date de debut',
    path: ['endDate'],
  })

  const resetError = () => {
    setStartTimeError('')
    setEndTimeError('')
    setMaxAttendeesError('')
  }

  const handleAddClass = () => {
    try {
      resetError()

      const _startTime = dayjs(selectedDateTime)
        .hour(parseInt(startTime.substring(0, 2)))
        .minute(parseInt(startTime.substring(3, 5)))

      const _endTime = dayjs(selectedDateTime)
        .hour(parseInt(endTime.substring(0, 2)))
        .minute(parseInt(endTime.substring(3, 5)))

      classSchema.parse({
        startTime: new Date(_startTime.toString()),
        endTime: new Date(_endTime.toString()),
        maxAttendees:
          !maxAttendees || isNaN(maxAttendees) ? undefined : maxAttendees,
      })

      mutate({
        data: {
          start: new Date(_startTime.toString()),
          end: new Date(_endTime.toString()),
          class_name: parseInt(className),
          is_les_mills: isLesMills,
          room: parseInt(room),
          coaches: [parseInt(coach)],
          max_attendees: maxAttendees,
        },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors
        console.log(errors)
        setEndTimeError(
          errors.find((err) => err.path.includes('startTime'))
            ?.message as string
        )
        setEndTimeError(
          errors.find((err) => err.path.includes('endDate'))?.message as string
        )
        setMaxAttendeesError(
          errors.find((err) => err.path.includes('maxAttendees'))
            ?.message as string
        )
      }
    }
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
              error={startTimeError}
            />
            <TextField
              label="Fin"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              error={endTimeError}
            />
          </div>
          <TextField
            label="Maximum de participants"
            value={maxAttendees?.toString() as string}
            type="number"
            onChange={(e) => setMaxAttendees(parseInt(e.target.value))}
            error={maxAttendeesError}
          />
          <CheckboxField
            label="Les Mills"
            checked={isLesMills}
            onChange={() => setIsLesMills(!isLesMills)}
          />
          <Button variant="primary" size="lg" onClick={() => handleAddClass()}>
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
