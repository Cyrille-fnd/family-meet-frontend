import React from "react";
import s from "./account.module.css"
import Image from "next/image";

interface AccountViewProps {
    id: string
    email: string
    firstname: string
}

const AccountView: React.FC<AccountViewProps> = async ({
    id,
    email,
    firstname
}) => {

    return (<>
        <div className={s.container}>
            <div className={s.menu}>
                <Image
                    priority={true}
                    src={"/FAMILY.png"}
                    width={70}
                    height={50}
                    alt={'family-logo'}
                />
                <h1>Logo</h1>
                <h1>Famille</h1>
                <h1>Profil</h1>
                <h1>Activités</h1>
            </div>

            <div className={s.profile}>
                <h1>Profil</h1>
                <table>
                    <thead>
                    <tr>
                        <td>id</td>
                        <td>email</td>
                        <td>firstname</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{id}</td>
                        <td>{email}</td>
                        <td>{firstname}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className={s.suggestions}>
                <h1>Suggestions</h1>
            </div>
        </div>
    </>)
}

export default AccountView
