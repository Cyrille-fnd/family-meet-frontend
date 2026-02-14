"use client"
import * as React from "react"
import Image from "next/image"
import s from "./home.module.css"
import RegisterModal from "@/components/home/registerModal/registerModal"
import { useState } from "react"
import Button from "@/components/form/button/button"
import LoginModal from "@/components/home/loginModal/loginModal"

const HomeView: React.FC = () => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <div className={s.container}>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        close={() => setRegisterModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        close={() => setLoginModalOpen(false)}
      />
      <div className={s.blocksContainer}>
        <div className={s.imageContainer}>
          <Image
            priority={true}
            src={"/FAMILY.png"}
            width={500}
            height={500}
            alt={"family-logo"}
          />
        </div>
        <div className={s.ctaContainer}>
          <h1 className={s.title}>Le site pour la famille</h1>
          <h1 className={s.registerText}>Inscrivez-vous.</h1>
          <Button
            type="button"
            value="Créer un compte"
            onclick={() => setRegisterModalOpen(true)}
          />
          <p className={s.conditionsText}>
            En vous inscrivant, vous acceptez les Conditions d&apos;utilisation
            et la Politique de confidentialité, notamment l&apos;utilisation des
            cookies.
          </p>
          <h1 className={s.loginText}>Vous avez déja un compte ?</h1>
          <Button
            type="button"
            value="Se connecter"
            onclick={() => setLoginModalOpen(true)}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeView
