import React from "react";
import s from "./eventsList.module.css"
import EventCard from "../eventCard/eventCard";

interface EventInfosProps {
    events: Event[]
}

interface Event {
    id: string
    title: string
    location: string
    date: string
    category: string
    createdAt: string
    participantMax: number
    guests: User[]
    host: User
}

interface User {
    id: string
    email: string
    sex: string
    firstname: string
    lastname: string
    bio: string
    birthday: string
    city: string
    pictureUrl: string| null
    createdAt: string
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
