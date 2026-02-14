import * as React from "react";
import s from "./registerModal.module.css"
import Input from "@/components/form/input/Input";
import Button from "@/components/form/button/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
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
    const [error, setError] = useState(false)
    const [selectedSex, setSelectedSex] = useState('');

    const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
        setSelectedSex(event.currentTarget.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setError(false)
        setLoader(true)
        const formData = new FormData(event.currentTarget)

        formData.append('sex', selectedSex);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                }),
            })

            if (response.status !== 200) {
                setError(true)
                return
            }

            router.push('/events')
        } catch {
            setError(true)
        } finally {
            setLoader(false)
        }
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
                        <label>
                            Sexe
                            <select name="sex" value={selectedSex} onChange={handleChange} className={s.select}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </label>
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
                    {error && <h1 className={s.errorMessage}>Something went wrong ! try again</h1>}

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
