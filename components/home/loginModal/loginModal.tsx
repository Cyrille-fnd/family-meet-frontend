import * as React from "react";
import s from "./loginModal.module.css"
import Input from "@/components/form/input/Input";
import Button from "@/components/form/button/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import setCookie from "@/app/services/cookie";

export interface LoginModalProps {
    isOpen: boolean,
    close: any
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  close
}) => {
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.get('email'),
                password: formData.get('password'),
            })
        };

        fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/login_check', requestOptions
        ).then(async response => {
            const {token} = await response.json();

            if (!token) return
            setCookie('x-auth-token', token, 1)

            router.push('/events')
        })
    }

    return (
        isOpen && (
            <div className={s.modal}>
                <div className={s.overlay} onClick={close}/>
                <div className={s.modalContent}>
                    <h1 className={s.formTitle}>Connectez-vous</h1>
                    <form className={s.modalForm} onSubmit={handleSubmit} id="loginForm">
                        <Input name="email" placeholder="Email"/>
                        <Input name="password" type="password" placeholder="Password"/>
                        <Button type="submit" form="loginForm" value="Me connecter" />
                    </form>

                    <button className={s.closeModal} onClick={close} >
                        <Image
                                priority={true}
                                src={"/icon-cancel-cross.png"}
                                width={25}
                                height={20}
                                alt={'cancel-icon'}
                            />
                    </button>
                </div>
            </div>
        )
    )
}

export default LoginModal