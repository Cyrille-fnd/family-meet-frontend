import React from "react";
import AccountView from "@/components/account/accountView/AccountView";
import {redirect} from "next/navigation";
import getCurrentUserData from "../services/user";
import getToken from "@/app/services/jwt";

export default async function Account() {
    const token = getToken()

    if (!token) redirect('/')

    const user = await getCurrentUserData()

    if (!user.isLogged) redirect('/')

    return (
        <AccountView
            user={user}
            token={token.value}
        />
    )
}
