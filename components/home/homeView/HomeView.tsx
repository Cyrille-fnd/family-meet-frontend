"use client"
import * as React from "react"
import Image from "next/image"
import s from "./home.module.css"
import dynamic from "next/dynamic"
import { useState } from "react"
import Button from "@/components/form/button/button"

const LoginModal = dynamic(
  () => import("@/components/home/loginModal/loginModal"),
  { ssr: false }
)
const RegisterModal = dynamic(
  () => import("@/components/home/registerModal/registerModal"),
  { ssr: false }
)

const MOSAIC_IMAGES = [
  { src: "/image-sport.jpg", alt: "Sortie sport" },
  { src: "/image-voyage.jpg", alt: "Voyage en famille" },
  { src: "/image-restaurant.jpg", alt: "Repas en famille" },
  { src: "/image-bar.jpg", alt: "Soirée entre proches" },
]

const HomeView: React.FC = () => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false)
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <div className={s.page}>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        close={() => setRegisterModalOpen(false)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        close={() => setLoginModalOpen(false)}
      />

      {/* Barre de navigation */}
      <header className={s.topBar}>
        <div className={s.brand}>
          <Image
            priority
            src="/FAMILY.png"
            width={36}
            height={36}
            alt="Family Meet"
            className={s.brandLogo}
          />
          <span className={s.brandName}>Family Meet</span>
        </div>
      </header>

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.textBlock}>
          <h1 className={s.tagline}>
            Le lieu de <em className={s.taglineAccent}>votre</em> famille
          </h1>
          <p className={s.subtagline}>
            Organisez vos sorties, partagez vos moments et retrouvez votre
            famille en un seul endroit.
          </p>

          <div className={s.ctaGroup}>
            <Button
              type="button"
              value="Créer un compte"
              variant="primary"
              size="lg"
              fullWidth
              onclick={() => setRegisterModalOpen(true)}
            />
            <Button
              type="button"
              value="Se connecter"
              variant="secondary"
              size="lg"
              fullWidth
              onclick={() => setLoginModalOpen(true)}
            />
          </div>

          <p className={s.legalText}>
            En vous inscrivant, vous acceptez les Conditions d&apos;utilisation
            et la Politique de confidentialité, notamment l&apos;utilisation des
            cookies.
          </p>
        </div>

        {/* Mosaïque d'images (desktop uniquement) */}
        <div className={s.mosaic} aria-hidden="true">
          {MOSAIC_IMAGES.map(({ src, alt }, i) => (
            <div
              key={src}
              className={[
                s.mosaicItem,
                i % 2 !== 0 ? s.mosaicItemOffset : "",
              ].join(" ")}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 768px) 200px, 0px"
                className={s.mosaicImage}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeView
