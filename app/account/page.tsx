import React from "react";
import {cookies} from "next/headers";
import AccountView from "@/components/accountView/AccountView";
import {redirect} from "next/navigation";

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

export default async function Account({ params }: { params: { id: string } }) {
    const {isLogged, ...user} = await getUserAccountData()

    if (!isLogged) redirect('/')

    return (
        <AccountView
            user={user}
        />
    )
}
