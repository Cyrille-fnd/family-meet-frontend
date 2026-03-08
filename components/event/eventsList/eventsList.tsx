import React, { useEffect, useState } from "react"
import s from "./eventsList.module.css"
import EventCard from "../eventCard/eventCard"
import Loader from "@/components/common/loader/infiniteScroll/loader"
import { useAuth } from "@/app/context/AuthContext"

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
  const { token } = useAuth()
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

  const grouped = groupEventsByDate(eventList)

  return (
    <div>
      {grouped.map(([dateLabel, dateEvents]) => (
        <div key={dateLabel} className={s.dateGroup}>
          <div className={s.dateDivider}>{dateLabel.toUpperCase()}</div>
          <div className={s.grid}>
            {dateEvents.map((event: Event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
      {!stopInfiniteScroll && loader && <Loader />}
    </div>
  )
}

export default EventsList
