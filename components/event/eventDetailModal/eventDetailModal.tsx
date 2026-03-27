"use client"
import React, { useState } from "react"
import s from "./eventDetailModal.module.css"
import Image from "next/image"
import Modal from "@/components/common/modal/Modal"
import { useAuth } from "@/app/context/AuthContext"
import { joinEvent } from "@/app/services/eventActions"

interface EventDetailModalProps {
  event: Event | null
  onClose: () => void
  onJoin?: (eventId: string) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  bar: "var(--color-cat-bar)",
  sport: "var(--color-cat-sport)",
  restaurant: "var(--color-cat-restaurant)",
  cinema: "var(--color-cat-cinema)",
  voyage: "var(--color-cat-voyage)",
  travail: "var(--color-cat-travail)",
  clubbing: "var(--color-cat-clubbing)",
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onJoin,
}) => {
  const { user, token } = useAuth()
  const [isJoining, setIsJoining] = useState(false)
  const [joinError, setJoinError] = useState(false)

  if (!event) return null

  const categoryColor =
    CATEGORY_COLORS[event.category] ?? "var(--color-primary)"
  const guestCount = event.participants?.length ?? 0
  const participantRatio =
    event.maxGuests > 0 ? guestCount / event.maxGuests : 0
  const isFull = guestCount >= event.maxGuests
  const isAlreadyGuest =
    event.participants?.some((g) => g.id === user?.id) ?? false
  const hostInitials =
    (event.host.firstname[0] ?? "") + (event.host.lastname[0] ?? "")

  const handleJoin = async () => {
    if (!token || !user) return
    setIsJoining(true)
    setJoinError(false)
    const { ok } = await joinEvent(event.id, user.id, token)
    setIsJoining(false)
    if (ok) {
      onJoin?.(event.id)
    } else {
      setJoinError(true)
    }
  }

  const isDisabled = isFull || isAlreadyGuest || isJoining

  const ctaLabel = isJoining
    ? "En cours…"
    : isAlreadyGuest
      ? "Déjà inscrit"
      : isFull
        ? "Événement complet"
        : "Rejoindre"

  return (
    <Modal
      isOpen={!!event}
      close={onClose}
      title={event.title}
      titleId="event-detail-modal-title"
      size="md"
    >
      {/* Image de couverture */}
      <div className={s.imageWrapper}>
        <Image
          src={"/image-" + event.category + ".jpg"}
          alt={event.category}
          fill
          sizes="(min-width: 640px) 480px, 100vw"
          className={s.image}
        />
        <span
          className={s.categoryBadge}
          style={{ backgroundColor: categoryColor }}
        >
          {event.category}
        </span>
      </div>

      {/* Méta-infos */}
      <div className={s.meta}>
        <div className={s.metaRow}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>
            {new Date(event.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className={s.metaRow}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{event.location}</span>
        </div>
      </div>

      {event.description && (
        <p className={s.description}>{event.description}</p>
      )}

      {/* Hôte */}
      <div className={s.hostSection}>
        <span className={s.sectionLabel}>Organisé par</span>
        <div className={s.host}>
          {event.host.pictureUrl ? (
            <img
              src={event.host.pictureUrl}
              alt={event.host.firstname}
              className={s.avatar}
            />
          ) : (
            <div
              className={s.avatarInitials}
              style={{ backgroundColor: categoryColor }}
            >
              {hostInitials.toUpperCase()}
            </div>
          )}
          <span className={s.hostName}>
            {event.host.firstname} {event.host.lastname}
          </span>
        </div>
      </div>

      {/* Participants */}
      <div className={s.participantsSection}>
        <div className={s.participantsHeader}>
          <span className={s.sectionLabel}>Participants</span>
          <span className={s.participantCount}>
            {guestCount} / {event.maxGuests}
          </span>
        </div>
        <div className={s.participantBar} aria-hidden="true">
          <div
            className={s.participantFill}
            style={{
              width: `${Math.min(participantRatio * 100, 100)}%`,
              backgroundColor: categoryColor,
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <button
        className={[s.ctaBtn, isDisabled ? s.ctaBtnDisabled : ""].join(" ")}
        disabled={isDisabled}
        style={isDisabled ? {} : { backgroundColor: categoryColor }}
        onClick={handleJoin}
      >
        {ctaLabel}
      </button>
      {joinError && (
        <p className={s.joinError}>Une erreur est survenue. Réessaie.</p>
      )}
    </Modal>
  )
}

export default EventDetailModal
