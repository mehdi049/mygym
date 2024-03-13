'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import DashboardBodyContainer from '@/components/authenticated/dashboardBodyContainer'
import planningData from '@/data/planning.json'

export default function Planning() {
  const handleDateClick = (arg) => {
    alert(arg.dateStr)
  }

  const eventClick = (arg) => {
    alert('Event: ' + arg.event.title)
  }

  const renderEventContent = (eventInfo: any) => {
    return (
      <div>
        <span className="text-xs block" style={{ fontSize: '8px' }}>
          {eventInfo.timeText}
        </span>
        <span className="text-xs font-bold">{eventInfo.event.title}</span>
      </div>
    )
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-8">PLANNING</h1>

      <DashboardBodyContainer>
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
      </DashboardBodyContainer>
    </>
  )
}
