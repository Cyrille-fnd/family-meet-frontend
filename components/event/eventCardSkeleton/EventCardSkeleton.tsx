import React from "react"
import s from "./eventCardSkeleton.module.css"

const EventCardSkeleton: React.FC = () => {
  return (
    <div className={s.card} aria-hidden="true">
      <div className={s.imageBlock} />
      <div className={s.body}>
        <div className={s.titleLine} />
        <div className={s.metaLine} />
        <div className={s.metaLineShort} />
        <div className={s.barTrack}>
          <div className={s.barFill} />
        </div>
      </div>
    </div>
  )
}

export default EventCardSkeleton
