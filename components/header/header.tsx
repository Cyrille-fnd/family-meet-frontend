import {FC} from "react";
import s from "./header.module.css";
import Image from "next/image";

const Header: FC = () => {
    return (
        <div className={s.header}>
            <h1>FAMILY MEET</h1>
            <a href={"#"}>
                <Image src={"/icon-user.png"}  alt={"user icon"}/>
            </a>
        </div>
    )
}

export default Header
