import * as React from "react"
import s from "./button.module.css"

export interface ButtonProps {
  form?: string
  type: "button" | "submit" | "reset" | undefined
  value: string
  onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: "primary" | "secondary" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  form = "",
  type = "button",
  value,
  onclick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
}) => {
  const classes = [s.button, s[variant], s[size], fullWidth ? s.fullWidth : ""]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      form={form}
      type={type}
      className={classes}
      onClick={onclick}
      disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Button
