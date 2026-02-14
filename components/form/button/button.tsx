import * as React from "react"
import s from "./button.module.css"

export interface ButtonProps {
  form?: string
  type: "button" | "submit" | "reset" | undefined
  value: string
  onclick?: any
}

const Button: React.FC<ButtonProps> = ({
  form = "",
  type = "button",
  value,
  onclick,
}) => {
  return (
    <>
      <button form={form} type={type} className={s.button} onClick={onclick}>
        {value}
      </button>
    </>
  )
}

export default Button
