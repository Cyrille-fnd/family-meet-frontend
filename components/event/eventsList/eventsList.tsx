import React, { useEffect, useState } from "react"
import s from "./eventsList.module.css"
import EventCard from "../eventCard/eventCard"
import { nanoid } from "nanoid"
import Loader from "@/components/common/loader/infiniteScroll/loader"
import { useAuth } from "@/app/context/AuthContext"

interface EventInfosProps {
  events: Event[]
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
          setStopInfiniteScroll((stopInfiniteScroll) => !stopInfiniteScroll)
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
        setLoader((loader) => !loader)
        window.removeEventListener("scroll", handleScroll)
        !stopInfiniteScroll && fetchEvents(token)
      }
    }

    window.addEventListener("scroll", handleScroll)
  }, [currentPage])

  return (
    <>
      {eventList.map((event: any, index: number, events: any) => (
        <div className={s.superContainer} key={event.id + nanoid()}>
          {typeof events[index - 1] === "undefined" ||
          new Date(event.date).getDate() !==
            new Date(events[index - 1].date).getDate() ? (
            <p>
              {new Date(event.date)
                .toLocaleDateString("fr-fr", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                .toUpperCase()}
            </p>
          ) : null}
          <EventCard event={event} />
        </div>
      ))}
      {!stopInfiniteScroll && loader && <Loader />}
    </>
  )
}

export default EventsList
