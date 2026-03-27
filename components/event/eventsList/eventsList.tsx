import React, { useEffect, useState } from "react"
import s from "./eventsList.module.css"
import EventCard from "../eventCard/eventCard"
import EventDetailModal from "../eventDetailModal/eventDetailModal"
import Loader from "@/components/common/loader/infiniteScroll/loader"
import { useAuth } from "@/app/context/AuthContext"
import { apiGet } from "@/app/services/apiClient"

interface EventInfosProps {
  events: Event[]
}

function groupEventsByDate(events: Event[]): [string, Event[]][] {
  const groups: Record<string, Event[]> = {}
  for (const event of events) {
    const key = new Date(event.date).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    if (!groups[key]) groups[key] = []
    groups[key].push(event)
  }
  return Object.entries(groups)
}

const EventsList: React.FC<EventInfosProps> = ({ events }) => {
  const { token, user } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [eventList, setEventList] = useState(events)
  const [currentPage, setCurrentPage] = useState(2)
  const [stopInfiniteScroll, setStopInfiniteScroll] = useState(false)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchEvents = async (token: string | null) => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/v2/meets?page=" + currentPage,
          {
            method: "GET",
            headers: {
              Authorization: "bearer " + token,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )

        const data = await response.json()
        if (data.length === 0) {
          setStopInfiniteScroll(true)
          return
        }
        setEventList((prevData) => [...prevData, ...data])
        setCurrentPage((prevPage) => prevPage + 1)
      } catch {
        setStopInfiniteScroll(true)
      } finally {
        setLoader(false)
      }
    }

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        window.document.documentElement
      if (scrollTop + clientHeight === scrollHeight) {
        setLoader(true)
        window.removeEventListener("scroll", handleScroll)
        !stopInfiniteScroll && fetchEvents(token)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentPage])

  const handleJoin = async (eventId: string) => {
    // Mise à jour optimiste : ajoute immédiatement l'utilisateur courant aux guests
    if (user) {
      const addUser = (e: Event): Event =>
        e.id === eventId
          ? { ...e, participants: [...(e.participants ?? []), user] }
          : e
      setSelectedEvent((prev) => (prev ? addUser(prev) : prev))
      setEventList((prev) => prev.map(addUser))
    }

    // Re-fetch et normalise participants → guests
    const res = await apiGet(`/api/v2/meets/${eventId}`, token ?? undefined)
    if (res.ok) {
      const raw = res.data
      const updated: Event = { ...raw, guests: raw.participants ?? raw.guests }
      setSelectedEvent(updated)
      setEventList((prev) => prev.map((e) => (e.id === eventId ? updated : e)))
    }
  }

  const grouped = groupEventsByDate(eventList)

  return (
    <div>
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onJoin={handleJoin}
      />
      {grouped.map(([dateLabel, dateEvents]) => (
        <div key={dateLabel} className={s.dateGroup}>
          <div className={s.dateDivider}>{dateLabel.toUpperCase()}</div>
          <div className={s.grid}>
            {dateEvents.map((event: Event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
              />
            ))}
          </div>
        </div>
      ))}
      {!stopInfiniteScroll && loader && <Loader />}
    </div>
  )
}

export default EventsList
