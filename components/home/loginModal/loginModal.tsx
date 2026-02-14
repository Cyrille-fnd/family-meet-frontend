import * as React from "react"
import s from "./loginModal.module.css"
import Input from "@/components/form/input/Input"
import Button from "@/components/form/button/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Loader from "@/components/common/loader/formValidation/loader"
import { useState } from "react"

export interface LoginModalProps {
  isOpen: boolean
  close: any
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, close }) => {
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
    isOpen && (
      <div className={s.modal}>
        <div className={s.overlay} onClick={close} />
        <div className={s.modalContent}>
          <h1 className={s.formTitle}>Connectez-vous</h1>
          {error && (
            <h1 className={s.errorMessage}>Something went wrong ! try again</h1>
          )}
          <form className={s.modalForm} onSubmit={handleSubmit} id="loginForm">
            <Input name="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <div className={s.submitContainer}>
              <Button type="submit" form="loginForm" value="Me connecter" />
              {loader && <Loader />}
            </div>
          </form>

          <button className={s.closeModal} onClick={close}>
            <Image
              priority={true}
              src={"/icon-cancel-cross.png"}
              width={25}
              height={20}
              alt={"cancel-icon"}
            />
          </button>
        </div>
      </div>
    )
  )
}

export default LoginModal
