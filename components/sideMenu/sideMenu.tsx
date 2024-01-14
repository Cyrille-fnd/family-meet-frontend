import React from "react";
import s from "./sideMenu.module.css"
import Image from "next/image";

const SideMenu: React.FC = async () => {
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
                    <a className={s.textli} href="#">Accueil</a>
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-user-dark.png"}
                        width={25}
                        height={20}
                        alt={'user-icon'}
                    />
                    <a className={s.textli} href="#">Mon profil</a>
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-calendar.png"}
                        width={25}
                        height={20}
                        alt={'icon-calendar'}
                    />
                    <a className={s.textli} href="#">Mes sorties</a>
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-messages.png"}
                        width={25}
                        height={20}
                        alt={'messages-icon'}
                    />
                    <a className={s.textli} href="#">Mes messages</a>
                </li>
                <li className={s.li}>
                    <Image
                        priority={true}
                        src={"/icon-members.png"}
                        width={25}
                        height={20}
                        alt={'members-icon'}
                    />
                    <a className={s.textli} href="#">Membres</a>
                </li>
            </ul>
        </div>
    </>)
}

export default SideMenu
