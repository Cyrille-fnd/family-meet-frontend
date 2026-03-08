import React from "react"
import s from "./eventCard.module.css"
import Image from "next/image"

interface EventCardProps {
  event: Event
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

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const categoryColor =
    CATEGORY_COLORS[event.category] ?? "var(--color-primary)"
  const participantRatio =
    event.participantMax > 0 ? event.guests.length / event.participantMax : 0

  return (
    <a href="#" className={s.card}>
      {/* Image de couverture */}
      <div className={s.imageWrapper}>
        <Image
          src={"/image-" + event.category + ".jpg"}
          alt={event.category}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={s.image}
        />
        <span
          className={s.categoryBadge}
          style={{ backgroundColor: categoryColor }}
        >
          {event.category}
        </span>
      </div>

      {/* Corps de la carte */}
      <div className={s.body} style={{ borderLeftColor: categoryColor }}>
        <h3 className={s.title}>{event.title}</h3>

        <div className={s.meta}>
          <div className={s.metaRow}>
            <svg
              width="14"
              height="14"
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
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </div>

          <div className={s.metaRow}>
            <svg
              width="14"
              height="14"
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

        {/* Barre de participants */}
        <div className={s.participants}>
          <span className={s.participantCount}>
            {event.guests.length}/{event.participantMax} participants
          </span>
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
      </div>
    </a>
  )
}

export default EventCard
