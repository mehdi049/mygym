'use client'

import 'dayjs/locale/fr'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { IdProps } from '@/types/numberProps.types'
import { TextField } from '@/components/ui/textField'
import Button from '@/components/ui/button'
import { CheckboxField } from '@/components/ui/checkboxField'
import { SelectField, SelectFieldOption } from '@/components/ui/selectField'
import useGetAllClassesNames from '@/hooks/gym/classes/useGetAllClassesNames'
import useGetCoachesByGymId from '@/hooks/coach/useGetCoachesByGymId'
import useGetGymById from '@/hooks/gym/useGetGymById'
import useAddClass from '@/hooks/gym/classes/useAddClass'
import { ZodError, coerce, date, object } from 'zod'
import { doubleDigitDisplay } from '@/lib/utils/utils'
import { StrapiClass } from '@/types/strapi/gym.types'
import useUpdateClass from '@/hooks/gym/classes/useUpdateClass'
import useDeleteClass from '@/hooks/gym/classes/useDeleteClass'
import { handleErrors } from '@/lib/errorHandler/errorHandler'

interface ManageClassesFormProps extends IdProps {
  selectedDateTime?: Date
  selectedClass?: StrapiClass
}

dayjs.locale('fr')
export default function ManageClassesForm({
  id,
  selectedDateTime,
  selectedClass,
}: ManageClassesFormProps) {
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

  const { mutate: mutateAdd } = useAddClass()
  const { mutate: mutateUpdate } = useUpdateClass()
  const { mutate: mutateDelete } = useDeleteClass()

  const [classNamesOptions, setClassNamesOptions] = useState<
    SelectFieldOption[]
  >([])
  const [className, setClassName] = useState<string>('')

  const [coachOptions, setCoachOptions] = useState<SelectFieldOption[]>([])
  const [coach, setCoach] = useState<string>('')

  const [roomOptions, setRoomOptions] = useState<SelectFieldOption[]>([])
  const [room, setRoom] = useState<string>('')

  const [selectedDay, setSelectedDay] = useState<string>('')

  const [startTime, setStartTime] = useState<string>('')
  const [startTimeError, setStartTimeError] = useState<string>('')

  const [endTime, setEndTime] = useState<string>('')
  const [endTimeError, setEndTimeError] = useState<string>('')

  const [maxAttendees, setMaxAttendees] = useState<number>()
  const [maxAttendeesError, setMaxAttendeesError] = useState<string>()

  const [isLesMills, setIsLesMills] = useState<boolean>(true)

  const formatDateToTimeInputFormat = (date: Date) => {
    const formattedDate =
      doubleDigitDisplay(new Date(date).getHours().toString()) +
      ':' +
      doubleDigitDisplay(new Date(date).getMinutes().toString())
    return formattedDate
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

  // load classes list
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

  // load coaches
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

  // load rooms
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

  // useEffect for edit
  useEffect(() => {
    if (selectedClass) {
      setClassName(
        classNamesOptions.find(
          (x) => x.value === selectedClass?.attributes.class_name.data.id
        )?.value as string
      )

      if (selectedClass?.attributes.coaches.data)
        setCoach(selectedClass?.attributes.coaches.data[0].id.toString())

      if (selectedClass?.attributes.room.data)
        setRoom(selectedClass?.attributes.room.data?.id.toString())

      if (selectedClass?.attributes.start) {
        setSelectedDay(
          dayjs(selectedClass?.attributes.start).format('dddd, D MMMM')
        )

        setStartTime(
          formatDateToTimeInputFormat(selectedClass?.attributes.start)
        )

        setEndTime(formatDateToTimeInputFormat(selectedClass?.attributes.end))
      }

      setMaxAttendees(selectedClass?.attributes.max_attendees)
      setIsLesMills(
        selectedClass?.attributes.is_les_mills
          ? selectedClass?.attributes.is_les_mills
          : false
      )
    }
  }, [selectedClass, classNamesOptions, coachOptions, roomOptions])

  const handleUpdateClass = (isCancelled?: boolean) => {
    try {
      resetError()

      const _startTime = dayjs(selectedClass?.attributes.start)
        .hour(parseInt(startTime.substring(0, 2)))
        .minute(parseInt(startTime.substring(3, 5)))

      const _endTime = dayjs(selectedClass?.attributes.end)
        .hour(parseInt(endTime.substring(0, 2)))
        .minute(parseInt(endTime.substring(3, 5)))

      classSchema.parse({
        startTime: new Date(_startTime.toString()),
        endTime: new Date(_endTime.toString()),
        maxAttendees:
          !maxAttendees || isNaN(maxAttendees) ? undefined : maxAttendees,
      })

      mutateUpdate({
        classId: selectedClass?.id as number,
        data: {
          start: new Date(_startTime.toString()),
          end: new Date(_endTime.toString()),
          class_name: parseInt(className),
          is_les_mills: isLesMills,
          room: parseInt(room),
          coaches: [parseInt(coach)],
          max_attendees: maxAttendees,
          status: isCancelled ? 'Cancelled' : 'Active',
        },
      })
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors
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

  // useEffect for add
  useEffect(() => {
    if (selectedDateTime) {
      setSelectedDay(dayjs(selectedDateTime).format('dddd, D MMMM'))
      setStartTime(formatDateToTimeInputFormat(selectedDateTime))
      setEndTime(
        doubleDigitDisplay((selectedDateTime.getHours() + 1).toString()) +
          ':' +
          doubleDigitDisplay(selectedDateTime.getMinutes().toString())
      )
    }
  }, [selectedDateTime])

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

      mutateAdd({
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

  // handle delete
  const handleDeleteClass = () => {
    try {
      mutateDelete({
        id: selectedClass?.id as number,
      })
    } catch (error) {
      handleErrors(error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {selectedClass ? (
        <h2 className="text-lg font-bold">Modifier le cours</h2>
      ) : (
        <h2 className="text-lg font-bold">Ajouter un cours</h2>
      )}
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
      <TextField label="Date séléctionnée" value={selectedDay} disabled />
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
      {selectedClass ? (
        <>
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleUpdateClass()}
          >
            Modifier
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleUpdateClass(true)}
          >
            Annuler le cours
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleDeleteClass()}
          >
            Retirer
          </Button>
        </>
      ) : (
        <Button variant="primary" size="lg" onClick={() => handleAddClass()}>
          Ajouter
        </Button>
      )}
    </div>
  )
}
