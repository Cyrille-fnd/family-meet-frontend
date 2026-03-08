"use client"
import * as React from "react"
import { useState } from "react"
import s from "./registerModal.module.css"
import Input from "@/components/form/input/Input"
import Button from "@/components/form/button/button"
import Modal from "@/components/common/modal/Modal"
import Loader from "@/components/common/loader/formValidation/loader"
import { useRouter } from "next/navigation"

export interface RegisterModalProps {
  isOpen: boolean
  close: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, close }) => {
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const [selectedSex, setSelectedSex] = useState("male")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(false)
    setLoader(true)
    const formData = new FormData(event.currentTarget)
    formData.append("sex", selectedSex)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          sex: formData.get("sex"),
          firstname: formData.get("firstname"),
          lastname: formData.get("lastname"),
          bio: formData.get("bio"),
          birthday: formData.get("birthday"),
          city: formData.get("city"),
          pictureUrl: null,
        }),
      })

      if (response.status !== 200) {
        setError(true)
        return
      }

      router.push("/events")
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
      title="Créer votre compte"
      titleId="register-modal-title"
      size="lg"
    >
      {error && (
        <p className={s.errorMessage} role="alert">
          Une erreur est survenue. Veuillez réessayer.
        </p>
      )}
      <form className={s.form} onSubmit={handleSubmit} id="registerForm">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Mot de passe"
          label="Mot de passe"
          required
        />

        <div className={s.fieldGroup}>
          <label className={s.fieldLabel}>Genre</label>
          <div className={s.sexToggle}>
            <button
              type="button"
              className={[
                s.sexBtn,
                selectedSex === "male" ? s.sexBtnActive : "",
              ].join(" ")}
              onClick={() => setSelectedSex("male")}
            >
              Homme
            </button>
            <button
              type="button"
              className={[
                s.sexBtn,
                selectedSex === "female" ? s.sexBtnActive : "",
              ].join(" ")}
              onClick={() => setSelectedSex("female")}
            >
              Femme
            </button>
          </div>
        </div>

        <div className={s.row}>
          <Input
            name="firstname"
            placeholder="Prénom"
            label="Prénom"
            required
          />
          <Input name="lastname" placeholder="Nom" label="Nom" required />
        </div>

        <Input
          name="bio"
          type="textarea"
          placeholder="Parlez un peu de vous…"
          label="Bio"
        />
        <Input name="birthday" type="date" label="Date de naissance" required />
        <Input name="city" placeholder="Ville" label="Ville" required />

        <div className={s.submitRow}>
          <Button
            type="submit"
            form="registerForm"
            value={loader ? "Inscription…" : "Créer mon compte"}
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

export default RegisterModal
