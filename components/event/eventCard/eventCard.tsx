import React, {useState} from "react";
import s from "./eventCard.module.css"
import Image from "next/image";
import Separator from "../../common/separator/separator";

interface EventCardProps {
    event: Event
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

const EventCard: React.FC<EventCardProps> = async ({event}) => {
    return (
        <a href="#" className={s.container} >
            <Separator />
            <div className={s.contentContainer}>
                <div className={s.pictureContainer}>
                    <Image
                        priority={true}
                        src={"/icon-fete.jpg"}
                        width={160}
                        height={100}
                        alt={'family-logo'}
                    />
                </div>
                <div className={s.textContainer}>
                    <h5>{event.title}</h5>

                    <div className={s.dateContainer}>
                        <Image
                            priority={true}
                            src={"/icon-horloge.png"}
                            width={15}
                            height={10}
                            alt={'family-logo'}
                        />
                        <h6>
                            {new Date(event.date).toLocaleDateString('fr-FR', { weekday:"long", month:"short", day:"numeric", hour:"numeric", minute:"numeric"})}
                        </h6>
                    </div>

                    <div className={s.locationContainer}>
                        <Image
                            priority={true}
                            src={"/icon-location.png"}
                            width={20}
                            height={20}
                            alt={'family-logo'}
                        />
                        <h6>
                            {event.location}
                        </h6>
                    </div>

                    <div className={s.participantContainer}>
                            {event.guests.length}/{event.participantMax} participants
                    </div>
                </div>
            </div>
        </a>
    )
}

export default EventCard
