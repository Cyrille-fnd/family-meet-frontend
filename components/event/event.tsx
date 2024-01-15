import React, {useState} from "react";
import s from "./event.module.css"
import Image from "next/image";

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

const EventInfos: React.FC<EventInfosProps> = async ({events}) => {

    return (<>
        {events.map((event: any) =>
            <div className={s.superContainer} key={event.id}>
                <p>
                    {event.date}
                </p>
                <div className={s.container} >
                    <div className={s.pictureContainer}>
                        <Image
                            priority={true}
                            src={"/icon-fete.png"}
                            width={100}
                            height={100}
                            alt={'family-logo'}
                        />
                    </div>
                    <div className={s.infosContainer}>
                        <p>{event.title}</p>
                        <div className={s.dateContainer}>
                            <Image
                                priority={true}
                                src={"/icon-horloge.png"}
                                width={20}
                                height={20}
                                alt={'family-logo'}
                            />
                            <h6>
                                {event.date}
                            </h6>
                        </div>
                        <div className={s.locationParticipantsContainer}>
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
                </div>
            </div>)}
    </>)
}

export default EventInfos
