import React from "react";
import AccountView from "@/components/account/accountView/AccountView";
import {redirect} from "next/navigation";
import getCurrentUserData from "../services/user";

export default async function Account() {
    const {isLogged, ...user} = await getCurrentUserData()

    if (!isLogged) redirect('/')

    return (
        <AccountView
            user={user}
        />
    )
}
