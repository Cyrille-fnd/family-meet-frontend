import React, {useState} from "react";
import s from "./event.module.css"
import Image from "next/image";

const EventInfos: React.FC = async ({events}) => {

    return (<>
        {events.map((event) =>
            <div className={s.superContainer}>
                <p>
                    {event.date}
                </p>
                <div className={s.container}>
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
