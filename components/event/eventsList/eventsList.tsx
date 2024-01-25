import React from "react";
import s from "./eventsList.module.css"
import EventCard from "../eventCard/eventCard";

interface EventInfosProps {
    events: Event[]
}

const EventsList: React.FC<EventInfosProps> = ({events}) => {
    events.sort((firstEvent,secondEvent) => {
        return new Date(firstEvent.date).getTime() - new Date(secondEvent.date).getTime()
    })
    return (<>
        {events.map((event: any, index: number, events: any) =>
            <div className={s.superContainer} key={event.id}>
                {typeof events[index - 1] === 'undefined' || new Date(event.date).getDate() !== new Date(events[index - 1].date).getDate() ? 
                <p>{new Date(event.date).toLocaleDateString('fr-fr', { weekday:"long", year:"numeric", month:"short", day:"numeric"}).toUpperCase()}
                </p>: null
                }
                <EventCard event={event}/>
            </div>)}
    </>)
}

export default EventsList
