import React from "react";
import s from "./account.module.css"
import Image from "next/image";
import SideMenu from "../../common/sideMenu/sideMenu";

interface AccountViewProps {
    user: User
}

const getAge = (birthdate: string): number => {
    var month_diff = Date.now() - new Date(birthdate).getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();

    return Math.abs(year - 1970);
}

const AccountView: React.FC<AccountViewProps> = async ({user}) => {
    const userAge = getAge(user.birthday)

    return (
        <div className={s.container}>
            <div className={s.sideContainer}>
                <SideMenu currentPage="Profile"/>
            </div>
            <div className={s.profileContainer}>
                <div className="pictureContainer">
                    <Image
                        priority={true}
                        src={"/icon-user-profile.png"}
                        width={250}
                        height={250}
                        alt={'user-profile-photo'}
                        className="rounded-[50%]"
                    />
                </div>
                <h1>{user.firstname} {user.lastname}</h1>
                <p> {user.city}</p>
                <p> {userAge} ans</p>
                <p> {user.bio} </p>
            </div>
        </div>
    )
}

export default AccountView
