import * as React from "react";
import s from "./registerModal.module.css"
import Input from "@/components/form/input/Input";
import Button from "@/components/form/button/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import setCookie from "@/app/services/cookie";
import {useState} from "react";
import Loader from "@/components/common/loader/formValidation/loader";

export interface RegisterModalProps {
    isOpen: boolean
    close: any
}

const RegisterModal: React.FC<RegisterModalProps> = ({
    isOpen, close
}) => {
    const router = useRouter()
    const [loader, setLoader] = useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoader(prevState => !prevState)
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

        fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/register', requestOptions
        ).then(async response => {
            if (response.status !== 201) {
                setLoader(prevState => !prevState)
                displayErrorMessage()

                return
            }
            const {token} = await response.json();

            if (!token) return

            setCookie('x-auth-token', token, 1)

            router.push('/events')
            setLoader(prevState => !prevState)
        })
    }

    const displayErrorMessage = () => {
        const errorMessageElement = document.getElementById("errorMessage")
        if (errorMessageElement !== null) errorMessageElement.style.display = "block"
    }

    return (
        isOpen && (
            <div className={s.modal}>
                <div className={s.overlay} onClick={close}/>
                <div className={s.modalContent}>
                    <h1 className={s.formTitle}>Créer votre compte</h1>
                    <form className={s.modalForm} onSubmit={handleSubmit} id="registerForm">
                        <Input name="email" placeholder="Email"/>
                        <Input name="password" type="password" placeholder="Mot de passe"/>
                        <Input name="sex" placeholder="Sexe"/>
                        <Input name="firstname" placeholder="Prénom"/>
                        <Input name="lastname" placeholder="Nom"/>
                        <Input name="bio" placeholder="Bio"/>
                        <Input name="birthday" type="date"/>
                        <Input name="city" placeholder="Ville"/>
                        <div className={s.submitContainer}>
                            <Button type="submit" form="registerForm" value="Créer mon compte" />
                            {loader && <Loader />}
                        </div>
                    </form>
                    <h1 className={s.errorMessage} id="errorMessage">Something went wrong ! try again</h1>

                    <button className={s.closeModal} onClick={close}>
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

export default RegisterModal
