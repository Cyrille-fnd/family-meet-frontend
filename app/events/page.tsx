import React from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import EventsView from "@/components/eventsView/EventsView";
import { RedirectType } from "next/dist/client/components/redirect";

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

    const response = await fetch(process.env.API_URL + '/v1/api/users/current', requestOptions)

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

    const response = await fetch(process.env.API_URL + '/v1/api/events', requestOptions)

    return response.json()
}

export default async function Home() {
    const {isLogged} = await getUserAccountData()

    if (!isLogged) redirect(process.env.HOST_URL)

    const events = await getEvents()

    return (
        <EventsView events={events} />
    )
}
