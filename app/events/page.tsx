import React from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import EventsView from "@/components/eventsView/EventsView";

async function getUserAccountData() {
    const cookieStore = cookies()
    const token = cookieStore.get("x-auth-token")

    if (!token) return {
        isLogged: false
    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'bearer '+token.value,
            'Access-Control-Allow-Origin': "*",
        },
    };

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/users/current', requestOptions)

    if (!response.ok) {
        return {isLogged: false}
    }

    const data = await response.json();

    return {...data, isLogged: true}
}

async function getEvents() {
    const cookieStore = cookies()
    const token = cookieStore.get("x-auth-token")

    if (!token) return {
        isLogged: false
    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'bearer '+token.value,
            'Access-Control-Allow-Origin': "*",
        },
    };

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/events', requestOptions)

    return response.json()
}

export default async function Home() {
    const user = await getUserAccountData()

    if (!user.isLogged) redirect('/')

    const cookieStore = cookies()
    const token = cookieStore.get("x-auth-token")

    if (!token) redirect('/')

    const events = await getEvents()

    return (
        <EventsView events={events} user={user} token={token.value} />
    )
}
