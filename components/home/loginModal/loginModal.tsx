import * as React from "react";
import s from "./loginModal.module.css"
import Input from "@/components/form/input/Input";
import Button from "@/components/form/button/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import setCookie from "@/app/services/cookie";
import Loader from "@/components/common/loader/formValidation/loader";
import {useState} from "react";

export interface LoginModalProps {
    isOpen: boolean,
    close: any
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  close
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
                username: formData.get('email'),
                password: formData.get('password'),
            })
        };

        fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/login_check', requestOptions
        ).then(async response => {
            if (response.status !== 200) {
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
                    <h1 className={s.formTitle}>Connectez-vous</h1>
                    <h1 className={s.errorMessage} id="errorMessage">Something went wrong ! try again</h1>
                    <form className={s.modalForm} onSubmit={handleSubmit} id="loginForm">
                        <Input name="email" placeholder="Email"/>
                        <Input name="password" type="password" placeholder="Password"/>
                        <div className={s.submitContainer}>
                            <Button type="submit" form="loginForm" value="Me connecter" />
                            {loader && <Loader />}
                        </div>
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
