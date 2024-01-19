import React, {useState} from "react";
import s from "./eventsList.module.css"
import Image from "next/image";
import Separator from "../../common/separator/separator";
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

const EventsList: React.FC<EventInfosProps> = async ({events}) => {

    return (<>
        {events.map((event: any) =>
            <div className={s.superContainer} key={event.id}>
                <p>
                    {event.date}
                </p>
                <EventCard event={event}/>
            </div>)}
    </>)
}

export default EventsList
