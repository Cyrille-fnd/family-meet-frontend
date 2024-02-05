import * as React from "react";
import s from "./eventAddModal.module.css"
import Input from "@/components/form/input/Input";
import Button from "@/components/form/button/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export interface EventAddModalProps {
    user: User
    isOpen: boolean
    close: any
    token: string
}

const EventAddModal: React.FC<EventAddModalProps> = ({
    user, token, isOpen, close
}) => {
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'bearer '+token,
                'Access-Control-Allow-Origin': "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.get('title'),
                location: formData.get('location'),
                date: formData.get('date'),
                category: formData.get('category'),
                participantMax: formData.get('participantMax'),
            })
        };

        fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/events?hostId=' + user.id, requestOptions
        ).then(async response => {
            if (response.status !== 201) {
                displayErrorMessage() 
                
                return 
            }
            
            handleClose()
            router.refresh()
        })
    }

    const displayErrorMessage = () => {
        const errorMessageElement = document.getElementById("errorMessage")
        if (errorMessageElement !== null) errorMessageElement.style.display = "block"
    }

    const handleClose = () => {
        close()
    }

    return (
        isOpen && (
            <div className={s.modal}>
                <div className={s.overlay} onClick={close}/>
                <div className={s.modalContent}>
                    <h1 className={s.formTitle}>Créer un événement</h1>
                    <h1 className={s.errorMessage} id="errorMessage">Something went wrong ! try again</h1>
                    <form className={s.modalForm} onSubmit={handleSubmit} id="eventAddForm">
                        <Input name="title" placeholder="Titre"/>
                        <Input name="location" placeholder="Lieu"/>
                        <Input name="date" type="datetime-local"/>
                        <Input name="category" placeholder="Catégorie"/>
                        <Input name="participantMax" type="number"/>
                        <Button type="submit" form="eventAddForm" value="Créer l'événement" />
                    </form>

                    <button className={s.closeModal} onClick={handleClose}>
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

export default EventAddModal
