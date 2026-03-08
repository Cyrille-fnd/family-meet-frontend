"use client"
import * as React from "react"
import { useState } from "react"
import s from "./eventAddModal.module.css"
import Input from "@/components/form/input/Input"
import Button from "@/components/form/button/button"
import Modal from "@/components/common/modal/Modal"
import Loader from "@/components/common/loader/formValidation/loader"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"

export interface EventAddModalProps {
  isOpen: boolean
  close: () => void
}

const CATEGORIES = [
  { value: "bar", label: "Bar", color: "var(--color-cat-bar)" },
  { value: "sport", label: "Sport", color: "var(--color-cat-sport)" },
  {
    value: "restaurant",
    label: "Restaurant",
    color: "var(--color-cat-restaurant)",
  },
  { value: "cinema", label: "Cinéma", color: "var(--color-cat-cinema)" },
  { value: "voyage", label: "Voyage", color: "var(--color-cat-voyage)" },
  { value: "travail", label: "Travail", color: "var(--color-cat-travail)" },
  { value: "clubbing", label: "Clubbing", color: "var(--color-cat-clubbing)" },
] as const

const EventAddModal: React.FC<EventAddModalProps> = ({ isOpen, close }) => {
  const { user, token } = useAuth()
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("bar")
  const router = useRouter()

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

      close()
      router.refresh()
    } catch {
      setError(true)
    } finally {
      setLoader(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      title="Créer un événement"
      titleId="event-add-modal-title"
      size="lg"
    >
      {error && (
        <p className={s.errorMessage} role="alert">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}
      <form className={s.form} onSubmit={handleSubmit} id="eventAddForm">
        <Input
          name="title"
          placeholder="Titre de l'événement"
          label="Titre"
          required
        />
        <Input
          name="description"
          type="textarea"
          placeholder="Décrivez votre événement…"
          label="Description"
        />
        <Input
          name="location"
          placeholder="Adresse ou lieu"
          label="Lieu"
          required
        />
        <Input
          name="date"
          type="datetime-local"
          label="Date et heure"
          min={new Date().toISOString().slice(0, -8)}
          required
        />

        <div className={s.fieldGroup}>
          <span className={s.fieldLabel}>Catégorie</span>
          <div className={s.categoryChips} role="group" aria-label="Catégorie">
            {CATEGORIES.map(({ value, label, color }) => (
              <button
                key={value}
                type="button"
                className={[
                  s.chip,
                  selectedCategory === value ? s.chipActive : "",
                ].join(" ")}
                style={
                  selectedCategory === value
                    ? { backgroundColor: color, borderColor: color }
                    : { borderColor: color, color }
                }
                onClick={() => setSelectedCategory(value)}
                aria-pressed={selectedCategory === value}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <Input
          name="participantMax"
          type="number"
          label="Nombre max de participants"
          min="1"
          required
        />

        <div className={s.submitRow}>
          <Button
            type="submit"
            form="eventAddForm"
            value={loader ? "Création…" : "Créer l'événement"}
            variant="primary"
            size="lg"
            fullWidth
            disabled={loader}
          />
          {loader && <Loader />}
        </div>
      </form>
    </Modal>
  )
}

export default EventAddModal
