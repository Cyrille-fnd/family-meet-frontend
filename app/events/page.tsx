import React from "react"
import EventsView from "@/components/event/eventsView/EventsView"
import getEvents from "../services/event"

export default async function Events() {
  const events = await getEvents()

  return <EventsView events={events} />
}
