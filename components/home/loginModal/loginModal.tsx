"use client"
import * as React from "react"
import { useState } from "react"
import s from "./loginModal.module.css"
import Input from "@/components/form/input/Input"
import Button from "@/components/form/button/button"
import Modal from "@/components/common/modal/Modal"
import Loader from "@/components/common/loader/formValidation/loader"
import { useRouter } from "next/navigation"

export interface LoginModalProps {
  isOpen: boolean
  close: () => void
  onSwitchToRegister?: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  close,
  onSwitchToRegister,
}) => {
  const router = useRouter()
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(false)
    setLoader(true)
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("email"),
          password: formData.get("password"),
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
      title="Connectez-vous"
      titleId="login-modal-title"
    >
      {error && (
        <p className={s.errorMessage} role="alert">
          Identifiants incorrects. Veuillez réessayer.
        </p>
      )}
      <form className={s.form} onSubmit={handleSubmit} id="loginForm">
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Mot de passe" />
        <div className={s.submitRow}>
          <Button
            type="submit"
            form="loginForm"
            value={loader ? "Connexion…" : "Me connecter"}
            variant="primary"
            size="lg"
            fullWidth
            disabled={loader}
          />
          {loader && <Loader />}
        </div>
      </form>
      {onSwitchToRegister && (
        <p className={s.switchText}>
          Pas encore de compte ?{" "}
          <button className={s.switchLink} onClick={onSwitchToRegister}>
            S&apos;inscrire
          </button>
        </p>
      )}
    </Modal>
  )
}

export default LoginModal
