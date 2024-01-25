import React from "react";
import {redirect} from "next/navigation";
import EventsView from "@/components/event/eventsView/EventsView";
import getCurrentUserData from "../services/user";
import getEvents from "../services/event";
import getToken from "../services/jwt";

export default async function Home() {
    const token = getToken()

    if (!token) redirect('/')

    const user = await getCurrentUserData()

    if (!user.isLogged) redirect('/')

    const events = await getEvents()

    return (
        <EventsView events={events} user={user} token={token.value} />
    )
}
