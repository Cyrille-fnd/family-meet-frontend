"use client"
import * as React from "react"
import { useState } from "react"
import s from "./eventsView.module.css"
import AppLayout from "@/components/common/appLayout/AppLayout"
import Button from "@/components/form/button/button"
import EventsList from "@/components/event/eventsList/eventsList"
import dynamic from "next/dynamic"

const EventAddModal = dynamic(
  () => import("@/components/event/eventAddModal/eventAddModal"),
  { ssr: false }
)

interface EventsViewProps {
  events: Event[]
}

const EventsView: React.FC<EventsViewProps> = ({ events }) => {
  const [isEventAddModalOpen, setEventAddModalOpen] = useState(false)

  return (
    <AppLayout
      currentPage="Home"
      onCreateEvent={() => setEventAddModalOpen(true)}
    >
      <EventAddModal
        isOpen={isEventAddModalOpen}
        close={() => setEventAddModalOpen(false)}
      />
      <div className={s.pageContent}>
        <div className={s.pageHeader}>
          <h1 className={s.pageTitle}>Événements à venir</h1>
          <div className={s.createButtonDesktop}>
            <Button
              type="button"
              value="Créer un événement"
              variant="primary"
              onclick={() => setEventAddModalOpen(true)}
            />
          </div>
        </div>

        {events.length > 0 ? (
          <EventsList events={events} />
        ) : (
          <div className={s.emptyState}>
            <span className={s.emptyEmoji} aria-hidden="true">
              🎉
            </span>
            <p className={s.emptyTitle}>Aucun événement pour le moment</p>
            <p className={s.emptySubtitle}>
              Soyez le premier à créer un moment de partage&nbsp;!
            </p>
            <Button
              type="button"
              value="Créer le premier événement"
              variant="primary"
              onclick={() => setEventAddModalOpen(true)}
            />
          </div>
        )}
      </div>
    </AppLayout>
  )
}

export default EventsView
