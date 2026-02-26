import * as React from "react"
import { useRef, useEffect } from "react"
import s from "./eventAddModal.module.css"
import Input from "@/components/form/input/Input"
import Button from "@/components/form/button/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Loader from "@/components/common/loader/formValidation/loader"
import { useState } from "react"
import { useAuth } from "@/app/context/AuthContext"

export interface EventAddModalProps {
  isOpen: boolean
  close: () => void
}

const EventAddModal: React.FC<EventAddModalProps> = ({ isOpen, close }) => {
  const { user, token } = useAuth()
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const modal = modalRef.current
    if (!modal) return

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
        return
      }
      if (e.key !== "Tab") return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, close])

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.currentTarget.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(false)
    setLoader(true)
    const formData = new FormData(event.currentTarget)

    formData.append("category", selectedCategory)

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/v2/users/" +
          user?.id +
          "/meets",
        {
          method: "POST",
          headers: {
            Authorization: "bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.get("title"),
            description: formData.get("description"),
            location: formData.get("location"),
            date: formData.get("date"),
            category: formData.get("category"),
            participantMax: formData.get("participantMax"),
          }),
        }
      )

      if (response.status !== 201) {
        setError(true)
        return
      }

      handleClose()
      router.refresh()
    } catch {
      setError(true)
    } finally {
      setLoader(false)
    }
  }

  const handleClose = () => {
    setLoader((prevState) => !prevState)
    close()
  }

  return (
    isOpen && (
      <div className={s.modal}>
        <div className={s.overlay} onClick={close} />
        <div
          ref={modalRef}
          className={s.modalContent}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-add-modal-title"
        >
          <h1 id="event-add-modal-title" className={s.formTitle}>
            Créer un événement
          </h1>
          {error && (
            <h1 className={s.errorMessage}>Something went wrong ! try again</h1>
          )}
          <form
            className={s.modalForm}
            onSubmit={handleSubmit}
            id="eventAddForm"
          >
            <Input name="title" placeholder="Titre" />
            <Input
              name="description"
              type="textarea"
              placeholder="Description"
            />
            <Input name="location" placeholder="Lieu" />
            <Input
              name="date"
              type="datetime-local"
              min={new Date().toISOString().slice(0, -8)}
            />
            <label>
              Catégorie :
              <select
                name="category"
                value={selectedCategory}
                onChange={handleChange}
                className={s.select}
              >
                <option value="travail">travail</option>
                <option value="bar">bar</option>
                <option value="clubbing">clubbing</option>
                <option value="sport">sport</option>
                <option value="voyage">voyage</option>
                <option value="cinema">cinéma</option>
                <option value="restaurant">restaurant</option>
              </select>
            </label>
            <Input name="participantMax" type="number" min="1" />
            <div className={s.submitContainer}>
              <Button
                type="submit"
                form="eventAddForm"
                value="Créer l'événement"
              />
              {loader && <Loader />}
            </div>
          </form>

          <button
            className={s.closeModal}
            onClick={handleClose}
            aria-label="Fermer"
          >
            <Image
              priority={true}
              src={"/icon-cancel-cross.png"}
              width={25}
              height={20}
              alt=""
            />
          </button>
        </div>
      </div>
    )
  )
}

export default EventAddModal
