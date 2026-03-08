import s from "./input.module.css"
import React from "react"

export interface InputProps {
  name: string
  type?: string
  placeholder?: string
  min?: number | string
  label?: string
  required?: boolean
  error?: string
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  min,
  label,
  required,
  error,
}) => {
  const id = `input-${name}`

  return (
    <div className={s.wrapper}>
      {label && (
        <label htmlFor={id} className={s.label}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className={s.textarea}
          required={required}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={s.input}
          min={min}
          required={required}
        />
      )}
      {error && <span className={s.error}>{error}</span>}
    </div>
  )
}

export default Input
