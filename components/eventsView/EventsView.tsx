import React from "react";
import s from "./eventsView.module.css"
import SideMenu from "@/components/sideMenu/sideMenu";
import Button from "@/components/form/button/button";
import EventInfos from "@/components/event/event";

interface EventsViewProps {
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

const EventsView: React.FC<EventsViewProps> = async ({events}) => {
    return (<>
        <div className={s.container}>
            <SideMenu/>
            <div className={s.listContainer}>
                <Button type="button" value="Créer un évènement"/>
                <EventInfos events={events}/>
            </div>

        </div>
    </>)
}

export default EventsView
