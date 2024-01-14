import React from "react";
import {cookies} from "next/headers";
import AccountView from "@/components/accountView/AccountView";
import {redirect} from "next/navigation";

async function getUserAccountData(id: string) {
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

    const response = await fetch(process.env.API_URL + '/v1/api/users'+ id, requestOptions)

    if (!response.ok) {
        return {isLogged: false}
    }

    const data = await response.json();

    return {...data, isLogged: true}
}

export default async function Account({ params }: { params: { id: string } }) {
    const {isLogged, id, email, firstname} = await getUserAccountData(params.id)

    if (!isLogged) redirect('/', "push")

    return (
        <AccountView
            id={id}
            email={email}
            firstname={firstname}
        />
    )
}
