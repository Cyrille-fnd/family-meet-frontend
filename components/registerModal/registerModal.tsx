import * as React from "react";
import s from "./registerModal.module.css"
import Input from "@/components/form/input/Input";
import Button from "@/components/form/button/button";
import {useRouter} from "next/navigation";


export interface RegisterModalProps {
    isOpen: boolean
    close: any
}

const RegisterModal: React.FC<RegisterModalProps> = ({
    isOpen, close
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
                email: formData.get('email'),
                password: formData.get('password'),
                sex: formData.get('sex'),
                firstname: formData.get('firstname'),
                lastname: formData.get('lastname'),
                bio: formData.get('bio'),
                birthday: formData.get('birthday'),
                city: formData.get('city'),
                pictureUrl: null,
            })
        };

        fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/users', requestOptions
        ).then(async response => {
            const {token} = await response.json();

            if (!token) return

            setCookie('x-auth-token', token, 1)

            await router.push('/account')
        })
    }

    const setCookie = (name: string, value: string, days: number) => {
        let date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        const expires = 'expires=' + date.toUTCString()
        document.cookie = name + '=' + value + '; ' + expires + '; path=/'
    }

    return (
        isOpen && (
            <div className={s.modal}>
                <div className={s.overlay} onClick={close}/>
                <div className={s.modalContent}>
                    <h1 className={s.formTitle}>Créer votre compte</h1>
                    <form className={s.modalForm} onSubmit={handleSubmit} id="registerForm">
                        <Input name="email" placeholder="  Email"/>
                        <Input name="password" type="password" placeholder="  Password"/>
                        <Input name="sex" placeholder="  Sexe"/>
                        <Input name="firstname" placeholder="  Prénom"/>
                        <Input name="lastname" placeholder="  Nom de famille"/>
                        <Input name="bio" placeholder="  Bio"/>
                        <Input name="birthday" type="date" placeholder=" Date de naissance"/>
                        <Input name="city" placeholder="  Ville"/>
                    </form>
                    <Button type="submit" form="registerForm" value="Créer mon compte" />

                    <button className={s.closeModal} onClick={close} >
                        X
                    </button>
                </div>
            </div>
        )
    )
}

export default RegisterModal
