import React from "react";
import s from "./sideMenu.module.css"
import Image from "next/image";

interface SideMenuProps {
    currentPage: 'Home'|'Profile'|'My events'|'Messages'|'Members'
}

const SideMenu: React.FC<SideMenuProps> = async ({currentPage}) => {
    return (<>
        <div className={s.container}>
            <ul>
                <li>
                    <Image
                        priority={true}
                        src={"/FAMILY.png"}
                        width={150}
                        height={150}
                        alt={'family-logo'}
                    />
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-home.png"}
                        width={25}
                        height={20}
                        alt={'home-icon'}
                    />
                    {currentPage === 'Home' ? <a className={s.boldTextli} >Accueil</a> : <a className={s.textli} href="/events" >Accueil</a>}
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-user-dark.png"}
                        width={25}
                        height={20}
                        alt={'user-icon'}
                    />
                    {currentPage === 'Profile' ? <a className={s.boldTextli} >Mon profil</a> : <a className={s.textli} href="/account" >Mon profil</a>}
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-calendar.png"}
                        width={25}
                        height={20}
                        alt={'icon-calendar'}
                    />
                    {currentPage === 'My events' ? <a className={s.boldTextli} >Mes sorties</a> : <a className={s.textli} href="#" >Mes sorties</a>}
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-messages.png"}
                        width={25}
                        height={20}
                        alt={'messages-icon'}
                    />
                    {currentPage === 'Messages' ? <a className={s.boldTextli} >Mes messages</a> : <a className={s.textli} href="#" >Mes messages</a>}
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-members.png"}
                        width={25}
                        height={20}
                        alt={'members-icon'}
                    />
                    {currentPage === 'Members' ? <a className={s.boldTextli} >Membres</a> : <a className={s.textli} href="#" >Membres</a>}
                </li>
            </ul>
        </div>
    </>)
}

export default SideMenu
