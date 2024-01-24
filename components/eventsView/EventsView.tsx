'use client'
import * as React from 'react';
import { useState } from "react";
import s from "./eventsView.module.css"
import SideMenu from "@/components/sideMenu/sideMenu";
import Button from "@/components/form/button/button";
import EventsList from "@/components/event/eventsList/eventsList";
import EventAddModal from "@/components/eventAddModal/eventAddModal";

interface EventsViewProps {
    events: Event[]
    user: User
    token: string
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

const EventsView: React.FC<EventsViewProps> = ({events, user, token}) => {
    const [isEventAddModalOpen, setEventAddModalOpen] = useState(false)

    return (
        <div className={s.container}>
            <EventAddModal user={user} token={token} isOpen={isEventAddModalOpen} close={() => setEventAddModalOpen(false)}/>
            <div className={s.sideContainer}>
                <SideMenu currentPage="Home"/>
                <Button type="button" value="Créer un évènement" onclick={() => setEventAddModalOpen(true)}/>
            </div>
            <div className={s.listContainer}>
                <h1>Événements à venir:</h1>
                {events.length > 0 ?
                    <EventsList events={events}/>:
                    <p> Aucun événement à venir</p>
                }
            </div>
        </div>
    )
}

export default EventsView
