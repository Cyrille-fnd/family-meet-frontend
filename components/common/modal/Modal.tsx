"use client"
import * as React from "react"
import { useRef, useEffect } from "react"
import s from "./modal.module.css"

export interface ModalProps {
  isOpen: boolean
  close: () => void
  title: string
  titleId: string
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  close,
  title,
  titleId,
  size = "md",
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const modal = modalRef.current
    if (!modal) return

    document.body.style.overflow = "hidden"

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
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div className={s.overlay} onClick={close}>
      <div
        ref={modalRef}
        className={[s.content, s[size]].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.header}>
          <h2 id={titleId} className={s.title}>
            {title}
          </h2>
          <button className={s.closeBtn} onClick={close} aria-label="Fermer">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
